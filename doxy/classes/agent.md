﻿@page pg_class_agent Agent

# What's It?

created by @ref pg_class_agent_manager

-----
# Callbacks

-----
## CB_Wait {#Agent_CB_Wait}

check condition in your procedure

### Spec

CB_Wait():bool

### Returns

| Value | Means |
|-------|-------|
| true | done |
| false | not yet |

-----
# Methods

-----
## GetState {#Agent_GetState}

### Spec

GetState():string

### Returns

current state  

-----
## IsBusy {#Agent_IsBusy}

### Spec

IsBusy():bool

### Returns

| Value | Means |
|-------|-------|
| true | in running |
| false | not runnning |

-----
## IsOpen {#Agent_IsOpen}

### Spec

IsOpen():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened from a handle |
| false | closed from all handles |

-----
## IsReady {#Agent_IsReady}

### Spec

IsReady():bool

### Returns

| Value | Means |
|-------|-------|
| true | opened and completely up |
| false | in down or not running |

-----
## IsHalt {#Agent_IsHalt}

### Spec

IsHalt():bool

### Returns

| Value | Means |
|-------|-------|
| true | ready but not polling |
| false | otherwise |

-----
## GetLauncher {#Agent_GetLauncher}

### Spec

GetLauncher():@ref pg_class_launcher

### Returns

procedures running on it  

-----
## GetHappeningManager {#Agent_GetHappeningManager}

### Spec

GetHappeningManager():@ref pg_class_happening_manager

### Returns

happenings reported in it

-----
## GetDependencies {#Agent_GetDependencies}

### Spec

GetDependencies():dict<string,@ref pg_class_agent_handle>

### Returns

dependencies of this Agent

-----
## WaitFor {#Agent_WaitFor}

### Spec

WaitFor(cb_wait)

in UP,DOWN and REPAIR.  
add required condition to complete its phase.  

### Args

| Name | Type | Means |
|------|------|-------|
| cb_wait | @ref Agent_CB_Wait | condition checking |

-----
## Restart {#Agent_Restart}

### Spec

Restart():void

do DOWN and UP in this Agent  

-----
## Fetch {#Agent_Fetch}

### Spec

Fetch():@ref pg_class_agent_handle

### Returns

create a new AgentHandle.  

-----
## Open {#Agent_Open}

### Spec

Open():@ref pg_class_agent_handle

### Returns

create a new AgentHandle and open it.  
