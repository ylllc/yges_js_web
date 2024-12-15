@page pg_class_worker_container WorkerContainer

# What's It?

@sa @ref pg_feat_worker @n


# Methods

## Type: WorkerParam

Name | Type | Means
-----|------|------
name | string? | class name
happen | HappeningManager? | happenings reported in it
launcher | Launcher? | procedures running on it
user | dict? | share on Worker.User


## standby(prm):Worker

create a new Worker.  

### Args

Name | Type | Means
-----|------|------
prm | WorkerParam | initializing parameter.  

### Returns

a new Worker

## launch(prm):WorkerHandle

create a new WorkerHandle driven by a new Worker.  

### Args

Name | Type | Means
-----|------|------
prm | WorkerParam | initializing parameter.  

### Returns

a new WorkerHandle

## run(prm):WorkerHandle

create a new WorkerHandle driven by a new Worker.  
this WorkerHandle openes now.  

### Args

Name | Type | Means
-----|------|------
prm | WorkerParam | initializing parameter.  

### Returns

a new WorkerHandle
