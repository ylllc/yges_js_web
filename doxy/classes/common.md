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
# Unions

-----
## LoadedFile {#Common_LoadedFile}

| Type | Means |
|------|-------|
| string | loaded as text |
| ArrayBuffer | loaded binary buffer |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## InitID() {#Common_InitID}

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
## NextID() {#Common_NextID}

### Spec

NextID():int

### Returns

(tiny) identifiable number.  

### Notes

- calling over 2147483648 times, returns same to 1st returns repeatedly.  

-----
## CreateEnum() {#Common_CreateEnum}

### Spec

CreateEnum(src):dict<string,int>

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | enum name table |

### Returns

reverse lookup table of src.  

-----
## SetDefault() {#Common_SetDefault}

complement default values.  
undefined members set with default.  

### Spec

SetDefault(dst,def):dict

### Args

| Name | Type | Means |
|------|------|-------|
| dst | dict | complement target |
| def | dict | default values |

### Returns

complemented structure  

-----
## FromError() {#Common_FromError}

### Spec

FromError(err):@ref Common_HappenedError

### Args

| Name | Type | Means |
|------|------|-------|
| err | Error | happened error |

### Returns

extract for @ref pg_class_happening

-----
## JustString() {#Common_JustString}

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
## Inspect() {#Common_Inspect}

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
## InitFrontend() {#Common_InitFrontend}

(web only)  
initialize for frontend.  

### Spec

InitFrontend(moduleplace,viewplace=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| moduleplace | @ref pg_class_qht? | downloaded HTML resources placed in (or cannot apply CSS and JS) |
| viewplace | @ref pg_class_qht? | show download monitor in (or hidden) |

-----
## LoadCSS() {#Common_LoadCSS}

(web only)  
download CSS source and apply.  

### Premises

call @ref Common_InitFrontend with moduleplace  

### Spec

LoadCSS(url,label=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| url | string | download from |
| label | string | keep as label (or same to url) |

### Promisings

call LoadSync() and wait for it.  

### Notes

- loaded content put on an Element. required a module place targetted by @ref Common_InitFrontend

-----
## LoadJS() {#Common_LoadJS}

(web only)  
download JS source and apply.  

### Premises

call @ref Common_InitFrontend with moduleplace  

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

- loaded content put on an Element. required a module place targetted by @ref Common_InitFrontend
- can unload, but loaded structures are not removed.  

-----
## LoadJSON() {#Common_LoadJSON}

(web only)  
download JSON source and parse.  

### Premises

call @ref Common_InitFrontend  

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
## LoadSync() {#Common_LoadSync}

(web only)  
wait for downloads.

### Premises

call @ref Common_InitFrontend  

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
## Peek() {#Common_Peek}

(web only)  
access to a downloaded content.  

### Premises

call @ref Common_InitFrontend  

### Spec

Peek(label):any

### Args

| Name | Type | Means |
|------|------|-------|
| label | string | download label |

### Returns

downloaded content.  

-----
## Unload() {#Common_Unload}

(web only)  
remove a downloaded content.  

### Premises

call @ref Common_InitFrontend  

### Spec

Unload(label):void

### Args

| Name | Type | Means |
|------|------|-------|
| label | string | download label |

-----
## DisposeMonitor() {#Common_DisposeMonitor}

(web only)  
remove the download monitor.  

### Premises

call @ref Common_InitFrontend  

### Spec

DisposeMonitor(label):void

-----
## LocalSave() {#Common_LocalSave}

(web only)  
save a content to local file.  

### Premises

call @ref Common_InitFrontend  

### Spec

LocalSave(data,name='',type='application/octet-stream'):void  

### Args

| Name | Type | Means |
|------|------|-------|
| data | binary | saving source |
| name | string | default file name |
| type | string | content type |

-----
## LocalLoad() {#Common_LocalLoad}

(web only)  
load a content from local file.  

### Premises

call @ref Common_InitFrontend  

### Spec

LocalLoad(textmode,filter,cb_done,cb_fail=null,cb_cancel=null):void

| Name | Type | Means |
|------|------|-------|
| textmode | bool | read as string (or ArrayBuffer) |
| filter | string | file type filter |
| cb_done | func<Common_LoadedFile> | loading success |
| cb_fail | func<Error> | loading failure |
| cb_cancel | func | loading canceled |
