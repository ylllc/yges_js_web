// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Engine View for web ------------------ //
(()=>{ // local namespace 

function _view_proc(target,src,tick,active){

	let view=YgEs.NewQHT({Target:target,Tag:'li'});
	view._tick=0;

	view.Status=YgEs.NewQHT({Target:view,Tag:'span'});


	YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:'yges_engview_proc_capt'},Sub:[src.name]});
	YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:'yges_engview_proc_rmks'},Sub:['{'+src.GetInstanceID()+'}']});

	view.Update=(tick=null)=>{
		if(!view.Element)return;
		if(tick==null)tick=++view._tick;
		else view._tick=tick;

		if(active){
			view.Element.setAttribute('class','yges_engview_proc_active');
		}
		else{
			view.Element.setAttribute('class','yges_engview_proc_held');
		}

		if(src.IsFinished()){
			view.Status.Element.setAttribute('class','yges_engview_proc_status_finished');
			view.Status.Element.innerText='(Finished)';
		}
		else if(src.IsAborted()){
			view.Status.Element.setAttribute('class','yges_engview_proc_status_aborted');
			view.Status.Element.innerText='(Aborted)';
		}
		else if(!src.IsStarted()){
			view.Status.Element.setAttribute('class','yges_engview_proc_status_standby');
			view.Status.Element.innerText='(Standby)';
		}
		else{
			view.Status.Element.setAttribute('class','yges_engview_proc_status_running');
			view.Status.Element.innerText='(Running)';
		}
	}

	view.Update(tick);
	return view;
}

function _view_launcher(view,src){

	view._tick=0;
	view.Label=YgEs.NewQHT({Target:view,Tag:'div',Attr:{class:'yges_engview_label'}});
	view.Status=YgEs.NewQHT({Target:view.Label,Tag:'span',Attr:{class:'yges_engview_status'}});
	view.Capt=YgEs.NewQHT({Target:view.Label,Tag:'span',Attr:{class:'yges_engview_capt'}});
	view.Rmks=YgEs.NewQHT({Target:view.Label,Tag:'span',Attr:{class:'yges_engview_rmks'}});
	view.Info=YgEs.NewQHT({Target:view,Tag:'div',Attr:{class:'yges_engview_info'}});
	view.List=YgEs.NewQHT({Target:view.Info,Tag:'ul',Attr:{class:'yges_engview_list'}});
	view.Sub={}
	view.Proc={}

	view.Update=(tick=null)=>{
		if(!view.Element)return;
		if(tick==null)tick=++view._tick;
		else view._tick=tick;

		let ca=src.CountActive();
		let ch=src.CountHeld();
		view.Status.Element.innerText='['+ca+'/'+(ca+ch)+']';
		view.Capt.Element.innerText=src.name;
		view.Rmks.Element.innerText='('+src.GetInstanceID()+')';

		for(let src2 of src.GetActive()){
			let iid=src2.GetInstanceID();
			if(view.Proc[iid])view.Proc[iid].Update(tick);
			else view.Proc[iid]=_view_proc(view.List,src2,tick,true);
		}
		for(let src2 of src.GetHeld()){
			let iid=src2.GetInstanceID();
			if(view.Proc[iid])view.Proc[iid].Update(tick);
			else view.Proc[iid]=_view_proc(view.List,src2,tick,false);
		}
		for(let iid in view.Proc){
			if(tick==view.Proc[iid]._tick)continue;
			view.Proc[iid].Remove();
			delete view.Proc[iid];
		}

		for(let src2 of src.GetSub()){
			let iid=src2.GetInstanceID();
			if(view.Sub[iid])view.Sub[iid].Update(tick);
			else{
				view.Sub[iid]=YgEs.NewQHT({Target:view.Info,Tag:'div',Attr:{class:'yges_engview_subview'}});
				_view_launcher(view.Sub[iid],src2);
			}
		}
		for(let iid in view.Sub){
			if(tick==view.Sub[iid]._tick)continue;
			view.Sub[iid].Remove();
			delete view.Sub[iid];
		}
	},

	view.Update();
	return view;
}

YgEs.EngineView={
	name:'YgEs.EngineView',
	User:{},

	SetUp:(target)=>{
		let view=YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:'yges_hapview_window'}});
		return _view_launcher(view,YgEs.Engine);
	},
}

})();
