﻿@page pg_class_transport_driver Transport.Driver

# What's It?

created by @ref pg_class_transport_container  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Pack {#TransportDriver_CB_Pack}

call by packing for send  

### Spec

CB_Pack(data):@ref TransportDriver_PackedData

### Args

| Name | Type | Means |
|------|------|-------|
| ep_from | @ref pg_class_endpoint_control | sender's EndPoint |
| epid_to | string? | target EndPoint ID |
| payload | any[] | sending data |

### Returns

packed data

### Notes

- need epid_to for send to remote EndPoint
- need sender's EndPoint ID for receive a response on sender

-----
## CB_Unpack {#TransportDriver_CB_Unpack}

call by unpacking for receive  

### Spec

CB_Unpack(pack):any

### Args

| Name | Type | Means |
|------|------|-------|
| pack | @ref TransportDriver_PackedData | received pack |

### Returns

unpacked data

-----
## CB_ExtractEPIDFrom {#TransportDriver_CB_ExtractEPIDFrom}

extract sender's EPID from a unpacked data

### Spec

CB_ExtractEPIDFrom(data):string?

### Args

| Name | Type | Means |
|------|------|-------|
| data | any | unpacked data |

### Returns

EndPoint ID (or null)

-----
## CB_ExtractEPIDTo {#TransportDriver_CB_ExtractEPIDTo}

extract receiver's EPID from a unpacked data

### Spec

CB_ExtractEPIDTo(data):string?

### Args

| Name | Type | Means |
|------|------|-------|
| data | any | unpacked data |

### Returns

EndPoint ID (or null)

-----
## CB_ExtractPayloadArray {#TransportDriver_CB_ExtractPayloadArray}

extract receiver's EPID from a unpacked data

### Spec

CB_ExtractPayloadArray(data):any[]

### Args

| Name | Type | Means |
|------|------|-------|
| data | any | unpacked data |

### Returns

payload array

-----
## CB_ExtractPayloadType {#TransportDriver_CB_ExtractPayloadType}

extract payload type from a payload

### Spec

CB_ExtractPayloadType(payload):string?

### Args

| Name | Type | Means |
|------|------|-------|
| payload | any | unpacked payload |

### Returns

payload type

-----
## CB_ExtractSessionID {#TransportDriver_CB_ExtractSessionID}

extract session ID from a payload

### Spec

CB_ExtractSessionID(payload):string?

### Args

| Name | Type | Means |
|------|------|-------|
| payload | any | unpacked payload |

### Returns

session ID

-----
## CB_Send {#TransportDriver_CB_Send}

call by sending

### Spec

CB_Send(ep_from,epid_to,pack):void

### Args

| Name | Type | Means |
|------|------|-------|
| ep_from | @ref pg_class_transport_driver | sender's EndPoint |
| epid_to | string | receiver's EndPoint ID |
| pack | @ref TransportDriver_PackedData | sending pack |

-----
## CB_Received {#TransportDriver_CB_Received}

call by received payload

### Spec

CB_Received(epid_from,payload):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_from | string | sender's EndPoint ID |
| payload | any | received payload |

-----
# Structures

-----
## PayloadSpec {#TransportDriver_PayloadSpec}

spec by payload type  

| Name | Type | Means |
|------|------|-------|
| QuickCall | bool | @ref TransportDriver_CB_Received calls on received directly |

-----
## TransportDriverOption {#TransportDriver_TransportDriverOption}

it inherited from @ref Agent_Field 

| Name | Type | Means |
|------|------|-------|
| HasHost | bool | include host @ref pg_class_endpoint_control |
| DelayMin | number | minimum sending delay msec for test |
| DelayMax | number | minimum sending delay msec for test |
| Unorderable | bool | can break ordering by delay test |
| Hurting | float | ratio of receiving short test |
| OnPack | @ref TransportDriver_CB_Pack | call by packing |
| OnUnpack | @ref TransportDriver_CB_Unpack | call by unpacking |
| OnExtractEPIDFrom | @ref TransportDriver_CB_ExtractEPIDFrom | imprementation of extracting sender's EndPoint ID |
| OnExtractEPIDTo | @ref TransportDriver_CB_ExtractEPIDTo | imprementation of extracting receiver's EndPoint ID |
| OnExtractPayloadArray | @ref TransportDriver_CB_ExtractPayloadArray | imprementation of extracting payload array |
| OnExtractPayloadType | @ref TransportDriver_CB_ExtractPayloadType | imprementation of extracting payload type from a payload |
| OnExtractSessionID | @ref TransportDriver_CB_ExtractSessionID | imprementation of extracting session ID from a payload |
| OnSend | @ref TransportDriver_CB_Send | call by sending |
| OnReceived | @ref EndPointControl_CB_Received | call by received on the Host |
| PayloadSpec | dict<string,@ref TransportDriver_PayloadSpec> | specifies by payload typ |
| PayloadReceivers | dict<string,@ref TransportDriver_CB_Received> | call by received payload |

-----
# Unions

-----
## PackedData {#TransportDriver_PackedData}

any type for sending by this TransportDriver  

-----
# Methods

-----
## GetPayloadSpec() {#TransportDriver_GetPayloadSpec}

### Spec

GetPayloadSpec(plt):@ref TransportDriver_PayloadSpec?

### Args

| Name | Type | Means |
|------|------|-------|
| plt | string | payload type |

### Returns

payload spec (or null)

-----
## GetEndPoint() {#TransportDriver_GetEndPoint}

### Spec

GetEndPoint(epid):@ref pg_class_endpoint_control?

### Args

| Name | Type | Means |
|------|------|-------|
| epid | string? | EndPoint ID |

### Returns

EndPoint instance (or null)

-----
## ExtractPayloadType() {#TransportDriver_ExtractPayloadType}

### Spec

ExtractPayloadType(payload):string?

### Args

| Name | Type | Means |
|------|------|-------|
| payload | any | sending data |

### Returns

payload type (or null)

-----
## IsUnorderable() {#TransportDriver_IsUnorderable}

### Spec

IsUnorderable():bool

### Returns

indicate received packets may break ordering 

-----
## MakeDelay() {#TransportDriver_MakeDelay}

### Spec

MakeDelay():number

### Returns

delay msec

-----
## Launch() {#TransportDriver_Launch}

prepare sending but postpone  
call @ref TransportDriver_Kick to send  

### Premises

HasHost required on @ref TransportDriver_TransportDriverOption  

### Spec

Launch(epid_to,payload):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_to | string | receiver's EndPoint ID |
| payload | any | sending data |

-----
## Kick() {#TransportDriver_Kick}

send prepared data  

### Premises

HasHost required on @ref TransportDriver_TransportDriverOption  

### Spec

Kick(epid_to):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_to | string? | receiver's EndPoint ID (or all receivers) |

-----
## Send() {#TransportDriver_Send}

send prepared and this data  

### Premises

HasHost required on @ref TransportDriver_TransportDriverOption  

### Spec

Send(epid_to,payload):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_to | string | receiver's EndPoint ID |
| payload | any | sending data |

-----
## Receive() {#TransportDriver_Receive}

call with a pack received from your low level transport  

### Spec

Receive(from,pack):void

### Args

| Name | Type | Means |
|------|------|-------|
| from | any | sender's transport info |
| pack | @ref TransportDriver_PackedData | received pack |

-----
## AttachSession() {#TransportDriver_AttachSession}

add a session on this Transport  

### Spec

AttachSession(sess):@ref pg_class_session_driver

### Args

| Name | Type | Means |
|------|------|-------|
| sess | @ref pg_class_session_driver | source session |

### Returns

same to sess  

-----
## DetachSession() {#TransportDriver_DetachSession}

remove a session on this Transport  

### Spec

DetachSession(sess):void

### Args

| Name | Type | Means |
|------|------|-------|
| sess | @ref pg_class_session_driver | source session |

