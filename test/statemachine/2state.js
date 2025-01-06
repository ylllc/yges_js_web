// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;
const StateMachine=YgEs.StateMachine;

// 2 States Test ------------------------ //

const states={
	'Test1':{
		poll_keep:(ctx,user)=>{
			Test.chk_less_eq(++user.count,10,'poll_keep called illegular');
			return (user.count<10)?null:'Test2';
		},
		cb_end:(ctx,user)=>{
			Test.chk_strict(++user.count,11,'cb_end called illegular');
		},
	},
	'Test2':{
		cb_start:(ctx,user)=>{
			Test.chk_strict(++user.count,12,'cb_start called illegular');
		},
		poll_keep:(ctx,user)=>{
			Test.chk_less_eq(++user.count,20,'poll_keep called illegular');
			return (user.count<20)?null:true;
		},
		cb_end:(ctx,user)=>{
			Test.chk_strict(++user.count,21,'cb_end called illegular');
		},
	},
}

let opt={
	user:{count:1}, // share in states 
	cb_done:(user)=>{
		Test.chk_strict(++user.count,22,'cb_done called illegular');
	},
	cb_abort:(user)=>{
		Test.never('states abend');
	},
}

const scenaria=[
	{
		title:'2 States Running',
		proc:async (tool)=>{
			opt.launcher=tool.Launcher;
			opt.happen=tool.Launcher.HappenTo;

			// run with undefined state 
			// abort soon 
			StateMachine.run('Test1',states,opt);

			await tool.Launcher.toPromise();
		},
	},
]

Test.run(scenaria);
