// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

const test=YgEs.Test;
const eng=YgEs.Engine;
const workmng=YgEs.AgentManager;
const log=YgEs.Log;
const hap_global=YgEs.HappeningManager;

// Agent Callback Test ------------------ //

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
		worker.User.count+=1;
		test.chk_strict(worker.User.count,2);
	},
	cb_repair:(worker)=>{
		test.chk_never("don't step");
	},
	cb_ready:(worker)=>{
		worker.User.count+=2;
		test.chk_strict(worker.User.count,4);
	},
	poll_healthy:(worker)=>{
		if(++worker.User.count>=10){
			handle.close();
		}
	},
	poll_trouble:(worker)=>{
		test.chk_never("don't step");
	},
	cb_close:(worker)=>{
		worker.User.count+=3;
		test.chk_strict(worker.User.count,13);
	},
	cb_finish:(worker)=>{
		worker.User.count+=4;
		test.chk_strict(worker.User.count,17);
	},
	cb_abort:(worker)=>{
		test.chk_never("don't step");
	},
}

var scenaria=[
	{
		title:'Agent Callback',
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
