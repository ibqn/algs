# algs

## Getting started

```
npm install
npm test
```
## 1 Union Find

The test data (i.e. the files `tinyUF.txt`, `mediumUF.txt` and `largeUF.txt`) can be obtained using one line of bash:
```
bash -c 'for s in tiny medium large; do curl -O "http://algs4.cs.princeton.edu/15uf/${s}UF.txt"; done'
```


## 2 Analysis of Algorithms
The staightforward implementation of the three sum caltulaion.
```
$ node three-sum.js
size of the data set is 1000
70 triples sums to zero
```

```
$ node three-sum-fast.js -f 2Kints.txt
size of the data set is 2000
528 triples sums to zero
```

```
bash -c 'for s in {1,2,4,8,16,32}K 1M; do curl -O "http://algs4.cs.princeton.edu/14analysis/${s}ints.txt"; done'
```

```
bash -c 'for s in {tiny,lange}{T,W}; do curl -O "http://algs4.cs.princeton.edu/11model/${s}${m}.txt"; done'
```
