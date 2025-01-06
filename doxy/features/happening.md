@page pg_feat_happening Happening Manager

# What's It?

it provides runtime error management, so rational.  

-----
## Exception? don't.

@startuml "Throwing Exception means abandon all"
Process --> Feature: suspect calling

note over Feature
something happened
endnote

Process <-- Feature: an Exception thrown

note over Process
abend
endnote

@enduml

@startuml "Don't catch for force recovering"
Process --> Feature: suspect calling

note over Feature
something happened
endnote

Process <-- Feature: an Exception thrown

note over Process
catch and force recovering
endnote

note over Feature
broken
endnote

Process --> Feature: correct calling

note over Feature
buggy procedure
endnote
@enduml

-----
## Manage all them

@startuml "All Happening Managed by HappeningManager"
Process --> Feature: suspect calling

note over Feature
something happened
endnote

HappeningManager <-- Feature: happen
Process <-- HappeningManager: notify

note over Process
decision by user's wish
endnote

Process --> Feature: resolve

note over Feature
cleaned up
endnote

Process --> Feature: correct calling

note over Feature
correct procedure
endnote
@enduml

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs.HappeningManager

## for Node/Deno

```
import HappeningManager from 'api/happening.js';
```
importing name can redefine in your wish.  
and can use YgEs.HappeningManager too.  

-----
# How to Use

-----
## Listen them

```
// can override common happening management procedure 
HappeningManager.Happened=(h)=>{
	//		: 
	// instant recovery when possible
	// and call h.resolve()
	//		: 
}
```

-----
## Feature side happening and suggestion

```
var h=HappeningManager.happenProp({type:'Test',msg:'Happened'},{
	// user resolving protocol 
	User:{
		retry:()=>{
			// retry procedure 
			//		:
			h.resolve();
		},
		ignore:()=>{
			// ignore procedure 
			//		:
			h.abandon();
		},
	},
	Resolved:()=>{
		// called on resolved 
	},
	Abandoned:()=>{
		// called on abandoned 
	},
});
```

-----
## Polling unresolved

```
HappeningManager.poll((h)=>{
	//		: 
	// user procedure by decision
	//		: 
});
```

-----
## Local Happenning Manager

can create local instance and categorize in your wish.

```
var lhap=HappeningManager.createLocal();
```

-----
## Cleaning up

Resolved instance still kept in HappeningManager and makes it dirty.  
HappeningManager.cleanup() removes resolved and abandoned instances
and makes it clean.  


-----
## Resolved vs Abandoned 

Resolved give priority over Abandoned.  
Resolved instance cannot abandon.  
and Abandoned instance still can resolve and retract abandoned.  


-----
# Class Reference

@sa @ref pg_class_happening @n
	@ref pg_class_happening_manager
