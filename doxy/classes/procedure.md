@page pg_class_procedure Procedure

# What's It?

@sa @ref pg_feat_engine


# Properties

Name | Type | Means
-----|------|------
HappenTo | HappeningManager? | user happening handler
User | object | user definitions


# Methods

## isStarted():bool

### Returns

this procedure is started

## isFinished():bool

### Returns

this procedure is finished

## isAborted():bool

### Returns

this procedure is aborted

## isEnd():bool

### Returns

this procedure is ended (fiinshed or aborted)

## abort()

abort this procedure

## poll()

poll a individual procedure.  
usually called from the Engine.  
and not necessary to call manually.  

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
user | object | ref Procedure.User

## toPromise(breakable,interval=null):Promise

### Args

Name | Type | Means
-----|------|------
breakable | bool | Promise fullfiled from abort
interval | int? | poll interval msec (null=DEFAULT_SYNC_CYCLE)

### Returns

a Promise include caling sync()
