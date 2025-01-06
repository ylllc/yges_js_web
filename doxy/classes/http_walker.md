﻿@page pg_class_http_walker HTTPWalker

# What's It?

HTTP route walker by requests.  

-----
# Structures

-----
## UserShared {#UserShared}

user definition  

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | @ref UserShared | user definition |
| Listener | @ref pg_class_http_listener | HTTP listener |
| Request | http.ClientRequest | HTTP request |
| Response | http.ServerSesponse | HTTP response |
| ParsedURL | @ref pg_class_parsedurl | parsed requet URL |
| Layer | string[] | HTTP path spiltted by / |
| Level | int | stepping level at the layer |