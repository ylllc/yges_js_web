@page pg_class_endpoint EndPoint

# What's It?

created by @ref Network_CreateEndPoint  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Come {#EndPoint_CB_Come}

call by received untyped payload  

### Spec

CB_Come(from,body,prop):void

### Args

| Name | Type | Means |
|------|------|-------|
| from | string | sender's EndPoint name |
| body | any | payload body |
| prop | struct | properties from receiver |

-----
# Structures

-----
## EndPointOption {#EndPoint_EndPointOption}

it inherited from @ref Agent_Field 

| Name | Type | Means |
|------|------|-------|
| OnCome | @ref EndPoint_CB_Come | call by received |

-----
# Methods

-----
## SetTracing_EndPoint() {#EndPoint_SetTracing_EndPoint}

### Spec

SetTracing_EndPoint(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | additional trace logs in EndPoint |

-----
## IsConnected() {#EndPoint_IsConnected}

### Spec

IsConnected():bool

### Returns

connected to a Transport

-----
## GetConnectionName() {#EndPoint_GetConnectionName}

### Spec

GetConnectionName():string?

### Returns

connection name in Transport  

-----
## GetTransport() {#EndPoint_GetTransport}

### Spec

GetTransport():@ref pg_class_transport

### Returns

connected Transport

-----
## Launch() {#EndPoint_Launch}

prepare sending but postpone  
call @ref EndPoint_Kick to send  

### Spec

Launch(target,type,body,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| target | string? | target EndPoint name |
| type | string? | payload type |
| body | any | payload body |
| prop | struct | properties for @ref pg_class_network_driver |

-----
## Kick() {#EndPoint_Kick}

send prepared data in specified target  

### Spec

Kick(target,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| target | string? | target EndPoint name |
| prop | struct | properties for @ref pg_class_network_driver |

-----
## KickAll() {#EndPoint_KickAll}

send all prepared data  

### Spec

KickAll(prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| prop | struct | properties for @ref pg_class_network_driver |

-----
## Send() {#EndPoint_Send}

send prepared and this data  

### Spec

Send(target,type,body,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| target | string? | target EndPoint name |
| type | string? | payload type |
| body | any | payload body |
| prop | struct | properties for @ref pg_class_network_driver |
