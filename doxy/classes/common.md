@page pg_class_common YgEs

# What's It?

@sa @ref pg_feat_common @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs | common store |

-----
# Structures

-----
## HappenedError {#Common_HappenedError}

Error caught in @ref pg_class_happening

| Name | Type | Means |
|------|------|-------|
| Name | string | error class name |
| Msg | string | error message |
| File | string? | happened source file path |
| Line | int? | happened source file line |
| Col | int? | happened source file column |
| Stack | any | stack tarace |
| Src | Error? | error instance |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## InitID {#Common_InitID}

reset params for @ref Common_NextID

### Spec

InitID(init,delta=null)

### Args

| Name | Type | Means |
|------|------|-------|
| init | int | any 31bit value |
| delta | int | any 31bit prime value, except 2 |

### Notes

- some YgEs classes use @ref Common_NextID. resetting after them may makes conflict.
- feeding 2 or nonprime delta affect short to making ID cycle.  

-----
## NextID {#Common_NextID}

### Spec

NextID():int

### Returns

(tiny) identifiable number.  

### Notes

- calling over 2147483648 times, returns same to 1st returns repeatedly.  

-----
## CreateEnum {#Common_CreateEnum}

### Spec

CreateEnum(src):dict<string,int>

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | enum name table |

### Returns

reverse lookup table of src.  

-----
## FromError {#Common_FromError}

### Spec

FromError(err):@ref Common_HappenedError

### Args

| Name | Type | Means |
|------|------|-------|
| err | Error | happened error |

### Returns

extract for @ref pg_class_happening

-----
## JustString {#Common_JustString}

### Spec

JustString(val):string

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | source value |

### Returns

fix to string.  
uses for logging instead of toString().  

-----
## Inspect {#Common_Inspect}

### Spec

Inspect(val):string

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | source value |

### Returns

fix to inspectable string.  
uses for debugging instead of JSON.stringify().  

-----
## InitFrontend {#Common_InitFrontend}

(web only)  
initialize for frontend.  

### Spec

InitFrontend(moduleplace,viewplace=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| moduleplace | QHT | downloaded HTML resources placed in |
| viewplace | QHT? | show download monitor in (or hidden) |

-----
## LoadCSS {#Common_LoadCSS}

(web only)  
download CSS source and apply.  

### Premises

call InitFrontend()  

### Spec

LoadCSS(url,label=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| url | string | download from |
| label | string | keep as label (or same to url) |

### Promisings

call LoadSync() and wait for it.  

-----
## LoadJS {#Common_LoadJS}

(web only)  
download JS source and apply.  

### Premises

call InitFrontend()  

### Spec

LoadJS(url,depends,label=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| url | string | download from |
| depends | string[] | to apply, required labels wait for |
| label | string | keep as label (or same to url) |

### Promisings

call LoadSync() and wait for it.  

### Notes

- can unload, but loaded structures are not removed.  

-----
## LoadJSON {#Common_LoadJSON}

(web only)  
download JSON source and parse.  

### Premises

call InitFrontend()  

### Spec

LoadJSON(url,label=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| url | string | download from |
| label | string | keep as label (or same to url) |

### Promisings

call LoadSync() and wait for it.  

-----
## LoadSync {#Common_LoadSync}

(web only)  
wait for downloads.

### Premises

call InitFrontend()  

### Spec

LoadSync(cb_done=null,cb_abort=null,interval=null):@ref Timing_AsyncControlKit

### Args

| Name | Type | Means |
|------|------|-------|
| cb_done | func? | called on end of downloading |
| cb_abort | func? | called on aborted |
| interval | int? | waiting in msec |

### Returns

controller for this procedure.  

-----
## Peek {#Common_Peek}

(web only)  
access to a downloaded content.  

### Premises

call InitFrontend()  

### Spec

Peek(label):any

### Args

| Name | Type | Means |
|------|------|-------|
| label | string | download label |

### Returns

downloaded content.  

-----
## Unload {#Common_Unload}

(web only)  
remove a downloaded content.  

### Premises

call InitFrontend()  

### Spec

Unload(label):void

### Args

| Name | Type | Means |
|------|------|-------|
| label | string | download label |

-----
## DisposeMonitor {#Common_DisposeMonitor}

(web only)  
remove the download monitor.  

### Premises

call InitFrontend()  

### Spec

DisposeMonitor(label):void

