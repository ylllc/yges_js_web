@page pg_class_logger LocalLog

# What's It?

@sa @ref pg_feat_logger  
it inherited from @ref pg_class_softclass  

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
| Date | string | date by ISO8601 |
| Capt | string | caption |
| Lev | int | log level |
| Msg | @ref Log_LogSource | message |
| Prop | struct? | properties |
| Text | string? | formatted value |

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
| @ref Log_LEVEL | dict<string,int> | enum log levels |
| LEVEL_NAMES | string[] | name table of each log levels (NEVER not in) |

-----
## LEVEL {#Log_LEVEL}

| Name | Type | Means |
|------|------|-------| 
| TICK | int | ultra verbosely, for check transition in pollings |
| TRACE | int | more verbosely, for check steps in procedures |
| DEBUG | int | verbosely, for check important value |
| INFO | int | for notify normal info |
| NOTICE | int | for notify attentional info |
| WARN | int | for notify warning |
| FATAL | int | for notify continuable error |
| CRIT | int | for notify critical error |
| ALERT | int | for notify alert |
| EMERG | int | for notify emergency |
| NEVER | int | for use Showable, always suppressed |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| Showable | int? | minimum showable log level |
| Caption | string | caption |
| Format | @ref Log_CB_LogFormat | formatter |
| Way | @ref Log_CB_LogWay | output way |

-----
# Callbacks

-----
## CB_LogFormat {#Log_CB_LogFormat}

### Spec

CB_LogFormat(src):void

### Args

| Name | Type | Means |
|------|------|-------|
| logger | @ref pg_class_logger | caller instance |
| src | @ref Log_LogEntry | target log entry |

### Implements

format from src and put to src.Text  

-----
## CB_LogWay {#Log_CB_LogWay}

### Spec

CB_LogWay(src):void

### Args

| Name | Type | Means |
|------|------|-------|
| logger | @ref pg_class_logger | caller instance |
| src | @ref Log_LogEntry | target log entry |

### Implements

output from src  
usually, put src.Text  

-----
# Methods

-----
## GetInstanceID() {#Log_GetInstanceID}

### Spec

GetInstanceID():int

### Returns

instance ID created by @ref Common_NextID

-----
## CreateLocal() {#Log_CreateLocal}

create a new local log instance  

### Spec

CreateLocal(capt=undefined,showable=undefined):@ref pg_class_logger

### Args

| Name | Type | Means |
| -----|------|------ |
| capt | string? | caption (null means same to parent instance) |
| showable | int? | showablility (null means same to parent instance) |

### Returns

local logger instance.  
its settings inherited from this.  

-----
## CreateSplitter() {#Log_CreateSplitter}

create a new local log instance within splitting feature  

### Spec

CreateSplitter(capt=undefined,showable=undefined):@ref pg_class_log_splitter

### Args

| Name | Type | Means |
| -----|------|------ |
| capt | string? | caption (null means same to parent instance) |
| showable | int? | showablility (null means same to parent instance) |

### Returns

log splitter instance.  
its settings inherited from this.  

-----
## GetParent() {#Log_GetParent}

### Spec

GetParent():@ref pg_class_logger?

### Returns

parent instance or null.  

-----
## GetCaption() {#Log_GetCaption}

### Spec

GetCaption():string

### Returns

caption for this instance.  
it's this Caption when already set or parent setting.   

### Notes

- fully overridden and defferent from @ref SoftClass_GetCaption  

-----
## GetShowable() {#Log_GetShowable}

### Spec

GetShowable():int

### Returns

showable log level for this instance.  
it's this Showable when already set or parent setting.   

-----
## Put() {#Log_Put}

log width variable level.  
suppressed when lower than showable.  

### Spec

Put(lev,msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| lev | int | log level |
| msg | string | message |
| prop | struct? | properties |

-----
## Tick() {#Log_Tick}

put TICK log

### Spec

Tick(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Trace() {#Log_Trace}

put TRACE log

### Spec

Trace(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Debug() {#Log_Debug}

put DEBUG log

### Spec

Debug(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Info() {#Log_Info}

put INFO log

### Spec

Info(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Notice() {#Log_Notice}

put NOTICE log

### Spec

Notice(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Warn() {#Log_Warn}

put WARN log

### Spec

Warn(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Fatal() {#Log_Fatal}

put FATAL log

### Spec

Fatal(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Crit() {#Log_Crit}

put CRIT log

### Spec

Crit(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Alert() {#Log_Alert}

put ALERT log

### Spec

Alert(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |

-----
## Emerg() {#Log_Emerg}

put EMERG log

### Spec

Emerg(msg,prop=undefined):void

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message |
| prop | struct? | properties |
