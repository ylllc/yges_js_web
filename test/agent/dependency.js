// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

const test=YgEs.Test;
const eng=YgEs.Engine;
const workmng=YgEs.AgentManager;
const log=YgEs.Log;
const hap_global=YgEs.HappeningManager;

// Agent Dependencies Test -------------- //

eng.start();

var worker=null;
var handle=null;
var launcher=eng.createLauncher();
var hap_local=hap_global.createLocal({
	happen:(hap)=>{log.fatal(hap.getProp());},
});

var workset1={
	launcher:launcher,
	happen:hap_local,
	user:{count:0},
	cb_open:(worker)=>{
		test.chk_strict(worker.isBusy(),true);
		worker.waitFor(()=>{
			return ++worker.User.count>=10;
		});
	},
	cb_ready:(worker)=>{
		test.chk_strict(worker.isReady(),true);
	},
	cb_close:(worker)=>{
		test.chk_strict(worker.isReady(),false);
		worker.waitFor(()=>{
			return ++worker.User.count>=20;
		});
	},
	cb_finish:(worker)=>{
		test.chk_strict(worker.isBusy(),false);
	},
}

var workset2={
	launcher:launcher,
	happen:hap_local,
	user:{count:0},
	dependencies:{w1:workmng.launch(workset1)},
	cb_open:(worker)=>{
		test.chk_strict(worker.isBusy(),true);
	},
	cb_ready:(worker)=>{
		test.chk_strict(worker.isReady(),true);
		test.chk_strict(worker.getDependencies().w1.isOpenAgent(),true);

		handle.close();
		test.chk_strict(worker.isOpen(),false);
	},
	cb_close:(worker)=>{
		test.chk_strict(worker.isReady(),false);
		test.chk_strict(worker.getDependencies().w1.isOpenAgent(),false);
	},
	cb_finish:(worker)=>{
		test.chk_strict(worker.isBusy(),false);
	},
}

var scenaria=[
	{
		title:'Agent Dependencies',
		proc:async ()=>{
			worker=workmng.standby(workset2);
			handle=worker.open();
			test.chk_strict(worker.isOpen(),true);

			await launcher.toPromise();
			eng.shutdown();
		},
	},
]

test.run(scenaria);
