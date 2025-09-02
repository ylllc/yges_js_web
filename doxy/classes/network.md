@page pg_class_network Network

# What's It?

@sa @ref pg_feat_network @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Network | Network container |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## CreateReceiver() {#Network_CreateReceiver}

### Spec

CreateReceiver(opt):@ref pg_class_receiver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref Receiver_ReceiverOption | receiver settings |

### Returns

a new instance

-----
## CreateSender() {#Network_CreateSender}

### Spec

CreateSender(opt):@ref pg_class_sender

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref Sender_SenderOption | sender settings |

### Returns

a new instance

-----
## CreateLoopback() {#Network_CreateLoopback}

preset sender for loopback  

### Spec

CreateLoopback(receiver,opt):@ref pg_class_sender

### Args

| Name | Type | Means |
|------|------|-------|
| receiver | @ref pg_class_receiver | sending target Receiver |
| opt | @ref Sender_LoopbackOption | sender settings |

### Returns

a new instance

-----
## CreateTerminator() {#Network_CreateTerminator}

preset sender for terminate  

### Spec

CreateTerminator(opt):@ref pg_class_sender

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref Sender_TerminatorOption | sender settings |

### Returns

a new instance

-----
## CreateTransport() {#Network_CreateTransport}

### Spec

CreateTransport(opt):@ref pg_class_transport

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref Transport_TransportOption | transport settings |

### Returns

a new instance

-----
## CreateEndPoint() {#Network_CreateEndPoint}

### Spec

CreateEndPoint(opt):@ref pg_class_endpoint

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref EndPoint_EndPointOption | endpoint settings |

### Returns

a new instance
