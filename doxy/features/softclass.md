@page pg_feat_softclass Soft Class

# What's It?

class like structure for JavaScript.  
it's not imitation from other language,
and designed in unique characteristics for JavaScript specific.  

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs

## for Node/Deno

```
import YgEs from 'api/common.js';
```
importing name can redefine in your wish.  
and can use YgEs too.  

-----
# How to Use

-----
## Primal Instance

all soft classes inherit from a Primal Instance.  
create first, without any your definition.  

```
const obj=YgEs.SoftClass();
```

-----
## Class Inheritance

your class definition applies to a SoftClass instance.  

```
const priv=obj1.Extend('YourClassName',{
	// private members 
},{
	// public members 
	NewFunc:()=>'OK',
});

```

-----
### Private Members

Extend() returns a private scope instance within your private definitions.  
generally, all private members can access via this instance.  

these members are not overridden from subclasses.  
same name members in subclass can exist parallel.  

-----
### Refer Public Instance from Private

private instances added a prop named _public  
it refer a public instance chained from private.  

```
// they are same 
obj1.NewFunc(); 
priv._public.NewFunc();
```

-----
### Private Backdoor

for debug, set YgEs.ShowPrivate=true to load the private scope instance to public.  
to caution again, for debug, don't access casually.  
set YgEs.ShowPrivate=false to load a empty instance inplace of it.  

```
Log.Debug("debug private info",obj._private_['YourClassName']);
Log.Debug("debug inherit info",obj._inherit_);
```

-----
## Function Inheritance

overridden public members by Extend() are overwritten fully,  
and cannot access ever.  

call Inherit() instead of, and keep returned value.  
it means a super definition and can access it.  

```
const super=obj.Inherit('FuncName',()=>{

	// call super method 
	super();

	// overridden procedure 
		:
});

```

-----
## Trait

SoftClass can extend side definition.  
(likes of PHP trait)  
it's not subclass and keep destination inheritance.  

```
const priv=obj1.Trait('YourTraitName',{
	// private members 
},{
	// public members 
});

```

### Untrait

traited class can remove.  

```
obj1.Untrait('YourTraitName');

// public members on YourTraitName are undefined too 

```

-----
## Inheritance Check

SoftClass can check inheritance by Extend() or Trait().  

```
Log.Info(obj.Name+' is instance of YourClassName?: '+YgEs.Inspect(obj.IsComprised('YourClassName')));

```

-----
## Instance Name

obj.Name can overwrite in your wish, and indicate custom label.  
obj.GetCaption() get it when set, or class name instead of.  


-----
## Extra User Definition

obj.User is a free scope,  
and can rewrite in your wish.  


-----
# Class Reference

@sa @ref pg_class_softclass
