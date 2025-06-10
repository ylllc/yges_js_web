@page pg_class_softclass SoftClass

# What's It?

created by @ref Common_SoftClass

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| Name | string | instance name |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetClassName() {#SoftClass_GetClassName}

### Spec

GetClassName():string

### Returns

class name

-----
## GetParentName() {#SoftClass_GetParentName}

### Spec

GetParentName():string

### Returns

parent class name

-----
## IsComprised() {#SoftClass_IsComprised}

### Spec

IsComprised(name):bool

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | class name |

### Returns

| Value | Means |
|-------|-------|
| true | called @ref SoftClass_Extend or @ref SoftClass_Trait with name |
| false | unrelated |

-----
## Trait() {#SoftClass_Trait}

add noninherit class definitions.  

### Spec

Trait(name,priv=null,src=null):dict<string,any>

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | class name |
| priv | dict<string,any> | private definitions |
| pub | dict<string,any> | public definitions |

### Returns

private scope (same to priv or new object)

-----
## Extend() {#SoftClass_Extend}

add inherit class definitions.  

### Spec

Extend(name,priv=null,src=null):dict<string,any>

### Args

| Name | Type | Means |
|------|------|-------|
| name | string | class name |
| priv | dict<string,any> | private definitions |
| pub | dict<string,any> | public definitions |

### Returns

private scope (same to priv or new object)

-----
## Inherit() {#SoftClass_Inherit}

override a supercallable function.  

### Spec

Inherit(symbol,override):func

### Args

| Name | Type | Means |
|------|------|-------|
| symbol | string | function name |
| override | func | function procedure |

### Returns

overridden target function.  
