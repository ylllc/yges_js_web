@page pg_class_agent_handle AgentHandle

# What's It?

@sa @ref pg_feat_agent @n

-----
# Methods

-----
## getAgent():Agent

### Returns

target Agent  

-----
## getLauncher():Launcher

### Returns

procedures running on target Agent  

-----
## getHappeningManager():HappeningManager

### Returns

happenings reported in target Agent

-----
## getDependencies():dict<string,AgentHandle>

### Returns

dependencies of target Agent

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
## restart()

do DOWN and UP in this Agent  

-----
## fetch():AgentHandle

### Returns

create a new AgentHandle.  

-----
## open()

open this handle.  

-----
## close()

close this handle.  
