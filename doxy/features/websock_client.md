@page pg_feat_websock_client WebSocket Client

# What's It?

it's a simple WebSocket Client.  

-----
# Import

-----
## for Web

```
<script src="yges/ipl.js"></script>
<script src="yges/websock_client.js"></script>
```
use YgEs.WebSockClient

-----
## for Node/Deno

```
import Test from 'api/engine.js';
import Test from 'api/websock_client.js';
```
importing name can redefine in your wish.  
and can use YgEs.WebSockClient instead of.  

-----
# How to Use

-----
## Premises

```
// server runs on the Engine  
Engine.Start();
```

-----
## Create a Client Instance

```
let client=WebSockClient.SetUp(ServerURL,{
	// wait ms and auto reconnect when disconnected 
	AutoReconnectWait:5000, 

	OnConnected:()=>{
		// call after connected 
	},
	OnDisconnect:(normal)=>{
		// call on disconnected 
	},
	OnReceived:(msg)=>{
		// received from server 
	},
	OnError:(err)=>{
		// error from server 
	},
});
```

-----
## Start a Client

```
client.Open();
```

-----
## Stop a Client

```
client.Close();
```

-----
# Class Reference

@sa @ref pg_class_websock_client_agent  
@sa @ref pg_class_websock_client_container  
