---
layout: post
title:  Cryptocurrencies
category:
    - Software
description: Simple installation of cryptosoftware
---

## Ubuntu installation

### Install ethereum client
```bash
#sudo add-apt-repository ppa:ethereum/ethereum
#sudo add-apt-repository ppa:ethereum/ethereum-qt

sudo apt-get install software-properties-common
sudo apt-get install nvidia-cuda-dev nvidia-cuda-toolkit nvidia-nsight
sudo apt-get install libleveldb-dev
sudo apt-get install libmicrohttpd-dev
sudo apt-get install libminiupnpc-dev

git clone --recursive https://github.com/ethereum/cpp-ethereum.git

cd cpp-ethereum/
mkdir build

cmake ..
cmake .
cmake --build .
```

### Install ethereum minner
