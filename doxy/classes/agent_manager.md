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
# Types

-----
## UserShared {#UserShared}

user defined object kept in an agent

-----
## AgentParam {#AgentParam}

| Name | Type | Means |
|------|------|-------|
| name | string? | user class name |
| happen | @ref pg_class_happening_manager? | happenings reported in it |
| launcher | @ref pg_class_launcher? | procedures running on it |
| user | @ref UserShared? | share on Agent.User |

-----
# Methods

-----
## standby(prm):Agent

create a new Agent.  

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref AgentParam | initializing parameter. |

### Returns

a new @ref pg_class_agent

-----
## launch(prm):AgentHandle

create a new @ref pg_class_agent_handle driven by a new @ref pg_class_agent. 

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref AgentParam | initializing parameter. |

### Returns

a new @ref pg_class_agent_handle

-----
## run(prm):AgentHandle

create a new @ref pg_class_agent_handle driven by a new @ref pg_class_agent.  
this @ref pg_class_agent_handle openes now.  

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref AgentParam | initializing parameter. |

### Returns

a new @ref pg_class_agent_handle
