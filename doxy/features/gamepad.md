@page pg_feat_gamepad GamePad Manager

# What's It?

GamePad management, player friendly.  

-----
# Import

## for web (only)

```
<script src="yges/ipl.js"></script>
<script src="yges/gamepad.js"></script>
```
use YgEs

## for Node/Deno

(not supported)

-----
# How to Use

-----
## Set Max Player Count

```
YgEs.GamePadManager.SetPlayerCount(2);
```

-----
## Set Player Config

as a default, first recognized GamePad is assigned to Player 0 first.  
DeviceName setting makes most priority for a specified device.  

```
YgEs.GamePadManager.PlayerConfig=[
	// for Player 0 
	{},
	// for Player 1 
	{
		DeviceName: "Specified Device Name",
	},
]

```

-----
## Start the GamePad Manager

```
YgEs.GamePadManager.Enable();
```

-----
## Read a GamePad

```
// update GamePad instances  
YgEs.GamePadManager.Update();

// reading GamePad  
let dev=YgEs.GamePadManager.GetPlayerDevice(0); // for Player 0's GamePad 
let gp=dev.GetLowLevel(); // refer as standard GamePad instance 

	:

```

-----
# Class Reference

@sa @ref pg_class_gamepad_device @n
@sa @ref pg_class_gamepad_manager @n
