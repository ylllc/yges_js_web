@page pg_class_websock_server_connection WebSockServer.Connection

# What's It?

created by @ref pg_class_websock_server_container

-----
# Unions

-----
## TransportData {#WebSockServer_Connection_TransportData}

sendable data types @n

@sa https://developer.mozilla.org/ja/docs/Web/API/WebSocket/send

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | struct | user definitions |

-----
# Methods

-----
## IsReady() {#WebSockServer_Connection_IsReady}

### Spec

IsReady():bool

### Returns

this connection is ready.  

-----
## Close() {#WebSockServer_Connection_Close}

### Spec

Close(code=1000,msg='Shut from the server'):void

### Args

| Name | Type | Means |
|------|------|-------|
| code | int | WebSocket close code @n@sa https://developer.mozilla.org/ja/docs/Web/API/WebSocket/close |
| msg | string | WebSocket close message |

-----
## Send() {#WebSockServer_Connection_Send}

### Spec

Send(data):void

### Args

| Name | Type | Means |
|------|------|-------|
| data | @ref WebSockServer_Connection_TransportData | sending data |
