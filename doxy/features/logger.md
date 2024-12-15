@page pg_feat_logger Logger

# What's It?

the advanced log feature.  

# Import

## for web

(todo)  

## for Node/Deno

```
import Logger from 'api/logger.js';
```
importing name can redefine in your wish.  

# How to Use

## Log Level

```
// set showable log level 
Logger.Showable=Logger.LEVEL.DEBUG;

// put log 
// put log 
Logger.tick('TICK Log'); // will be suppressed 
Logger.trace('TRACE Log'); // will be suppressed 
Logger.debug('DEBUG Log');
Logger.info('INFO Log');
Logger.notice('NOTICE Log');
Logger.warn('WARN Log');
Logger.fatal('FATAL Log');
Logger.alert('ALERT Log');
Logger.emerg('EMERG Log');

// put log with variable level
Logger.put(Logger.LEVEL.INFO,'INFO Log too');
// overlevel logs are always suppressed 
Logger.put(Logger.LEVEL.NEVER,'NEVER Log');
```

## Local Log

```
// create local log instance 
var ll1=Logger.createLocal('Local',Logger.LEVEL.TRACE);

// put local log 
ll1.tick('Local TICK Log'); // will be suppressed 
ll1.trace('Local TRACE Log');
ll1.put(Logger.LEVEL.DEBUG,'Local DEBUG Log');
```

## Caption

can name fora each log instances.
```
// set global log caption 
Logger.Caption='Global';

// for local log
ll1.Caption='Local';

// clear local log caption (use global instead of it)
ll1.Caption=null;

// clear global log caption (to empty) 
Logger.LogCaption=null;

```

## Object Inspecting

can put an object directly.  
it processed by Util.inspect() 

```
// can output an object directly, without JSON.stringify(), more correct   
var obj={a:1,b:NaN,c:Infinity,d:[undefined]}
log.debug(obj);
```


## Deferred Message

for low level log, can suppress message by filter.  
but still has message creating CPU cost.  
put message creating function instead of it.  

```
// can postpone creating message 
// it don't call for suppressed log 
log.debug(()=>'deferred message creation: '+Math.pow(1.234,5.678));
```


## User Customize Output Way

```
// can override output 
Logger.Format=(capt,lev,msg)=>{
	// returning is not necessarily a string 
	// but must acceptable in LogWay 
	return {capt:capt,lev:lev,msg:msg}
}
Logger.Way=(msg)=>{
	console.log(JSON.stringify(msg));
}
Logger.debug('Global override log');
// overridings affect to unoverridden local log 
ll1.debug('Local override log');

// local overridings are selected first 
var ll2=ll1.createLocal('Local2');
ll2.Format=(capt,lev,msg)=>msg;
ll2.Way=(msg)=>{
	console.log(msg);
}
ll2.info('super-overridden local log');
```

# Class Reference

@sa @ref pg_class_logger
