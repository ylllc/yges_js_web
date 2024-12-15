@page pg_class_worker Worker

# What's It?

@sa @ref pg_feat_worker @n


# Methods

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

## getLauncher():Launcher

### Returns

procedures running on it  

## getHappeningManager():HappeningManager

### Returns

happenings reported in it

## getDependencies():dict<string,WorkerHandle>

### Returns

dependencies of this Worker

## waitFor(CBWait)

in UP,DOWN and REPAIR.  
add required condition to complete its phase.  

## Type: CBWait

### Returns

Value | Means
----- | -----
true | done
false | not yet

## restart()

do DOWN and UP in this Worker  

## fetch():WorkerHandle

### Returns

create a new WorkerHandle.  

## open():WorkerHandle

### Returns

create a new WorkerHandle and open it.  
