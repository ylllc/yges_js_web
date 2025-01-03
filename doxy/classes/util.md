﻿@page pg_class_util Utilities

# What's It?

@sa @ref pg_feat_trivia @n
	@ref pg_feat_safeiter @n

# Methods

## isJustNaN(val):bool

### Returns

just NaN.  


## isJustInfinity(val):bool

### Returns

just Infinity or -Infinity.  


## isEmpty(val):bool

### Returns

null, undefined, empty string returns true.  
otherwise false.  


## isValid(val):bool

### Returns

null, undefined, NaN returns false.  
otherwise true.  


## booleanize(val,stringable=false):bool

### Args

Name | Type | Means
-----|------|------
val | number | source value
stringable | bool | include stringified value

### Returns

fix to bool.  

number means nonzero.  
(include NaN)     

stringified 'null' 'undefined' 'false' '0' become false in stringable mode.  
(include uppercase and pointed zero range)  
other string means not empty.  

empty array and object bcome true.  

## trinarize(val,stringable=false):bool?

### Args

Name | Type | Means
-----|------|------
val | number | source value
stringable | bool | include stringified value

### Returns

fix to bool or null.  
null and undefined become null, stringified too.  
otherwize sami to booleanize()


## zerofill(val,col,sgn=false):string

### Args

Name | Type | Means
-----|------|------
val | number | source number
col | int | minimum letters (too long string is return through)
sgn | bool | use + sign

### Returns

zero filled string.  
can uses for negative numbers.  


## justString(val):string

### Returns

fix to string.  
uses for logging instead of toString().  


## inspect(val):string

### Returns

fix to inspectable string.  
uses for debugging instead of JSON.stringify().  


## safeStepIter(bgn,end,step,cbiter):number

async-safe step loop,  
instead of for(var cnt=bgn;(step<0)?(cnt>end):(cnt<end);cnt+=step)  

### Args

Name | Type | Means
-----|------|------
bgn | number | start value
end | number | end value
step | number | step delta
cbiter | function<StepIter> | loop procedure

### Returns

next counter (same to for() counter)

## Type: function<StepIter>:trinary

Name | Type | Means
-----|------|------
cnt | number | stepping counter

### Returns

Value | Means
----- | -----
false | break iter
other | continue

## safearrayiter(src,cbiter)

async-safe array iterator,  
instead of for(var val of array)  

### Args

Name | Type | Means
-----|------|------
src | array | source array
cbiter | function<ArrayIter> | loop procedure

## Type: function<ArrayIter>:trinary

Name | Type | Means
-----|------|------
val | any | value in the array

### Returns

Value | Means
----- | -----
false | break iter
other | continue


## safedictiter(src,cbiter)

async-safe object iterator,  
instead of for(var key in object)  

### Args

Name | Type | Means
-----|------|------
src | object | source object
cbiter | function<DictIter> | loop procedure

## Type: function<DictIter>:trinary

Name | Type | Means
-----|------|------
key | any | key in the object
val | any | value in the object

### Returns

Value | Means
----- | -----
false | break iter
other | continue
