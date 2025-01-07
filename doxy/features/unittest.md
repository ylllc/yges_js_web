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
		title:'Teet Title 1',
		proc:(tool)=>{
			// Test Scenario 1 
		},
	},
	// test 2 
	{
		title:'Teet Title 2',
		proc:(tool)=>{
			// Test Scenario 2 
		},
	},
	// test 3 
	{
		title:'Teet Title 3',
		filter:false,
		proc:(tool)=>{
			// Skipped by filter 
		},
	},
	// more ...
]

Test.Run(scenaria);

```

-----
## Filtering

a scenario that .filter is definded,  
available when .filter is trued.  
(undefinded .filter means true)  

-----
## Pickup Mode

scenaria[] has some scenario that .pickup is trued,  
run only .pickup is trued.  
(undefinded .pickup means false)  

-----
## Assertion

YgEs.Test have compatible functions for assertion.  

| Name | Purpose |
|------|---------|
| chk(cond) | can use any conditions |
| chk_loose(v1,v2) | v1 == v2 |
| chk_strict(v1,v2) | v1 === v2 |
| chk_less(v1,v2) | v1 < v2 |
| chk_less_eq(v1,v2) | v1 <= v2 |
| chk_great(v1,v2) | v1 > v2 |
| chk_great_eq(v1,v2) | v1 >= v2 |
| chk_approx(v1,v2,range) | abs(v1-v2) <= range |
| never() | always failed |

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
