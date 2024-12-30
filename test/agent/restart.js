// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

const test=YgEs.Test;
const eng=YgEs.Engine;
const workmng=YgEs.AgentManager;
const log=YgEs.Log;
const hap_global=YgEs.HappeningManager;

// Agent Restart Test ------------------- //

eng.start();

var worker=null;
var handle=null;
var launcher=eng.createLauncher();
var hap_local=hap_global.createLocal({
	happen:(hap)=>{log.fatal(hap.getProp());},
});

var workset={
	launcher:launcher,
	happen:hap_local,
	user:{count:1},
	cb_open:(worker)=>{
		++worker.User.count;
	},
	cb_ready:(worker)=>{
		if(worker.User.count<10)worker.restart();
		else handle.close();
	},
	cb_finish:(worker)=>{
		test.chk_strict(worker.User.count,10);
	},
}

var scenaria=[
	{
		title:'Agent Restart',
		proc:async ()=>{
			worker=workmng.standby(workset);
			test.chk_strict(worker.User.count,1);
			handle=worker.fetch();
			handle.open();

			await launcher.toPromise();
			eng.shutdown();
		},
	},
]

test.run(scenaria);
