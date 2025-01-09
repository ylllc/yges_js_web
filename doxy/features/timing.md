@page pg_feat_timing Basic Timing Features

# What's It?

it provides basic timing controlling functions.  

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs.Timing

## for Node/Deno

```
import Timing from 'api/timing.js';
```
importing name can redefine in your wish.  
and can use YgEs.Timing too.  

-----
# How to Use

-----
## Delay

```
Timing.Delay(500,()=>{
	// run after about 500ms 
});
```

and can cancel easily.  

```
var cancel=Timing.Delay(10000,()=>{
	// not run by cancel 
});
Timing.Delay(800,()=>{
	cancel();
});
```

-----
## Polling

```
var cancel=Timing.Poll(100,()=>{
	// run repeatedly every about 100ms 
});

	:

// stop polling 
cancel();
```

-----
## Synchronization

```
var cancel=Timing.Sync(50,()=>{
	// run repeatedly every about 50ms until is_done is true 
	return is_done;
},()=>{
	// call on sync done 
},()=>{
	// call on sync cancelled 
});

	:

// about synchronization  
cancel();
```

-----
# Class Reference

@sa @ref pg_class_timing @n
