@page pg_feat_gui GUI Helper

# What's It?

imprement GUI parts easily.  

-----
# Import

## for web (only)

```
<script src="yges/ipl.js"></script>
<script src="yges/gui.js"></script>
```
use YgEs

## for Node/Deno

(not supported)

-----
# How to Use

-----
## Select Box

```
YgEs.GUI.Select(TargetQHT,{
	Init:2, // initial selection 
	Items:[
		0,1,2,3,4,5, // simple selections 
		{Value:999999,Label:'mode...'}, // selection with props 
	],
	OnChanging:(prev,next)=>{
		// call by selection changing 
		// return true to allow 
		return true;
	},
});

```

-----
# Class Reference

@sa @ref pg_class_gui @n
