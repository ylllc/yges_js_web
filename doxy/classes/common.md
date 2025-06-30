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
## ValidateDefinitions {#Common_ValidateDefinitions}

definition for @ref Common_Validate

| Name | Type | Means |
|------|------|-------|
| Any | bool? | skip validation by types |
| Boolable | bool? | allows false and true |
| Callable | bool? | allows function |
| Class | @ref Common_ClassType? | allows object for used as a class instance |
| Clone | bool? | make deep copies each member, exclude Class instances |
| Default | any? | complement to undefined value |
| Dict | @ref Common_InnerType? | allows object for used as a dictionary, includes array |
| Integer | bool? | allows integer value, warning by fragments |
| Key | struct? | limited by struct keys |
| List | @ref Common_InnerType? | allows array |
| Literal | bool? | allows string value |
| Nullable | bool? | allows null |
| NaNable | bool? | allows NaN |
| Numeric | bool? | allows numeric value |
| Max | int? | maximum value or length |
| Min | int? | minimum value or length |
| Others | bool? | allows other keys in a structure |
| Required | bool? | warning by undefined |
| Struct | @ref Common_StructType? | allows object for used as a structure |
| Validator | @ref Common_UserValidator? | user validating function |

### Notes

- don't be mixed Class, Dict and Struct.  

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
## ClassType {#Common_ClassType}

| Type | Means |
|------|-------|
| string | @ref pg_class_softclass name |
| func | standard class constructor |

-----
## InnerType {#Common_InnerType}

| Type | Means |
|------|-------|
| bool | true means allow any type to inner values, and skip validating them |
| @ref Common_ValidateDefinitions | definition for inner value |

### Caution

true means skipping inner validation, and makes a reference of source.  


-----
## StructType {#Common_StructType}

| Type | Means |
|------|-------|
| bool | true means allow any type to inner values, and skip validating them |
| dict<string,@ref Common_ValidateDefinitions> | definition for each Structure members |

-----
## LoadedFile {#Common_LoadedFile}

| Type | Means |
|------|-------|
| string | loaded as text |
| ArrayBuffer | loaded binary buffer |

-----
# Callbacks

-----
## UserValidator {#Common_UserValidator}

customize filtering for @ref Common_Validate

### Spec

UserValidator(src,attr,tag=''):any

### Args

| Name | Type | Means |
|------|------|-------|
| src | any | checking value |
| attr | @ref Common_ValidateDefinitions | definitions |
| tag | string | variable name for log |

### Returns

filtered src

### Implements

filter src in your wish

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | struct | user definitions |

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
## CoreError() {#Common_CoreError}

an error happens,  
redirect to @ref pg_class_happening_manager when ready,  
or throw it.  

### Spec

CoreError(src,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| src | @ref HappeningManager_HappeningSource | happening source |
| prop | struct | extra properties |

-----
## CoreWarn() {#Common_CoreWarn}

a warning happens,  
redirect to @ref pg_class_happening_manager when ready,  
or log it.  

### Spec

CoreWarn(src,prop={}):void

### Args

| Name | Type | Means |
|------|------|-------|
| src | @ref HappeningManager_HappeningSource | happening source |
| prop | struct | extra properties |

-----
## Clone() {#Common_Clone}

### Spec

Clone(src):any

| Name | Type | Means |
|------|------|-------|
| src | any | copy source |

### Returns

cloned value

### Caution

class instances should broken  
use @ref Common_Validate instead of  

-----
## Validate() {#Common_Validate}

@sa pg_feat_validator

### Spec

Validate(src,attr,tag='',dcf=false):any

### Args

| Name | Type | Means |
|------|------|-------|
| src | any | checking value |
| attr | @ref Common_ValidateDefinitions | definitions |
| tag | string? | variable name for log |
| dcf | bool? | make deep copies |

### Returns

checked and filtered value

-----
## InstanceOf() {#Common_InstanceOf}

### Spec

InstanceOf(obj,name):bool

### Args

| Name | Type | Means |
|------|------|-------|
| obj | any | check target |
| name | string | name of @ref SoftClass_Extend or @ref SoftClass_Trait |

### Returns

true means @ref pg_class_softclass instance and extended for the class  

-----
## SoftClass() {#Common_SoftClass}

### Spec

SoftClass(name=undefined,user=undefined):@ref pg_class_softclass

### Args

| Name | Type | Means |
|------|------|-------|
| name | string? | any name defined by user |
| user | struct? | any structure defined by user |

### Returns 

a new SoftClass instance

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
## Booleanize() {#Common_Booleanize}

### Spec

Booleanize(val,stringable=false):bool

### Args

| Name | Type | Means |
|------|------|-------|
| val | number | source value |
| stringable | bool | include stringified value |

### Returns

fix to bool.  

number means nonzero.  
(include NaN)     

stringified 'null' 'undefined' 'false' '0' become false in stringable mode.  
(include uppercase and pointed zero range)  
other string means not empty.  

empty array and object bcome true.  

-----
## Trinarize() {#Common_Trinarize}

### Spec

Trinarize(val,stringable=false):bool?

### Args

| Name | Type | Means |
|------|------|-------|
| val | number | source value |
| stringable | bool | include stringified value |

### Returns

fix to bool or null.  
null and undefined become null, stringified too.  
otherwize same to Booleanize()

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
