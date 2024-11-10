@page pg_class_engine Engine

# What's It?

@sa @ref pg_feat_engine  

this class is inherited from @ref pg_class_launcher  

# Additional Methods

## start()

the Engine is started.  
and cannot exit until call stop() or shutdown()  

## stop()

stop the Engine.  
and all procedures are aborted.  
can start() again.  

## shutdown()

stop the Engine.  
and all procedures are aborted.  
no longer restart it.  
