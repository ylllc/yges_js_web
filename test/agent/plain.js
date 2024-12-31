// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

const Test=YgEs.Test;
const AgentManager=YgEs.AgentManager;

// Plain Agent Test --------------------- //

const scenaria=[
	{
		title:'Plain Agent',
		proc:async (tool)=>{
			let w=AgentManager.standby({});
			Test.chk_strict(w.isOpen(),false);
			let h=w.open();
			Test.chk_strict(w.isOpen(),true);
			h.close();
			Test.chk_strict(w.isOpen(),false);
		},
	},
]

Test.run(scenaria);
