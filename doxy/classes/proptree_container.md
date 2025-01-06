@page pg_class_proptree_container PropTreeContainer

# What's It?

@sa @ref pg_feat_proptree @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.PropTree | PropTree container |

-----
# Methods

-----
## create():PropTree

### Returns

a new empty @ref pg_class_proptree instance

-----
## create(init,deep=false):PropTree

### Args

| Name | Type | Means |
|------|------|-------|
| init | any | initial value |
| deep | bool | extract array and object to sub-instances |

### Returns

a new @ref pg_class_proptree instance with imported
