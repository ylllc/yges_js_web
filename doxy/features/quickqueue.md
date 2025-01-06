@page pg_feat_quickqueue Quick Queue

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
var q=QuickQueue.create(a);

// will get 1 
log.info(q.next());

// will get true 
log.info(q.next());

// will get 'A' (but not step)
log.info(q.peek());

// will get 'A' again
log.info(q.next());

// will get -1
log.info(q.next());

// reset it 
q.reset();

// will get 1 again
log.info(q.next());

```

-----
# Class Reference

@sa @ref pg_class_quickqueue @n
	@ref pg_class_quickqueue_container @n
