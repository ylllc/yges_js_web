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
OnStart, OnReady, OnStop, OnEnd are called on switching polling phase.  
OnPollInUp, OnPollInKeep, OnPollInDown are called from every the Engine polling.  
these are impremented in each states.  

OnDone, OnAbort are called on a procedure of statemachine is over.  
these are impremented in statemachine option.  

@startuml "Callbacks"

[*] --> OnStart
OnStart --> OnPollInUp
OnPollInUp --> OnPollInUp: return undefined
OnPollInUp --> OnEnd: return next state\n (for interruption)
OnPollInUp --> OnReady: return true
OnPollInUp --> OnAbort: retirn false\n (for abortion)
OnReady --> OnPollInKeep
OnPollInKeep --> OnPollInKeep: return undefined
OnPollInKeep --> OnStop: return next state
OnPollInKeep --> OnStop: return true\n (for normal end)
OnPollInKeep --> OnAbort: retirn false\n (for abortion)
OnStop --> OnPollInDown
OnPollInDown --> OnPollInDown: return undefined
OnPollInDown --> OnEnd: return next state\n (for interruption)
OnPollInDown --> OnEnd: return true\n (for normal transition)
OnPollInDown --> OnAbort: return false\n (for abortion)
OnStart <-- OnEnd: switch to next state
OnEnd --> OnDone: normal end
OnEnd --> OnAbort: abortion
OnDone --> [*]
OnAbort --> [*]

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
		OnStart:(ctx,proc)=>{
			// call on begin of this state
		},
		OnPollInUp:(ctx,proc)=>{
			// polling and return by result 
			// normally returns true 
			return true;
		},
		OnReady:(ctx,proc)=>{
			// call on end of up phase
		},
		OnPollInKeep:(ctx,proc)=>{
			// polling and return by result 
			// normally returns next state 
			return 'NextStateName';
		},
		OnStop:(ctx,proc)=>{
			// call on begin of down phase
		},
		OnPollInDown:(ctx,proc)=>{
			// polling and return by result 
			// normally returns true 
			return true;
		},
		OnEnd:(ctx,proc)=>{
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
Engine.Start();

// run states from a state 
StateMachine.Run('StateName',states);

// wait for end of procedures and stop the Engine 
Engine.Sync((dmy)=>{
	Engine.Stop();
});

```

-----
# Class Reference

@sa @ref pg_class_stmac_context @n
	@ref pg_class_stmac_container
