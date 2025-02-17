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
	if(src.Prop){
		YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:'yges_logview_prop'},Sub:[YgEs.Inspect(src.Prop)]});
}
}

function _setup(target,src,hide=false){

	let pool=[]
	let view=hide?YgEs.ToQHT(null):
		YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:'yges_logview_window'}});
	src.Way=(src)=>{
		pool.push(src);
		if(view.Element)_logway(view,src);
	}

	view.Clear=()=>{
		pool=[]
		if(view.Element)view.Element.innerText='';
	}

	view.Show=()=>{
		if(view.Element)return;
		view.Element=YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:'yges_logview_window'}}).Element;
		for(let src of pool)_logway(view,src);
	}
	view.Hide=()=>{
		view.Remove();
	}

	view.GetText=()=>{
		let s='';
		for(let src of pool)s+=src.Text+"\n";
		return s;
	}

	return view;
}

YgEs.LogView={
	Name:'YgEs.LogView.Container',
	User:{},

	SetUp:_setup,
}

})();
