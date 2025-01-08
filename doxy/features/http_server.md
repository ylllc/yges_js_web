@page pg_feat_http_server HTTP Server

# What's It?

it's a simple HTTP listening service.  

-----
# Import

-----
## for Node/Deno

```
import Test from 'api/engine.js';
import Test from 'api/http_server.js';
```
importing name can redefine in your wish.  
and can use YgEs.HTTPServer instead of.  

-----
# How to Use

-----
## Route Definition


```
// Server 1: Hello World! 
function hello_world(walker){
	walker.Response.end('Hello World!');
}
// any GET access presented Hello World! 
var route1=HTTPServer.Present({GET:hello_world});

// Server 2: Document View & Test Runner
// serve from public root 
var route2=HTTPServer.Serve(PUBLIC_ROOT,{
	// overlay route settings 
	// /doc & /test served other directory instead of. 
	Route:{
		// from documentation directory 
		'doc':HTTPServer.Serve(DOCS_ROOT),
		// from test directory 
		// and allow enumerate file entries, include all subdirectories 
		'test':HTTPServer.Serve(TEST_ROOT,{
			DirEnt:true,
			DeepEnt:-1,
			MTime:true,
			Filter:(srcdir,name,stat)=>{
				// exclude starting with . 
				return name.at(0)!='.';
			},
		}),
	},
});
```

-----
## Setup

```
// can listen parallel ports 
var srv1=HTTPServer.SetUp(8080,route1).Fetch();
var srv2=HTTPServer.SetUp(8888,route2).Fetch();
```

-----
## Listen

```
// start listening 
srv1.Open();
srv2.Open();

	:

// stop listening 
srv1.Close();
srv2.Close();

```

-----
# Class Reference

@sa @ref pg_class_http_server
