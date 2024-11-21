@page pg_feat_proptree Property Tree

# What's It?

PropTree means an meta-accessible structure.  
useful to processing deep variants such as meta-programming. 


# Import

## for web

(todo)  

## for Node/Deno

```
import PropTreeContainer from 'api/proptree.js';
```
importing name can redefine in your wish.  


# How to Use

## Mono Mode

store a only one value.  

```
var t1=PropTreeContainer.create();
console.log(t1.getType()); // will get 0 (EMPTY)
t1.set('Test'); // t1='Test' 
console.log(t1.getType()); // will get 1 (MONO)
console.log(t1.get()); // will get 'Test' 
t1.cut(); // t1=undefined 
console.log(t1.get()); // will get undefined 
console.log(t1.getType()); // will get 0 (EMPTY)
```

## Array Mode

for sequential store.  

```
var t2=PropTreeContainer.create([],true);
t2.push(1); // t2=[1]
t2.push('2'); // t2=[1,'2'] 
t2.unshift(-3); // t2=[-3,1,'2'] 
t2.push(4); // t2=[-3,1,'2',4] 
console.log(t2.count()); // will get 4 
console.log(t2.get(1)); // will get 1 
t2.cut(1); // t2=[-3,'2',4] 
console.log(t2.count()); // will get 3
console.log(t2.pop()); // will get 4 and cut out 
console.log(t2.count()); // will get 2
console.log(t2.shift()); // will get -3 and cut out 
console.log(t2.count()); // will get 1
```

## Prop Mode

```
var t3=PropTreeContainer.create({},true);
t3.set('a',1); // t3:a=1 
t3.set('b','2'); // t3:b='2' 
t3.set('c',-3); // t3:c=-3
console.log(t3.count()); // will get 3
console.log(t3.get('b')); // will get '2' 
cut('b'); // t3={a:1,c:-3}
console.log(t3.count()); // will get 2
```

## Deep Access

```
t3.set('d','a',-1); // t3:d:a=-1
t3.set(['d','b'],-2); // t3:d:b=-2
console.log(t3.count('d')); // count of t3:d 
console.log(t3.get('d','b')); // will get -2 
console.log(t3.get(['d','a'])); // will get -1
```

## Subinstance

```
var t3e=t3.dig('d','e'); // create and ref t3:d:e
t3e.set('f','G'); // t3e:f=G (also t3:d:e:f=G) 
console.log(t3.get('d','e','f')); // will get 'G'

var t3d=t3.ref('d'); // ref subinstance 
console.log(t3d.get('a')); // will get -1 
```

## Merging

```
t3.merge('d',{e:{g:'HIJ',m:3.33}});
console.log(t3.getType('d')); // will get 3 (PROP)
console.log(t3.get('d','e','m')); // will get 3.33
console.log(t3.get('d','e','f')); // will get 'G' 
```

### Merge vs Set 

```
t3.set('d2',{e:{g:'HIJ',m:3.33}}); // set object directly 
console.log(t3.getType('d2')); // will get 1 (MONO)
console.log(t3.get('d2','e','g')); // will get undefined (cannot access by subinstance) 
console.log(t3.get('d2').e.g); // will get 'HIJ'
```

## Store Type Conversion

writeing methods may convert to do.  

```
console.log(t2.getType()); // will get 2 (ARRAY)
t2.set(2,5); // t2:2=5
console.log(t2.getType()); // will get 2 (ARRAY)
t2.set('x',true); // t2:x='x'
console.log(t2.getType()); // will get 3 (PROP)
console.log(t2.get('x')); // will get 'x' 
t2.push(0); // t2:3=0 
console.log(t2.getType()); // will get 2 (ARRAY)
console.log(t2.get('x')); // will gt undefined (converted to an array, and key is missing) 
console.log(t2.get(2)); // will get true
```

## Iteration

```
t3.each((k,t)=>{log.info('['+k+']='+JSON.stringify(t.export()));});
```

## Importing

```
var src={a:10,b:['11',-12]}

var t4=proptree.create(src,false); // mono store 
console.log(t4.get('a')); // undefined 
console.log(t4.get()); // can get all only

var t5=proptree.create(src,true); // deep prop store 
console.log(t5.get('a')); // 10
```

## Exporting

```
console.log(t3.export());
```


# Class Reference

@sa @ref pg_class_proptree @n
	@ref pg_class_proptree_container @n
