@page pg_class_logger Log

# What's It?

@sa @ref pg_feat_logger

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Log | global logger |

-----
# Structures

-----
## LogEntry {#Log_LogEntry}

| Name | Type | Means |
|------|------|-------|
| date | string | date by ISO8601 |
| capt | string | caption |
| lev | int | log level |
| msg | union<@ref Log_LogSource> | message |
| prop | dict<string,any>? | properties |

-----
# Unions

-----
## LogSource {#Log_LogSource}

| Type | Means |
|------|-------|
| func | put return value from called it |
| object | put with inspected |
| other | put with stringified |

-----
# Constants

-----
| Name | Type | Means |
|------|------|-------|
| LEVEL | dict<string,int> | enum log levels |
| LEVEL_NAMES | string[] | name table of each log levels |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| Showable | int? | minimum showable log level |
| Caption | string | a caption |
| Format | func<@ref Log_LogEntry> | formatter |
| Way | func<@ref Log_LogEntry> | output way |
| User | object | user definitions |

-----
# Methods

-----
## createLocal(capt=null,showable=null):@ref pg_class_logger {#Log_createLocal}

create new local log instance

### Args

| Name | Type | Means |
| -----|------|------ |
| capt | string? | caption (null means same to parent instance) |
| showable | int? | showablility (null means same to parent instance) |

### Returns

local logger instance

-----
## getCaption():string {#Log_getCaption}

### Returns

caption for this instance

-----
## getShowable():int {#Log_getShowable}

### Returns

showable log level for this instance

-----
## format(src) {#Log_format}

format a log element  
usually, src.Msg is replaced by this function  

### Args

| Name | Type | Means |
|------|------|-------|
| src | @ref Log_LogEntry | source log entry |

-----
## write(src) {#Log_write}

write a formatted log value  

### Args

| Name | Type | Means |
|------|------|-------|
| src | @ref Log_LogEntry | source log entry |

-----
## put(lev,msg,prop=null) {#Log_put}

log width variable level.  
suppressed when lower than showable.  

### Args

| Name | Type | Means |
|------|------|-------|
| lev | int | log level |
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## tick(msg) {#Log_tick}

put TICK log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## trace(msg) {#Log_trace}

put TRACE log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## debug(msg) {#Log_debug}

put DEBUG log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## info(msg) {#Log_info}

put INFO log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## notice(msg) {#Log_notice}

put NOTICE log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## warn(msg) {#Log_warn}

put WARN log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## fatal(msg) {#Log_fatal}

put FATAL log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## crit(msg) {#Log_crit}

put CRIT log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## alert(msg) {#Log_alert}

put ALERT log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |

-----
## emerg(msg) {#Log_emerg}

put EMERG log

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | dict<string,any>? | properties |
