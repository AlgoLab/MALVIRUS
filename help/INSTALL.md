# Installation and Boot

MALVIRUS is web-based application distributed as a [Docker](https://www.docker.com/) container image in order to allow its installation and execution on the largest number of computing platforms, from _personal laptops_ to _cloud infrastructures_ (either public or private).

The only pre-requisite is the Docker Engine.
On laptops, PCs and self-managed servers Docker Engine can be installed following [these instructions](https://docs.docker.com/engine/install/).  
For the installation on a cloud infrastructure, please refer to the technical documentation of the platform is used.

After Docker Engine has been installed, you can pull the container image and execute MALVIRUS with the following command:

```
docker run -p 56733:80 --mount type=volume,source=malvirus_jobs,target=/jobs algolab/malvirus
```

where `56733` is a port available on your system.

During the first execution, Docker downloads the container image, thus the process may be quite long (depending on your network connection), and then starts MALVIRUS.
After the first setup, booting up MALVIRUS requires few seconds.

When MALVIRUS is running, you can access the interface navigating with an internet browser to the URL [http://localhost:56733/](http://localhost:56733/).
Multiple users can access to the same instance of MALVIRUS (thus, sharing the data) by replacing `localhost` in the previous URL with the IP address of the system where MALVIRUS is running.
