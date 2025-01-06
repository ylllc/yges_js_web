@page pg_class_proptree PropTree

# What's It?

@sa @ref pg_feat_proptree @n

-----
# Callbacks

-----
## CBIter {#CBIter}

| Name | Type | Means |
|------|------|-------|
| key | any | key of target substructure |
| sub | any | sub-substructure with each content |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

-----
# Constants

-----
| Name | Type | Means |
|------|------|-------|
| PROPTYPE | int[] | PropTreeType |

-----
## PropTreeType {#PropTreeType}

| Name | Type | Means |
|------|------|-------|
| EMPTY | int | not set |
| MONO | int | direct value |
| ARRAY | int | values stored in an array |
| PROP | int | values stored in an object |

-----
## PropTreeKey {#PropTreeKey}

| Type | Means |
|------|-------|
| int | array index |
| string | prop key |

-----
## PropTreeKeys {#PropTreeKeys}

| Type | Means |
|------|-------|
| PropTreeKey[] | keys in an array (for locate indirectly) |
| ...PropTreeKey | keys in args (for locate directly) |

-----
# Methods

-----
## getType():PropTreeType

### Returns

instance type

-----
## export():any

### Returns

all values in this  

-----
## toArray(...keys)

target object substructure is converted to an array.

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

-----
## toProp(...keys)

target array substructure is converted to an object.

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

-----
## exists(...keys):bool

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

### Returns

something stored at target location

-----
## ref(...keys):PropTree?

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

### Returns

subinstance at target locateion (or undefined) 

-----
## dig(...args):PropTree

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

### Returns

subinstance at target  
(create a new instance when not found)  

-----
## count(...keys):int

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

### Returns

EMPTY type always 0.  
MONO type always 1.  
ARRAY,PROP type returns subinstances count.  

-----
## get(...keys):any

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

### Returns

export from target subinstances (or undefined)

-----
## set(...keys,val):PropTree

set a content to target subinstances.  
and it is converted to ARRAY/PROP by key type.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

---
## cut(...keys):any

in MONO type, erase target value with undefiend.  
in ARRAY,PROP type, target subinstances is cut out from its node.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |
| val | any | source content |

### Returns

EMPTY type returns undefined.  
MONO type returns erased value.  
ARRAY,PROP type returns reference of removed subinstances.  

-----
## merge(...keys,val):PropTree

overwrite a structure to target subinstances.  
and it is converted to ARRAY/PROP by key type.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## push(...keys,val):PropTree

add a content to endside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## unshift(...keys,val):PropTree

add a content to beginside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## pop(...keys):any

cut out a content from endside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

### Returns

cut content

-----
## shift(...keys):any

cut out a content from beginside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |

### Returns

cut content

-----
## each(...keys,cb):quadinary

iterate on target subinstances.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTreeKeys | substructure location |
| cb | @ref CBIter | callback with each content |

### Returns

| Value | Means |
|-------|-------|
| true | all done |
| false | breaked |
| null | not ARRAY or PROP, or empty callback |
| undefined | target substructure not found |
