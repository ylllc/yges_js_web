// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

// Empty State Test //

const test=YgEs.Test;
const eng=YgEs.Engine;
const stmac=YgEs.StateMachine;
const log=YgEs.Log;
const hap_global=YgEs.HappeningManager;

var hap_local=hap_global.createLocal({
	happen:(hap)=>{log.fatal(hap.GetProp());},
});

// empty states
var states={
}

eng.start();

var opt={
	launcher:eng.createLauncher(),
	happen:hap_local,
	cb_done:(user)=>{
		// OK 
	},
	cb_abort:(user)=>{
		test.never('states abend');
	},
}

var scenaria=[
	{
		title:'Empty Running',
		proc:async ()=>{
			// run with undefined state 
			// abort soon 
			stmac.run(null,states,opt);

			await opt.launcher.toPromise();
			eng.shutdown();
		},
	},
]

test.run(scenaria);
