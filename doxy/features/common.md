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
## Booleanize

fix to bool.  

```
f = YgEs.Booleanize(0); // false
f = YgEs.Booleanize(1); // true
f = YgEs.Booleanize(""); // false
f = YgEs.Booleanize("0"); // true
f = YgEs.Booleanize(".00"); // true
f = YgEs.Booleanize("A"); // true
f = YgEs.Booleanize(false); // false
f = YgEs.Booleanize("false"); // true
f = YgEs.Booleanize("FaLsE"); // true
f = YgEs.Booleanize(null); // false
f = YgEs.Booleanize("null"); // true
f = YgEs.Booleanize(undefined); // false
f = YgEs.Booleanize("undefined"); // true
f = YgEs.Booleanize([]); // true
f = YgEs.Booleanize({}); // true
f = YgEs.Booleanize(NaN); // true
f = YgEs.Booleanize("NaN"); // true
```

### Unstring Booleanize

include stringified values.  

```
f = YgEs.Booleanize("0",true); // false
f = YgEs.Booleanize(".00",true); // false
f = YgEs.Booleanize("false",true); // false
f = YgEs.Booleanize("FaLsE",true); // false
f = YgEs.Booleanize("null",true); // false
f = YgEs.Booleanize("undefined",true); // false
```

-----
## Trinarize

fix to bool or null.  

```
f = YgEs.Trinarize(0); // false
f = YgEs.Trinarize(1); // true
f = YgEs.Trinarize(""); // false
f = YgEs.Trinarize("0"); // true
f = YgEs.Trinarize(".00"); // true
f = YgEs.Trinarize("A"); // true
f = YgEs.Trinarize(false); // false
f = YgEs.Trinarize("false"); // true
f = YgEs.Trinarize("FaLsE"); // true
f = YgEs.Trinarize(null); // null
f = YgEs.Trinarize("null"); // true
f = YgEs.Trinarize(undefined); // null
f = YgEs.Trinarize("undefined"); // true
f = YgEs.Trinarize([]); // true
f = YgEs.Trinarize({}); // true
f = YgEs.Trinarize(NaN); // true
f = YgEs.Trinarize("NaN"); // true
```

### Unstring Booleanize

include stringified values.  

```
f = YgEs.Trinarize("0",true); // false
f = YgEs.Trinarize(".00",true); // false
f = YgEs.Trinarize("false",true); // false
f = YgEs.Trinarize("FaLsE",true); // false
f = YgEs.Trinarize("null",null); // false
f = YgEs.Trinarize("undefined",null); // false
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
## Local Saver

(web only)  
save a content to local file.  

```
var cfg={Test:-1}
YgEs.LocalSave(JSON.stringify(cfg),'config.json','application/json');
```

-----
## Local Loader

(web only)  
load a content from local file.  

```
YgEs.LocalLoad(true,'.json',(data)=>{
	try{
		console.dir(JSON.parse(data));
	}
	catch(err){
		console.error(err);
	}
},(err)=>{
	console.error(err);
},()=>{
	// on canceled 
});
```

-----
## Quick Downloader

(web only)  
```
let modules=YgEs.ToQHT(document.getElementById('modules'));
YgEs.InitFrontend(modules);
YgEs.LoadJSON('https://example.com/test.json','TestJSON');
await YgEs.LoadSync().ToPromise();

console.dir(YgEs.Peek('TestJSON'));
```

-----
# Class Reference

@sa @ref pg_class_common
