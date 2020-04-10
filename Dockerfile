FROM node:12.16.1-alpine as build-frontend
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend ./
RUN yarn run build


FROM tiangolo/uwsgi-nginx-flask:python3.7 as build-software
WORKDIR /software

COPY ./software/format_vcf.py /software/format_vcf.py

# Clone and install snps-site
RUN git clone --depth 1 https://github.com/ldenti/snp-sites.git && \
    cd snp-sites && \
    autoreconf -i -f && \
    ./configure && \
    make

RUN apt-get update && apt-get install -y --no-install-recommends cmake

RUN git clone --recursive --depth 1 --branch malvirus --shallow-submodules https://github.com/AlgoLab/malva.git && \
    cd malva && \
    cd sdsl-lite/build && \
    ./build.sh && \
    cd ../../KMC && \
    make -j4 && \
    cd ../htslib && \
    make -j4 && \
    cd .. && \
    make

FROM tiangolo/uwsgi-nginx-flask:python3.7

RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py37_4.8.2-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh && \
    /opt/conda/bin/conda clean -tipsy && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

RUN find /opt/conda/ -follow -type f -name '*.a' -delete && \
    find /opt/conda/ -follow -type f -name '*.js.map' -delete && \
    /opt/conda/bin/conda clean -afy

ENV PATH /opt/conda/bin:$PATH

COPY ./environment.yml environment.yml
RUN conda env create -f environment.yml
RUN echo "conda activate malva-env" >> ~/.profile

ENV LD_LIBRARY_PATH /software/malva/htslib:$LD_LIBRARY_PATH

COPY --from=build-frontend /app/build /static
COPY --from=build-software /software /software
RUN echo "PATH=/software:/software/snp-sites/src:/software/malva:$PATH" >> ~/.bashrc
