@page pg_class_happening_manager HappeningManager

# What's It?

@sa @ref pg_feat_happening

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.HappeningManager | global HappeningManager |

-----
# Structures

-----
## HappeningInfo {#HappeningManager_HappeningInfo}

| Name | Type | Means |
|------|------|-------|
| name | string | user class name of HappeningManager |
| issues | dict<string,any>[] | GetProp() of each unresolved happenings |
| children | @ref HappeningManager_HappeningInfo[] | GetInfo() of each children |

-----
## HappeningOption {#HappeningManager_HappeningOption}

| Name | Type | Means |
|------|------|-------|
| name | string? | instance name |
| cb_resolved | func<@ref pg_class_happening>? | call on resolved |
| cb_abandoned | func<@ref pg_class_happening>? | call on abandoned |
| user | dict<string,any>? | other user definitions kept on created @ref pg_class_happening |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| CB_Happened | func<@ref pg_class_happening> | call on happened |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## CreateLocal(name='YgEs_HappeningManager'):@ref pg_class_happening_manager {#HappeningManager_CreateLocal}

create a child HappeningManager  

### Args

| Name | Type | Means |
|------|------|-------|
| name | string? | instance name |

### Returns

created instance  

-----
## GetParent {#HappeningManager_GetParent}

### Spec

GetParent():@ref pg_class_happening_manager?

### Returns

parent instance (null from global instance)  

-----
## GetChildren {#HappeningManager_GetChildren}

### Spec

GetChildren():@ref pg_class_happening_manager[]

### Returns

child instances  

-----
## GetIssues {#HappeningManager_GetIssues}

### Spec

GetIssues():@ref pg_class_happening[]

### Returns

Happening instances in this instance.  
include dirty resolved happens.  

-----
## Abandon {#HappeningManager_Abandon}

### Spec

Abandon():void

abandon all happens in this instance
and all child HappeningManager.  

-----
## CountIssues {#HappeningManager_countIssues}

### Spec

CountIssues():int

### Returns

count happens in this instance and all child HappeningManager.  
include dirty resolved happens.  

-----
## IsCleaned {#HappeningManager_IsCleaned}

### Spec

IsCleaned():bool

### Returns

true means no happens in this instance and all child HappeningManager.  
(same to CountIssues() returns 0)  

-----
## Cleanup {#HappeningManager_Cleanup}

### Spec

Cleanup():void

remove dirty resolved happens in this instance and all child HappeningManager.  

-----
## GetInfo {#HappeningManager_GetInfo}

### Spec

GetInfo():@ref HappeningManager_HappeningInfo

### Returns

unresolved happenings info in an object.  

-----
## Poll {#HappeningManager_poll}

### Spec

Poll(cb):void

iterate all unresolved Happening include all child HappeningManager.  

| Name | Type | Means |
|------|------|-------|
| cb | func<@ref pg_class_happening> | call by each Happening |

-----
## HappenMsg {#HappeningManager_HappenMsg}

### Spec

HappenMsg(msg,init=null):@ref pg_class_happening

add a Happening from a message.  

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | happening message |
| init | @ref HappeningOption? | optional params |

### Returns

the Happening instance

-----
## HappenProp {#HappeningManager_HappenProp}

### Spec

HappenProp(prop,init=null):@ref pg_class_happening

add a Happening from properties.  

### Args

| Name | Type | Means |
|------|------|-------|
| prop | dict<string,any> | happening properties |
| init | @ref HappeningManager_HappeningOption? | optional params |

### Returns

the Happening instance

-----
## HappenError {#HappeningManager_HappenError}

### Spec

HappenError(err,init=null):@ref pg_class_happening

add a Happening from Error instance.  

### Args

| Name | Type | Means |
|------|------|-------|
| err | Error | error instance |
| init | @ref HappeningManager_HappeningOption? | optional params |

### Returns

the Happening instance
