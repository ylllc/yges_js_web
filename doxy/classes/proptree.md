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

### Imprements

loop procedure from @ref PropTree_Each  

-----
# Methods

-----
## GetType() {#PropTree_GetType}

### Spec

GetType():@ref PropTree_PROPTYPE

### Returns

instance type

-----
## Export() {#PropTree_Export}

### Spec

Export():any

### Returns

all values in this  

-----
## ToArray() {#PropTree_ToArray}

target object substructure is converted to an array.

### Spec

ToArray(...keys)

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

-----
## ToDict() {#PropTree_ToDict}

target array substructure is converted to an object.

### Spec

ToDict(...keys)

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

-----
## Exists() {#PropTree_Exists}

### Spec

Exists(...keys):bool

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

something stored at target location

-----
## Ref() {#PropTree_Ref}

### Spec

Ref(...keys):PropTree?

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

subinstance at target locateion (or undefined) 

-----
## Dig() {#PropTree_Dig}

### Spec

Dig(...args):PropTree

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

subinstance at target  
(create a new instance when not found)  

-----
## Count() {#PropTree_Count}

### Spec

Count(...keys):int

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

EMPTY type always 0.  
MONO type always 1.  
ARRAY,DICT type returns subinstances count.  

-----
## Get() {#PropTree_Get}

### Spec

Get(...keys):any

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

export from target subinstances (or undefined)

-----
## Set() {#PropTree_Set}

set a content to target subinstances.  
and it is converted to ARRAY/DICT by key type.  

### Spec

Set(...keys,val):PropTree

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

---
## Cut() {#PropTree_Cut}

in MONO type, erase target value with undefiend.  
in ARRAY,DICT type, target subinstances is cut out from its node.  

### Spec

Cut(...keys):any

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

EMPTY type returns undefined.  
MONO type returns erased value.  
ARRAY,DICT type returns reference of removed subinstances.  

-----
## Merge() {#PropTree_Merge}

overwrite a structure to target subinstances.  
and it is converted to ARRAY/DICT by key type.  

### Spec

Merge(...keys,val):PropTree

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## Push() {#PropTree_Push}

add a content to endside of target subinstances.  
and it is converted to ARRAY.  

### Spec

Push(...keys,val):PropTree

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## Unshift() {#PropTree_Unshift}

add a content to beginside of target subinstances.  
and it is converted to ARRAY.  

### Spec

Unshift(...keys,val):PropTree

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |
| val | any | source content |

### Returns

reference of target subinstances

-----
## Pop() {#PropTree_Pop}

cut out a content from endside of target subinstances.  
and it is converted to ARRAY.  

### Spec

Pop(...keys):any

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

cut content

-----
## Shift() {#PropTree_Shift}

cut out a content from beginside of target subinstances.  
and it is converted to ARRAY.  

### Spec

Shift(...keys):any

### Args

| Name | Type | Means |
|------|------|-------|
| keys | @ref PropTree_PropTreeKeys | substructure location |

### Returns

cut content

-----
## Each() {#PropTree_Each}

iterate on target subinstances.  

### Spec

Each(...keys,cb):quadinary

### Args

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
