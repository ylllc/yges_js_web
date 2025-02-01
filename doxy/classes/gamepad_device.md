@page pg_class_gamepad_device GamePadDevice

-----
# What's It?

created and managed by @ref pg_class_gamepad_manager  

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## IsConnected() {#GamePadDevice_IsConnected}

### Spec

IsConnected():bool

### Returns

check connected a GamePad for this player

-----
## GetLowLevel() {#GamePadDevice_GetLowLevel}

### Spec

GetLowLevel():GamePad

### Returns

standard [GamePad](https://developer.mozilla.org/ja/docs/Web/API/Gamepad) instance.  
