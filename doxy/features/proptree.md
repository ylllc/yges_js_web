@page pg_feat_proptree Property Tree

# What's It?

PropTree means an meta-accessible structure.  
useful to processing deep variants such as meta-programming. 

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/proptree.js"></script>
```
use YgEs.PropTree

## for Node/Deno

```
import PropTree from 'api/proptree.js';
```
importing name can redefine in your wish.  
and can use YgEs.PropTree too.  

-----
# How to Use

-----
## Mono Mode

store a only one value.  

```
var t1=PropTree.Create();
console.log(t1.GetType()); // will get 0 (EMPTY)
t1.Set('Test'); // t1='Test' 
console.log(t1.GetType()); // will get 1 (MONO)
console.log(t1.Get()); // will get 'Test' 
t1.cut(); // t1=undefined 
console.log(t1.Get()); // will get undefined 
console.log(t1.GetType()); // will get 0 (EMPTY)
```

-----
## Array Mode

for sequential store.  

```
var t2=PropTree.Create([],true);
t2.Push(1); // t2=[1]
t2.Push('2'); // t2=[1,'2'] 
t2.Unshift(-3); // t2=[-3,1,'2'] 
t2.Push(4); // t2=[-3,1,'2',4] 
console.log(t2.Count()); // will get 4 
console.log(t2.Get(1)); // will get 1 
t2.Cut(1); // t2=[-3,'2',4] 
console.log(t2.Count()); // will get 3
console.log(t2.Pop()); // will get 4 and cut out 
console.log(t2.Count()); // will get 2
console.log(t2.Shift()); // will get -3 and cut out 
console.log(t2.Count()); // will get 1
```

-----
## Prop Mode

```
var t3=PropTree.Create({},true);
t3.Set('a',1); // t3:a=1 
t3.Set('b','2'); // t3:b='2' 
t3.Set('c',-3); // t3:c=-3
console.log(t3.Count()); // will get 3
console.log(t3.Get('b')); // will get '2' 
Cut('b'); // t3={a:1,c:-3}
console.log(t3.Count()); // will get 2
```

-----
## Deep Access

```
t3.Set('d','a',-1); // t3:d:a=-1
t3.Set(['d','b'],-2); // t3:d:b=-2
console.log(t3.Count('d')); // count of t3:d 
console.log(t3.Get('d','b')); // will get -2 
console.log(t3.Get(['d','a'])); // will get -1
```

-----
## Subinstance

```
var t3e=t3.Dig('d','e'); // create and ref t3:d:e
t3e.Set('f','G'); // t3e:f=G (also t3:d:e:f=G) 
console.log(t3.Get('d','e','f')); // will get 'G'

var t3d=t3.Ref('d'); // ref subinstance 
console.log(t3d.Get('a')); // will get -1 
```

-----
## Merging

```
t3.Merge('d',{e:{g:'HIJ',m:3.33}});
console.log(t3.GetType('d')); // will get 3 (DICT)
console.log(t3.Get('d','e','m')); // will get 3.33
console.log(t3.Get('d','e','f')); // will get 'G' 
```

### Merge vs Set 

```
t3.Set('d2',{e:{g:'HIJ',m:3.33}}); // set object directly 
console.log(t3.GetType('d2')); // will get 1 (MONO)
console.log(t3.Get('d2','e','g')); // will get undefined (cannot access by subinstance) 
console.log(t3.Get('d2').e.g); // will get 'HIJ'
```

-----
## Store Type Conversion

writeing methods may convert to do.  

```
console.log(t2.GetType()); // will get 2 (ARRAY)
t2.Set(2,5); // t2:2=5
console.log(t2.GetType()); // will get 2 (ARRAY)
t2.Set('x',true); // t2:x='x'
console.log(t2.GetType()); // will get 3 (DICT)
console.log(t2.Get('x')); // will get 'x' 
t2.Push(0); // t2:3=0 
console.log(t2.GetType()); // will get 2 (ARRAY)
console.log(t2.Get('x')); // will gt undefined (converted to an array, and key is missing) 
console.log(t2.Get(2)); // will get true
```

-----
## Iteration

```
t3.Each((k,t)=>{log.Info('['+k+']='+JSON.stringify(t.Export()));});
```

-----
## Importing

```
var src={a:10,b:['11',-12]}

var t4=proptree.Create(src,false); // mono store 
console.log(t4.Get('a')); // undefined 
console.log(t4.Get()); // can get all only

var t5=proptree.Create(src,true); // deep prop store 
console.log(t5.Get('a')); // 10
```

-----
## Exporting

```
console.log(t3.Export());
```

-----
# Class Reference

@sa @ref pg_class_proptree @n
	@ref pg_class_proptree_container @n
