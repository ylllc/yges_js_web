@page pg_unittest Unit Test

# What's It?

it's an wrapper to commonize test runner of each processing systems.  
you can write test scripts with commonized features.  

# Import

## for web

(todo)  

## for Node/Deno

```
import NameYourWish from 'api/unittest.js';
```

NameYourWish become an interface on the module.  

# How to Use

see test/unittest.js  

```
var scenaria=[
	// test 1 
	{
		title:'Teet Title 1',
		proc:()=>{
			// Test Scenario 1 
		},
	},
	// test 2 
	{
		title:'Teet Title 2',
		proc:()=>{
			// Test Scenario 2 
		},
	},
	// test 3 
	{
		title:'Teet Title 3',
		filter:false,
		proc:()=>{
			// Skipped Test Scenario 
		},
	},
	// more ...
]

NameYourWish.run(scenaria);

```

## Filtering

a scenario that .filter is definded,  
available when .filter is trued.  
(undefinded .filter means true)  


## Pickup Mode

scenaria[] has some scenario that .pickup is trued,  
run only .pickup is trued.  
undefinded .filter means false)  


# Methods

## chk(cond,msg)

### Args

Name | Type | Means
-----|------|------
cond | bool | testing contition
msg | string | message for AssertionError

## chk_loose(v1,v2,msg)

### Args

Name | Type | Means
-----|------|------
v1 | any | 1st value
v2 | any | 2nd value
msg | string | message for AssertionError

## chk_strict(v1,v2,msg)

### Args

Name | Type | Means
-----|------|------
v1 | any | 1st value
v2 | any | 2nd value
msg | string | message for AssertionError

## run(scn)

### Args

Name | Type | Means
-----|------|------
scn | TestScenario[] | test scenaria

### Type: TestScenario

Name | Type | Means
-----|------|------
title | string | test title
proc | function | test procedure
pickup | bool? | in puckup mode, true to run 
filter | bool? | when defined, true to run
