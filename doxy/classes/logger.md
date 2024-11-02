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
