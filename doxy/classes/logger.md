@page pg_class_logger Logger

# What's It?

@sa @ref pg_feat_logger


# Constants

Name | Type | Means
-----|------|------
LEVEL | dict<string,int> | enum log levels 
LEVEL_NAMES | string[] | name table of each log levels

# Properties

Name | Type | Means
-----|------|------
Showable | int? | minimun showable log level
Caption | string | a caption
Format | function<Format> | formatter
Way | function<Way> | output way
User | object | user definitions

## Type: function<Format>(capt,lev,msg):FormattedLog

### Args

Name | Type | Means
-----|------|------
capt | string | caption by logger
lev | int | log level
msg | string | source log message

you can redefine of log formatting

### Returns

formatted log message  


## Type: FormattedLog

usually as string.  
but can use otherwise in your wish.  


## Type: function<Way>(msg)

Name | Type | Means
-----|------|------
msg | FormattedLog | formatted log message

you can redfine of log output procedure.  


# Methods

## createLocal(capt=null,showable=null):Logger

create new local log instance

### Args

Name | Type | Means
-----|------|------
capt | string? | caption (null means same to parent instance)
showable | int? | showablility (null means same to parent instance)

### Returns

local logger instance


## getCaption():string

### Returns

caption for this instance


## getShowable():int

### Returns

showable log level for this instance


## format(capt,lev,msg):any

format a log element

### Args

Name | Type | Means
-----|------|------
capt | string | caption
lev | int | log level
msg | string | message

### Returns

formatted value


## write(src)

write a formatted log value

### Args

Name | Type | Means
-----|------|------
src | any | formatted source


## put(lev,msg)

log width variable level.  
suppressed when lower than showable.  

Name | Type | Means
-----|------|------
lev | int | log level
msg | string | message


## tick(msg)

put TICK log

Name | Type | Means
-----|------|------
msg | string | message


## trace(msg)

put TRACE log

Name | Type | Means
-----|------|------
msg | string | message


## debug(msg)

put DEBUG log

Name | Type | Means
-----|------|------
msg | string | message


## info(msg)

put INFO log

Name | Type | Means
-----|------|------
msg | string | message


## notice(msg)

put NOTICE log

Name | Type | Means
-----|------|------
msg | string | message


## warn(msg)

put WARN log

Name | Type | Means
-----|------|------
msg | string | message


## fatal(msg)

put FATAL log

Name | Type | Means
-----|------|------
msg | string | message


## crit(msg)

put CRIT log

Name | Type | Means
-----|------|------
msg | string | message


## alert(msg)

put ALERT log

Name | Type | Means
-----|------|------
msg | string | message


## emerg(msg)

put EMERG log

Name | Type | Means
-----|------|------
msg | string | message


