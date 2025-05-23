﻿@page pg_feat_engine Async Engine

# What's It?

it provides async procedure management.  

-----
## Every async procedures launch them on the Engine.

each procedures controlled by the Engine.  
can see their life, can abort them.  

-----
## Limit parallel running.

in JavaScript, running in a big loop that has async,  
means run parallel all them, e.g. 10000 HTTP requests.  
the Engine can limit and run little by little.  

-----
## Can exit at your wish

Node.js often become a zombie.  
you wish to exit, but something lives...  
the Engine can shutdown with all internal procedures, and can exit.  

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs.Engine

### Viewer

```
<script src="yges/happening_view.js"></script>
<script src="yges/engine_view.js"></script>
```
use YgEs.EngineView

-----
## for Node/Deno

```
import Engine from 'api/engine.js';
```
importing name can redefine in your wish.  
and can use YgEs.Engine too.  

-----
# How to Use

-----
## Start the Engine  

```
Engine.Start();
```

-----
## Launch

```
var proc=Engine.Launch({
	User:{
		// initial variables 
		name:'async sample',
	},
	OnInit:(proc)=>{
		// called first at works
		proc.User.lock=true;
	},
	OnPoll:(proc)=>{
		// polling while returns true
		return proc.User.lock;
	},
	OnDone:(proc)=>{
		// called on done 
		log.Info(proc.User.name+' is done');
	},
	OnAbort:(proc)=>{
		// called on abort 
		log.Warn(proc.User.name+' is aborted');
	}
});
		:

// to end the proc 
proc.User.lock=false;
```

-----
## Sub-launcher

```
var sub=Engine.CreateLauncher({
	// limit parallel running 
	// more procedures are held until end of running procedures 
	limit:5,
});

// can launch too 
sub.Launch(...);

		:

// wait for end of procedures in sub 
sub.Sync((user)=>{
	// sub is abandoned 
	sub.Abandon();
});
```

-----
## Instant delay

it's useful everywhere.

```
var proc=Engine.Delay(1000,(user)=>{
	// run after 1 sec 
},(user)=>{
	// on abort delayig 
});

		:

// can abort delaying 
proc.Abort();
```

-----
## Shutdown

```
Engine.ShutDown();
```

all procedures in the Engine are aborted.  
and can exit.  

-----
## Engine Viewer

(web only)
```
let board=YgEs.ToQHT(document.getElementById('board'));
let engview=YgEs.EngineView.SetUp(board);
```

-----
# Class Reference

@sa @ref pg_class_engine @n
	@ref pg_class_launcher @n
	@ref pg_class_procedure @n
	@ref pg_class_launcher_view @n
	@ref pg_class_procedure_view @n
	@ref pg_class_engine_view_container @n
