@page pg_class_websock_server_agent WebSockServer.Agent

# What's It?

created by @ref pg_class_websock_server_container  
it inherited from @ref pg_class_agent  

-----
# Methods

-----
## SetTracing_WebSock() {#Agent_SetTracing_WebSock}

call SetTracing() (for in WebSock only)  

### Spec

SetTracing_WebSock(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | additional trace logs are enabled |

-----
## GetPort() {#WebSockServer_Agent_GetPort}

### Spec

GetPort():int

### Returns

listening port  
