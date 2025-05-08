@page pg_class_websock_server_container WebSockServer.Container

# What's It?

@sa @ref pg_feat_websock_server @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.WebSockServer | WebSocket server container |

-----
# Callbacks

-----
## CB_Connect {#WebSockServer_Container_CB_Connect}

call by connection from client

### Spec

CB_Connect(cnx):bool

### Args

| Name | Type | Means |
|------|------|-------|
| cnx | @ref pg_class_websock_server_connection | connection from client |

### Returns

| Value | Means |
|-------|-------|
| true | connection allowed |
| false | connection denied |

-----
## CB_Disconnect {#WebSockServer_Container_CB_Disconnect}

call by disconnection from client

### Spec

CB_Disconnect(cnx):void

### Args

| Name | Type | Means |
|------|------|-------|
| cnx | @ref pg_class_websock_server_connection | connection from client |

-----
## CB_Received {#WebSockServer_Container_CB_Received}

call by received from client

### Spec

CB_Received(cnx,data,isbin):void

### Args

| Name | Type | Means |
|------|------|-------|
| cnx | @ref pg_class_websock_server_connection | connection from client |
| data | @ref WebSockServer_Connection_TransportData | payload |
| isbin | bool | indicate binary data |

-----
## CB_Error {#WebSockServer_Container_CB_Error}

call by an error from client

### Spec

CB_Error(cnx,err):void

### Args

| Name | Type | Means |
|------|------|-------|
| cnx | @ref pg_class_websock_server_connection | connection from client |
| err | Error | happened error |

-----
# Structures

-----
## Option {#WebSockServer_Container_Option}

| Name | Type | Means |
|------|------|-------|
| ConnectionLimit? | int | max connectable clients (or unlimited) |
| OnReady | func | call on this server ready |
| OnClose | func | call on this server close |
| OnConnect? | @ref WebSockServer_Container_CB_Connect | call by connection from client |
| OnDisconnect? | @ref WebSockServer_Container_CB_Disconnect | call by disconnection from client |
| OnReceived? | @ref WebSockServer_Container_CB_Received | call by received from client |
| OnError? | @ref WebSockServer_Container_CB_Error | call by an error from client |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## SetUp {#WebSockServer_Container_SetUp}

create an Agent of WebSocket server

## Spec

SetUp(port,opt):@ref pg_class_websock_server_agent

## Args

| Name | Type | Means |
|------|------|-------|
| port | int | listening port |
| opt | @ref WebSockServer_Container_Option | optional params |
