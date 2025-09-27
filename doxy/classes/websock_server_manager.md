@page pg_class_websock_server_manager WebSockServer.Manager

# What's It?

created by @ref pg_class_websock_server_container  
it inherited from @ref pg_class_agent  
and management a @ref pg_class_websock_server_agent  
driven on a @ref pg_class_transport  

-----
# Methods

-----
## SetTracing_Manager() {#WebSockServerManager_SetTracing_Manager}

call SetTracing() (for in Manager only)  

### Spec

SetTracing_WebSock(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | additional trace logs are enabled |

-----
## GetPort() {#WebSockServerManager_Agent_GetPort}

### Spec

GetPort():int

### Returns

listening port  
