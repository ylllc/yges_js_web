@page pg_class_agent_manager Agent.Manager

# What's It?

@sa @ref pg_feat_agent @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Agent | agent manager |

-----
# Structures

-----
## UserShared {#Agent_UserShared}

user defined object kept in an agent

-----
## Field {#Agent_Field}

| Name | Type | Means |
|------|------|-------|
| Name | string? | user class name |
| Log | @ref pg_class_logger? | logs to it |
| HappenTo | @ref pg_class_happening_manager? | happenings reported in it |
| Launcher | @ref pg_class_launcher? | procedures running on it |
| Dependencies | @ref pg_class_agent_handle[] | relaying open and close |
| AgentBypasses | string[] | auto imprement calling Agent function on Handle |
| UserBypasses | string[] | auto imprement calling User function on Handle |
| OnRepair | func<@ref pg_class_agent> | on open when broken, try cleaning up |
| OnOpen | func<@ref pg_class_agent> | on open from cleaned up |
| OnReady | func<@ref pg_class_agent> | on opening completed |
| OnPollInHealthy | func<@ref pg_class_agent> | in polling after ready in cleaned up |
| OnTrouble | func<@ref pg_class_agent> | happening from healthy |
| OnPollInTrouble | func<@ref pg_class_agent> | in polling after ready during happening |
| OnHalt | func<@ref pg_class_agent> | more happening from trouble |
| OnRecover | func<@ref pg_class_agent> | resolved all happenings in trouble,halt |
| OnClose | func<@ref pg_class_agent> | on close from ready |
| OnBack | func<@ref pg_class_agent> | on close from opening unsatisfactory |
| User | @ref Agent_UserShared? | share on created @ref pg_class_agent |

-----
# Methods

-----
## Standby() {#Agent_Standby}

### Spec

Standby(field):@ref pg_class_agent

create a new Agent.  

### Args

| Name | Type | Means |
|------|------|-------|
| field | @ref Agent_Field | field settings for an Agent |

### Returns

a new @ref pg_class_agent

-----
## Launch() {#Agent_Launch}

### Spec

Launch(field):@ref pg_class_agent_handle

create a new handle driven by a new @ref pg_class_agent. 

### Args

| Name | Type | Means |
|------|------|-------|
| field | @ref Agent_Field | field settings for an Agent |

### Returns

a new @ref pg_class_agent_handle

-----
## Run() {#Agent_Run}

### Spec

Run(field):@ref pg_class_agent_handle

create a new handle driven by a new @ref pg_class_agent.  
this handle openes now.  

### Args

| Name | Type | Means |
|------|------|-------|
| field | @ref Agent_Field | field settings for an Agent |

### Returns

a new @ref pg_class_agent_handle
