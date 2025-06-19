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
