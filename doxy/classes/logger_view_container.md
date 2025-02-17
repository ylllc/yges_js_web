@page pg_class_logger_view_container LogView.Container

# What's It?

(web only)  
log viewer of @ref pg_class_logger

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.LogView | logger view container |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## SetUp() {#LogViewContainer_SetUp}

create a logger view instance

### Spec

SetUp(target,src,hide=false):@ref pg_class_logger_view

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | view placed on |
| src | @ref pg_class_logger | source logger |
| hide | bool? | true means hidden instance (call Show() to be visible) |

### Returns

a log view instance

### Note

- Way is overridden, and cannot share to other instances

