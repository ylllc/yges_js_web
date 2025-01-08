// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;
const AgentManager=YgEs.AgentManager;

// Plain Agent Test --------------------- //

const scenaria=[
	{
		Title:'Plain Agent',
		Proc:async (tool)=>{
			let w=AgentManager.StandBy({});
			Test.ChkStrict(w.IsOpen(),false);
			let h=w.Open();
			Test.ChkStrict(w.IsOpen(),true);
			h.Close();
			Test.ChkStrict(w.IsOpen(),false);
		},
	},
]

Test.Run(scenaria);
