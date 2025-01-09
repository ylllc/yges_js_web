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
## Reverse Lookup Table

```
src=['ZERO','ONE','TWO','THREE','FOUR',
	'FIVE','SIX','SEVEN','EIGHT','NINE','TEN']
lut=YgEs.CreateEnum(src);

console.log(lut.ZERO); // 0
console.log(lut.ONE); // 1
	:
console.log(lut.TEN); // 10

```

-----
## Just String

```
// toString()
s = null.totring(); // (Error thrown) 
s = undefined.totring(); // (Error thrown) 
s = {a:-1,b:"xyz"}.toString(); // [object Object] 

// JustString() (useful for logging)
s = YgEs.JustString(null); // null 
s = YgEs.JustString(undefined); // undefined 
s = YgEs.JustString({a:-1,b:"xyz"}); // {"a":-1,"b":xyz} 
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
s = YgEs.Inspect(Infinity); // Infinity
s = YgEs.Inspect(NaN); // NaN
s = YgEs.Inspect(undefined); // undefined 
s = YgEs.Inspect([undefined]); // [undefined] 
```

-----
# Class Reference

@sa @ref pg_class_common
