@page pg_class_util Util

# What's It?

@sa @ref pg_feat_trivia @n
	@ref pg_feat_safeiter @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Util | utilities |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Callbacks

-----
## CB_StepIter {#Util_CB_StepIter}

### Spec

CB_StepIter(cnt):bool?

### Args

| Name | Type | Means |
|------|------|-------|
| cnt | number | stepping counter |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

### Implements

loop procedure from @ref Util_SafeStepIter  

-----
## CB_ArrayIter {#Util_CB_ArrayIter}

### Spec

CB_ArrayIter(val):bool?

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | value in the array |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

### Implements

loop procedure from @ref Util_SafeArrayIter  

-----
## CB_DictIter {#Util_CB_DictIter}

### Spec

CB_DictIter(val):bool?

### Args

| Name | Type | Means |
|------|------|-------|
| key | any | key in the object |
| val | any | value in the object |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

### Implements

loop procedure from @ref Util_SafeDictIter  

-----
# Methods

-----
## IsJustNaN() {#Util_IsJustNaN}

### Spec

IsJustNaN(val):bool

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | check source |

### Returns

just NaN.  

-----
## IsJustInfinity() {#Util_IsJustInfinity}

### Spec

IsJustInfinity(val):bool

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | check source |

### Returns

just Infinity or -Infinity.  

-----
## IsEmpty() {#Util_IsEmpty}

### Spec

IsEmpty(val):bool

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | check source |

### Returns

null, undefined, empty string returns true.  
otherwise false.  

-----
## IsValid() {#Util_IsValid}

### Spec

IsValid(val):bool

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | check source |

### Returns

null, undefined, NaN returns false.  
otherwise true.  

-----
## IsPoly() {#Util_IsPoly}

### Spec

IsPoly(val):bool

### Args

| Name | Type | Means |
|------|------|-------|
| val | any | check source |

### Returns

array, object nut null returns true.  
otherwise false.  

-----
## Booleanize() {#Util_Booleanize}

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
## Trinarize() {#Util_Trinarize}

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
otherwize sami to Booleanize()

-----
## FillZero() {#Util_FillZero}

### Spec

FillZero(val,col,sgn=false):string

### Args

| Name | Type | Means |
|------|------|-------|
| val | number | source number |
| col | int | minimum letters (too long string is return through) |
| sgn | bool | use + sign |

### Returns

zero filled string.  
can uses for negative numbers.  

-----
## SafeStepIter() {#Util_SafeStepIter}

async-safe step loop,  
instead of for(var cnt=bgn;(step<0)?(cnt>end):(cnt<end);cnt+=step)  

### Spec

SafeStepIter(bgn,end,step,cb_iter):number

### Args

| Name | Type | Means |
|------|------|-------|
| bgn | number | start value |
| end | number | end value |
| step | number | step delta |
| cb_iter | @ref Util_CB_StepIter | loop procedure |

### Returns

next counter (same to for() counter)

-----
## SafeArrayIter() {#Util_SafeArrayIter}

async-safe array iterator,  
instead of for(var val of array)  

### Spec

SafeArrayIter(src,cb_iter):void

### Args

| Name | Type | Means |
|------|------|-------|
| src | any[] | source array |
| cb_iter | @ref Util_CB_ArrayIter | loop procedure |

-----
## SafeDictIter() {#Util_SafeDictIter}

async-safe object iterator,  
instead of for(var key in object)  

### Spec

SafeDictIter(src,cb_iter):void

### Args

| Name | Type | Means |
|------|------|-------|
| src | object | source object |
| cb_iter | @ref Util_CB_DictIter | loop procedure |
