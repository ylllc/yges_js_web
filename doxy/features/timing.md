@page pg_feat_timing Basic Timing Features

# What's It?

it provides basic timing controlling functions.  

# Import

## for web

(todo)  

## for Node/Deno

```
import Timing from 'api/timing.js';
```
importing name can redefine in your wish.  

# How to Use

## Delay

```
Timing.delay(500,()=>{
	// run after about 500ms 
});
```

and can cancel easily.  

```
var cancel=Timing.delay(10000,()=>{
	// not run by cancel 
});
Timing.delay(800,()=>{
	cancel();
});
```

## Polling

```
var cancel=Timing.poll(100,()=>{
	// run repeatedly every about 100ms 
});

	:

// stop polling 
cancel();
```

## Synchronization

```
var cancel=Timing.sync(50,()=>{
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

# Class Reference

@sa @ref pg_class_timing @n
