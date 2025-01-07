@page pg_class_proptree PropTree

# What's It?

created by @ref pg_class_proptree_container

-----
# Unions

-----
## PropTreeKey {#PropTree_PropTreeKey}

| Type | Means |
|------|-------|
| int | array index |
| string | prop key |

-----
## PropTreeKeys {#PropTree_PropTreeKeys}

| Type | Means |
|------|-------|
| @ref PropTree_PropTreeKey[] | keys in an array (for locate indirectly) |
| ...@ref PropTree_PropTreeKey | keys in args (for locate directly) |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Callbacks

-----
## CB_Iter {#PropTree_CB_Iter}

### Spec

CB_Iter(key,sub):bool?

### Args

| Name | Type | Means |
|------|------|-------|
| key | @ref PropTree_PropTreeKey | key of target substructure |
| sub | any | sub-substructure with each content |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

-----
# Methods

-----
## GetType {#PropTree_GetType}

### Spec

GetType():@ref PropTree_PROPTYPE

### Returns

instance type

-----
## Export {#PropTree_Export}

### Spec

Export():any

### Returns

all values in this  

-----
## ToArray {#PropTree_ToArray}

### Spec

ToArray(...keys)

target object substructure is converted to an array.

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

-----
## ToDict {#PropTree_ToDict}

### Spec

ToDict(...keys)

target array substructure is converted to an object.

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

-----
## Exists {#PropTree_Exists}

### Spec

Exists(...keys):bool

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

something stored at target location

-----
## Ref {#PropTree_Ref}

### Spec

Ref(...keys):PropTree?

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

subinstance at target locateion (or undefined) 

-----
## Dig {#PropTree_Dig}

### Spec

Dig(...args):PropTree

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

subinstance at target  
(create a new instance when not found)  

-----
## Count {#PropTree_Count}

### Spec

Count(...keys):int

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

EMPTY type always 0.  
MONO type always 1.  
ARRAY,DICT type returns subinstances count.  

-----
## Get {#PropTree_Get}

### Spec

Get(...keys):any

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

export from target subinstances (or undefined)

-----
## Set {#PropTree_Set}

### Spec

Set(...keys,val):PropTree

set a content to target subinstances.  
and it is converted to ARRAY/DICT by key type.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

---
## Cut {#PropTree_Cut}

### Spec

Cut(...keys):any

in MONO type, erase target value with undefiend.  
in ARRAY,DICT type, target subinstances is cut out from its node.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

EMPTY type returns undefined.  
MONO type returns erased value.  
ARRAY,DICT type returns reference of removed subinstances.  

-----
## Merge {#PropTree_Merge}

### Spec

Merge(...keys,val):PropTree

overwrite a structure to target subinstances.  
and it is converted to ARRAY/DICT by key type.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## Push {#PropTree_Push}

### Spec

Push(...keys,val):PropTree

add a content to endside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## Unshift {#PropTree_Unshift}

### Spec

Unshift(...keys,val):PropTree

add a content to beginside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## Pop {#PropTree_Pop}

### Spec

Pop(...keys):any

cut out a content from endside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

cut content

-----
## Shift {#PropTree_Shift}

### Spec

Shift(...keys):any

cut out a content from beginside of target subinstances.  
and it is converted to ARRAY.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

cut content

-----
## Each {#PropTree_Each}

### Spec

Each(...keys,cb):quadinary

iterate on target subinstances.  

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| cb | @ref PropTree_CB_Iter | callback with each content |

### Returns

| Value | Means |
|-------|-------|
| true | all done |
| false | breaked |
| null | not ARRAY or DICT, or empty callback |
| undefined | target substructure not found |
