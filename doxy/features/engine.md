@page pg_feat_engine Async Engine

# What's It?

it provides async procedure management.  

## Every async procedures launch them on the Engine.

each procedures controlled by the Engine.  
can see their life, can abort them.  

## Limit parallel running.

in JavaScript, running in a big loop that has async,  
means run parallel all them, e.g. 10000 HTTP requests.  
the Engine can limit and run little by little.  

## Can exit at your wish

Node.js often become a zombie.  
you wish to exit, but something lives...  
the Engine can shutdown with all internal procedures, and can exit.  


# Import

## for web

(todo)  

## for Node/Deno

```
import Engine from 'api/engine.js';
```
importing name can redefine in your wish.  


# How to Use

## Start the Engine  

```
Engine.start();
```

## Launch

```
var proc=Engine.launch({
	user:{
		// initial variables 
		name:'async sample',
	},
	cb_init:(user)=>{
		// called first at works
		user.lock=true;
	},
	cb_poll:(user)=>{
		// polling while returns true
		return user.lock;
	},
	cb_done:(user)=>{
		// called on done 
		log.info(user.name+' is done');
	},
	cb_abort:(user)=>{
		// called on abort 
		log.warn(user.name+' is aborted');
	}
});
		:

// to end the proc 
proc.User.lock=false;
```

## Sub-launcher

```
var sub=Engine.createLauncher({
	// limit parallel running 
	// more procedures are held until end of running procedures 
	limit:5,
});

// can launch too 
sub.launch(...);

		:

// wait for end of procedures in sub 
sub.sync((user)=>{
	// sub is abandoned 
	sub.abandon();
});
```

## Instant delay

it's useful everywhere.

```
var proc=Engine.delay(1000,(user)=>{
	// run after 1 sec 
},(user)=>{
	// on abort delayig 
});

		:

// can abort delaying 
proc.abort();
```

## Shutdown

```
Engine.shutdown();
```

all procedures in the Engine are aborted.  
and can exit.  


# Class Reference

@sa @ref pg_class_engine @n
	@ref pg_class_launcher @n
	@ref pg_class_procedure @n
