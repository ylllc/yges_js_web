@page pg_feat_websock_server WebSocket Server

# What's It?

it's a simple WebSocket Server.  

-----
# Import

-----
## for web

(not supported)

-----
## for Node/Deno

```
import Test from 'api/engine.js';
import Test from 'api/websock_server.js';
```
importing name can redefine in your wish.  
and can use YgEs.WebSockServer instead of.  

-----
# How to Use

-----
## Premises

```
// server runs on the Engine  
Engine.Start();
```

-----
## Create a Server Instance

```
let server=WebSockServer.SetUp(ListeningPort,{
	// max clients 
	ConnectionLimit:5,

	OnConnect:(ctx,req)=>{
		// income new connection, instanced with ctx 
		// return true to allow, false to reject 
		return true;
	},
	OnDisconnect:(ctx)=>{
		// ctx is disconnected 
	},
	OnReceived:(ctx,msg,isbin)=>{
		// received from ctx 
	},
	OnError:(ctx,err)=>{
		// error from ctx
	},
}).Fetch();
```

-----
## Start a Server

```
server.Open();
```

-----
## Stop a Server

```
server.Close();
```

-----
# Class Reference

@sa @ref pg_class_websock_server_agent  
@sa @ref pg_class_websock_server_connection  
@sa @ref pg_class_websock_server_container  
