@page pg_class_agent_handle Agent.Handle

# What's It?

created by @ref pg_class_agent

-----
# Methods

-----
## GetAgent() {#Agent_GetAgent}

### Spec

GetAgent():@ref pg_class_agent

### Returns

target Agent  

-----
## GetLauncher() {#Agent_GetLauncher}

### Spec

GetLauncher():@ref pg_class_launcher

### Returns

procedures running on target Agent  

-----
## GetHappeningManager() {#Agent_GetHappeningManager}

### Spec

GetHappeningManager():@ref pg_class_happening_manager

### Returns

happenings reported in target Agent

-----
## GetDependencies() {#Agent_GetDependencies}

### Spec

GetDependencies():dict<string,@ref pg_class_agent_handle>

### Returns

dependencies of target Agent

-----
## GetState() {#Agent_GetState}

GetState():string

### Returns

current state  

-----
## IsBusy() {#Agent_IsBusy}

### Spec

IsBusy():bool

### Returns

| Value | Means |
|-------|-------|
| true | in running |
| false | not runnning |

-----
## IsOpen() {#Agent_IsOpen}

### Spec

IsOpen():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened from a handle |
| false | closed from all handles |

-----
## IsReady() {#Agent_IsReady}

### Spec

IsReady():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened and completely up |
| false | in down or not running |

-----
## IsHalt() {#Agent_IsHalt}

### Spec

IsHalt():bool

### Returns

| Value | Means |
|-------|-------|
| true | ready but not polling |
| false | otherwise |

-----
## Restart() {#Agent_Restart}

### Spec

Restart():void

do DOWN and UP in this Agent  

-----
## Fetch() {#Agent_Fetch}

### Spec

Fetch():@ref pg_class_agent_handle

### Returns

create a new AgentHandle.  

-----
## Open() {#Agent_Open}

### Spec

Open():void

open this handle.  

-----
## Close() {#Agent_Close}

### Spec

Close():void

close this handle.  
