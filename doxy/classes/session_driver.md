@page pg_class_session_driver Session.Driver

# What's It?

created by @ref pg_class_session_container  
it inherited from @ref pg_class_agent  

-----
# Structures

-----
## SessionDriverOption {#SessionDriver_SessionDriverOption}

it inherited from @ref Agent_Field 

| Name | Type | Means |
|------|------|-------|
| SID | string? | session ID (or auto assignment) |
| PayloadSpec | dict<string,@ref TransportDriver_PayloadSpec> | specifies by payload typ |
| PayloadReceivers | dict<string,@ref TransportDriver_CB_Received> | call by received payload |

-----
# Methods

-----
## GetInstanceID() {#SessionDriver_GetInstanceID}

### Spec

GetInstanceID():string

### Returns

Session ID

-----
## IsJoined() {#SessionDriver_IsJoined}

### Spec

IsJoined(epid):bool

### Args

| Name | Type | Means |
|------|------|-------|
| epid | string? | EndPoint ID |

### Returns

this EndPoint is joined in this session  

-----
## Join {#SessionDriver_Join}

an EndPoint joines in this session  

### Spec

Join(epid):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid | string? | EndPoint ID |

-----
## Leave {#SessionDriver_Leave}

an EndPoint leaves from this session  

### Spec

Leave(epid):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid | string? | EndPoint ID |
