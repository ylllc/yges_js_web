@page pg_feat_urlbuilder URL Builder

# What's It?

advanced URL parser.  

- PHP's parse_url() like structure.  
- mailto supported.  
- nonorigin path supported.
- more extracting and baking host, path, and query.  
- PHP's structured queries supported partially.  

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/urlbuild.js"></script>
```
use YgEs.URLBuilder

## for Node/Deno

```
import URLBuilder from 'api/urlbuild.js';
```
importing name can redefine in your wish.  
and can use YgEs.URLBuilder too.  

-----
# How to Use

-----
## Parsing

call url.Parse() and store normally.  
```
var url='https://us%65r:pw%64@www.example.com:8080/%7Ea/b%2Fc.html?q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf#abc#xyz';

var a=URLBuilder.Parse(url);
log.Info(a.Scheme); // https 
log.Info(a.Slashes); // // 
log.Info(a.User); // user 
log.Info(a.Pass); // pwd 
log.Info(a.Host); // www.example.com
log.Info(a.Port); // 8080 
log.Info(a.Path); // /%7Ea/b%2Fc.html 
log.Info(a.Query); // q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf 
log.Info(a.Fragmant); // abc#xyz 
```

-----
## Extract & Bake Host

```
log.Info(a.Host); // www.example.com
var b=a.ExtractHost();
log.Info(JSON.stringify(b)); // ["www","example","com"]

b[0]+=0;
b.unshift('test');
a.BakeHost(b);
log.Info(a.Host); // test.www0.example.com 
```

-----
## Extract & Bake Path

```
log.Info(a.Path); // /%7Ea/b%2Fc.html 
b=a.ExtractPath();
log.Info(JSON.stringify(b)); // ["","~a","b/c.html"]

b[b.length-1]='';
a.BakePath(b);
log.Info(a.Path); // /~a/
```

-----
## Extract & Bake Query as Args

```
log.Info(a.Query); // q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf 
b=a.ExtractArgs();
log.Info(JSON.stringify(b)); // ["q=ijk","lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de+f"]

b.push('xyz');
a.BakeArgs(b);
log.Info(a.Query); // q%3Dijk+lmn%26a%3D1%26b%5Ba%5D%5Bb%5D%5B%5D%3D123%26b%5Ba%5D%5Bc%5D%3D789%26b%5Ba%5D%5Bb%5D%5B%5D%3Dde%2Bf+xyz 
```

-----
## Extract & Bake Query as Prop

```
log.Info(a.Query); // q=ijk+lmn&a=1&b[a][b][]=123&b[a][c]=789&b[a][b][]=de%2Bf 
b=a.ExtractProp();
log.Info(JSON.stringify(b)); // {"q":"ijk+lmn","a":"1","b":{"a":{"b":["123","de+f"],"c":"789"}}}

b.b.a.d='xyz';
b.b.a.b.push(-3.14);
a.BakeProp(b);
log.Info(a.Query); // q=ijk%2Blmn&a=1&b[a][b][]=123&b[a][b][]=de%2Bf&b[a][b][]=-3.14&b[a][c]=789&b[a][d]=xyz
```

-----
# Class Reference

@sa @ref pg_class_urlbuilder @n
	@ref pg_class_parsedurl @n
