@page pg_class_websock_client_container WebSockClient.Container

# What's It?

@sa @ref pg_feat_websock_client @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.WebSockClient | WebSocket client container |

-----
# Callbacks

-----
## CB_Connect {#WebSockClient_Container_CB_Connect}

call on connection ready

### Spec

CB_Connect():void

-----
## CB_Disconnect {#WebSockClient_Container_CB_Disconnect}

call by disconnection to server

### Spec

CB_Disconnect(normal):void

### Args

| Name | Type | Means |
|------|------|-------|
| normal | bool | disconnected normally |

-----
## CB_Received {#WebSockClient_Container_CB_Received}

call by received from server

### Spec

CB_Received(data):void

### Args

| Name | Type | Means |
|------|------|-------|
| data | @ref WebSockServer_Connection_TransportData | payload |

-----
# Structures

-----
## Option {#WebSockServer_Container_Option}

| Name | Type | Means |
|------|------|-------|
| Log | @ref pg_class_logger? | log to |
| HappenTo | @ref pg_class_happening_manager? | happenings reported in it |
| Launcher | @ref pg_class_launcher? | procedures running on it |
| OnConnect? | @ref WebSockClient_Container_CB_Connect | call on connection ready |
| OnDisconnect? | @ref WebSockClient_Container_CB_Disconnect | call by disconnection to server |
| OnReceived? | @ref WebSockClient_Container_CB_Received | call by received from server |
| User | @ref WebSockClient_Container_UserShared? | user definition |

-----
## UserShared {#WebSockClient_Container_UserShared}

user definition kept on a @ref pg_class_websock_client_agent instance  

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## SetUp {#WebSockClient_Container_SetUp}

create an Agent of WebSocket client

## Spec

SetUp(port,opt):@ref pg_class_websock_server_agent

## Args

| Name | Type | Means |
|------|------|-------|
| url | string | connecting server |
| opt | @ref WebSockServer_Container_Option | optional params |
