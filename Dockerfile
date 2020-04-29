FROM node:12.16.1-alpine as build-frontend
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend ./
RUN rm public/help
RUN yarn run build


FROM tiangolo/uwsgi-nginx-flask:python3.7 as download-jobs
WORKDIR /jobs
RUN git clone --depth 1 https://github.com/AlgoLab/MALVIRUS-data.git .



FROM tiangolo/uwsgi-nginx-flask:python3.7

RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py37_4.8.2-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh && \
    /opt/conda/bin/conda clean -tipsy && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

ENV PATH /opt/conda/bin:$PATH

COPY ./environment.yml environment.yml
RUN conda env create -f environment.yml
RUN echo "conda activate malva-env" >> ~/.profile

# Clean conda packages
RUN find /opt/conda/ -follow -type f -name '*.a' -delete && \
    find /opt/conda/ -follow -type f -name '*.js.map' -delete && \
    /opt/conda/bin/conda clean -afy

COPY ./software/ /software/
RUN gcc -O3 -o /software/bin/fill_msa /software/fill_msa.c -lz

# Remove unused packages
RUN apt-get remove -y \
     tcl x11-common g++ gcc gcc-6 cpp cpp-6 subversion mysql-common && \
   apt-get autoremove -y


RUN echo "PATH=/software/bin:$PATH" >> ~/.bashrc
COPY --from=build-frontend /app/build /static
COPY help/ /static/help
COPY --from=download-jobs /jobs /jobs
COPY flask /app
COPY snakemake /snakemake
VOLUME [ "/jobs" ]
