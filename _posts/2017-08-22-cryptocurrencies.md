---
layout: post
title: cryptocurrencies
category:
    - decentralization
description: Simple installation of cryptosoftware
---

- [Mining](#mining)
  - [cpuminer-multi](#cpuminer-multi)
  - [ccminer-cryptonight](#ccminer-cryptonight)
- [Trading](#trading)

## Mining

### [cpuminer-multi](https://github.com/tpruvot/cpuminer-multi)

```bash
# Ubuntu/Debian deps
sudo apt-get install automake autoconf pkg-config libcurl4-openssl-dev libjansson-dev libssl-dev libgmp-dev make g++

# Build miner
git clone https://github.com/tpruvot/cpuminer-multi.git
cd cpuminer-multi
./build.sh

# Start with Minergate 
# XMR+BCN
#./cpuminer -a cryptonight -o stratum+tcp://xmo-bcn.pro.pool.minergate.com:45585 -u $USER -p $PASS
# BCN (Bytecoin)
./cpuminer -a cryptonight -o stratum+tcp://bcn.pool.minergate.com:45550 -u $USER -p $PASS	
# XMR (Monero)
./cpuminer -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45700 -u $USER -p $PASS
# XMO (Monero Original)
./cpuminer -a cryptonight -o stratum+tcp://xmo.pool.minergate.com:45560 -u $USER -p $PASS	
# FCN (Fantomcoin)
./cpuminer -a cryptonight -o stratum+tcp://fcn.pool.minergate.com:45610 -u $USER -p $PASS	
# FCN+XMO (Fantomcoin+Monero Original)
./cpuminer -a cryptonight -o stratum+tcp://fcn-xmo.pool.minergate.com:45590 -u $USER -p $PASS
```

### [ccminer-cryptonight](https://github.com/tsiv/ccminer-cryptonight)

```bash
sudo apt-get install automake autoconf pkg-config libcurl4-openssl-dev libjansson-dev libssl-dev libgmp-dev make g++
sudo apt-get install libssl1.0-dev libcurl4-openssl-dev

git clone https://github.com/tsiv/ccminer-cryptonight.git
cd ccminer-cryptonight
./autogen.sh && ./configure

# Edit Makefile

## Comment line:
# NVCC_GENCODE = -gencode=arch=compute_20,code=\"sm_20,compute_20\" -gencode=arch=compute_30,code=\"sm_30,compute_30\" -gencode=arch=compute_35,code=\"sm_35,compute_35\"
## Uncomment line:
# NVCC_GENCODE		= -gencode=arch=compute_35,code=\"sm_35,compute_35\"
## Remove option: -abi=no from line:
# $(NVCC) -g -O2 -I . -Xptxas "-abi=no -v" $(NVCC_GENCODE) --maxrregcount=80 --ptxas-options=-v $(JANSSON_INCLUDES) -o $@ -c $<

make

# BCN(ByteCoin)
ccminer -a cryptonight -o stratum+tcp://bcn.pool.minergate.com:45550 -u $USER -p $PASS
# XMR(Monero)
ccminer -a cryptonight -o stratum+tcp://xmr.pool.minergate.com:45700 -u $USER -p $PASS
# XMO (Monero Original)
ccminer -a cryptonight -o stratum+tcp://xmo.pool.minergate.com:45560 -u $USER -p $PASS
# FCN (Fantomcoin)
ccminer -a cryptonight -o stratum+tcp://fcn.pool.minergate.com:45610 -u $USER -p $PASS
# FCN+XMO (Fantomcoin+Monero Original)
ccminer -a cryptonight -o stratum+tcp://fcn-xmo.pool.minergate.com:45590 -u $USER -p $PASS
```


## Trading

xxx

