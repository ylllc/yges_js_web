// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;
const StateMachine=YgEs.StateMachine;

// Empty State Test --------------------- //

// empty states
const states={
}

let opt={
	OnDone:(user)=>{
		// OK 
	},
	OnAbort:(user)=>{
		Test.Never('states abend');
	},
}

const scenaria=[
	{
		Title:'Empty Running',
		Proc:async (tool)=>{
			opt.Launcher=tool.Launcher;
			opt.HappenTo=tool.Launcher.HappenTo;

			// run with undefined state 
			// abort soon 
			StateMachine.Run(null,states,opt);

			await tool.Launcher.ToPromise();
		},
	},
]

Test.Run(scenaria);
