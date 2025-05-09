@page pg_class_launcher Launcher

# What's It?

created by @ref pg_class_engine

-----
# Callbacks

-----
## CB_Event {#Launcher_CB_Event}

### Spec

CB_Event(launcher):void

### Args

| Name | Type | Means |
|------|------|-------|
| launcher | @ref pg_class_launcher | caller instance |

-----
# Structures

-----
## UserShared {#Launcher_UserShared}

user definied object kept in a @ref pg_class_procedure instance  

-----
## LauncherPrm {#Launcher_LauncherPrm}

| Name | Type | Means |
|------|------|-------|
| Name | string? | user class name |
| Log | @ref pg_class_logger? | logs to it |
| HappenTo | @ref pg_class_happening_manager? | user happening handler |
| Limit | int | parallel running capacity |
| Cycle | int | polling cycle msec |
| OnAbort | @ref Launcher_CB_Event | call on Launcher aborted |
| User | @ref Launcher_UserShared | user definitions |

-----
## LauncherInfo {#Launcher_LauncherInfo}

| Name | Type | Means |
|------|------|-------|
| InstanceID | int | instance ID |
| Name | string | instance name |
| CrashSite | string | error at (or normally) |
| Status | string | @ref Launcher_GetStatus returns |
| Limit | int | running procedures limit |
| Cycle | int | polling interval msec |
| User | dict<string,any> | user definition |
| Active | @ref Procedure_ProcedureInfo[] | running procedures |
| Held | @ref Procedure_ProcedureInfo[] | standby procedures |
| Sub | @ref Launcher_LauncherInfo[] | subinstances |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| HappenTo | @ref pg_class_happening_manager | happenings managed on |
| Limit | int | parallel running capacity |
| Cycle | int | polling cycle msec |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetInstanceID() {#Launcher_GetInstanceID}

### Spec

GetInstanceID():int

### Returns

instance ID created by @ref Common_NextID

-----
## GetActive() {#Launcher_GetActive}

access to running procedures

### Spec

GetActive():@ref pg_class_procedure[]

-----
## GetHeld() {#Launcher_GetHeld}

access to standby procedures

### Spec

GetHeld():@ref pg_class_procedure[]

-----
## GetSub() {#Launcher_GetSub}

access to sublauncheres

### Spec

GetSub():@ref pg_class_launcher[]

-----
## GetStatus() {#Launcher_GetStatus}

### Spec

GetStatus():string

### Returns

status of this instance  

| Value | Means |
|-------|-------|
| Ready | active |
| Aborted | @ref Launcher_Abort called |
| Abandoned | @ref Launcher_CountActive called |

-----
## GetInfo() {#Launcher_GetInfo}

### Spec

GetInfo():@ref Launcher_LauncherInfo

### Returns

launcher info.  

-----
## IsEnd(){#Launcher_IsEnd}

### Spec

IsEnd():bool

### Returns

no procedure in this launcher.

-----
## IsAbandoned() {#Launcher_IsAbandoned}

### Spec

IsAbandoned():bool

### Returns

this launcher is abandoned.

-----
## CountActive() {#Launcher_CountActive}

### Spec

CountActive():int

### Returns

running procedures in this launcher.

-----
## CountHeld() {#Launcher_CountActive}

### Spec

CountHeld():int

### Returns

unstarted procedures in this launcher.

-----
## Abandon() {#Launcher_CountActive}

### Spec

Abandon():void

this launcher is no longer launch procedures.

-----
## CreateLauncher() {#Launcher_CreateLauncher}

### Spec

CreateLauncher(prm={}):@ref pg_class_procedure

### Args

Name | Type | Means
-----|------|------
prm | @ref Launcher_LauncherPrm | settings

### Returns

sub-launcher

-----
## Launch() {#Launcher_Launch}

### Spec

Launch(prm={}):@ref pg_class_procedure

### Args

Name | Type | Means
-----|------|------
prm | @ref Procedure_ProcedurePrm | settings

### Returns

procedure instance

-----
## Abort() {#Launcher_Abort}

### Spec

Abort():void

abort all procedures in this

-----
## Poll() {#Launcher_Abort}

### Spec

Poll():void

poll a individual launcher.  
usually called from the Engine.  
and not necessary to call manually.  

-----
## Sync() {#Launcher_Sync}

### Spec

Sync(cb_sync,interval=null):void

wait for end of all procedures in this launcher and call cb_sync

### Args

| Name | Type | Means |
|------|------|-------|
| cb_sync | func<@ref Launcher_UserShared> | called on end of sync |
| interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE) |

-----
## ToPromise() {#Launcher_ToPromise}

### Spec

ToPromise(breakable,interval=null):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| breakable | bool | Promise fullfiled from abort |
| interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE) |

### Returns

a Promise include caling Sync()

-----
## Delay() {#Launcher_Delay}

### Spec

Delay(time,cb_done,cb_abort=null) 

| Name | Type | Means |
|------|------|-------|
| time | int | wait msec |
| cb_done | func<@ref Launcher_UserShared> | called on finished from delaying |
| cb_abort | func<@ref Launcher_UserShared> | called on aborted from delaying (null=same to cb_done) |
