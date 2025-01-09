@page pg_class_http_listener HTTPListener

# What's It?

HTTP listener instance  
created by @ref pg_feat_http_server  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CB_Error {#HTTPListener_CB_Error}

build a response of HTTP error  

### Args

| Name | Type | Means |
|------|------|-------|
| res | http.ServerResponse | HTTP response writer |
| code | int | status code |
| msg | string | message |

### Implements

make a HTTP error response to res

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| Route | dict<string,@ref pg_class_http_route> | route settings |
| Error | @ref HTTPListener_CB_Error | error view generator |

-----
# Methods

-----
## GetPort {#HTTPListener_GetPort}

### Spec

GetPort():int

### Returns

listening port  
