@page pg_feat_dir Directory Control

# What's It?

Controlling file system directories.  

-----
# Import

## for web

(not supported)

## for Node/Deno

```
import Dir from 'api/dir.js';
```
importing name can redefine in your wish.  
and can use YgEs.Dir insted of.  

-----
# How to Use

-----
## Directory control instance

```
// base directory from CWD 
let basedir=Dir.Target('.',false);
// prepare tmp directory on base 
let tmpdir=basedir.SubDir('tmp',true);
```

-----
## Prepareing

```
let h=tmpdir.Open();
YgEs.Timing.Sync(100,()=>{
	// wait for tmpdir is ready 
	return h.IsReady();
},()=>{
	// tmpdir is ready 
},()=>{
	// prepareing aborted 
});


```

-----
## Closing

```
// close it 
h.Close();
YgEs.Timing.Sync(100,()=>{
	// wait for tmpdir is close completely 
	return !h.IsBusy();
},()=>{
	// tmpdir is close 
},()=>{
	// closing aborted 
});

```

-----
# Class Reference

@sa @ref pg_class_dir_control @n
	@ref pg_class_dir_target @n
