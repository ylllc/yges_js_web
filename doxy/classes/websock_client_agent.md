@page pg_class_websock_client_agent WebSockClient.Agent

# What's It?

created by @ref pg_class_websock_client_container  
it inherited from @ref pg_class_agent  

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## GetURL() {#WebSockClient_Agent_GetURL}

### Spec

GetURL():strin

### Returns

WebSocket server URL  

-----
## Send() {#WebSockServer_Agent_Send}

### Spec

Send(data):void

### Args

| Name | Type | Means |
|------|------|-------|
| data | @ref WebSockServer_Connection_TransportData | sending data |
