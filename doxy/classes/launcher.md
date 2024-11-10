@page pg_class_launcher Launcher

# What's It?

@sa @ref pg_feat_engine


# Properties

Name | Type | Means
-----|------|------
HappenTo | HappeningManager? | user happening handler
Limit | int | parallel running capacity
Cycle | int | polling cycle msec
User | object | user definitions


# Methods

## isEnd():bool

### Returns

no procedure in this launcher.

## isAbandoned():bool

### Returns

this launcher is abandoned.

## countActive():int

### Returns

running procedures in this launcher.

## countHeld():int

### Returns

unstarted procedures in this launcher.

## abandon()

this launcher is no longer launch procedures.

## createLauncher(prm={}):Launcher

### Args

Name | Type | Means
-----|------|------
prm | LauncherPrm | settings

### Returns

sub-launcher

## Type: LauncherPrm

Name | Type | Means
-----|------|------
name | string? | class name
happen | HappeningManager? | user happening handler
limit | int | parallel running capacity
cycle | int | polling cycle msec
user | object | user definitions

## launch(prm={}):Procedure

### Args

Name | Type | Means
-----|------|------
prm | ProcedurePrm | settings

### Returns

procedure instance

## Type: ProcedurePrm

Name | Type | Means
-----|------|------
name | string? | class name
happen | HappeningManager? | user happening handler
user | object | user definitions
cb_start | function<ProcStart> | called on beginning of the procedure
cb_poll | function<ProcPoll> | called repetition until end of the procedure
cb_done | function<ProcEnd> | called on finished of the procedure
cb_abort | function<ProcEnd> | called on aborted of the procedure

## Type: function<ProcStart>(user)

### Args

Name | Type | Means
-----|------|------
prm | object | ref Launcher.User

## Type: function<ProcPoll>(user):boolean

### Args

Name | Type | Means
-----|------|------
prm | object | ref Launcher.User

### Returns

the procedure is continued.

## Type: function<ProcEnd>(user)

### Args

Name | Type | Means
-----|------|------
prm | object | ref Launcher.User

## abort()

abort all procedures in this

## poll()

poll a individual launcher.  
usually called from the Engine.  
and not necessary to call manually.  

## sync(cb_sync,interval=null)

wait for end of all procedures in this launcher and call cb_sync

### Args

Name | Type | Means
-----|------|------
cb_sync | function<SyncEnd> | called on end of sync
interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE)

## sync(cb_sync,interval=null)

wait for end of procedure and call cb_sync

### Args

Name | Type | Means
-----|------|------
cb_sync | function<SyncEnd> | called on end of sync
interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE)

## Type: function<SyncEnd>(user)

Name | Type | Means
-----|------|------
user | object | ref Launcher.User

## toPromise(breakable,interval=null):Promise

### Args

Name | Type | Means
-----|------|------
breakable | bool | Promise fullfiled from abort
interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE)

### Returns

a Promise include caling sync()

## delay(time,cb_done,cb_abort=null) 

Name | Type | Means
-----|------|------
time | int | wait msec
cb_done | function<SyncEnd> | called on finished from delaying
cb_abort | function<SyncEnd> | called on aborted from delaying (null=same to cb_done)
