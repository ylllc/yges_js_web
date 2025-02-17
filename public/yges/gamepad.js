// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2025 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

// GamePad ------------------------------ //
(()=>{ // local namespace 

let _players_max=-1;
let _players_dev=[]

function _setupDevice(gp){

	let dev={
		Name:'YgEs.GamePadDevice',
		User:{},

		_timestamp:gp.timestamp,

		IsConnected:()=>!!dev._lowlevel,
		GetLowLevel:()=>dev._lowlevel,
	}
	return dev;
}

function _assign(pidx,gp){

	let dev=_players_dev[pidx];
	if(!dev)dev=_players_dev[pidx]=_setupDevice(gp);
	dev._lowlevel=gp;
	dev._gpid=gp.id;
	dev._gpindex=gp.index;
}

function _onConnected(ev){

	let gp=ev.gamepad;

	// path 1: by removed device 
	let m=GamePadManager.GetAvailablePlayerCount();
	for(let i=0;i<m;++i){
		let dev=_players_dev[i];
		if(!dev)continue;
		if(dev.IsConnected())continue;
		if(dev._gpid!=gp.id)continue;
		_assign(i,gp);
		return;
	}

	// path 2: by config 
	for(let i=0;i<m;++i){
		let cfg=GamePadManager.PlayerConfig[i];
		if(!cfg)continue;
		if(cfg.DeviceName!=gp.id)continue;
		_assign(i,gp);
		return;
	}

	// path 3: by player index 
	for(let i=0;i<m;++i){
		let dev=_players_dev[i];
		if(!dev){}
		else if(dev.IsConnected())continue;
		_assign(i,gp);
		return;
	}

	// path 4: extra player
	if(_players_max>=0)return;
	_assign(_players_dev.length,gp);
}

function _onDisconnected(ev){

	let gp=ev.gamepad;

	let m=GamePadManager.GetRecognizedPlayerCount();
	for(let i=0;i<m;++i){
		let dev=_players_dev[i];
		if(!dev)continue;
		let ll=dev._lowlevel;
		if(!ll)continue;
		if(gp.index!=ll.index)continue;
		dev._lowlevel=null;
	}
}

let GamePadManager=YgEs.GamePadManager={
	Name:'YgEs.GamePadManager',
	PlayerConfig:[],
	User:{},

	SetPlayerCount:(val)=>{_players_max=val;},
	GetDemandedPlayerCount:()=>_players_max,
	GetAvailablePlayerCount:()=>(_players_max<0)?_players_dev.length:_players_max,
	GetRecognizedPlayerCount:()=>{
		let c1=_players_dev.length;
		let c2=GamePadManager.GetAvailablePlayerCount();
		return (c1>c2)?c1:c2;
	},
	GetPlayerDevice:(idx)=>_players_dev[idx],

	Enable:()=>{
		window.addEventListener("gamepadconnected",_onConnected);
		window.addEventListener("gamepaddisconnected",_onDisconnected);
	},
	Disable:()=>{
		window.removeEventListener("gamepadconnected",_onConnected);
		window.removeEventListener("gamepaddisconnected",_onDisconnected);
	},
	Update:()=>{

		let gpt=navigator.getGamepads();
		for(let i=0;i<_players_dev.length;++i){
			let dev=_players_dev[i];
			if(!dev)continue;
			if(!dev.IsConnected())continue;

			let gp=gpt[dev._gpindex];
			if(!gp)continue;
			dev._lowlevel=gp;
		}
	},
}

})();
