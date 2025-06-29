@page pg_class_agent Agent.Worker

# What's It?

created by @ref pg_class_agent_manager  
it inherited from @ref pg_class_softclass  

-----
# Structures

-----
## AgentInfo {#Agent_AgentInfo}

| Name | Type | Means |
|------|------|-------|
| Name | string | instance name |
| CrashSite | string | error at (or normally) |
| State | string | running state |
| Busy | bool | in running |
| Ready | bool | setup completed |
| Halt | bool | not poll by overbroken |
| Aborted | bool | cancelled from external order |
| Waiting | bool | prepareing in up or down |
| User | struct | user definition |
| Happening | @ref Happening_HappeningInfo | happening manager info |
| Launcher | @ref Launcher_LauncherInfo | launcher info |

-----
# Callbacks

-----
## CB_Wait {#Agent_CB_Wait}

check condition in your procedure

### Spec

CB_Wait(prop):bool

### Args

| Name | Type | Means |
|------|------|-------|
| prop | struct | user properties from @ref Agent_WaitFor |

### Returns

| Value | Means |
|-------|-------|
| true | done |
| false | not yet |

-----
# Methods

-----
## GetState() {#Agent_GetState}

### Spec

GetState():string

### Returns

current state  

-----
## GetInfo() {#Agent_GetInfo}

### Spec

GetInfo():@ref Agent_AgentInfo

### Returns

agent info.  

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
## GetLogger() {#Agent_GetLogger}

### Spec

GetLogger():@ref pg_class_logger

### Returns

logs to it

-----
## GetLauncher() {#Agent_GetLauncher}

### Spec

GetLauncher():@ref pg_class_launcher

### Returns

procedures running on it  

-----
## GetHappeningManager() {#Agent_GetHappeningManager}

### Spec

GetHappeningManager():@ref pg_class_happening_manager

### Returns

happenings reported in it

-----
## GetDependencies() {#Agent_GetDependencies}

### Spec

GetDependencies():dict<string,@ref pg_class_agent_handle>

### Returns

dependencies of this Agent

-----
## WaitFor() {#Agent_WaitFor}

### Spec

WaitFor(label,cb_wait,prop={})

in UP,DOWN and REPAIR.  
add required condition to complete its phase.  

### Args

| Name | Type | Means |
|------|------|-------|
| label | string | for info |
| cb_wait | @ref Agent_CB_Wait | condition checking |
| prop | struct | for info, can access from cb_wait |

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

Open():@ref pg_class_agent_handle

### Returns

create a new AgentHandle and open it.  
