@page pg_class_receiver Receiver

# What's It?

created by @ref Network_CreateReceiver  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Gate {#Receiver_CB_Gate}

call by received rawdata  
brings a chance to filter from the rawdata  

### Spec

CB_Gate(recver,rawdata,prop):any

### Args

| Name | Type | Means |
|------|------|-------|
| recver | @ref pg_class_receiver | receiver |
| rawdata | any | packet data |
| prop | struct | properties from receiver |

### Returns

| Type | Means |
|------|-------|
| any | filtered packet data |
| null | invalid |

-----
## CB_Decode {#Receiver_CB_Decode}

call by CB_Gate passed rawdata  
it replace decoding to internal structure  

### Spec

CB_Decode(recver,rawdata,prop):@ref Transport_PayloadUnit[]?

### Args

| Name | Type | Means |
|------|------|-------|
| recver | @ref pg_class_receiver | receiver |
| rawdata | any | packet data |
| prop | struct | properties from receiver |

### Returns

| Type | Means |
|------|-------|
| PayloadUnit[] | decoded payloads |
| null | invalid |

-----
# Structures

-----
## ReceiverOption {#Receiver_ReceiverOption}

it inherited from @ref Agent_Field 

| Name | Type | Means |
|------|------|-------|
| Trace_Receiver | bool | additional trace logs in Receiver |
| Unorderable | bool | for tough test, received packets may broken them order from sending |
| DelayMin | int | for tough test, received packets may late by delaying (minimum msec) |
| DelayMax | int | for tough test, received packets may late by delaying (maximum msec) |
| DubRatio | float | for tough test, received packets may dubbed (affection ratio) |
| DubIntervalMin | int | for tough test, dubbed packet reach after (minimum msec) |
| DubIntervalMax | int | for tough test, dubbed packet reach after (maximum msec) |
| OnGate | @ref Receiver_CB_Gate | call by received rawdata |
| OnDecode | @ref Receiver_CB_Decode | call by OnGate passed rawdata |

-----
# Methods

-----
## SetTracing_Receiver() {#Receiver_SetTracing_Receiver}

### Spec

SetTracing_Receiver(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | additional trace logs in Receiver |

-----
## IsConnected() {#Receiver_IsConnected}

### Spec

IsConnected():bool

### Returns

connected to a @ref pg_class_transport

-----
## GetConnectionName() {#Receiver_GetConnectionName}

### Spec

GetConnectionName():string?

### Returns

Receiver name in connected Transport

-----
## GetTransport() {#Receiver_GetTransport}

### Spec

GetTransport():@ref pg_class_transport

### Returns

connected Transport

-----
## CutOff() {#Receiver_CutOff}

force close Receiver  
receiving packets should abandoned  

### Spec

CutOff():void

-----
## Receive() {#Receiver_Receive}

put received data to connected @ref pg_class_transport  

### Spec

Receive(rawdata,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| rawdata | any | receiving data |
| prop | struct | extra properties from receive driver |
