@page pg_feat_unittest Unit Test

# What's It?

it's an wrapper to commonize test runner of each processing systems.  
you can write test scripts with commonized features.  

# Import

## for web

(todo)  

## for Node/Deno

```
import UnitTest from 'api/unittest.js';
```
importing name can redefine in your wish.  

# How to Use

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
			// Skipped by filter 
		},
	},
	// more ...
]

UnitTest.run(scenaria);

```

## Filtering

a scenario that .filter is definded,  
available when .filter is trued.  
(undefinded .filter means true)  


## Pickup Mode

scenaria[] has some scenario that .pickup is trued,  
run only .pickup is trued.  
(undefinded .pickup means false)  


# Class Reference

@sa @ref pg_class_unittest
