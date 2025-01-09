// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Quick Queue -------------------------- //
(()=>{ // local namespace 

function _qq_create(args){

	let cur=0;

	let q={
		name:'YgEs.QuickQueue',
		User:{},

		IsEnd:()=>{return cur>=args.length;},
		Count:()=>{return args.length;},
		Pos:()=>{return cur;},
		Reset:()=>{cur=0;},
		Peek:()=>{
			if(cur>=args.length)return undefined;
			return args[cur];
		},
		Next:()=>{
			if(cur>=args.length)return undefined;
			return args[cur++];
		},
	}
	return q;
}

YgEs.QuickQueue={
	name:'YgEs.QuickQueueContainer',
	User:{},

	Create:_qq_create,
}

})();
