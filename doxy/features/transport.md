@page pg_feat_transport Transport Driver

# What's It?

Redefining transport layer for ...
- Use on free protocol 
- Can simulation in standalone 

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/transport.js"></script>
<script src="yges/endpoint.js"></script>
```
use YgEs.Transport and YgEs.EndPoint

## for Node/Deno

```
import Transport from 'api/transport.js';
import EndPoint from 'api/endpoint.js';
```
importing name can redefine in your wish.  
and can use YgEs.Transport and YgEs.EndPoint too.  

-----
# How to Use

-----
## Transport Definition

create as an Agent.  
@sa pg_feat_agent  

```
let transport=Transport.CreateDriver({

	OnSend:(epid_from,epid_to,pack)=>{
		// imprement sending procedure 
	},
});
```

-----
### Redefining Packing Way

default packing way is encoding to JSON.  
can redefine the way in your wish.  

````
let transport=Transport.CreateDriver({

	OnPack:(data)=>{
		return /* encoded from data array */
	},	

	OnUnpack:(pack)=>{
		return /* decoded data array from a pack */
	},	

	OnSend:(epid_from,epid_to,pack)=>{
		// imprement sending procedure 
	},
});
````

-----
### Tough Transport Test

for test, simulating bad network.  

```
let transport=Transport.CreateDriver({

	OnSend:(endpoint_from,epid_to,pack)=>{
		// imprement sending procedure 
	},

	// insert random msec delay each sending 
	DelayMin:0,
	DelayMax:3000,

	// maybe break ordering by delay 
	Unorderable:true,

	// ratio of short packet on sending 
	// raceived data maybe broken 
	Hurting:0.1,
});
```

-----
## Use Preset Transport Driver

```
// communicate between endpoints in this process  
let loopback=Transport.CreateLoopback();

// dummy endpoints, all sendings are ignored 
let terminator=Transport.CreateTerminator();
```

-----
## Endpoint Definition

```
let endpoint=EndPoint.Create(transport,{

	OnReceived:(endpoint,epid_from,data)=>{
		// this endpoint received data from an other endpoint 
	},
});
```

-----
## Sending

```
endopint.Send(/* opponent endpoint ID */,/* sending content */);
```

-----
### Batch Senging 

```
endopint.Launch(/* opponent endpoint ID */,/* sending content */);
	:
endopint.Send(/* opponent endpoint ID */,/* sending content */);

	or

endopint.Kick(/* opponent endpoint ID */);

	or 

endopint.Kick(); // for all endpoints 

```

-----
# Class Reference

@sa @ref pg_class_transport_driver @n
	@ref pg_class_transport_container @n
	@ref pg_class_endpoint_control @n
	@ref pg_class_endpoint_container @n
