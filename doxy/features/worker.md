@page pg_feat_worker Worker

# What's It?

it provides statable async procs.  

## Handle

a Worker controlled by Handle.  

### Open/Close

@startuml "Worker Open/Close"

Handle -> Worker: open
Worker -> Worker: up
activate Worker


Handle -> Worker: close
deactivate Worker
Worker -> Worker: down

@enduml


### Shared Worker by Some Handles

Worker kept by any 1 handle.  
and close all handles to doen.  

@startuml "Shared Worker Open/Close"

Handle1 -> Worker: open
Worker -> Worker: up
activate Worker

Handle2 -> Worker: open

Handle1 -> Worker: close

Handle2 -> Worker: close
deactivate Worker
Worker -> Worker: down

@enduml


### Dependencies

Worker can include other Handles for dependencies.  
dependencies are opened automatically at the Worker begins.  
and closed automatically at the Worker stop.  

at the Worker ready, dependencies are ready too.  
but at the Worker finished, dependencies may still working.  

the Worker can add extra waiting functions from cb_open, cb_close and cb_repair.  
imprement them as required.  

@startuml "Shared Worker Open/Close"

Handle -> Worker: open
Worker -> Dependencies: open
Worker -> Worker: up
Dependencies -> Dependencies: up
activate Dependencies
activate Worker

Handle -> Worker: close
deactivate Worker
Worker -> Dependencies: close
Worker -> Worker: down
note over Dependencies
	but may still working
	by other handles
end note

@enduml


## States

Worker has a statemachine.  

@startuml "Worker States"

state NotRunning{
	IDLE: new cleated
	IDLE: downed clearly

	BROKEN: cannot up
	BROKEN: dirty downed
}

state Working{
	HEALTHY: usual works

	TROUBLE: happen in works
}

REPAIR: cleanup broken
DOWN: close of works
UP: prepareing for usual works
HALT: locked down to avoid\n from more happenings

[*] --> IDLE : create

IDLE --> UP : open

BROKEN --> REPAIR : open
BROKEN <-- REPAIR : close

REPAIR --> UP : cleaned up

UP --> HEALTHY : ready

HEALTHY --> TROUBLE : happening
HEALTHY <-- TROUBLE : recover

TROUBLE --> HALT : more happening
HEALTHY <-- HALT : recover

DOWN <-- UP : close or failed
DOWN <-- Working : close
DOWN <-- HALT : close

IDLE <-- DOWN : clearly
BROKEN <-- DOWN : dirty

@enduml

# Import

## for web

(todo)  

## for Node/Deno

```
import WorkerContainer from 'api/worker.js';
```
importing name can redefine in your wish.  

# How to Use

## Imprements

```
var worker=WorkerContainer.standby({
	name:'MyWorker',
	HappenTo:YourHappeningManager,
	User:{YourStructure},
	dependencles:[AutoOpenHandles],

	cb_open:(worker)=>{/* startup and */ return true;},
	cb_repair:(worker)=>{/* start repairing and */return true;},
	cb_abort:(worker)=>{/* aborted */},
	cb_finish:(worker,clean)=>{/* end of procedure */},

	cb_poll_healthy:(worker)=>{},
	cb_poll_trouble:(worker)=>{},
});

```


## Handle

```
// fetch&open 
var h1=worker.fetch();
h1.open();

// auto open 
var h2=worker.open();

	:

// close 
h1.close();
// still work by h2 
h2.close();
// truly closed 

```

## Dependencies

Worker has dependency handles.  
its opened on the Worker opening.  
and closed on the Worker closing.  
to the Worker is ready, dependencies are required in ready.  

```
var worker1=WorkerContainer.standby({

	:

});

var worker2=WorkerContainer.standby({
	dependencies:{w1:worker1.fetch()},

	:

});

// open worker2. and its dependencies open too. 
var h2=worker2.open();

// close h2. and its dependencies close too.  
h2.close();

```

## Rapiring

to open a worker, requires all Happenings are resolved.  

```
var worker=WorkerContainer.standby({

	cb_repair:(worker)=>{

		// instant resolving as possible 
		for(var hap of worker.getHappeningManager()){
			:
		}

		// need time to resolve, add conditions. 
		worker.waitFor(()=>{/* return true after resolved */});
	},

});

```

## Recover from Trouble

happens in working, polling switched to poll_trouble.  
resolve them to recover it.  

```
var worker=WorkerContainer.standby({

	poll_trouble:(worker)=>{

		// as possible, resolve them 
		for(var hap of worker.getHappeningManager()){
			:
		}
	},
});
```

## Recover from Halt

happens in poll_trouble(), its Worker is halt and stop polling.  
to recover it, need resolving from other procedure.  

```
var worker1=WorkerContainer.standby({

		:
	// in HALT
		:

});

var worker2=WorkerContainer.standby({

	cb_poll_healthy:(worker)=>{

		// rescue Worker1 
		for(var hap of worker1.getHappeningManager()){
			:
		}
	},
});


```

# Class Reference

@sa @ref pg_class_worker @n
	@ref pg_class_worker_container @n
	@ref pg_class_worker_handle @n
