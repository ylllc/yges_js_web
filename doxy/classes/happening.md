@page pg_class_happening Happening

-----
# What's It?

created and managed by @ref pg_class_happening_manager  

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetProp {#Happening_GetProp}

### Spec

GetProp():dict<string,any>

### Returns

properties of the happening.  

-----
## ToString {#Happening_ToString}

### Spec

ToString():string  
toString():string  

### Returns

message of the happening.  

-----
## ToJSON {#Happening_ToJSON}

### Spec

ToJSON():string

### Returns

properties by JSON.  

-----
## ToError {#Happening_ToError}

### Spec

ToError():Error

### Returns

convert to an Error.  

-----
## IsResolved {#Happening_IsResolved}

### Spec

IsResolved():bool

### Returns

means the Happening is resolved.  

-----
## IsAbandoned {#Happening_IsAbandoned}

### Spec

IsAbandoned():bool

### Returns

means the Happening is abandoned and not resolved.  
(resolved Happening returns false)  

-----
## Resolve {#Happening_Resolve}

### Spec

Resolve()

the Happening marks resolved.  
and retract abandoned.  

-----
## Abandon {#Happening_Abandon}

### Spec

Abandon()

the Happening marks abandoned.  
