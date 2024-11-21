@page pg_feat_urlbuild URL Builder

# What's It?

advanced URL parser.  

- PHP's parse_url() like structure.  
- mailto supported.  
- nonorigin path supported.
- more extracting and baking host, path, and query.  
- PHP's structured queries supported partially.  


# Import

## for web

(todo)  

## for Node/Deno

```
import URLBuilder from 'api/urlbuild.js';
```
importing name can redefine in your wish.  


# How to Use

## Parsing

call url.parse() and store normally.  
```
var url='https://us%65r:pw%64@www.example.com:8080/%7Ea/b%2Fc.html?q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf#abc#xyz';

var a=URLBuilder.parse(url);
log.info(a.scheme); // https 
log.info(a.slashes); // // 
log.info(a.user); // user 
log.info(a.pass); // pwd 
log.info(a.host); // www.example.com
log.info(a.port); // 8080 
log.info(a.path); // /%7Ea/b%2Fc.html 
log.info(a.query); // q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf 
log.info(a.hash); // abc#xyz 
```

### Extract & Bake Host

```
log.info(a.host); // www.example.com
var b=a.extractHost();
log.info(JSON.stringify(b)); // ["www","example","com"]

b[0]+=0;
b.unshift('test');
a.bakeHost(b);
log.info(a.host); // test.www0.example.com 
```

### Extract & Bake Path

```
log.info(a.path); // /%7Ea/b%2Fc.html 
b=a.extractPath();
log.info(JSON.stringify(b)); // ["","~a","b/c.html"]

b[b.length-1]='';
a.bakePath(b);
log.info(a.path); // /~a/
```

### Extract & Bake Query as Args

```
log.info(a.query); // q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf 
b=a.extractArgs();
log.info(JSON.stringify(b)); // ["q=ijk","lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de+f"]

b.push('xyz');
a.bakeArgs(b);
log.info(a.query); // q%3Dijk+lmn%26a%3D1%26b%5Ba%5D%5Bb%5D%5B%5D%3D123%26b%5Ba%5D%5Bc%5D%3D789%26b%5Ba%5D%5Bb%5D%5B%5D%3Dde%2Bf+xyz 
```

### Extract & Bake Query as Prop

```
log.info(a.query); // q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf 
b=a.extractProp();
log.info(JSON.stringify(b)); // {"q":"ijk+lmn","a":"1","b":{"a":{"b":["123","de+f"],"c":"789"}}}

b.b.a.d='xyz';
b.b.a.b.push(-3.14);
a.bakeProp(b);
log.info(a.query); // q=ijk%2Blmn&a=1&b[a][b][]=123&b[a][b][]=de%2Bf&b[a][b][]=-3.14&b[a][c]=789&b[a][d]=xyz
```


# Class Reference

@sa @ref pg_class_urlbuilder @n
	@ref pg_class_parsedurl @n
