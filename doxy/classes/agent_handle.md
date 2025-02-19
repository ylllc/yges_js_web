@page pg_class_agent_handle Agent.Handle

# What's It?

created by @ref pg_class_agent

-----
# Methods

-----
## GetAgent() {#AgentHandle_GetAgent}

### Spec

GetAgent():@ref pg_class_agent

### Returns

target Agent  

-----
## GetLogger() {#AgentHandle_GetLogger}

### Spec

GetLogger():@ref pg_class_logger

### Returns

logs to it

-----
## GetLauncher() {#AgentHandle_GetLauncher}

### Spec

GetLauncher():@ref pg_class_launcher

### Returns

procedures running on target Agent  

-----
## GetHappeningManager() {#AgentHandle_GetHappeningManager}

### Spec

GetHappeningManager():@ref pg_class_happening_manager

### Returns

happenings reported in target Agent

-----
## GetDependencies() {#AgentHandle_GetDependencies}

### Spec

GetDependencies():dict<string,@ref pg_class_agent_handle>

### Returns

dependencies of target Agent

-----
## GetState() {#AgentHandle_GetState}

GetState():string

### Returns

current state  

-----
## IsBusy() {#AgentHandle_IsBusy}

### Spec

IsBusy():bool

### Returns

| Value | Means |
|-------|-------|
| true | in running |
| false | not runnning |

-----
## IsOpen() {#AgentHandle_IsOpen}

### Spec

IsOpen():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened from a handle |
| false | closed from all handles |

-----
## IsReady() {#AgentHandle_IsReady}

### Spec

IsReady():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened and completely up |
| false | in down or not running |

-----
## IsHalt() {#AgentHandle_IsHalt}

### Spec

IsHalt():bool

### Returns

| Value | Means |
|-------|-------|
| true | ready but not polling |
| false | otherwise |

-----
## Restart() {#AgentHandle_Restart}

### Spec

Restart():void

do DOWN and UP in this Agent  

-----
## Fetch() {#AgentHandle_Fetch}

### Spec

Fetch():@ref pg_class_agent_handle

### Returns

create a new AgentHandle.  

-----
## Open() {#AgentHandle_Open}

### Spec

Open():void

open this handle.  

-----
## Close() {#AgentHandle_Close}

### Spec

Close():void

close this handle.  
