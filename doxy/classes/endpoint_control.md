@page pg_class_endpoint_control EndPoint.Control

# What's It?

created by @ref pg_class_endpoint_container  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Received {#EndPointControl_CB_Received}

call by received

### Spec

CB_Received(ep_to,epid_from,data):void

### Args

| Name | Type | Means |
|------|------|-------|
| ep_to | @ref pg_class_endpoint_control | receiver's EndPoint |
| epid_from | string | sender's EndPoint ID |
| data | any | sent data |

-----
# Structures

-----
## EndPointOption {#EndPointControl_EndPointOption}

it inherited from @ref Agent_AgentParam 

| Name | Type | Means |
|------|------|-------|
| EPID | string? | EndPoint ID (or null for the Host) |
| OnReceived | @ref EndPointControl_CB_Received | call by received |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetInstanceID() {#EndPointControl_GetInstanceID}

### Spec

GetInstanceID():string

### Returns

EndPoint ID

-----
## Launch() {#EndPointControl_Launch}

prepare sending but postpone  
call @ref EndPointControl_Kick to send  

### Spec

Launch(epid_to,payload):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_to | string | receiver's EndPoint ID |
| payload | any | sending data |

-----
## Kick() {#EndPointControl_Kick}

send prepared data  

### Spec

Kick(epid_to):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_to | string? | receiver's EndPoint ID (or all receivers) |

-----
## Send() {#EndPointControl_Send}

send prepared and this data  

### Spec

Send(epid_to,payload):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_to | string? | receiver's EndPoint ID |
| payload | any | sending data |

-----
## UnlockOnce() {#EndPointControl_UnlockOnce}

remove a blocker from CallOnce  

### Spec

UnlockOnce(epid_to,plt):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_to | string? | receiver's EndPoint ID |
| plt | string | payload type |
