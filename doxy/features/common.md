@page pg_feat_common Common

# What's It?

defines YgEs to use namespace like structure.  
and some functions for globally.  

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs

## for Node/Deno

```
import YgEs from 'api/common.js';
```
importing name can redefine in your wish.  
and can use YgEs too.  

-----
# How to Use

-----
## Create Reverse Lookup Table

```


```

-----
## Just String

```
// toString()
s = null.totring(); // (Error thrown) 
s = undefined.totring(); // (Error thrown) 
s = {a:-1,b:"xyz"}.toString(); // [object Object] 

// justString() (useful for logging)
s = YgEs.justString(null); // null 
s = YgEs.justString(undefined); // undefined 
s = YgEs.justString({a:-1,b:"xyz"}); // {"a":-1,"b":xyz} 
```

-----
## Inspectable String

```
// JSON
s = JSON.stringify(Infinity); // null 
s = JSON.stringify(NaN); // null 
s = JSON.stringify(undefined); // undefined 
s = JSON.stringify([undefined]); // [null] 

// inspect (useful for debug, strings are quoted)
s = YgEs.inspect(Infinity); // Infinity
s = YgEs.inspect(NaN); // NaN
s = YgEs.inspect(undefined); // undefined 
s = YgEs.inspect([undefined]); // [undefined] 
```

-----
# Class Reference

@sa @ref pg_class_common
