@page pg_class_launcher Launcher

# What's It?

@sa @ref pg_feat_engine

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Engine | global launcher |

-----
# Types

-----
## UserShared

user definied object kept on a @ref pg_class_procedure instance  

-----
## LauncherPrm

| Name | Type | Means |
|------|------|-------|
| name | string? | user class name |
| happen | HappeningManager? | user happening handler |
| limit | int | parallel running capacity |
| cycle | int | polling cycle msec |
| user | UserShared | user definitions |

-----
## ProcedurePrm

| Name | Type | Means |
|------|------|-------|
| name | string? | class name |
| happen | HappeningManager? | user happening handler |
| user | UserShared | user definitions |
| cb_start | func<UserShared> | called on beginning of the procedure |
| cb_poll | func<UserShared> | called repetition until end of the procedure |
| cb_done | func<UserShared> | called on finished of the procedure |
| cb_abort | func<UserShared> | called on aborted of the procedure |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| HappenTo | HappeningManager | happenings managed on |
| Limit | int | parallel running capacity |
| Cycle | int | polling cycle msec |
| User | object | user definitions |

-----
# Methods

-----
## isEnd():bool

### Returns

no procedure in this launcher.

-----
## isAbandoned():bool

### Returns

this launcher is abandoned.

-----
## countActive():int

### Returns

running procedures in this launcher.

-----
## countHeld():int

### Returns

unstarted procedures in this launcher.

-----
## abandon()

this launcher is no longer launch procedures.

-----
## createLauncher(prm={}):Launcher

### Args

Name | Type | Means
-----|------|------
prm | LauncherPrm | settings

### Returns

sub-launcher

-----
## launch(prm={}):Procedure

### Args

Name | Type | Means
-----|------|------
prm | ProcedurePrm | settings

### Returns

procedure instance

-----
## abort()

abort all procedures in this

-----
## poll()

poll a individual launcher.  
usually called from the Engine.  
and not necessary to call manually.  

-----
## sync(cb_sync,interval=null)

wait for end of all procedures in this launcher and call cb_sync

### Args

| Name | Type | Means |
|------|------|-------|
| cb_sync | func<UserShared> | called on end of sync |
| interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE) |

-----
## toPromise(breakable,interval=null):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| breakable | bool | Promise fullfiled from abort |
| interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE) |

### Returns

a Promise include caling sync()

-----
## delay(time,cb_done,cb_abort=null) 

| Name | Type | Means |
|------|------|-------|
| time | int | wait msec |
| cb_done | func<UserShared> | called on finished from delaying |
| cb_abort | func<UserShared> | called on aborted from delaying (null=same to cb_done) |
