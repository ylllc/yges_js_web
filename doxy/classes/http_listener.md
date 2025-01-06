@page pg_class_http_listener HTTPListener

# What's It?

HTTP listener instance  
created by @ref pg_feat_http_server.setup()  
it inherited from @ref pg_class_agent  

-----
# Callbacks

-----
## CBError

build a response of HTTP error  

### Args

| Name | Type | Means |
|------|------|-------|
| res | http.ServerResponse | HTTP response writer |
| code | int | status code |
| msg | string | message |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| Route | @ref pg_feat_http_server#RouteDefinition | route settings |
| Error | @ref CBError | error view generator |

-----
# Methods

-----
## getPort():int

### Returns

listening port  
