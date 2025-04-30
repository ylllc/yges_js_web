@page pg_class_session_container Session.Container

# What's It?

@sa @ref pg_feat_session @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Session | Session container |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## Create() {#SessionContainer_Create}

### Spec

Create(opt):@ref pg_class_session_driver

### Args

| Name | Type | Means |
|------|------|-------|
| opt | @ref SessionDriver_SessionDriverOption | driver settings |

### Returns

a new instance
