﻿@page pg_feat_quickqueue Quick Queue

# What's It?

Attaching queue-like interface to array or arguments.  
and can shift without trimming.  

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/quickqueue.js"></script>
```
use YgEs.QuickQueue

## for Node/Deno

```
import QuickQueue from 'api/quickqueue.js';
```
importing name can redefine in your wish.  
and can use YgEs.QuickQueue too.  

-----
# How to Use

```
var a=[1,true,'A',-1,1.1]

// create a queue 
var q=QuickQueue.Create(a);

// will get 1 
log.Info(q.Next());

// will get true 
log.Info(q.Next());

// will get 'A' (but not step)
log.Info(q.Peek());

// will get 'A' again
log.Info(q.Next());

// will get -1
log.Info(q.Next());

// reset it 
q.Reset();

// will get 1 again
log.Info(q.Next());

```

-----
# Class Reference

@sa @ref pg_class_quickqueue @n
	@ref pg_class_quickqueue_container @n
