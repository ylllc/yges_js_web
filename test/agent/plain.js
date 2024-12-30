// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

const test=YgEs.Test;
const eng=YgEs.Engine;
const workmng=YgEs.AgentManager;
const hap_global=YgEs.HappeningManager;

// Plain Agent Test --------------------- //

eng.start();

var scenaria=[
	{
		title:'Plain Agent',
		proc:async ()=>{
			var w=workmng.standby({});
			test.chk_strict(w.isOpen(),false);
			var h=w.open();
			test.chk_strict(w.isOpen(),true);
			h.close();
			test.chk_strict(w.isOpen(),false);
			eng.shutdown();
		},
	},
]

test.run(scenaria);
