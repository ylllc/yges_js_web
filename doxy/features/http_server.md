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
var route1=HTTPServer.present({GET:hello_world});

// Server 2: Document View & Test Runner
// serve from public root 
var route2=HTTPServer.serve(PUBLIC_ROOT,{
	// overlay route settings 
	// /doc & /test served other directory instead of. 
	route:{
		// from documentation directory 
		'doc':HTTPServer.serve(DOCS_ROOT),
		// from test directory 
		// and allow enumerate file entries, include all subdirectories 
		'test':HTTPServer.serve(TEST_ROOT,{
			dirent:true,
			deepent:-1,
			mtime:true,
			filter:(srcdir,name,stat)=>{
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
var srv1=HTTPServer.setup(8080,route1).fetch();
var srv2=HTTPServer.setup(8888,route2).fetch();
```

-----
## Listen

```
// start listening 
srv1.open();
srv2.open();

	:

// stop listening 
srv1.close();
srv2.close();

```

-----
# Class Reference

@sa @ref pg_class_http_server
