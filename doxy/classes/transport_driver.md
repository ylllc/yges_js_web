@page pg_class_transport_driver Transport.Driver

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
| data | any[] | sending data |

### Returns

packed data

-----
## CB_Unpack {#TransportDriver_CB_Unpack}

call by unpacking for receive  

### Spec

CB_Unpack(pack):any[]

### Args

| Name | Type | Means |
|------|------|-------|
| pack | @ref TransportDriver_PackedData | received pack |

### Returns

unpacked data

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
# Structures

-----
## TransportDriverOption {#TransportDriver_TransportDriverOption}

it inherited from @ref Agent_AgentParam 

| Name | Type | Means |
|------|------|-------|
| DelayMin | number | minimum sending delay msec for test |
| DelayMax | number | minimum sending delay msec for test |
| Unorderable | bool | can break ordering by delay test |
| Hurting | float | ratio of receiving short test |
| OnPack | @ref TransportDriver_CB_Pack | call by packing |
| OnUnpack | @ref TransportDriver_CB_Unpack | call by unpacking |
| OnSend | @ref TransportDriver_CB_Send | call by sending |

-----
# Unions

-----
## PackedData {#TransportDriver_PackedData}

any type for sending by this TransportDriver  

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## Receive() {#TransportDriver_Receive}

call with a pack received from your low level transport  

### Spec

Receive(epid_from,epid_to,pack):void

### Args

| Name | Type | Means |
|------|------|-------|
| epid_from | string | sender's EndPoint ID |
| epid_to | string | receiver's EndPoint ID |
| pack | @ref TransportDriver_PackedData | received pack |
