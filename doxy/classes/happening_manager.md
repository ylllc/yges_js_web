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
| issues | dict<string,any>[] | getProp() of each unresolved happenings |
| children | @ref HappeningManager_HappeningInfo[] | getInfo() of each children |

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
| Happened | func<@ref pg_class_happening> | call on happened |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## createLocal(name='YgEs_HappeningManager'):@ref pg_class_happening_manager {#HappeningManager_createLocal}

create a child HappeningManager  

### Args

| Name | Type | Means |
|------|------|-------|
| name | string? | instance name |

### Returns

created instance  

-----
## getParent():@ref pg_class_happening_manager? {#HappeningManager_getParent}

### Returns

parent instance (null from global instance)  

-----
## getChildren():@ref pg_class_happening_manager[] {#HappeningManager_getChildren}

### Returns

child instances  

-----
## getIssues():@ref pg_class_happening[] {#HappeningManager_getIssues}

### Returns

Happening instances in this instance.  
include dirty resolved happens.  

-----
## abandon() {#HappeningManager_abandon}

abandon all happens in this instance
and all child HappeningManager.  

-----
## countIssues() {#HappeningManager_countIssues}

### Returns

count happens in this instance and all child HappeningManager.  
include dirty resolved happens.  

-----
## isCleaned() {#HappeningManager_isCleaned}

### Returns

true means no happens in this instance and all child HappeningManager.  
(same to countIssues() returns 0)  

-----
## cleanup() {#HappeningManager_cleanup}

remove dirty resolved happens in this instance and all child HappeningManager.  

-----
## getInfo():@ref HappeningManager_HappeningInfo {#HappeningManager_getInfo}

### Returns

unresolved happenings info in an object.  

-----
## poll(cb) {#HappeningManager_poll}

iterate all unresolved Happening include all child HappeningManager.  

| Name | Type | Means |
|------|------|-------|
| cb | func<@ref pg_class_happening> | call by each Happening |

-----
## happenMsg(msg,init=null):@ref pg_class_happening {#HappeningManager_happenMsg}

add a Happening from a message.  

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | happening message |
| init | @ref HappeningOption? | optional params |

### Returns

the Happening instance

-----
## happenProp(prop,init=null):@ref pg_class_happening {#HappeningManager_happenProp}

add a Happening from properties.  

### Args

| Name | Type | Means |
|------|------|-------|
| prop | dict<string,any> | happening properties |
| init | @ref HappeningManager_HappeningOption? | optional params |

### Returns

the Happening instance

-----
## happenError(err,init=null):@ref pg_class_happening {#HappeningManager_happenError}

add a Happening from Error instance.  

### Args

| Name | Type | Means |
|------|------|-------|
| err | Error | error instance |
| init | @ref HappeningManager_HappeningOption? | optional params |

### Returns

the Happening instance
