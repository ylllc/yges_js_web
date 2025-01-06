@page pg_class_common YgEs

# What's It?

@sa @ref pg_feat_common @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs | common store |

-----
# Structures

-----
## HappenedError {#Common_HappenedError}

Error caught in @ref pg_class_happening

| Name | Type | Means |
|------|------|-------|
| name | string | error class name |
| msg | string | error message |
| file | string? | happened source file path |
| line | int? | happened source file line |
| col | int? | happened source file column |
| stack | any | stack tarace |
| src | Error? | error instance |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## createEnum(src):dict<string,int> {#Common_createEnum}

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | enum name table |

### Returns

reverse lookup table of src.  

-----
## fromError(err):@ref Common_HappenedError {#Common_fromError}

### Args

| Name | Type | Means |
|------|------|-------|
| err | Error | happened error |

### Returns

extract for @ref pg_class_happening

-----
## justString(val):string {#Common_justString}

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | source value |

### Returns

fix to string.  
uses for logging instead of toString().  

-----
## inspect(val):string {#Common_inspect}

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | source value |

### Returns

fix to inspectable string.  
uses for debugging instead of JSON.stringify().  

-----
