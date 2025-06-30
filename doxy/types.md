@page pg_type Types

# Types

all types in Yggdrasil Essence for JavaScript are pseudoly.  

## Namespaces

are simple Object.  
can access from global YgEs.  

## Classes

are simple Object too.  
instances created by some fuctions in YgEs.  

## Structures

are simple Object too.  
means set of values.  

## Unions 

can select some types.  

## Enums

are Object via Object.freeze()  
are read only.  

## ?

null or undefined allowed.  
usually null and undefined are equivalence unless special distinction.   

## ...

can range in args.  

## Others

distinguished for convenience.  

| Type | Means |
|------|-------|
| void | is undefined, return value is not exist |
| int | is number, fractions are invalid |
| float | is number, fractions are valid |
| dict | is object, key indexed values, includes array |
| struct | is object, key value stores |
| func | is function, mere abbreviation |
| mono | is string, number, bool, and null |
| poly | is object or array, and not null |
