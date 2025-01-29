// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;
const AgentManager=YgEs.AgentManager;

// Agent Repairing Test ----------------- //

let agent=null;
let handle=null;

let workset={
	User:{Count:1},
	OnOpen:(agent)=>{
		agent.User.Count+=2;
		Test.ChkStrict(agent.User.Count,4);
	},
	OnRepair:(agent)=>{
		agent.User.Count+=1;
		Test.ChkStrict(agent.User.Count,2);

		agent.WaitFor('HappeningManager cleaned up',()=>{
			// resolve all happenings in target HappeningManager 
			let hm=agent.GetHappeningManager();
			hm.Poll((hap)=>{
				hap.Resolve();
			});

			hm.CleanUp();
			return hm.IsCleaned();
		});
	},
	OnReady:(agent)=>{
		agent.User.Count+=3;
		Test.ChkStrict(agent.User.Count,7);

		handle.Close();
	},
	OnClose:(agent)=>{
		agent.User.Count+=4;
		Test.ChkStrict(agent.User.Count,11);
	},
	OnFinish:(agent)=>{
		agent.User.Count+=5;
		Test.ChkStrict(agent.User.Count,16);
	},
	OnAbort:(agent)=>{
		Test.Never("don't step");
	},
}

const scenaria=[
	{
		Title:'Agent Repairing',
		Proc:async (tool)=>{
			workset.Launcher=tool.Launcher;
			workset.HappenTo=tool.HappenTo.CreateLocal({
				OnHappen:(hap)=>{
//					tool.Log.Fatal(hap.ToString(),hap.GetProp());
				},
			});
			agent=AgentManager.StandBy(workset);
			Test.ChkStrict(agent.User.Count,1);

			// the agent has a Happening at start 
			// and must repair it to open.  
			workset.HappenTo.Happen('Test Hap.');

			handle=agent.Fetch();
			handle.Open();

			await tool.Launcher.ToPromise();
		},
	},
]

Test.Run(scenaria);
