FROM node:12.16.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend ./
RUN yarn run build

FROM tiangolo/uwsgi-nginx-flask:python3.7

RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh && \
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

RUN conda update --yes -n base conda

# Install snakemake-minimal in base environment from conda-forge
RUN conda install -y -c conda-forge -c bioconda snakemake-minimal

COPY ./environment.yml environment.yml

RUN conda env create -f environment.yml
RUN echo "conda activate malva-env" >> ~/.profile
RUN echo "conda activate malva-env" >> ~/.bashrc

RUN mkdir /software
ENV PATH /software:$PATH

# Script to clean vcf
COPY ./format_vcf.py /software/format_vcf.py

# Clone and install snps-site
RUN cd /software && \
    git clone https://github.com/ldenti/snp-sites.git && \
    cd snp-sites && \
    autoreconf -i -f && \
    ./configure && \
    make

ENV PATH /software/snp-sites/src:$PATH

# Clone and install malva -- Remove when malva v1.3.0 is available on conda
RUN apt update && apt install -y cmake

RUN cd /software && \
    git clone --recursive https://github.com/AlgoLab/malva.git && \
    cd malva && \
    git checkout malvirus && \
    cd sdsl-lite/build && \
    ./build.sh && \
    cd ../../KMC && \
    make && \
    cd ../htslib && \
    make && \
    cd .. && \
    make

ENV PATH /software/malva:$PATH

ENV LD_LIBRARY_PATH /software/malva/htslib:$LD_LIBRARY_PATH

COPY --from=build /app/build /static

