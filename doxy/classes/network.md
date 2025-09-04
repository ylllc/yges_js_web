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
## CreateDriver() {#Network_CreateDriver}

### Spec

CreateDriver(opt):@ref pg_class_network_driver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref NetworkDriver_DriverOption | driver settings |

### Returns

a new instance

-----
## CreateLoopback() {#Network_CreateLoopback}

preset network driver for loopback  

### Spec

CreateLoopback(opt):@ref pg_class_network_driver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref NetworkDriver_DriverOption | driver settings |

### Returns

a new instance

-----
## CreateTerminator() {#Network_CreateTerminator}

preset network driver for terminate  

### Spec

CreateTerminator(opt):@ref pg_class_network_driver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref NetworkDriver_DriverOption | driver settings |

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
