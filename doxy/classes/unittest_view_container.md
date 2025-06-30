@page pg_class_unittest_view_container TestView.Container

# What's It?

(web only)  
test viewer of @ref pg_class_unittest

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
| User | struct | user definitions |

-----
# Methods

-----
## SetUp() {#TestViewContainer_SetUp}

create a test view instance

### Spec

SetUp(target,src)

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | view placed on |
| src | @ref pg_class_unittest_dir | test source |
