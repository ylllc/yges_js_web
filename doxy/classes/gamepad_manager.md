@page pg_class_gamepad_manager GamePadManager

# What's It?

@sa @ref pg_feat_gamepad

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.GamePadManager | Gamepad manager |

-----
# Structures

-----
## PlayerConfig {#GamePadManager_PlayerConfig}

| Name | Type | Means |
|------|------|-------|
| DeviceName | string? | has most priority assignment for it |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| PlayerConfig | @ref GamePadManager_PlayerConfig[] | settings by player |
| User | struct | user definitions |

-----
# Methods

-----
## SetPlayerCount() {#GamePadManager_SetPlayerCount}

set max player of your application spec  

### Spec

SetPlayerCount(val):void

### Args

| Name | Type | Means |
|------|------|-------|
| val | int | max players (-1=unlimited) |

-----
## GetDemandedPlayerCount() {#GamePadManager_GetDemandedPlayerCount}

### Spec

GetDemandedPlayerCount():int

### Returns

setting by @ref GamePadManager_SetPlayerCount  

-----
## GetAvailablePlayerCount() {#GamePadManager_GetAvailablePlayerCount}

### Spec

GetAvailablePlayerCount():int

### Returns

max player count,  
or recognized when unlimited setting   

-----
## GetRecognizedPlayerCount() {#GamePadManager_GetRecognizedPlayerCount}

### Spec

GetRecognizedPlayerCount():int

### Returns

player count with over recognized.  

-----
## GetPlayerDevice() {#GamePadManager_GetPlayerDevice}

### Spec

GetPlayerDevice(pidx):@ref pg_class_gamepad_device?

### Args

| Name | Type | Means |
|------|------|-------|
| pidx | int | player index |

### Returns

assigned device instance (or null)

-----
## Enable() {#GamePadManager_Enable}

enable the manager.  

### Spec

Enable():void

-----
## Disable() {#GamePadManager_Disable}

disable the manager.  

### Spec

Disable():void

-----
## Update() {#GamePadManager_Update}

update GamePad instances.  

### Spec

Update():void
