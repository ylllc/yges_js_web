@page pg_feat_agent Agent

# What's It?

it provides statable async procs.  

-----
## Handle

a Agent controlled by Handle.  

-----
### Open/Close

@startuml "Agent Open/Close"

Handle -> Agent: open
Agent -> Agent: up
activate Agent


Handle -> Agent: close
deactivate Agent
Agent -> Agent: down

@enduml

-----
### Shared Agent by Some Handles

Agent kept by any 1 handle.  
and close all handles to doen.  

@startuml "Shared Agent Open/Close"

Handle1 -> Agent: open
Agent -> Agent: up
activate Agent

Handle2 -> Agent: open

Handle1 -> Agent: close

Handle2 -> Agent: close
deactivate Agent
Agent -> Agent: down

@enduml

-----
### Dependencies

Agent can include other Handles for dependencies.  
dependencies are opened automatically at the Agent begins.  
and closed automatically at the Agent stop.  

at the Agent ready, dependencies are ready too.  
but at the Agent finished, dependencies may still working.  

the Agent can add extra waiting functions from cb_open, cb_close and cb_repair.  
imprement them as required.  

@startuml "Shared Agent Open/Close"

Handle -> Agent: open
Agent -> Dependencies: open
Agent -> Agent: up
Dependencies -> Dependencies: up
activate Dependencies
activate Agent

Handle -> Agent: close
deactivate Agent
Agent -> Dependencies: close
Agent -> Agent: down
note over Dependencies
	but may still working
	by other handles
end note

@enduml

-----
## States

Agent has a statemachine.  

@startuml "Agent States"

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

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/agent.js"></script>
```
use YgEs.AgentManager

## for Node/Deno

```
import AgentManager from 'api/agent.js';
```
importing name can redefine in your wish.  
and can use YgEs.AgentManager too.  

-----
# How to Use

-----
## Imprements

```
var agent=AgentManager.StandBy({
	name:'MyAgent',
	HappenTo:YourHappeningManager,
	User:{YourStructure},
	dependencles:[AutoOpenHandles],

	cb_open:(agent)=>{/* startup and */ return true;},
	cb_repair:(agent)=>{/* start repairing and */return true;},
	cb_abort:(agent)=>{/* aborted */},
	cb_finish:(agent,clean)=>{/* end of procedure */},

	cb_poll_healthy:(agent)=>{},
	cb_poll_trouble:(agent)=>{},
});

```

-----
## Handle

```
// fetch&open 
var h1=agent.Fetch();
h1.Open();

// auto open 
var h2=agent.Open();

	:

// close 
h1.Close();
// still work by h2 
h2.Close();
// truly closed 

```

-----
## Dependencies

Agent has dependency handles.  
its opened on the Agent opening.  
and closed on the Agent closing.  
to the Agent is ready, dependencies are required in ready.  

```
var agent1=AgentManager.StandBy({

	:

});

var agent2=AgentManager.StandBy({
	dependencies:{w1:agent1.Fetch()},

	:

});

// open agent2. and its dependencies open too. 
var h2=agent2.Open();

// close h2. and its dependencies close too.  
h2.Close();

```

-----
## Rapiring

to open a agent, requires all Happenings are resolved.  

```
var agent=AgentManager.StandBy({

	cb_repair:(agent)=>{

		// instant resolving as possible 
		for(var hap of agent.GetHappeningManager()){
			:
		}

		// need time to resolve, add conditions. 
		agent.WaitFor(()=>{/* return true after resolved */});
	},

});

```

-----
## Recover from Trouble

happens in working, polling switched to poll_trouble.  
resolve them to recover it.  

```
var agent=AgentManager.StandBy({

	poll_trouble:(agent)=>{

		// as possible, resolve them 
		for(var hap of agent.GetHappeningManager()){
			:
		}
	},
});
```

-----
## Recover from Halt

happens in poll_trouble(), its Agent is halt and stop polling.  
to recover it, need resolving from other procedure.  

```
var agent1=AgentManager.StandBy({

		:
	// in HALT
		:

});

var agent2=AgentManager.StandBy({

	cb_poll_healthy:(agent)=>{

		// rescue Agent1 
		for(var hap of agent1.GetHappeningManager()){
			:
		}
	},
});


```

-----
# Class Reference

@sa @ref pg_class_agent @n
	@ref pg_class_agent_manager @n
	@ref pg_class_agent_handle @n
