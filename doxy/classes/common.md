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
| Name | string | error class name |
| Msg | string | error message |
| File | string? | happened source file path |
| Line | int? | happened source file line |
| Col | int? | happened source file column |
| Stack | any | stack tarace |
| Src | Error? | error instance |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## CreateEnum {#Common_CreateEnum}

### Spec

CreateEnum(src):dict<string,int>

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | enum name table |

### Returns

reverse lookup table of src.  

-----
## FromError {#Common_FromError}

### Spec

FromError(err):@ref Common_HappenedError

### Args

| Name | Type | Means |
|------|------|-------|
| err | Error | happened error |

### Returns

extract for @ref pg_class_happening

-----
## JustString {#Common_JustString}

### Spec

JustString(val):string

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | source value |

### Returns

fix to string.  
uses for logging instead of toString().  

-----
## Inspect {#Common_Inspect}

### Spec

Inspect(val):string

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | source value |

### Returns

fix to inspectable string.  
uses for debugging instead of JSON.stringify().  

-----
