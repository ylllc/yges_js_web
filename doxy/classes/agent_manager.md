@page pg_class_agent_manager AgentManager

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
## AgentParam {#Agent_AgentParam}

| Name | Type | Means |
|------|------|-------|
| name | string? | user class name |
| happen | @ref pg_class_happening_manager? | happenings reported in it |
| launcher | @ref pg_class_launcher? | procedures running on it |
| user | @ref UserShared? | share on Agent.User |

-----
# Methods

-----
## Standby {#Agent_Standby}

### Spec

Standby(prm):@ref pg_class_agent

create a new Agent.  

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref AgentParam | initializing parameter. |

### Returns

a new @ref pg_class_agent

-----
## Launch {#Agent_Launch}

### Spec

Launch(prm):@ref pg_class_agent_handle

create a new handle driven by a new @ref pg_class_agent. 

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref AgentParam | initializing parameter. |

### Returns

a new @ref pg_class_agent_handle

-----
## Run {#Agent_Run}

### Spec

Run(prm):@ref pg_class_agent_handle

create a new handle driven by a new @ref pg_class_agent.  
this handle openes now.  

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref AgentParam | initializing parameter. |

### Returns

a new @ref pg_class_agent_handle
