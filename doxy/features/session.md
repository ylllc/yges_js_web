@page pg_feat_session Session Driver

# What's It?

Redefining session layer for ...
- Use on free protocol 
- Can simulation in standalone 

-----
# Import

## for web

```
<script src="yges/ipl.js"></script>
<script src="yges/session.js"></script>
```
use YgEs.Transport, YgEs.EndPoint and YgEs.Session  

## for Node/Deno

```
import Session from 'api/session.js';
```
importing name can redefine in your wish.  
and can use YgEs.Transport, YgEs.EndPoint and YgEs.Session too.  

-----
# How to Use

## Prepare

-----
### Transport

create a @ref pg_class_transport_driver and some @ref pg_class_endpoint_control  

@sa @ref pg_feat_transport

-----
### API definition

same to Transport  
but these receiver functions available in this session only.  

-----
## Create a Session

```
const sess_opt={
		:
	PayloadSpecs:pld_specs, // same to Transport 
	PayloadReceivers:{}, // available receiver functions in this session 
}
sess_opt.PayloadReceivers[PAYLOAD.SYNC_REQ]={
	// called on receive a sync request 
		:
 
	// respond to sender 
	ep_to.Send(epid_from,{Type:PAYLOAD.SYNC_RES,...});
}

// create a session and attach to a Transport 
// a Transport can have many sessions 
let sess1=CreatedTransport.AttachSession(Session.Create(sess_opt));
let sess2=CreatedTransport.AttachSession(Session.Create(sess_opt));

```

-----
## Session Participants

### Join to this session

```
sess1.Join(ParticipantEndPointID);
```

this partiipant EndPoint can receive session specified payload functions.  

### Leave from this session

```
sess1.Leave(ParticipantEndPointID);
```

this partiipant EndPoint could receive session specified payload functions any longer.  

-----
# Class Reference

@sa @ref pg_class_session_driver @n
	@ref pg_class_session_container @n
