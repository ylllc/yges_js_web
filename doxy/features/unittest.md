@page pg_feat_unittest Unit Test

# What's It?

it's an wrapper to commonize test runner of each processing systems.  
you can write test scripts with commonized features.  

-----
# Import

-----
## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/unittest.js"></script>
```
use YgEs.Test

## for Node/Deno

```
import Test from 'api/unittest.js';
```
importing name can redefine in your wish.  
and can use YgEs.Test too.  

-----
# How to Use

-----
## Test Scenaria Definition

```
var scenaria=[
	// test 1 
	{
		Title:'Teet Title 1',
		Proc:(tool)=>{
			// Test Scenario 1 
		},
	},
	// test 2 
	{
		Title:'Teet Title 2',
		Proc:(tool)=>{
			// Test Scenario 2 
		},
	},
	// test 3 
	{
		Title:'Teet Title 3',
		Filter:false,
		Proc:(tool)=>{
			// Skipped by filter 
		},
	},
	// more ...
]

Test.Run(scenaria);

```

-----
## Filtering

a scenario that .Filter is definded,  
available when .Filter is trued.  
(undefinded .Filter means true)  

-----
## Pickup Mode

scenaria[] has some scenario that .PickUp is trued,  
run only .PickUp is trued.  
(undefinded .PickUp means false)  

-----
## Assertion

YgEs.Test have compatible functions for assertion.  

| Name | Purpose |
|------|---------|
| Chk(cond) | can use any conditions |
| ChkLoose(v1,v2) | v1 == v2 |
| ChkStrict(v1,v2) | v1 === v2 |
| ChkLess(v1,v2) | v1 < v2 |
| ChkLessEq(v1,v2) | v1 <= v2 |
| ChkGreat(v1,v2) | v1 > v2 |
| ChkGreatEq(v1,v2) | v1 >= v2 |
| ChkApprox(v1,v2,range) | |v1-v2| <= range |
| Never() | always failed |

-----
## Tools

each scenaria are called with tools.  
it has instances for use exclusive from other scenaria.  

| Member | Class |
|--------|-------|
| Launcher | @ref pg_class_launcher |
| Launcher.HappenTo | @ref pg_class_happening_manager |
| Log | @ref pg_class_logger |

-----
## Running

### Node.js

```
$ node --test TargetSourceFile
```

### Deno

```
$ deno test TargetSourceFile
```

### web

call YgEs.Test.setupGUI() to setup a Test Runner GUI.  
(see sample test.html)  

-----
# Class Reference

@sa @ref pg_class_unittest
