@page pg_class_engine Engine

# What's It?

@sa @ref pg_feat_engine  

this class is inherited from @ref pg_class_launcher  

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Engine | global launcher |

-----
# Methods

-----
## Start() {#Engine_Start}

### Spec

Start():void

### Promisings

the Engine is started.  
and cannot exit until call Stop() or ShutDown()  

-----
## Stop() {#Engine_Stop}

### Spec

Stop():void

### Promisings

the Engine is stopped.  
and all procedures are aborted.  
can Start() again.  

-----
## ShutDown() {#Engine_ShutDown}

### Spec

ShutDown():void

### Promisings

the Engine is stopped.  
and all procedures are aborted.  
no longer restart it.  
