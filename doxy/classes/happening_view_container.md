@page pg_class_happening_view_container HappeningViewContainer

# What's It?

(web only)  
happening viewer of @ref pg_feat_happening

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.HappeningView | happening view container |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## SetUp() {#HappeningView_SetUp}

create a happening view instance

### Spec

SetUp(target,src=null):@ref pg_class_happening_manager_view

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | view placed on |
| src | @ref pg_class_happening_manager | source happening manager (or global manager) |

### Returns

a happening view instance
