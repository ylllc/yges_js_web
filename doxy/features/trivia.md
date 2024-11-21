@page pg_feat_trivia Trivia

# What's It?

JavaScript's variables lurked many trap.  
avoid them with clear functions.  


# Import

## for web

(todo)  

## for Node/Deno

```
import Util from 'api/util.js';
```
importing name can redefine in your wish.  

# How to Use

## Just NaN

```
// compareing operators always return false by NaN 
v = NaN;
f = (v==NaN); // false 
f = (v===NaN); // false 
f = Util.isJustNaN(v); // true 

// isNaN(v) means isNaN(v.toString()) 
v = undefined;
f = isNaN(v); // true 
f = Util.isJustNaN(v); // false 

v = {};
f = isNaN(v); // true 
f = Util.isJustNaN(v); // false 
```

## Just Infinity

```
// operator == return true when stringified 'Infinty'  
// (operator === is correct)  
v = Infinity;
f = (v=="Infinity"); // true
f = (v==="Infinity"); // false
f = Util.isJustInfinity(v); // true 

// isJustInfinity judges to both Infinity 
v = -Infinity;
f = (v===Infinity); // false
f = Util.isJustInfinity(v); // true 

// isFinite() is wondering... 
f = !isFinite(NaN); // true 
f = !isFinite(null); // false 
f = !isFinite(undefined); // true 
f = !isFinite('A'); // true 
f = !isFinite([]); // false 
f = !isFinite([0]); // false 
f = !isFinite([false]); // true 
f = !isFinite({}); // true 
// Util.isJustInfinity() returns false them.  

```

## Detect Empty

```
// operator ! (too loose)
f = !0; // true
f = !""; // true
f = !false; // true
f = !null; // true
f = !undefined; // true
f = ![]; // false
f = !{}; // false
f = !NaN; // true

// ==null (means none) 
f = null==null; // true 
f = null==undefined; // true 
f = null==""; // false 
f = null==[]; // false 
f = null=={}; // false 

// ==undefined (means none too) 
f = undefined==null; // true 
f = undefined==undefined; // true 
f = undefined==""; // false 
f = undefined==[]; // false 
f = undefined=={}; // false 

// isEmpty() (means none or empty string) 
f = Util.isEmpty(null); // true 
f = Util.isEmpty(undefined); // true 
f = Util.isEmpty(""); // true 
f = Util.isEmpty([]); // false 
f = Util.isEmpty({}); // false 
```

## Quick Validation

```
// operator !! (means not false, not zero, not empty, not NaN)
f = !!0; // false
f = !!1; // true
f = !!""; // false
f = !!"0"; // true
f = !!false; // false
f = !!null; // false
f = !!undefined; // false
f = !![]; // true
f = !!{}; // true
f = !!NaN; // false

// isValid() (means not invalid)
f = Util.isValid(0); // true
f = Util.isValid(1); // true
f = Util.isValid(""); // true
f = Util.isValid("0"); // true
f = Util.isValid(false); // true
f = Util.isValid(null); // false
f = Util.isValid(undefined); // false
f = Util.isValid([]); // true
f = Util.isValid({}); // true
f = Util.isValid(NaN); // false

```

## Booleanize

fix to bool.  

```
f = Util.booleanize(0); // false
f = Util.booleanize(1); // true
f = Util.booleanize(""); // false
f = Util.booleanize("0"); // true
f = Util.booleanize(".00"); // true
f = Util.booleanize("A"); // true
f = Util.booleanize(false); // false
f = Util.booleanize("false"); // true
f = Util.booleanize("FaLsE"); // true
f = Util.booleanize(null); // false
f = Util.booleanize("null"); // true
f = Util.booleanize(undefined); // false
f = Util.booleanize("undefined"); // true
f = Util.booleanize([]); // true
f = Util.booleanize({}); // true
f = Util.booleanize(NaN); // true
f = Util.booleanize("NaN"); // true
```

### Unstring Booleanize

include stringified values.  

```
f = Util.booleanize("0",true); // false
f = Util.booleanize(".00",true); // false
f = Util.booleanize("false",true); // false
f = Util.booleanize("FaLsE",true); // false
f = Util.booleanize("null",true); // false
f = Util.booleanize("undefined",true); // false
```

## Trinarize

fix to bool or null.  

```
f = Util.trinarize(0); // false
f = Util.trinarize(1); // true
f = Util.trinarize(""); // false
f = Util.trinarize("0"); // true
f = Util.trinarize(".00"); // true
f = Util.trinarize("A"); // true
f = Util.trinarize(false); // false
f = Util.trinarize("false"); // true
f = Util.trinarize("FaLsE"); // true
f = Util.trinarize(null); // null
f = Util.trinarize("null"); // true
f = Util.trinarize(undefined); // null
f = Util.trinarize("undefined"); // true
f = Util.trinarize([]); // true
f = Util.trinarize({}); // true
f = Util.trinarize(NaN); // true
f = Util.trinarize("NaN"); // true
```

### Unstring Booleanize

include stringified values.  

```
f = Util.trinarize("0",true); // false
f = Util.trinarize(".00",true); // false
f = Util.trinarize("false",true); // false
f = Util.trinarize("FaLsE",true); // false
f = Util.trinarize("null",null); // false
f = Util.trinarize("undefined",null); // false
```

## Zero Filling

```
// padStart() 
s = (''+0).padStart(8,'0'); // 00000000 
s = (''+123.4).padStart(8,'0'); // 000123.4 
s = (''+(-123.4)).padStart(8,'0'); // 00-123.4 (is bad)

// zerofill
s = Util.zerofill(0,8); // 00000000
s = Util.zerofill(123.4,8); // 000123.4
s = Util.zerofill(-123.4,8); // -00123.4 (correct)

// zerofill can put + sign
s = Util.zerofill(0,8,true); // +0000000
s = Util.zerofill(123.4,8,true); // +00123.4
s = Util.zerofill(-123.4,8,true); // -00123.4
```

## Just String

```
// toString()
s = null.totring(); // (Error thrown) 
s = undefined.totring(); // (Error thrown) 
s = {a:-1,b:"xyz"}.toString(); // [object Object] 

// justString() (useful for logging)
s = Util.justString(null); // null 
s = Util.justString(undefined); // undefined 
s = Util.justString({a:-1,b:"xyz"}); // {"a":-1,"b":xyz} 
```

## Inspectable String

```
// JSON
s = JSON.stringify(Infinity); // null 
s = JSON.stringify(NaN); // null 
s = JSON.stringify(undefined); // undefined 
s = JSON.stringify([undefined]); // [null] 

// inspect (useful for debug, strings are quoted)
s = Util.inspect(Infinity); // Infinity
s = Util.inspect(NaN); // NaN
s = Util.inspect(undefined); // undefined 
s = Util.inspect([undefined]); // [undefined] 
```


# Class Reference

@sa @ref pg_class_util
