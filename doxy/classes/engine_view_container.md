@page pg_class_engine_view_container EngineViewContainer

# What's It?

(web only)  
procedure viewer of @ref pg_feat_engine  

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.EngineView | engine view container |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## SetUp {#EngineView_SetUp}

create a engine view instance

### Spec

SetUp(target,src=null):@ref pg_class_launcher_view

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | view placed on |
| src | @ref pg_class_launcher | source launcher (or the Engine) |

### Returns

a engine view instance
