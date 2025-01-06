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
## getProp():dict<string,any> {#Happening_getProp}

### Returns

properties of the happening.  

-----
## toString():string {#Happening_toString}

### Returns

message of the happening.  

-----
## toJSON():string {#Happening_toJSON}

### Returns

properties by JSON.  

-----
## toError():Error {#Happening_toError}

### Returns

convert to an Error.  

-----
## isResolved():bool {#Happening_isResolved}

### Returns

means the Happening is resolved.  

-----
## isAbandoned():bool {#Happening_isAbandoned}

### Returns

means the Happening is abandoned and not resolved.  
(resolved Happening returns false)  

-----
## resolve() {#Happening_resolve}

the Happening marks resolved.  
and retract abandoned.  

-----
## abandon() {#Happening_abandon}

the Happening marks abandoned.  
