// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Log View ----------------------------- //
(()=>{ // local namespace 

const _loglevclass=[
	'yges_logview_line_tick',
	'yges_logview_line_trace',
	'yges_logview_line_debug',
	'yges_logview_line_info',
	'yges_logview_line_notice',
	'yges_logview_line_warn',
	'yges_logview_line_fatal',
	'yges_logview_line_crit',
	'yges_logview_line_alert',
	'yges_logview_line_emerg',
]

function _logway(target,src){

	YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:_loglevclass[src.Lev]},Sub:[src.Text]});
}

function _setup(target){

	let ctrl={
		Attach:(log)=>{
			log.Way=(src)=>_logway(target,src);
		},
		Clear:()=>{
			target.Clear();
		},
		GetText:()=>{
			return target.Element.innerText;
		},
	}
	return ctrl;
}

YgEs.LogView={
	name:'YgEs.LogView',
	User:{},

	SetUp:_setup,
}

})();
