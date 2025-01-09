@page pg_feat_trivia Trivia

# What's It?

JavaScript's variables lurked many trap.  
avoid them with clear functions.  

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
```
use YgEs.Util

## for Node/Deno

```
import Util from 'api/util.js';
```
importing name can redefine in your wish.  
and can use YgEs.Util too.  

-----
# How to Use

-----
## Just NaN

```
// compareing operators always return false by NaN 
v = NaN;
f = (v==NaN); // false 
f = (v===NaN); // false 
f = Util.IsJustNaN(v); // true 

// isNaN(v) means isNaN(v.toString()) 
v = undefined;
f = isNaN(v); // true 
f = Util.IsJustNaN(v); // false 

v = {};
f = isNaN(v); // true 
f = Util.IsJustNaN(v); // false 
```

-----
## Just Infinity

```
// operator == return true when stringified 'Infinty'  
// (operator === is correct)  
v = Infinity;
f = (v=="Infinity"); // true
f = (v==="Infinity"); // false
f = Util.IsJustInfinity(v); // true 

// IsJustInfinity() judges to both Infinity 
v = -Infinity;
f = (v===Infinity); // false
f = Util.IsJustInfinity(v); // true 

// isFinite() is wondering... 
f = !isFinite(NaN); // true 
f = !isFinite(null); // false 
f = !isFinite(undefined); // true 
f = !isFinite('A'); // true 
f = !isFinite([]); // false 
f = !isFinite([0]); // false 
f = !isFinite([false]); // true 
f = !isFinite({}); // true 
// Util.IsJustInfinity() returns false them.  

```

-----
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

// IsEmpty() (means none or empty string) 
f = Util.IsEmpty(null); // true 
f = Util.IsEmpty(undefined); // true 
f = Util.IsEmpty(""); // true 
f = Util.IsEmpty([]); // false 
f = Util.IsEmpty({}); // false 
```

-----
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

// IsValid() (means not invalid)
f = Util.IsValid(0); // true
f = Util.IsValid(1); // true
f = Util.IsValid(""); // true
f = Util.IsValid("0"); // true
f = Util.IsValid(false); // true
f = Util.IsValid(null); // false
f = Util.IsValid(undefined); // false
f = Util.IsValid([]); // true
f = Util.IsValid({}); // true
f = Util.IsValid(NaN); // false

```

-----
## Booleanize

fix to bool.  

```
f = Util.Booleanize(0); // false
f = Util.Booleanize(1); // true
f = Util.Booleanize(""); // false
f = Util.Booleanize("0"); // true
f = Util.Booleanize(".00"); // true
f = Util.Booleanize("A"); // true
f = Util.Booleanize(false); // false
f = Util.Booleanize("false"); // true
f = Util.Booleanize("FaLsE"); // true
f = Util.Booleanize(null); // false
f = Util.Booleanize("null"); // true
f = Util.Booleanize(undefined); // false
f = Util.Booleanize("undefined"); // true
f = Util.Booleanize([]); // true
f = Util.Booleanize({}); // true
f = Util.Booleanize(NaN); // true
f = Util.Booleanize("NaN"); // true
```

### Unstring Booleanize

include stringified values.  

```
f = Util.Booleanize("0",true); // false
f = Util.Booleanize(".00",true); // false
f = Util.Booleanize("false",true); // false
f = Util.Booleanize("FaLsE",true); // false
f = Util.Booleanize("null",true); // false
f = Util.Booleanize("undefined",true); // false
```

-----
## Trinarize

fix to bool or null.  

```
f = Util.Trinarize(0); // false
f = Util.Trinarize(1); // true
f = Util.Trinarize(""); // false
f = Util.Trinarize("0"); // true
f = Util.Trinarize(".00"); // true
f = Util.Trinarize("A"); // true
f = Util.Trinarize(false); // false
f = Util.Trinarize("false"); // true
f = Util.Trinarize("FaLsE"); // true
f = Util.Trinarize(null); // null
f = Util.Trinarize("null"); // true
f = Util.Trinarize(undefined); // null
f = Util.Trinarize("undefined"); // true
f = Util.Trinarize([]); // true
f = Util.Trinarize({}); // true
f = Util.Trinarize(NaN); // true
f = Util.Trinarize("NaN"); // true
```

### Unstring Booleanize

include stringified values.  

```
f = Util.Trinarize("0",true); // false
f = Util.Trinarize(".00",true); // false
f = Util.Trinarize("false",true); // false
f = Util.Trinarize("FaLsE",true); // false
f = Util.Trinarize("null",null); // false
f = Util.Trinarize("undefined",null); // false
```

-----
## Zero Filling

```
// padStart() 
s = (''+0).padStart(8,'0'); // 00000000 
s = (''+123.4).padStart(8,'0'); // 000123.4 
s = (''+(-123.4)).padStart(8,'0'); // 00-123.4 (is bad)

// FillZero
s = Util.FillZero(0,8); // 00000000
s = Util.FillZero(123.4,8); // 000123.4
s = Util.FillZero(-123.4,8); // -00123.4 (correct)

// FillZero can put + sign
s = Util.FillZero(0,8,true); // +0000000
s = Util.FillZero(123.4,8,true); // +00123.4
s = Util.FillZero(-123.4,8,true); // -00123.4
```

-----
# Class Reference

@sa @ref pg_class_util
