@page pg_class_transport Transport

# What's It?

created by @ref Network_CreateTransport  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Request {#Transport_CB_Request}

call by received unprotocoled payload  

### Spec

CB_Request(tp,payload,prop):void

### Args

| Name | Type | Means |
|------|------|-------|
| tp | @ref pg_class_transport | received Transport |
| payload | @ref Transport_PayloadUnit | received payload |
| prop | struct | properties from receiver |

-----
## CB_Bound {#Transport_CB_Bound}

call by received payload with new or revival Protocol  

### Spec

CB_Bound(tp,payload,prop):string?

### Args

| Name | Type | Means |
|------|------|-------|
| tp | @ref pg_class_transport | received Transport |
| payload | @ref Transport_PayloadUnit | received payload |
| prop | struct | properties from receiver |

### Returns

| Type | Means |
|------|-------|
| string | acceptable EndPoint name in Transport |
| null | reject it |

-----
## CB_Respond {#Transport_CB_Respond}

call by received payload for accepted Protocol  

### Spec

CB_Respond(tp,prot,payload,prop):bool

### Args

| Name | Type | Means |
|------|------|-------|
| tp | @ref pg_class_transport | received Transport |
| prot | @ref pg_class_protocol | processing Protocol |
| payload | @ref Transport_PayloadUnit | received payload |
| prop | struct | properties from receiver |

### Returns

| Type | Means |
|------|-------|
| true | protocol is continued |
| false | protocol is over |

-----
## CB_SelectSender() {#Transport_CB_SelectSender}

### Spec

CB_SelectSender(tp,target,prop):string?

### Args

| Name | Type | Means |
|------|------|-------|
| tp | @ref pg_class_transport | sending Transport |
| target | string? | target EndPoint name |
| prop | struct | properties for sender |

### Returns

| Type | Means |
|------|-------|
| string | Sender name in the Transport |
| null | has no Sender to send to target |

-----
# Structures

-----
## PayloadUnit {#Transport_PayloadUnit}

| Name | Type | Means |
|------|------|-------|
| PID | string? | protocol ID |
| From | string? | sender's EndPoint name |
| To | string? | receiver's EndPoint name |
| Type | string? | payload type |
| Body | any | payload body |

-----
## CallOnceSettings {#TransPort_CallOnceSettings}

| Name | Type | Means |
|------|------|-------|
| Limit | bool? | don't send same type payload again until unlocked |
| Timeout | int? | unlock automatically after msec |

-----
## PayloadSpec {#Transport_PayloadSpec}

spec by payload type  

| Name | Type | Means |
|------|------|-------|
| CallOnce | @ref TransPort_CallOnceSettings? | call once settings |
| UnlockOnce | string[]? | unlock payload types when received |

-----
## PayloadHookSet {#Transport_PayloadHookSet}

| Name | Type | Means |
|------|------|-------|
| OnRequest | @ref Transport_CB_Request |  |
| OnBound | @ref Transport_CB_Bound |  |
| OnRespond | @ref Transport_CB_Respond |  |

-----
## TransportOption {#Transport_TransportOption}

it inherited from @ref Agent_Field 

| Name | Type | Means |
|------|------|-------|
| Trace_Transport | bool | additional trace logs in Transport |
| PIDPrefix | string? | prefix of creating Protocol ID |
| PayloadSpecs | dict<string,@ref Transport_PayloadSpec> | payload settings |
| PayloadHooks | dict<string,@ref Transport_PayloadHookSet> | payload callbacks |

-----
# Methods

-----
## SetTracing_Transport() {#Transport_SetTracing_Transport}

### Spec

SetTracing_Transport(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | additional trace logs in Transport |

-----
## GetPayloadSpecs() {#Transport_GetPayloadSpecs}

### Spec

GetPayloadSpecs():dict<string,@ref Transport_PayloadSpec>

### Returns

payload spec settings

-----
## GetEndPoint() {#TransportDriver_GetEndPoint}

### Spec

GetEndPoint(name):@ref pg_class_endpoint_control?

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | EndPoint name in the Transport |

### Returns

EndPoint instance (or null)

-----
## AttachReceiver() {#Transport_AttachReceiver}

use a Receiver in the Transport  

### Spec

AttachReceiver(name,recver):void

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | Receiver name in the Transport |
| recver | @ref pg_class_network_driver | receiver |

### Notes

- when name conflicted, previous connection will detached forcedly
- Receiver cannot connect multiple, previous connection will detached forcedly too

-----
## DetachReceiver() {#Transport_DetachReceiver}

stop a Receiver from the Transport

### Spec

DetachReceiver(name):void

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | Receiver name in the Transport |

-----
## AttachSender() {#Transport_AttachSender}

use a Sender in the Transport  

### Spec

AttachSender(name,sender):void

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | Sender name in the Transport |
| sender | @ref pg_class_network_driver | sender |

### Notes

- when name conflicted, previous connection will detached forcedly
- Sender can connect multiple, but Sender don't recognize attached Transport

-----
## DetachSender() {#Transport_DetachSender}

stop a Sender from the Transport

### Spec

DetachSender(name):void

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | Sender name in the Transport |

-----
## SetSelector() {#Transport_SetSelector}

replace Sender selecting algorithm  

### Spec

SetSelector(cb_sel):void

### Args

| Name | Type | Means |
|------|------|-------|
| cb_sel | @ref Transport_CB_SelectSender | Sender selector callback |

-----
## Connect() {#Transport_Connect}

EndPoint use the Transport

### Spec

Connect(name,ep):void

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | EndPoint name in the Transport |
| ep | @ref pg_class_endpoint | EndPoint instance |

### Notes

- when name conflicted, previous connection will disconnected forcedly
- EndPoint cannot connect multiple, previous connection will disconnected forcedly too

-----
## Disconnect() {#Transport_Disconnect}

stop an EndPoint to the Transport

### Spec

Disconnect(name):void

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | EndPoint name in the Transport |

-----
## NewProtocol() {#Transport_NewProtocol}

create a new Protocol instance in the Transport

### Spec

NewProtocol(epn,opt2={}):@ref pg_class_protocol

### Args

| Name | Type | Means |
|------|------|-------|
| epn | string | EndPoint name in the Transport |
| opt2 | @ref Protocol_ProtocolOption | Protocol option |

-----
## ExpireProtocol() {#Transport_ExpireProtocol}

terminate a Protocol instance in the Transport

### Spec

ExpireProtocol(pid):void

### Args

| Name | Type | Means |
|------|------|-------|
| pid | string | Protocol ID in the Transport |
