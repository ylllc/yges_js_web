// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

var test=YgEs.Test;
var timing=YgEs.Timing;

// Delay Test --------------------------- //

const interval=100;

var scenaria=[
	{
		title:'Delay',
		proc:async ()=>{
			var t1=Date.now();
			await new Promise((ok,ng)=>{
				timing.delay(interval,()=>{
					var dt=Date.now()-t1;
					test.chk_great(dt,interval-(interval>>3));
					ok();
				});
			});
		},
	},
	{
		title:'Cancel Delay',
		proc:async ()=>{
			await new Promise((ok,ng)=>{
				var cancel=timing.delay(interval,()=>{
					test.never('not cancelled');
				});
				cancel();
				ok();
			});
		},
	},
]

test.run(scenaria);
