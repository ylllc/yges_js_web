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
## HappeningManagerPrm {#HappeningManager_HappeningManagerPrm}

| Name | Type | Means |
|------|------|-------|
| Name | string? | user class name |
| OnHappen | func<@ref pg_class_happening> | call on happened |
| User | dict<string,any> | user difinition |

-----
## HappeningManagerInfo {#HappeningManager_HappeningManagerInfo}

| Name | Type | Means |
|------|------|-------|
| InstanceID | int | instance ID |
| Name | string | instance name |
| Status | string | @ref Happening_GetStatus returns |
| User | dict<string,any> | user definition |
| Issues | @ref Happening_HappeningInfo[] | happenings in this instance |
| Sub | @ref HappeningManager_HappeningManagerInfo[] | submanagers in this instance |

-----
## HappeningOption {#HappeningManager_HappeningOption}

| Name | Type | Means |
|------|------|-------|
| Name | string? | instance name |
| OnResolved | func<@ref pg_class_happening>? | call on resolved |
| OnAbandoned | func<@ref pg_class_happening>? | call on abandoned |
| User | dict<string,any>? | other user definitions kept on created @ref pg_class_happening |

-----
# Unions

-----
## HappeningSource {#HappeningManager_HappeningSource}

| Type | Means |
|------|-------|
| string | message |
| Error | from Error |
| @ref pg_class_happening | rehappening |
| dict<string,any> | merge to prop |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| OnHappen | func<@ref pg_class_happening> | call on happened |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetInstanceID() {#Log_GetInstanceID}

### Spec

GetInstanceID():int

### Returns

instance ID created by @ref Common_NextID

-----
## CreateLocal() {#HappeningManager_CreateLocal}

create a child HappeningManager  

### Spec

CreateLocal(prm={}):@ref pg_class_happening_manager

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref HappeningManager_HappeningManagerPrm | settings |

### Returns

created instance  

-----
## GetParent() {#HappeningManager_GetParent}

### Spec

GetParent():@ref pg_class_happening_manager?

### Returns

parent instance (null from global instance)  

-----
## GetChildren() {#HappeningManager_GetChildren}

### Spec

GetChildren():@ref pg_class_happening_manager[]

### Returns

child instances  

-----
## GetIssues() {#HappeningManager_GetIssues}

### Spec

GetIssues():@ref pg_class_happening[]

### Returns

Happening instances in this instance.  
include dirty resolved happens.  

-----
## GetStatus() {#HappeningManager_GetStatus}

### Spec

GetStatus():string

### Returns

status of this instance  

| Value | Means |
|-------|-------|
| Available | active instance |
| Abandoned | no longer refered |

-----
## GetInfo() {#HappeningManager_GetInfo}

### Spec

GetInfo():@ref HappeningManager_HappeningManagerInfo

### Returns

manager info.  

-----
## Abandon() {#HappeningManager_Abandon}

### Spec

Abandon():void

abandon all happens in this instance
and all child HappeningManager.  

-----
## CountIssues() {#HappeningManager_countIssues}

### Spec

CountIssues():int

### Returns

count happens in this instance and all child HappeningManager.  
include dirty resolved happens.  

-----
## IsCleaned() {#HappeningManager_IsCleaned}

### Spec

IsCleaned():bool

### Returns

true means no happens in this instance and all child HappeningManager.  
(same to CountIssues() returns 0)  

-----
## Cleanup() {#HappeningManager_Cleanup}

### Spec

Cleanup():void

remove dirty resolved happens in this instance and all child HappeningManager.  

-----
## Poll() {#HappeningManager_poll}

### Spec

Poll(cb):void

iterate all unresolved Happening include all child HappeningManager.  

| Name | Type | Means |
|------|------|-------|
| cb | func<@ref pg_class_happening> | call by each Happening |

-----
## Happen() {#HappeningManager_Happen}

### Spec

Happen(src,prop,init=null):@ref pg_class_happening

add a Happening.  

### Args

| Name | Type | Means |
|------|------|-------|
| src | @ref HappeningManager_HappeningSource | happening source |
| prop | dict<string,any> | extra properties |
| init | @ref HappeningOption? | optional params |

### Returns

the Happening instance
