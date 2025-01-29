@page pg_class_happening Happening

-----
# What's It?

created and managed by @ref pg_class_happening_manager  

-----
# Structures

-----
## HappeningInfo {#Happening_HappeningInfo}

| Name | Type | Means |
|------|------|-------|
| InstanceID | int | instance ID |
| Name | string | instance name |
| Status | string | @ref Happening_GetStatus returns |
| Msg | string | happening message |
| Prop | dict<string,any> | happening properties |
| User | dict<string,any> | user definition |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
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
## GetProp() {#Happening_GetProp}

### Spec

GetProp():dict<string,any>

### Returns

properties of the happening.  

-----
## ToString() {#Happening_ToString}

### Spec

ToString():string  
toString():string  

### Returns

message of the happening.  

-----
## ToError() {#Happening_ToError}

### Spec

ToError():Error

### Returns

convert to an Error.  

-----
## IsResolved() {#Happening_IsResolved}

### Spec

IsResolved():bool

### Returns

means the Happening is resolved.  

-----
## IsAbandoned() {#Happening_IsAbandoned}

### Spec

IsAbandoned():bool

### Returns

means the Happening is abandoned and not resolved.  
(resolved Happening returns false)  

-----
## GetStatus() {#Happening_GetStatus}

### Spec

GetStatus():string

### Returns

status of this instance  

| Value | Means |
|-------|-------|
| Posed | untreated happening |
| Resolved | treated correctly |
| Abandoned | ignoring decision |

-----
## GetInfo() {#Happening_GetInfo}

### Spec

GetInfo():@ref Happening_HappeningInfo

### Returns

happening info.  

-----
## Resolve() {#Happening_Resolve}

### Spec

Resolve()

the Happening marks resolved.  
and retract abandoned.  

-----
## Abandon() {#Happening_Abandon}

### Spec

Abandon()

the Happening marks abandoned.  
