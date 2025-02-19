@page pg_class_procedure Procedure

# What's It?

created by @pg_class_launcher

-----
# Structures

-----
## ProcedureInfo {#Procedure_ProcedureInfo}

| Name | Type | Means |
|------|------|-------|
| InstanceID | int | instance ID |
| Name | string | instance name |
| CrashSite | string | error at (or normally) |
| Status | string | @ref Procedure_GetStatus returns |
| User | dict<string,any> | user definition |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| HappenTo | @ref pg_class_happening_manager? | user happening handler |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetInstanceID() {#Log_GetInstanceID}

### Spec

GetInstanceID():int

### Returns

instance ID created by @ref Common_NextID

-----
## IsStarted() {#Procedure_IsStarted}

### Spec

IsStarted():bool

### Returns

this procedure is started

-----
## IsFinished() {#Procedure_IsFinished}

### Spec

IsFinished():bool

### Returns

this procedure is finished

-----
## IsAborted() {#Procedure_IsAborted}

### Spec

IsAborted():bool

### Returns

this procedure is aborted

-----
## IsEnd() {#Procedure_IsEnd}

### Spec

IsEnd():bool

### Returns

this procedure is ended (fiinshed or aborted)

-----
## GetStatus() {#Procedure_GetStatus}

### Spec

GetStatus():string

### Returns

status of this instance  

| Value | Means |
|-------|-------|
| StandBy | not runs yet |
| Running | running |
| Aborted | cancel from external order |
| Finished | completed |

-----
## GetInfo() {#Procedure_GetInfo}

### Spec

GetInfo():@ref Procedure_ProcedureInfo

### Returns

procedure info.  

-----
## Abort() {#Procedure_IsEnd}

### Spec

Abort()

abort this procedure

-----
## Poll() {#Procedure_Poll}

### Spec

Poll()

poll a individual procedure.  
usually called from the Engine.  
and not necessary to call manually.  

-----
## Sync() {#Procedure_Sync}

### Spec

Sync(cb_sync,interval=null)

wait for end of procedure and call cb_sync

### Args

| Name | Type | Means |
|------|------|-------|
| cb_sync | func<UserShared> | called on end of sync |
| interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE) |

-----
## ToPromise() {#Procedure_ToPromise}

### Spec

ToPromise(breakable,interval=null):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| breakable | bool | Promise fullfiled from abort |
| interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE) |

### Returns

a Promise include caling Sync()
