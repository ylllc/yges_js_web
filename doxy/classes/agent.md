@page pg_class_agent Agent

# What's It?

@sa @ref pg_feat_agent @n

-----
# Callbacks

-----
## CBWait

check condition in your procedure

### Returns

| Value | Means |
|-------|-------|
| true | done |
| false | not yet |

-----
# Methods

-----
## getState():string

### Returns

current state  

-----
## isBusy():bool

### Returns

| Value | Means |
|-------|-------|
| true | in running |
| false | not runnning |

-----
## isOpen():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened from a handle |
| false | closed from all handles |

-----
## isReady():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened and completely up |
| false | in down or not running |

-----
## isHalt():bool

### Returns

| Value | Means |
|-------|-------|
| true | ready but not polling |
| false | otherwise |

-----
## getLauncher():Launcher

### Returns

procedures running on it  

-----
## getHappeningManager():HappeningManager

### Returns

happenings reported in it

-----
## getDependencies():dict<string,AgentHandle>

### Returns

dependencies of this Agent

-----
## waitFor(cb_wait)

in UP,DOWN and REPAIR.  
add required condition to complete its phase.  

### Args

| Name | Type | Means |
|------|------|-------|
| cb_wait | CBWait | condition checking |

-----
## restart()

do DOWN and UP in this Agent  

-----
## fetch():AgentHandle

### Returns

create a new AgentHandle.  

-----
## open():AgentHandle

### Returns

create a new AgentHandle and open it.  
