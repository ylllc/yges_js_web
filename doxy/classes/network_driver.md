@page pg_class_network_driver Network.Driver

# What's It?

created by @ref Network_CreateReceiver  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Gate {#NetworkDriver_CB_Gate}

call by received rawdata  
brings a chance to filter from the rawdata  

### Spec

CB_Gate(recver,rawdata,prop):any

### Args

| Name | Type | Means |
|------|------|-------|
| recver | @ref pg_class_network_driver | receiver |
| rawdata | any | packet data |
| prop | struct | properties from receiver |

### Returns

| Type | Means |
|------|-------|
| any | filtered packet data |
| null | invalid |

-----
## CB_Decode {#NetworkDriver_CB_Decode}

call by CB_Gate passed rawdata  
it replace decoding to internal structure  

### Spec

CB_Decode(recver,rawdata,prop):@ref Transport_PayloadUnit[]?

### Args

| Name | Type | Means |
|------|------|-------|
| recver | @ref pg_class_network_driver | receiver |
| rawdata | any | packet data |
| prop | struct | properties from receiver |

### Returns

| Type | Means |
|------|-------|
| PayloadUnit[] | decoded payloads |
| null | invalid |

-----
## CB_Encode {#NetworkDriver_CB_Encode}

call by sending contents  
it replace encoding from internal structure  

### Spec

CB_Encode(sender,contents,prop):any

### Args

| Name | Type | Means |
|------|------|-------|
| sender | @ref pg_class_network_driver | sender |
| contents | @ref Transport_PayloadUnit[] | sending contents |
| prop | struct | properties from operation calling (e.g. @ref EndPoint_Launch) |

### Returns

encoded rawdata

-----
## CB_Send {#NetworkDriver_CB_Send}

call by encoded rawdata  
imprements sending way  

### Spec

CB_Send(sender,rawdata,prop):void

### Args

| Name | Type | Means |
|------|------|-------|
| sender | @ref pg_class_network_driver | sender |
| rawdata | any | sending data |
| prop | struct | properties from operation calling (e.g. @ref EndPoint_Launch) |

-----
# Structures

-----
## ToughTestOption {#NetworkDriver_ToughTestOption}

for tough test on a driver  

| Name | Type | Means |
|------|------|-------|
| Unorderable | bool | for tough test, received packets may broken them order from sending |
| DelayMin | int | for tough test, received packets may late by delaying (minimum msec) |
| DelayMax | int | for tough test, received packets may late by delaying (maximum msec) |
| DubRatio | float | for tough test, received packets may dubbed (affection ratio) |
| DubIntervalMin | int | for tough test, dubbed packet reach after (minimum msec) |
| DubIntervalMax | int | for tough test, dubbed packet reach after (maximum msec) |

-----
## DriverOption {#NetworkDriver_DriverOption}

it inherited from @ref Agent_Field 

| Name | Type | Means |
|------|------|-------|
| Trace_Network | bool | additional trace logs in this driver |
| ToughIn | @ref NetworkDriver_ToughTestOption | tough test for receiving |
| ToughOut | @ref NetworkDriver_ToughTestOption | tough test for sending |
| OnGate | @ref NetworkDriver_CB_Gate | call by received rawdata |
| OnDecode | @ref NetworkDriver_CB_Decode | call by OnGate passed rawdata |
| OnEncode | @ref NetworkDriver_CB_Encode | call by sending contents |
| OnSend | @ref NetworkDriver_CB_Send | call by sending rawdata |

-----
# Methods

-----
## SetTracing_Network() {#NetworkDriver_SetTracing_Network}

### Spec

SetTracing_Network(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | additional trace logs in this driver |

-----
## IsListening() {#NetworkDriver_IsListening}

### Spec

IsListening():bool

### Returns

connected to a @ref pg_class_transport as Receiver

-----
## GetConnectionName() {#NetworkDriver_GetConnectionName}

### Spec

GetConnectionName():string?

### Returns

Receiver name in connected Transport

-----
## GetTransport() {#NetworkDriver_GetTransport}

### Spec

GetTransport():@ref pg_class_transport

### Returns

connected Transport as Receiver

### Caution

driver can connect many Transport as Sender and not recognized them.  
recognized Transport means connected as a Receiver.  

-----
## CutOff() {#CutOff}

force close Receiver  
receiving packets should abandoned  

### Spec

CutOff():void

-----
## Receive() {#NetworkDriver_Receive}

put received data to connected @ref pg_class_transport  

### Spec

Receive(rawdata,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| rawdata | any | receiving data |
| prop | struct | extra properties from receive driver |

-----
## Send() {#NetworkDriver_Send}

send contents  
called from connected @ref pg_class_transport  

### Spec

Send(contents,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| contents | @ref Transport_PayloadUnit[] | sending content |
| prop | struct | properties from operation calling (e.g. @ref EndPoint_Launch) |
