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
# Constants

-----
| Name | Type | Means |
|------|------|-------|
| @ref PropTree_PROPTYPE | dict<string,int> | enum prop types |
| PROPTYPE_NAMES | string[] | name table of each prop types |

-----
## PROPTYPE {#PropTree_PROPTYPE}

| Name | Type | Means |
|------|------|-------|
| EMPTY | int | not set |
| MONO | int | direct value |
| ARRAY | int | values stored in an array |
| DICT | int | values stored in an object |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## Create() {#PropTree_Create}

### Spec

Create():@ref pg_class_proptree  
Create(init,deep=false):@ref pg_class_proptree  

### Args

| Name | Type | Means |
|------|------|-------|
| init | any | initial value |
| deep | bool | extract array and object to sub-instances |

### Returns

a new @ref pg_class_proptree instance.  
Create() is defferent from Create(undefined)  
Create() returns empty instance.  
Create(undefined) returns initialized with undefined.  
