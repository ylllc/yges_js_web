// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;
const AgentManager=YgEs.AgentManager;

// Agent Restart Test ------------------- //

let agent=null;
let handle=null;

let workset={
	user:{count:1},
	cb_open:(agent)=>{
		++agent.User.count;
	},
	cb_ready:(agent)=>{
		if(agent.User.count<10)agent.restart();
		else handle.close();
	},
	cb_finish:(agent)=>{
		Test.chk_strict(agent.User.count,10);
	},
}

const scenaria=[
	{
		title:'Agent Restart',
		proc:async (tool)=>{
			workset.launcher=tool.Launcher;
			workset.happen=tool.Launcher.HappenTo;
			agent=AgentManager.standby(workset);
			Test.chk_strict(agent.User.count,1);
			handle=agent.fetch();
			handle.open();

			await tool.Launcher.toPromise();
		},
	},
]

Test.run(scenaria);
