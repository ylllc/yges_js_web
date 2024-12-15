@page pg_class_stmac_context StMacContext

# What's It?

@sa @ref pg_feat_stmac @n

# Properties

Name | Type | Means
-----|------|------
User | object | user definitions (on this context, not shared to states User)


# Methods

## getPrevState():string?

### Returns

previous state


## getCurState():string?

### Returns

current state


## getNextState():string?

### Returns

next state


## getHappeningManager():HappeningManager

### Returns

target HappeningManager of this states 


# Inherited

some methods are inherited from @ref pg_class_procedure  

- isStarted()
- isFinished()
- isAborted()
- isEnd()
- abort()
- sync()
- toPromise()
