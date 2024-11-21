@page pg_class_quickqueue QuickQueue

# What's It?

@sa @ref pg_feat_quickqueue @n


# Methods

## isEnd():bool

### Returns

this queue reaches to end.  


## count():int

### Returns

count target queue entries.  


## pos():int

### Returns

queue position of target.  


## reset()

this queue position is moved at start.  


## peek():any

read from target queue position.  


## next():any

read from target queue position.  
and queue position is moved to next.  
