@page pg_class_protocol Protocol

# What's It?

created by @ref Transport_NewProtocol  
it inherited from @ref pg_class_softclass  

-----
# Structures

-----
## ProtocolOption {#Protocol_ProtocolOption}

| Name | Type | Means |
|------|------|-------|
| Name | string | instance name |
| Log | @ref pg_class_logger? | logs to it |
| User | struct | user definition |

-----
# Methods

-----
## GetPID() {#Protocol_GetPID}

### Spec

GetPID():string

### Returns

Protocol ID in the controlled Transport  

-----
## GetTransport() {#Protocol_GetTransport}

### Spec

GetTransport():@ref pg_class_transport

### Returns

the controlled Transport  

-----
## GetEndPoint() {#Protocol_GetEndPoint}

### Spec

GetEndPoint():@ref pg_class_endpoint

### Returns

the operating EndPoint  

-----
## Release() {#Protocol_Release}

the Protocol is over  

### Spec

Release():void

-----
## Launch() {#Protocol_Launch}

prepare sending but postpone  
call @ref Protocol_Kick to send  

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
## Kick() {#Protocol_Kick}

send prepared data in specified target  

### Spec

Kick(target,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| target | string? | target EndPoint name |
| prop | struct | properties for @ref pg_class_network_driver |

-----
## KickAll() {#Protocol_KickAll}

send all prepared data  

### Spec

KickAll(prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| prop | struct | properties for @ref pg_class_network_driver |

-----
## Send() {#Protocol_Send}

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

-----
## Unlock() {#Protocol_Unlock}

remove a blocker from CallOnce  

### Spec

Unlock(type):void

### Args

| Name | Type | Means |
|------|------|-------|
| type | string | payload type |
