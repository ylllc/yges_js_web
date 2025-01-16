﻿@page pg_class_launcher Launcher

# What's It?

created by @ref pg_class_engine

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
| HappenTo | HappeningManager? | user happening handler |
| Limit | int | parallel running capacity |
| Cycle | int | polling cycle msec |
| User | @ref Launcher_UserShared | user definitions |

-----
## ProcedurePrm {#Launcher_ProcedurePrm}

| Name | Type | Means |
|------|------|-------|
| Name | string? | class name |
| HappenTo | HappeningManager? | user happening handler |
| OnStart | func<@ref Launcher_UserShared> | called on beginning of the procedure |
| OnPoll | func<@ref Launcher_UserShared> | called repetition until end of the procedure |
| OnDone | func<@ref Launcher_UserShared> | called on finished of the procedure |
| OnAbort | func<@ref Launcher_UserShared> | called on aborted of the procedure |
| User | @ref Launcher_UserShared | user definitions |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| HappenTo | HappeningManager | happenings managed on |
| Limit | int | parallel running capacity |
| Cycle | int | polling cycle msec |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetInstanceID {#Log_GetInstanceID}

### Spec

GetInstanceID():int

### Returns

instance ID created by @ref Common_NextID

-----
## IsEnd {#Launcher_IsEnd}

### Spec

IsEnd():bool

### Returns

no procedure in this launcher.

-----
## IsAbandoned {#Launcher_IsAbandoned}

### Spec

IsAbandoned():bool

### Returns

this launcher is abandoned.

-----
## CountActive {#Launcher_CountActive}

### Spec

CountActive():int

### Returns

running procedures in this launcher.

-----
## CountHeld {#Launcher_CountActive}

### Spec

CountHeld():int

### Returns

unstarted procedures in this launcher.

-----
## Abandon {#Launcher_CountActive}

### Spec

Abandon():void

this launcher is no longer launch procedures.

-----
## CreateLauncher {#Launcher_CreateLauncher}

### Spec

CreateLauncher(prm={}):@ref pg_class_procedure

### Args

Name | Type | Means
-----|------|------
prm | @ref Launcher_LauncherPrm | settings

### Returns

sub-launcher

-----
## Launch {#Launcher_Launch}

### Spec

Launch(prm={}):@ref pg_class_procedure

### Args

Name | Type | Means
-----|------|------
prm | @ref Launcher_ProcedurePrm | settings

### Returns

procedure instance

-----
## Abort {#Launcher_Abort}

### Spec

Abort():void

abort all procedures in this

-----
## Poll {#Launcher_Abort}

### Spec

Poll():void

poll a individual launcher.  
usually called from the Engine.  
and not necessary to call manually.  

-----
## Sync {#Launcher_Sync}

### Spec

Sync(cb_sync,interval=null):void

wait for end of all procedures in this launcher and call cb_sync

### Args

| Name | Type | Means |
|------|------|-------|
| cb_sync | func<@ref Launcher_UserShared> | called on end of sync |
| interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE) |

-----
## ToPromise {#Launcher_ToPromise}

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
## Delay {#Launcher_Delay}

### Spec

Delay(time,cb_done,cb_abort=null) 

| Name | Type | Means |
|------|------|-------|
| time | int | wait msec |
| cb_done | func<@ref Launcher_UserShared> | called on finished from delaying |
| cb_abort | func<@ref Launcher_UserShared> | called on aborted from delaying (null=same to cb_done) |
