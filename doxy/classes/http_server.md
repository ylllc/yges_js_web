@page pg_class_http_server HTTPServer

# What's It?

@sa @ref pg_feat_http_server

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.HTTPServer | HTTP Server |

-----
# Callbacks

-----
## CBFilterFile(dir,name,stat):bool {#CBFilterFile}

### Args

| Name | Type | Means |
|------|------|-------|
| dir | string | directory |
| name | string | file name |
| stat | @ref pg_class_file_stat | file stat |


### Returns

enable include the file  

-----
## CBPresent(walker)

HTTP presentation function.  
build a response from a HTTP request.  

### Args

| Name | Type | Means |
|------|------|-------|
| walker | @ref pg_class_http_walker | HTTP route walker |

-----
# Structures

-----
## PresentOption {#PresentOption}

| Name | Type | Means |
|------|------|-------|
| user | @ref UserShared? | user definition |

-----
## RouteOption {#RouteOption}

| Name | Type | Means |
|------|------|-------|
| user | @ref UserShared? | user definition |

-----
## ServeOption {#ServeOption}

| Name | Type | Means |
|------|------|-------|
| route | dict<string,@ref pg_class_http_route>? | overlay routing |
| dirent | bool? | allow enumerate files in a directory |
| deepent | int? | include subdirectory layer level (0=none, -1=all level) |
| filter | CBFilterFile? | file entry filter |
| mtime | bool? | include modufy time |
| ctime | bool? | include change time |
| atime | bool? | include access time |
| btime | bool? | include birth time |
| user | @ref UserShared? | user definition |

-----
## ServerOption {#ServerOption}

| Name | Type | Means |
|------|------|-------|
| logger | @ref pg_class_logger? | log to |
| happen | @ref pg_class_happening_manager? | happeings reported to |
| launcher | @ref pg_class_launcher? | procedures run on |
| user | @ref UserShared? | user definition |

-----
## UserShared {#UserShared}

user definition kept on a @ref pg_class_http_listener instance  

-----
# Properties

-----

| Name | Type | Means |
|------|------|-------|
| User | object | user definitions |
| DefaultCharset | string | default charset of HTML |

-----
# Methods

-----
## setup(port,route,opt={}):HTTPListener

### Args

| Name | Type | Means |
|------|------|-------|
| port | int | listening port |
| route | dict<string,@ref pg_class_http_route> | route definition |
| opt | @ref ServerOption | optional |

### Returns

@ref pg_class_http_listener instance  

-----
## serve(dir,opt={}):HTTPRoute

routing target makes relative file path from base directory.  
this response of the HTTP request means transfering target file.  

| Name | Type | Means |
|------|------|-------|
| dir | string | base directory |
| opt | @ref ServeOption | optional |

-----
## present(meth,opt={}):HTTPRoute

routing terminal of this HTTP request.  
calling meth[HTTP method] to makes a response by method.  

| Name | Type | Means |
|------|------|-------|
| meth | dict<string,@ref CBPresent> | presentation by method |
| opt | @ref PresentOption | optional |

-----
## route(map,opt={}):HTTPRoute

stepping route of this HTTP request.  
branching by HTTP path layer.  

| Name | Type | Means |
|------|------|-------|
| map | dict<string,@ref pg_class_http_route> | route branch |
| opt | @ref RouteOption | optional |
