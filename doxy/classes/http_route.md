@page pg_class_http_route HTTPRoute

# What's It?

HTTP route interface.  
implement for @ref pg_class_http_server.setup()  

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | @ref UserShared | user definition |

-----
# Methods

-----
## walk(walker)

implement routing of a HTTP request

### Args

| Name | Type | Means |
|------|------|-------|
| walker | @ref pg_class_http_walker | walker on a HTTP request |
