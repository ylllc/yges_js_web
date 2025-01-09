@page pg_feat_safeiter Safe Iterator

# What's It?

in JavaScript, local variables often broken by async loop.  
and forced tricky coding to avoid it.  

these are featureing to code plainly.  

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs.Util

## for Node/Deno

```
import Util from 'api/util.js';
```
importing name can redefine in your wish.  
and can use YgEs.Util too.  

-----
# How to Use

-----
## for stepping loop

```
// broken
for(var i=0;i<5;++i){
	setTimeout(()=>{
		log.Warn('bad loop: '+i);
	},100);
}

// corrected 
util.SafeStepIter(0,5,1,(i)=>{
	setTimeout(()=>{
		log.Info('safe loop: '+i);
	},100);
});
```

-----
## for array iteration

```
var a=[5,2.3,'x',5,-11]

// broken
for(var v of a){
	setTimeout(()=>{
		log.Warn('bad iteration: '+v);
	},100);
}

// corrected 
util.safearrayiter(a,(v)=>{
	setTimeout(()=>{
		log.Info('safe iteration: '+v);
	},100);
});
```

-----
## for object iteration

```
var b={'a':'B',4.4:-0.6,true:false}

// broken
for(var k in b){
	setTimeout(()=>{
		log.Info('bad iteration: '+k+':'+b[k]);
	},100);
});

// corrected 
util.safedictiter(b,(k,v)=>{
	setTimeout(()=>{
		log.Info('safe iteration: '+k+':'+v);
	},100);
});
```

-----
# Class Reference

@sa @ref pg_class_util
