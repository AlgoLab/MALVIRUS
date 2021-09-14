FROM node:12.16.1-alpine as build-frontend
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
COPY frontend/.yarn ./.yarn
COPY frontend/.yarnrc.yml ./
RUN yarn install --immutable
COPY frontend ./
RUN rm public/help
RUN yarn run build


FROM tiangolo/uwsgi-nginx-flask:python3.8-2020-12-19 as download-jobs
RUN apt-get -y update && apt-get -y install ca-certificates && apt-get clean && rm -rf /var/lib/apt/lists/*
WORKDIR /jobs
RUN git clone --depth 1 https://github.com/AlgoLab/MALVIRUS-data.git .



FROM tiangolo/uwsgi-nginx-flask:python3.8-2020-12-19
RUN apt-get -y update && apt-get -y install ca-certificates && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN wget --quiet https://github.com/conda-forge/miniforge/releases/download/4.10.3-5/Mambaforge-4.10.3-5-Linux-x86_64.sh -O ~/mambaforge.sh && \
    /bin/bash ~/mambaforge.sh -b -p /opt/conda && \
    rm ~/mambaforge.sh && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc


RUN git clone https://github.com/cov-lineages/pangolin.git /pangolin && \
    cd /pangolin && \
    git checkout v3.1.11 && \
    /opt/conda/bin/mamba env create -f environment.yml && \
    /opt/conda/bin/conda run --no-capture-output -n pangolin pip install . && \
    /opt/conda/bin/mamba clean --all

COPY ./environment-malva.yml environment-malva.yml
COPY ./environment-bcftools.yml environment-bcftools.yml

RUN cd /app && \
    /opt/conda/bin/mamba env create -f environment-malva.yml && \
    /opt/conda/bin/mamba env create -f environment-bcftools.yml && \
    /opt/conda/bin/mamba clean --all

ENV PATH /opt/conda/bin:$PATH

RUN echo "conda activate malva-env" >> ~/.profile

COPY ./software/ /software/
RUN gcc -O3 -o /software/bin/fill_msa /software/fill_msa.c -lz
RUN cd /software/malva && /opt/conda/bin/conda run --no-capture-output -n malva-env make && cp ./malva-geno /software/bin/

RUN echo "PATH=/software/bin:/opt/conda/bin:$PATH" >> ~/.bashrc
COPY --from=build-frontend /app/build /static
COPY help/ /static/help
COPY --from=download-jobs /jobs /jobs
COPY flask /app
COPY snakemake /snakemake
VOLUME [ "/jobs" ]
