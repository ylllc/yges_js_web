@page pg_class_transport_container Transport.Container

# What's It?

@sa @ref pg_feat_transport @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Transport | Transport container |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## CreateDriver() {#TransportContainer_CreateDriver}

### Spec

CreateDriver(opt):@ref pg_class_transport_driver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref TransportDriver_TransportDriverOption | driver settings |

### Returns

a new instance

-----
## CreateLoopback() {#TransportContainer_CreateLoopback}

preset driver for loopback transport  

### Spec

CreateLoopback(opt):@ref pg_class_transport_driver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref TransportDriver_TransportDriverOption | driver settings |

### Returns

a new instance

-----
## CreateTerminator() {#TransportContainer_CreateTerminator}

preset driver for dummy transport  

### Spec

CreateTerminator(opt):@ref pg_class_transport_driver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref TransportDriver_TransportDriverOption | driver settings |

### Returns

a new instance
