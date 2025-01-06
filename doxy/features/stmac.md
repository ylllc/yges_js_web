@page pg_feat_stmac State Machine

# What's It?

it provides transitionning by between states.   

-----
## Simple Transition

each states have 3 internal states for initializing and finalizing.  
usually, normal procedures impremented in Keep.  
and make transition from Keep to an other state.  

@startuml "Simple Transition"

state State1{
	state "Up" as State1Up: initialize the state
	state "Keep" as State1Keep: the state is ready
	state "Down" as State1Down: finalize the state before transitionning
}

state State2{
	state "Up" as State2Up: initialize the state before polling
	state "Keep" as State2Keep
	state "Down" as State2Down: finalize the state
}

[*] --> State1Up
State1Up --> State1Keep
State1Keep --> State1Down
State1Down --> State2Up
State2Up --> State2Keep
State2Keep --> State2Down
State2Down --> [*]

State1Keep -[dotted]-> State2: transition order
State2Keep -[dotted]-> [*]: completion order

@enduml

-----
## Branching

abnormally, can make transition from Up or Down.  
they mean cancel procedures and exit from the state.  

@startuml "Branching to More States"

state State1{
	state "Up" as State1Up: initialize the state
	state "Keep" as State1Keep: the state is ready
	state "Down" as State1Down: finalize the state before transitionning
}

state State2A
state State2B
state Abending
state Interruption

[*] --> State1Up
State1Up --> State1Keep
State1Keep --> State1Down
State1Down --> State2A
State1Down --> State2B
State1Up -[dashed]-> Abending: can abort initializing and transit to abending
State1Down -[dashed]-> Interruption: can abort finalizing and transit other state

State1Keep -[dotted]-> State2A: normal transition order
State1Keep -[dotted]-> State2B: normal transition order

@enduml

-----
## Callbacks

each states have some callbacks.  
cb_start, cb_ready, cb_stop, cb_end are called on switching polling phase.  
poll_up, poll_keep, poll_down are called from every the Engine polling.  
these are impremented in each states.  

cb_done, cb_abort are called on a procedure of statemachine is over.  
these are impremented in statemachine option.  

@startuml "Callbacks"

[*] --> cb_start
cb_start --> poll_up
poll_up --> poll_up: return undefined
poll_up --> cb_end: return next state\n (for interruption)
poll_up --> cb_ready: return true
poll_up --> cb_abort: retirn false\n (for abortion)
cb_ready --> poll_keep
poll_keep --> poll_keep: return undefined
poll_keep --> cb_stop: return next state
poll_keep --> cb_stop: return true\n (for normal end)
poll_keep --> cb_abort: retirn false\n (for abortion)
cb_stop --> poll_down
poll_down --> poll_down: return undefined
poll_down --> cb_end: return next state\n (for interruption)
poll_down --> cb_end: return true\n (for normal transition)
poll_down --> cb_abort: return false\n (for abortion)
cb_start <-- cb_end: switch to next state
cb_end --> cb_done: normal end
cb_end --> cb_abort: abortion
cb_done --> [*]
cb_abort --> [*]

@enduml

each polling callback returns to control it.  

| Value | Means |
|-------|-------|
| null or undefined | keep polling |
| true | step to next phase |
| false | abortion |
| string | switch to next state |

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs.StateMachine

## for Node/Deno

```
import StateMachine from 'api/stmac.js';
```
importing name can redefine in your wish.  
and can use YgEs.StateMachine too.  

-----
# How to Use

-----
## Imprements

```
var states={
	'StateName':{
		cb_start:(ctx,user)=>{
			// call on begin of this state
		},
		poll_up:(ctx,user)=>{
			// polling and return by result 
			// normally returns true 
			return true;
		},
		cb_ready:(ctx,user)=>{
			// call on end of up phase
		},
		poll_keep:(ctx,user)=>{
			// polling and return by result 
			// normally returns next state 
			return 'NextStateName';
		},
		cb_stop:(ctx,user)=>{
			// call on begin of down phase
		},
		poll_down:(ctx,user)=>{
			// polling and return by result 
			// normally returns true 
			return true;
		},
		cb_end:(ctx,user)=>{
			// call on end of this state
		},
	},
		:
}

```

-----
## Run States

```
// states running on the Engine 
Engine.start();

// run states from a state 
StateMachine.run('StateName',states);

// wait for end of procedures and stop the Engine 
Engine.sync((dmy)=>{
	Engine.stop();
});

```

-----
# Class Reference

@sa @ref pg_class_stmac_control @n
	@ref pg_class_stmac_container
