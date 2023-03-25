# image: ma3310/rockylinux:9-dev
FROM rockylinux:9
RUN dnf install https://dl.fedoraproject.org/pub/epel/epel-release-latest-9.noarch.rpm \
                https://dl.fedoraproject.org/pub/epel/epel-next-release-latest-9.noarch.rpm -y && \
    dnf update -y && \
    dnf install -y zsh git 
