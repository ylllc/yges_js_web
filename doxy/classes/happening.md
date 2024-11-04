@page pg_class_happening Happening

# What's It?

@sa @ref pg_feat_happening


# Properties

Name | Type | Means
-----|------|------
GetProp | function<GetProp> | get props by object
ToString |  function<ToString> | get message
ToJSON | function<ToJSON> | get props by JSON
Resolved | function<Resolved> | call on resolved
Abandoned | function<Abandoned> | call on abandoned
User | object | user definitions

## Type: function<GetProp>():object

### Returns

properties of the happening.  

## Type: function<ToString>():string

### Returns

message of the happening.  

## Type: function<ToJSON>():string

### Returns

properties by JSON.  

## Type: function<Resolved>(hap)

call by resolved happening.  

### Args

Name | Type | Means
-----|------|------
hap | Happening | source happening

## Type: function<Abandoned>(hap)

call by abandoned happening.  

### Args

Name | Type | Means
-----|------|------
hap | Happening | source happening


# Methods

## isResolved():bool

### Returns

means the Happening is resolved.  

## isAbandoned():bool

means the Happening is abandoned and not resolved.  
(resolved Happening returns false)  

## resolve()

the Happening marks resolved.  
and retract abandoned.  

## abandon()

the Happening marks abandoned.  
