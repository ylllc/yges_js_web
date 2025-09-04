@page pg_feat_network Network Drivers

# What's It?

Redefining transport layer for ...
- Use on free protocol 
- Can use realtime communicating (e.g. WebSocket) 
- Useful for async and parallel networking
- Can simulation in standalone 
- Tough test features

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/network.js"></script>
```
use YgEs.Network

## for Node/Deno

```
import EndPoint from 'api/network.js';
```
importing name can redefine in your wish.  
and can use YgEs.Network too.  

-----
# How to Use

-----
## Driver Definition

an interface with any transport features.  
but it's not only real networking.  

```
// driver setting
const drvopt={
	// tough test for sending 
	ToughOut:{
		// insert random msec delay 
		DelayMin:0,
		DelayMax:400,
		// maybe break ordering by delay 
//		Unorderable:true,
		// ratio of packet dubbing
//		DubRatio:0.25,
//		DubIntervalMin:0,
//		DubIntervalMax:500,
	},
	// tough test for receiving 
	ToughIn:{
		// insert random msec delay 
		DelayMin:0,
		DelayMax:400,
		// maybe break ordering by delay 
//		Unorderable:true,
		// ratio of packet dubbing
//		DubRatio:0.25,
//		DubIntervalMin:0,
//		DubIntervalMax:500,
	},
	// (for tough test) maybe cutoff during receiving 
	OnGate:(recver,rawdata,prop)=>{
//		if(Math.random()<0.25)return rawdata.substring(0,Math.random()*rawdata.length);
		return rawdata;
	},
}

// loopback driver instance 
let loopback=Network.CreateLoopback(drvopt);
// terminal driver instance 
let terminal=Network.CreateTerminator(drvopt);

```

### Delay simulation 

for test assumed slow network.  
insert random delay before notifying received.  

### Unorder simulation 

delayed 1st packet may receive later than smooth 2nd packet. (e.g. UDP)  
some protocols withholding 2nd packet until 1st received. (e.g. TCP)  
setting by protocol property.  

### Dub simulation 

some protocols retry sending implicitly.  
Receiver may receiving dubbed packets.  

### Cutoff simulation 

possibility, a Sender stop sending in the middle.  
then a Receiver caught a broken payload.  

### Loopback

one of network driver preset.  
send to myself.  

### Terminator

one of network driver preset.  
ignore sending explicitly.  

-----
## Transport Definition

create a Transport instance.  
and attach Receiver and Sender.  

```
const tpopt={
}

// transport instance 
let tp=Network.CreateTransport(tpopt);

// receivers 
// Transport can attach more Recever instances 
// but a Receiver attaches to only one Transport 
tp.AttachReceiver('lb',loopback);

// senders 
// Transport can attach more Sender instances 
// and Sender can attach more Transport instances 
// but a Sender cannot recognize connected Transport 
tp.AttachSender('lb',loopback);
tp.AttachSender('tm',terminal);

// selector 
// sending content should be selectable by each target 
tp.SetSelector((tp,target,prop)=>{
	// select an attached sender name by the target 
	return (target=='')?'tm':'lb';
});

```

-----
## EndPoint Definition

```
const epopt={
	OnCome:(from,body,prop)=>{
		Log.Info('received from '+from,body);
	},
}

// loopback endpoints 
let ep1=Network.CreateEndPoint(epopt).Open();
let ep2=Network.CreateEndPoint(epopt).Open();

// wait for EndPoint ready 
await Timing.SyncKit(1000,()=>ep1.IsReady()).ToPromise();
await Timing.SyncKit(1000,()=>ep2.IsReady()).ToPromise();
```

### Easy Transporting

an EndPoint can send contents to opponent's EndPoint.  
but it premised, sender should know target EndPoint name on the target connected Transport.  

```
ep1.Send('EP2',null,'Loopback Test1A');
// can send a content by a structure 
ep1.Send('EP2',null,{msg:'Loopback Test1B',tmp:[1,2,{a:3,b:4}]});
// sending content will terminated 
ep2.Send('',null,'Terminate Test');
```

### Batch Sending

usually small contents are packed to one to optimize. 
call Launch() to reserve them. 
and call Kick() or Send() to send packed one. 

```
// sending contents prepared, but don't send them. 
ep1.Launch('EP2',null,'Loopback Test1A');
ep1.Launch('EP2',null,{msg:'Loopback Test1B',tmp:[1,2,{a:3,b:4}]});
// send all prepared contents. 
ep1.Kick('EP2');
```

### Target EndPoint? Don't Know It

usually sending to remote, a sender don't know target EndPoint name.  
then sending to a target Transport instead of an EndPoint, 
the Transport required payload definition. 
see below for it. 

-----
### Payload Definition

specify payload name and each settings  

```
// payload spec settings 
const pld_specs={
	HELLO:{
		CallOnce:{
			// only 1 call until replied 
			Limit:true,
			// can call again after msec 
			Timeout:10000,
		},
	},
	HI:{
		// unlock CallOnce restriction after received 
		UnlockOnce:['HELLO'],
	},
}

// protocol callbacks for host 
const pld_host={
	HELLO:{
		OnRequest:(tp,payload,prop)=>{

			// call by a payload without a protocol instance 

			// @todo
			// check payload and return now by invalid bounds

			// create a Protocol instance for start communicating 
			// then indicate an receiver's EndPoint name to this sender 
			let prot=tp.NewProtocol('host',{Name:'Replying'});
			if(!prot)return;

			// replying in a protocol 
			prot.Send(payload.From,'HI','Hi, '+payload.From);
		},
	},
}

// protocol callbacks for guest 
const pld_guest={
	HI:{
		OnBound:(tp,payload,prop)=>{

			// calling by,
			// - come an outbound Protocol 
			// - restart communicating in an abandoned Protocol 

			// @todo 
			// check payload and return null by suspicious Protocol 

			// specify bound EndPoint 
			return 'guest';
		},
		OnRespond:(tp,protocol,payload,prop)=>{

			// payload is received for protocol 
			console.log(payload.From+' said, '+payload.Body);

			// terminate this Protocol 
			return false;
		},
	},
}
```

### CallOnce restriction

each protocol can only send 1 time.  
and guards from reduncancy sending.  

locked payload type from CallOnce unlocked by Timeout setting 
or received OnlockOnce defined payload type.  

-----
### Transport Definition with Payload Definitions

add payload settings in Transport option

```
const tpopt_host={
	// for create a Protocol instance 
	// Protocol ID start with 
	PIDPrefix:'ProtTest',
	// payload settings 
	PayloadSpecs:pld_specs,
	PayloadHooks:pld_host,
}
const tpopt_guest={
	// guest don't create a Protocol instance 
	// PIDPrefix is unused 

	// payload settings 
	PayloadSpecs:pld_specs,
	PayloadHooks:pld_guest,
}

// estimating online communication, 
// each EndPoint have a separated instance 
// and each sender connect to otherside receiver 
let host2guest=Network.CreateLoopback(drvopt);
let guest2host=Network.CreateLoopback(drvopt);

let tp_host=Network.CreateTransport(tpopt_host);
tp_host.AttachReceiver('port_host',guest2host);
tp_host.AttachSender('port_host',host2guest);
tp_host.SetSelector((tp,target,prop)=>'port_host');

let tp_guest=Network.CreateTransport(tpopt_guest);
tp_guest.AttachReceiver('port_guest',host2guest);
tp_guest.AttachSender('port_guest',guest2host);
tp_guest.SetSelector((tp,target,prop)=>'port_guest');
```

-----
### Request from an EndPoint

```
const epopt={
}

let ep_host=Network.CreateEndPoint(epopt).Open();
let ep_guest=Network.CreateEndPoint(epopt).Open();

ep_host.SetTracing_EndPoint(false);
ep_guest.SetTracing_EndPoint(false);

tp_host.Connect('host',ep_host);
tp_guest.Connect('guest',ep_guest);

// wait for EndPoint ready 
await Timing.SyncKit(1000,()=>ep_host.IsReady()).ToPromise();
await Timing.SyncKit(1000,()=>ep_guest.IsReady()).ToPromise();

// request by HELLO
// guest is not know host EndPoint name 
// and can send to null target 
ep_guest.Send(null,'HELLO','Hello, host');
```

-----
# Class Reference

@sa @ref pg_class_network @n
@sa @ref pg_class_network_driver @n
@sa @ref pg_class_transport @n
@sa @ref pg_class_protocol @n
@sa @ref pg_class_endpoint @n
