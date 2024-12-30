// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

var test=YgEs.Test;
var timing=YgEs.Timing;

// Polling Test ------------------------- //

const interval=50;
var count=0;

var scenaria=[
	{
		title:'Polling',
		proc:async ()=>{
			var t1=Date.now();
			await new Promise((ok,ng)=>{
				var cancel=timing.poll(interval,()=>{
					if(++count>=10){
						cancel();
						ok();
					}
				});
			});
			var dt=Date.now()-t1;
			test.chk_great(dt,interval*9);
			test.chk_strict(count,10);
		},
	},
]

test.run(scenaria);
