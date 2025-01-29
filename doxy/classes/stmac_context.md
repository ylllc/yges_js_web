@page pg_class_stmac_context StateMachineContext

# What's It?

created by @ref pg_class_stmac_container

-----
# Structures

-----
## StateMachineInfo {#StMac_StateMachineInfo}

| Name | Type | Means |
|------|------|-------|
| Name | string | instance name |
| CrashSite | string | error at (or normally) |
| Prev | string | previous state |
| Cur | string | current state |
| Next | string | next state |
| User | dict<string,any> | user definition |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | @ref StMac_UserShared | user definitions and kept in this context |

-----
# Methods

-----
## GetPrevState() {#StMac_GetPrevState}

### Spec

GetPrevState():string?

### Returns

previous state

-----
## GetCurState() {#StMac_GetCurState}

### Spec

GetCurState():string?

### Returns

current state

-----
## GetNextState() {#StMac_GetNextState}

### Spec

GetNextState():string?

### Returns

next state

-----
## GetInfo() {#StMac_GetInfo}

### Spec

GetInfo():@ref StMac_StateMachineInfo

### Returns

statemachine info.  

-----
## GetHappeningManager() {#StMac_GetHappeningManager}

### Spec

GetHappeningManager():@ref pg_class_happening_manager

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
