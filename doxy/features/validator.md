@page pg_feat_validator Validator

# What's It?

values checking with user definition.  

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
## Validation

### Simple Type

```
let be_null=YgEs.Validate(null,{Nullable:true});
let be_true=YgEs.Validate(true,{Boolable:true});
let be_int=YgEs.Validate(-12,{Integer:true});
let be_float=YgEs.Validate(-12.345,{Numeric:true});
let be_string=YgEs.Validate('123',{Literal:true});
```

### Fix by Constraints

```
// warning and force fix to Integer 
let be_int=YgEs.Validate(-12.345,{Integer:true});

// warning and force fix to Literal 
let be_string=YgEs.Validate(123,{Literal:true});

// warning and force fix to Boolean 
let be_true=YgEs.Validate(1,{Boolable:true});
```

### for Array

```
// check array type only 
let be_array_0=YgEs.Validate([0,false,'0'],{List:true});

// check array type and elements 
let be_array_1=YgEs.Validate([0,1,-2],{List:{Integer:true}});
```

### for Object

objects categorized Dict, Struct and Class in each usage.  

```
// check object type only (here are same procedures) 
let be_obj1=YgEs.Validate({a:true,b:'2',c:3},{Dict:true});
let be_obj2=YgEs.Validate({a:true,b:'2',c:3},{Struct:true});

// check with Dict 
// uses in same type with any keys 
let be_dict=YgEs.Validate({a:1,b:2,c:3},{Dict:{Integer:true}});

// check with Struct 
// uses with specified keys and types
let be_struct=YgEs.Validate({a:true,b:'2',c:3},{Struct:{
	a:{Boolable:true},
	b:{Literal:true},
	c:{Integer:true},
}});

// check with Class by a constructor, for standard instance 
let be_date=YgEs.Validate(new Date(),{Class:Date});

// check with Class by a string, for @ref pg_feat_softclass 
let be_sc=YgEs.Validate(YgEs.SoftClass(),{Class:'YgEs.SoftClass'});

```

### Multi Types

```
// true, false and null granted 
let be_trinary=YgEs.Validate(null,{Boolable:true,Nullable:true});

// Error instance or null 
let target_error=YgEs.Validate(null,{Nullable:true,Class:Error});
```


### Limits

```
// limits between 0~100, and clamp it 
let br_ranged=YgEs.Validate(123,{Integer:true,Min:0,Max:100});

// limit 5 letters, and tranc it 
let br_trunced=YgEs.Validate('abcdefg',{Literal:true,Max:5});

// warning by empty string (cannot fix) 
let br_empty=YgEs.Validate('',{Literal:true,Min:1});

// object keys only (invalid values become undefined)
let br_key=YgEs.Validate('o',{Key:{'a':'A','b':'B','o':'O','ab':'AB'}});
// array index only (invalid values become undefined)
let br_idx=YgEs.Validate(2,{Key:['A','B','C','D','E']});

```


### Complements

apply a default value to undefined

```
// default value 
let complementes=YgEs.Validate(undefined,{Default:123});

// null is not undefined, and cannot overwrite 
let still_null=YgEs.Validate(null,{Default:123});

// List initialized with empty array 
let empty_array=YgEs.Validate(undefined,{List:true});

// Dict initialized with empty object 
let empty_obj=YgEs.Validate(undefined,{Dict:true});

// but Struct still undefined 
let still_undef=YgEs.Validate(undefined,{Struct:true});

```

### Required

warning by undefined

```
let be_warn=YgEs.Validate(undefined,{Required:true});
```

### User Validator

```
// check 
let filtered=YgEs.Validate('XYZ',{Any:true,Validator:(src,attr,tag)=>{
	//	:
	// check src and fix it 
	//	:
	return src; // when no errors 
}});

```

-----
## Trivia

### Complementation with Empty Object 

```
// returns [] 
let o1=YgEs.Validate(undefined,{List:true});

// returns {} 
let o2=YgEs.Validate(undefined,{Dict:true});

// returns undefined 
let o3=YgEs.Validate(undefined,{Struct:true});

// returns undefined 
let o4=YgEs.Validate(undefined,{Class:Object});

```

### Special Meaning of null and undefined

```
// returns -123 
// (complemented by Default) 
let v1=YgEs.Validate(undefined,{Default:-123});

// returns -123 
// (null is invalid, become undefined temporarily, and complemented by Default) 
let v2=YgEs.Validate(null,{Default:-123});

// returns null 
// (null is valid, and not complemented) 
let v3=YgEs.Validate(null,{Nullable:true,Default:-123});

```

### Deep Validation Brings a Deep Copy

```

// quick validation 
let src={A:12}
let dst=YgEs.Validate(src,{Struct:true});
src.A=123;

// dst is reference of src 
// and dst.A become 123 too 

// deep validation 
dst=YgEs.Validate(src,{Struct:{A:{Numeric:true}}});
src.A=234;

// dst is new object 
// and dst.A keep 123 after src changed 

```

### Keep Class Instances after Cloning

```

let src={S:{S1:'SafeCloneTest',S2:'OK'},T:new Date()}
let dst1=YgEs.Clone(src);
let dst2=YgEs.Validate(src,{Clone:true,Struct:{
	S:{Struct:true},
	T:{Class:Date},
}});

// dst1.T is broken  
// dst2.T kept a Date instance  

```

-----
# Class Reference

@sa @ref pg_class_common
