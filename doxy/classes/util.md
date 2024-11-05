@page pg_class_util Utilities

# What's It?

@sa @ref pg_feat_safeiter


# Methods


## safestepiter(bgn,end,step,cbiter):number

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

## Type: function<StepIter>:boolean?

Name | Type | Means
-----|------|------
cnt | number | stepping counter

### Returns

just false means break from the loop.  
or continue.  

## safearrayiter(src,cbiter)

async-safe array iterator,  
instead of for(var val of array)  

### Args

Name | Type | Means
-----|------|------
src | array | source array
cbiter | function<ArrayIter> | loop procedure

## Type: function<ArrayIter>:boolean?

Name | Type | Means
-----|------|------
val | any | value in the array

### Returns

just false means break from the loop.  
or continue.  


## safedictiter(src,cbiter)

async-safe object iterator,  
instead of for(var key in object)  

### Args

Name | Type | Means
-----|------|------
src | object | source object
cbiter | function<DictIter> | loop procedure

## Type: function<DictIter>:boolean?

Name | Type | Means
-----|------|------
key | any | key in the object
val | any | value in the object

### Returns

just false means break from the loop.  
or continue.  

