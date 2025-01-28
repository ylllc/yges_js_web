// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;
const StateMachine=YgEs.StateMachine;

// 2 States Test ------------------------ //

const states={
	'Test1':{
		OnPollInKeep:(ctx,user)=>{
			Test.ChkLessEq(++user.Count,10,'poll_keep called illegular');
			return (user.Count<10)?null:'Test2';
		},
		OnEnd:(ctx,user)=>{
			Test.ChkStrict(++user.Count,11,'cb_end called illegular');
		},
	},
	'Test2':{
		OnStart:(ctx,user)=>{
			Test.ChkStrict(++user.Count,12,'cb_start called illegular');
		},
		OnPollInKeep:(ctx,user)=>{
			Test.ChkLessEq(++user.Count,20,'poll_keep called illegular');
			return (user.Count<20)?null:true;
		},
		OnEnd:(ctx,user)=>{
			Test.ChkStrict(++user.Count,21,'cb_end called illegular');
		},
	},
}

let opt={
	User:{Count:1}, // share in states 
	OnDone:(user)=>{
		Test.ChkStrict(++user.Count,22,'cb_done called illegular');
	},
	OnAbort:(user)=>{
		Test.Never('states abend');
	},
}

const scenaria=[
	{
		Title:'2 States Running',
		Proc:async (tool)=>{
			opt.Launcher=tool.Launcher;
			opt.HappenTo=tool.Launcher.HappenTo;

			// run with undefined state 
			// abort soon 
			let smc=StateMachine.Run('Test1',states,opt);

			let info=smc.GetInfo();
			Test.ChkStrict(null,info.Prev);
			Test.ChkStrict('Test1',info.Cur);
			Test.ChkStrict(null,info.Next);
			Test.ChkStrict(2,info.User.Count);

			await tool.Launcher.ToPromise();

			info=smc.GetInfo();
			Test.ChkStrict('Test2',info.Prev);
			Test.ChkStrict(null,info.Cur);
			Test.ChkStrict(null,info.Next);
			Test.ChkStrict(22,info.User.Count);
		},
	},
]

Test.Run(scenaria);
