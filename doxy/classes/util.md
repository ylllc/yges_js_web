@page pg_class_util Utilities

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
# Callbacks

-----
## CBStepIter {#CBStepIter}

| Name | Type | Means |
|------|------|-------|
| cnt | number | stepping counter |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

-----
## CBArrayIter {#CBArrayIter}

| Name | Type | Means |
|------|------|-------|
| val | any | value in the array |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

-----
## CBDictIter {#CBDictIter}

| Name | Type | Means |
|------|------|-------|
| key | any | key in the object |
| val | any | value in the object |

### Returns

| Value | Means |
|-------|-------|
| false | break iter |
| other | continue |

-----
# Methods

-----
## isJustNaN(val):bool

### Returns

just NaN.  

-----
## isJustInfinity(val):bool

### Returns

just Infinity or -Infinity.  

-----
## isEmpty(val):bool

### Returns

null, undefined, empty string returns true.  
otherwise false.  

-----
## isValid(val):bool

### Returns

null, undefined, NaN returns false.  
otherwise true.  

-----
## booleanize(val,stringable=false):bool

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
## trinarize(val,stringable=false):bool?

### Args

| Name | Type | Means |
|------|------|-------|
| val | number | source value |
| stringable | bool | include stringified value |

### Returns

fix to bool or null.  
null and undefined become null, stringified too.  
otherwize sami to booleanize()

-----
## zerofill(val,col,sgn=false):string

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
## safeStepIter(bgn,end,step,cbiter):number

async-safe step loop,  
instead of for(var cnt=bgn;(step<0)?(cnt>end):(cnt<end);cnt+=step)  

### Args

| Name | Type | Means |
|------|------|-------|
| bgn | number | start value |
| end | number | end value |
| step | number | step delta |
| cbiter | @ref CBStepIter | loop procedure |

### Returns

next counter (same to for() counter)

-----
## safearrayiter(src,cbiter)

async-safe array iterator,  
instead of for(var val of array)  

### Args

| Name | Type | Means |
|------|------|-------|
| src | any[] | source array |
| cbiter | @ref CBArrayIter | loop procedure |

-----
## safedictiter(src,cbiter)

async-safe object iterator,  
instead of for(var key in object)  

### Args

| Name | Type | Means |
|------|------|-------|
| src | object | source object |
| cbiter | @ref CBDictIter | loop procedure |
