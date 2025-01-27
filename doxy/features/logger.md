﻿@page pg_feat_logger Logger

# What's It?

the advanced log feature.  

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs.Log  

### Viewer

```
<script src="yges/logger_view.js"></script>
```
use YgEs.LogView

-----
## for Node/Deno

```
import Log from 'api/logger.js';
```
importing name can redefine in your wish.  
and can use YgEs.Log too.  

-----
# How to Use

-----
## Log Level

```
// set showable log level 
Log.Showable=Log.LEVEL.DEBUG;

// put log 
Log.Tick('TICK Log'); // will be suppressed 
Log.Trace('TRACE Log'); // will be suppressed 
Log.Debug('DEBUG Log');
Log.Info('INFO Log');
Log.Notice('NOTICE Log');
Log.Warn('WARN Log');
Log.Fatal('FATAL Log');
Log.Crit('CRIT Log');
Log.Alert('ALERT Log');
Log.Emerg('EMERG Log');

// put log with variable level
Log.Put(Log.LEVEL.INFO,'INFO Log too');
// overlevel logs are always suppressed 
Log.Put(Log.LEVEL.NEVER,'NEVER Log');
```

-----
## Local Log

```
// create local log instance 
var ll1=Log.CreateLocal('Local',Log.LEVEL.TRACE);

// put local log 
ll1.Tick('Local TICK Log'); // will be suppressed 
ll1.Trace('Local TRACE Log');
ll1.Put(Log.LEVEL.DEBUG,'Local DEBUG Log');
```

-----
## Caption

can name fora each log instances.
```
// set global log caption 
Log.Caption='Global';

// for local log
ll1.Caption='Local';

// clear local log caption (use global instead of it)
ll1.Caption=null;

// clear global log caption (to empty) 
Log.LogCaption=null;

```

-----
## Object Inspecting

can put an object directly.  
it processed by YgEs.inspect() 

```
// can output an object directly, without JSON.stringify(), more correct   
var obj={a:1,b:NaN,c:Infinity,d:[undefined]}
log.Debug(obj);

// for web, 2nd arg put through to browser's inspector without serialization.  
// for backend, 2nd arg is still serizlized and appended.  
log.Debug('Inspecting',obj);
```

-----
## Deferred Message

for low level log, can suppress message by filter.  
but still has message creating CPU cost.  
put message creating function instead of it.  

```
// can postpone creating message 
// it don't call for suppressed log 
log.Debug(()=>'deferred message creation: '+Math.pow(1.234,5.678));
```

-----
## User Customize Output Way

```
// can override output 
Log.Format=(src)=>{
	src.Msg=JSON.stringify(src);
}
Log.Way=(src)=>{
	console.dir(src);
}
Log.Debug('Global override log');
// overridings affect to unoverridden local log 
ll1.Debug('Local override log');

// local overridings are selected first 
var ll2=ll1.CreateLocal('Local2');
ll2.Format=(src)=>{};
ll2.Way=(src)=>{
	console.log(src.Msg);
}
ll2.Info('super-overridden local log');
```

-----
## Log Viewer

(web only)
```
let board=YgEs.ToQHT(document.getElementById('board'));
let logview=YgEs.LogView.SetUp(board,YgEs.Log);
```

-----
# Class Reference

@sa @ref pg_class_logger @n
	@ref pg_class_logger_view @n
	@ref pg_class_logger_view_container @n
