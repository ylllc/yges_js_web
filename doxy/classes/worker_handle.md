@page pg_class_worker_handle WorkerHandle

# What's It?

@sa @ref pg_feat_worker @n


# Methods

## getWorker():Worker

### Returns

target Worker  

## getLauncher():Launcher

### Returns

procedures running on target Worker  

## getHappeningManager():HappeningManager

### Returns

happenings reported in target Worker

## getDependencies():dict<string,WorkerHandle>

### Returns

dependencies of target Worker

## getState():string

### Returns

current state  

## isBusy():bool

### Returns

Value | Means
----- | -----
true | in running
false | not runnning

## isOpen():bool

### Returns

Value | Means
----- | -----
true | opened from a handle
false | closed from all handles

## isReady():bool

### Returns

Value | Means
----- | -----
true | opened and completely up
false | in down or not running

## isHalt():bool

### Returns

Value | Means
----- | -----
true | ready but not polling
false | otherwise

## restart()

do DOWN and UP in this Worker  

## fetch():WorkerHandle

### Returns

create a new WorkerHandle.  

## open()

open this handle.  

## close()

close this handle.  
