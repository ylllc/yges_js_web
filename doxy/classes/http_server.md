@page pg_class_http_server HTTPServer.Container

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
## CB_FilterFile {#HTTPServer_CB_FilterFile}

### Spec

CB_FilterFile(dir,name,stat):bool

### Args

| Name | Type | Means |
|------|------|-------|
| dir | string | directory |
| name | string | file name |
| stat | @ref pg_class_file_stat | file stat |


### Returns

enable include the file  

-----
## CB_Present {#HTTPServer_CB_Present}

### Spec

CB_Present(walker):void

HTTP presentation function.  
build a response from a HTTP request.  

### Args

| Name | Type | Means |
|------|------|-------|
| walker | @ref pg_class_http_walker | HTTP route walker |

### Implements

make HTTP response to walker.Response

-----
# Structures

-----
## PresentOption {#HTTPServer_PresentOption}

| Name | Type | Means |
|------|------|-------|
| User | @ref HTTPServer_UserShared? | user definition |

-----
## RouteOption {#HTTPServer_RouteOption}

| Name | Type | Means |
|------|------|-------|
| User | @ref HTTPServer_UserShared? | user definition |

-----
## ServerDirInfo {#HTTPServer_ServerDirInfo}

| Name | Type | Means |
|------|------|-------|
| Parent | bool | parent dir is enabled |
| Dirs | dict<string,@ref HTTPServer_ServeDirInfo> | subdirs |
| Files | dict<string,@ref HTTPServer_ServeFileInfo> | files |

-----
## ServerFileInfo {#HTTPServer_ServerFileInfo}

| Name | Type | Means |
|------|------|-------|
| Size | int | file size |
| MTime | string? | modified time in ISO 8601 (optional) |
| CTime | string? | status changed time in ISO 8601 (optional) |
| ATime | string? | access time in ISO 8601 (optional) |
| BTime | string? | birth time in ISO 8601 (optional) |

-----
## ServeOption {#HTTPServer_ServeOption}

| Name | Type | Means |
|------|------|-------|
| Route | dict<string,@ref pg_class_http_route>? | overlay routing |
| DirEnt | bool? | allow enumerate files in a directory |
| DeepEnt | int? | include subdirectory layer level (0=none, -1=all level) |
| Filter | CB_FilterFile? | file entry filter |
| MTime | bool? | include modufy time |
| CTime | bool? | include change time |
| ATime | bool? | include access time |
| BTime | bool? | include birth time |
| User | @ref HTTPServer_UserShared? | user definition |

-----
## ServerOption {#HTTPServer_ServerOption}

| Name | Type | Means |
|------|------|-------|
| Log | @ref pg_class_logger? | log to |
| HappenTo | @ref pg_class_happening_manager? | happeings reported to |
| Launcher | @ref pg_class_launcher? | procedures run on |
| User | @ref HTTPServer_UserShared? | user definition |

-----
## UserShared {#HTTPServer_UserShared}

user definition kept on a @ref pg_class_http_listener instance  

-----
# Properties

-----

| Name | Type | Means |
|------|------|-------|
| DefaultCharset | string | default charset of HTML |
| User | struct | user definitions |

-----
# Methods

-----
## SetUp() {#HTTPServer_SetUp}

### Spec

SetUp(port,route,opt={}):HTTPListener

### Args

| Name | Type | Means |
|------|------|-------|
| port | int | listening port |
| route | dict<string,@ref pg_class_http_route> | route definition |
| opt | @ref HTTPServer_ServerOption | optional |

### Returns

@ref pg_class_http_listener instance  

-----
## Serve() {#HTTPServer_Serve}

routing target makes relative file path from base directory.  
this response of the HTTP request means transfering target file.  

### Spec

Serve(dir,opt={}):HTTPRoute

### Args

| Name | Type | Means |
|------|------|-------|
| dir | string | base directory |
| opt | @ref HTTPServer_ServeOption | optional |

-----
## Empty() {#HTTPServer_Empty}

empty route of this HTTP request.  
respond always 204 No Content.  

### Spec

Empty(map,opt={}):HTTPRoute

-----
## Present() {#HTTPServer_Serve}

routing terminal of this HTTP request.  
calling meth[HTTP method] to makes a response by method.  

### Spec

Present(meth,opt={}):HTTPRoute

### Args

| Name | Type | Means |
|------|------|-------|
| meth | dict<string,@ref CB_Present> | presentation by method |
| opt | @ref HTTPServer_UserShared | optional |

-----
## Route() {#HTTPServer_Route}

stepping route of this HTTP request.  
branching by HTTP path layer.  

### Spec

Route(map,opt={}):HTTPRoute

### Args

| Name | Type | Means |
|------|------|-------|
| map | dict<string,@ref pg_class_http_route> | route branch |
| opt | @ref HTTPServer_UserShared | optional |
