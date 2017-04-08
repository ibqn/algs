# algs

## Getting started

```bash
npm install
npm test
```
## 1 Union Find

The test data (i.e. the files `tinyUF.txt`, `mediumUF.txt` and `largeUF.txt`) can be obtained using one line of bash:
```bash
bash -c 'for s in tiny medium large; do curl -O "http://algs4.cs.princeton.edu/15uf/${s}UF.txt"; done'
```


## 2 Analysis of Algorithms
The straightforward implementation of the three sum calculation.
```bash
$ node three-sum.js
size of the data set is 1000
70 triples sums to zero
```

```bash
$ node three-sum-fast.js -f 2Kints.txt
size of the data set is 2000
528 triples sums to zero
```

```bash
bash -c 'for s in {1,2,4,8,16,32}K 1M; do curl -O "http://algs4.cs.princeton.edu/14analysis/${s}ints.txt"; done'
```
Data files:
* [tinyW.txt](http://algs4.cs.princeton.edu/11model/tinyW.txt) and [tinyT.txt](http://algs4.cs.princeton.edu/11model/tinyT.txt)
* [largeW.txt](http://algs4.cs.princeton.edu/11model/largeW.txt) and [largeT.txt](http://algs4.cs.princeton.edu/11model/largeT.txt)

To download them at once the following bash one-liner can be used:
```bash
bash -c 'for s in {tiny,lange}{T,W}; do curl -O "http://algs4.cs.princeton.edu/11model/${s}${m}.txt"; done'
```

## 3 Stacks and Queues
```bash
curl -O http://algs4.cs.princeton.edu/13stacks/tobe.txt
```
The content of the `tobe.txt` file is
```bash
$ more tobe.txt
to be or not to - be - - that - - - is
```

## 4 Elementary Sorts
Two data sets are available: [tiny.txt](http://algs4.cs.princeton.edu/21elementary/tiny.txt) and [words3.txt](http://algs4.cs.princeton.edu/21elementary/words3.txt).
```bash
$ more tiny.txt
S O R T E X A M P L E

$ cat words3.txt
bed bug dad yes zoo
now for tip ilk dim
tag jot sob nob sky
hut men egg few jay
owl joy rap gig wee
was wad fee tap tar
dug jam all bad yet

```
