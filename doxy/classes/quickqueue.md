@page pg_class_quickqueue QuickQueue

# What's It?

created by @ref pg_class_quickqueue_container

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## IsEnd() {#QuickQueue_IsEnd}

### Spec

IsEnd():bool

### Returns

this queue reaches to end.  

-----
## Count() {#QuickQueue_Count}

### Spec

Count():int

### Returns

count target queue entries.  

-----
## Pos() {#QuickQueue_Pos}

### Spec

Pos():int

### Returns

queue position of target.  

-----
## Reset() {#QuickQueue_Reset}

this queue position is moved at start.  

### Spec

Reset():void

-----
## Peek() {#QuickQueue_Peek}

read from target queue position.  

### Spec

Peek():any

### Returns

read value.  

-----
## Next() {#QuickQueue_Next}

read from target queue position.  
and queue position is moved to next.  

### Spec

Next():any

### Returns

read value.  

