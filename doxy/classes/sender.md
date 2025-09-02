@page pg_class_sender Sender

# What's It?

created by @ref Network_CreateSender  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Encode {#Sender_CB_Encode}

call by sending contents  
it replace encoding from internal structure  

### Spec

CB_Encode(sender,contents,prop):any

### Args

| Name | Type | Means |
|------|------|-------|
| sender | @ref pg_class_sender | sender |
| contents | @ref Transport_PayloadUnit[] | sending contents |
| prop | struct | properties from operation calling (e.g. @ref EndPoint_Launch) |

### Returns

encoded rawdata

-----
## CB_Send {#Sender_CB_Send}

call by encoded rawdata  
imprements sending way  

### Spec

CB_Send(sender,rawdata,prop):void

### Args

| Name | Type | Means |
|------|------|-------|
| sender | @ref pg_class_sender | sender |
| rawdata | any | sending data |
| prop | struct | properties from operation calling (e.g. @ref EndPoint_Launch) |

-----
# Structures

-----
## SenderOption {#Sender_SenderOption}

it inherited from @ref Agent_Field 

| Name | Type | Means |
|------|------|-------|
| Trace_Sender | bool | additional trace logs in Sender |
| Unorderable | bool | for tough test, received packets may broken them order from sending |
| DelayMin | int | for tough test, received packets may late by delaying (minimum msec) |
| DelayMax | int | for tough test, received packets may late by delaying (maximum msec) |
| DubRatio | float | for tough test, received packets may dubbed (affection ratio) |
| DubIntervalMin | int | for tough test, dubbed packet reach after (minimum msec) |
| DubIntervalMax | int | for tough test, dubbed packet reach after (maximum msec) |
| OnEncode | @ref Sender_CB_Encode | call by sending contents |
| OnSend | @ref Sender_CB_Send | call by sending rawdata |

-----
# Methods

-----
## SetTracing_Sender() {#Sender_SetTracing_Sender}

### Spec

SetTracing_Sender(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | additional trace logs in Sender |

-----
## Send() {#Sender_Send}

send contents  
called from connected @ref pg_class_transport  

### Spec

Send(contents,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| contents | @ref Transport_PayloadUnit[] | sending content |
| prop | struct | properties from operation calling (e.g. @ref EndPoint_Launch) |
