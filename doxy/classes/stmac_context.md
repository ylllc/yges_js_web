@page pg_class_stmac_control StateMachineContext

# What's It?

created by @ref pg_class_stmac_container

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions (on this context, not shared to states User) |

-----
# Methods

-----
## GetPrevState {#StMac_GetPrevState}

### Spec

GetPrevState():string?

### Returns

previous state

-----
## GetCurState {#StMac_GetCurState}

### Spec

GetCurState():string?

### Returns

current state

-----
## GetNextState {#StMac_GetNextState}

### Spec

GetNextState():string?

### Returns

next state

-----
## GetHappeningManager {#StMac_GetHappeningManager}

### Spec

GetHappeningManager():HappeningManager

### Returns

target HappeningManager of this states 

-----
# Inherited

some methods are inherited from @ref pg_class_procedure  

- IsStarted()
- IsFinished()
- IsAborted()
- IsEnd()
- Abort()
- Sync()
- ToPromise()
