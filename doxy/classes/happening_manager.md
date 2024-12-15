@page pg_class_happening_manager HappeningManager

# What's It?

@sa @ref pg_feat_happening


# Properties

Name | Type | Means
-----|------|------
Happened | function<Happened> | call on happened
User | object | user definitions

## Type: function<Happened>

### Args

Name | Type | Means
-----|------|------
hap | Happening | source happening


# Methods

## createLocal(name='YgEs_HappeningManager'):HappeningManager

create a child HappeningManager  

### Args

Name | Type | Means
-----|------|------
name | string? | instance name

### Returns

created instance  


## abandon()

abandon all happens in this instance
and all child HappeningManager.  

## countIssues()

### Returns

count happens in this instance and all child HappeningManager.  
include dirty resolved happens.  

## isCleaned()

### Returns

true means no happens in this instance and all child HappeningManager.  
(same to countIssues() returns 0)  

## cleanup()

remove dirty resolved happens in this instance and all child HappeningManager.  

## getInfo():HappeningInfo

### Returns

unresolved happenings info in an object.  

## Type: HappeningInfo

Name | Type | Means
-----|------|------
name | string | name of target HappeningManager
issues | array<object> | GetProp() of each unresolved happenings
children | array<HappeningInfo> | getInfo() of each children

## poll(cb)

iterate all unresolved Happening include all child HappeningManager.  

Name | Type | Means
-----|------|------
cb | function<PollHappening> | call by each Happening

## Type: function<PollHappening>

### Args

Name | Type | Means
-----|------|------
hap | Happening | source happening

## happenMsg(msg,init=null):Happening

add a Happening from a message.  

### Args

Name | Type | Means
-----|------|------
msg | string | happening message
init? | HappeningOption | optional params

### Returns

the Happening instance

## happenProp(prop,init=null):Happening

add a Happening from properties.  

### Args

Name | Type | Means
-----|------|------
prop | object | happening properties
init? | HappeningOption | optional params

### Returns

the Happening instance

## happenError(err,init=null):Happening

add a Happening from Error instance.  
init? | HappeningOption | optional params

### Args

Name | Type | Means
-----|------|------
err | Error | happening Error

### Returns

the Happening instance

## Type: HappeningOption

Name | Type | Means
-----|------|------
name | string? | instance name
Resolved | function<Resolved>? | call on resolved (@sa @ref pg_class_happening)
Abandoned | function<Abandoned>? | call on abandoned (@sa @ref pg_class_happening)
User | object? | other user definitions

