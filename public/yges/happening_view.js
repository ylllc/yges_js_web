// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Happening View for web --------------- //
(()=>{ // local namespace 

function _view_hap(target,hap,tick){

	let view=YgEs.NewQHT({Target:target,Tag:'li',Attr:{class:'yges_hapview_happen'}});
	view.Status=YgEs.NewQHT({Target:view,Tag:'span'});
	view.Capt=YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:'yges_hapview_happen_capt'}});
	view.Rmks=YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:'yges_hapview_happen_rmks'}});
	view.Prop=YgEs.NewQHT({Target:view,Tag:'div',Attr:{class:'yges_hapview_happen_prop'}});

	view.Update=(tick=null)=>{
		if(!view.Element)return;
		if(tick==null)tick=++view._tick;
		else view._tick=tick;

		if(hap.IsResolved()){
			view.Status.Element.innerText='(Resolved)';
			view.Status.Element.setAttribute('class','yges_hapview_happen_status_resolved');
		}
		else if(hap.IsAbandoned()){
			view.Status.Element.innerText='(Abandoned)';
			view.Status.Element.setAttribute('class','yges_hapview_happen_status_abandoned');
		}
		else{
			view.Status.Element.innerText='(Posed)';
			view.Status.Element.setAttribute('class','yges_hapview_happen_status_posed');
		}
		view.Capt.Element.innerText=hap.ToString();
		view.Rmks.Element.innerText='{'+hap.GetInstanceID()+'}';

		let pv=YgEs.Inspect(hap.GetProp());
		view.Prop.Element.innerText=(pv=='{}')?'':pv;
	}

	view.Update(tick);
	return view;
}

function _view_manager(view,src){

	view._tick=0;
	view.Label=YgEs.NewQHT({Target:view,Tag:'div',Attr:{class:'yges_hapview_label'}});
	view.Status=YgEs.NewQHT({Target:view.Label,Tag:'span'});
	view.Capt=YgEs.NewQHT({Target:view.Label,Tag:'span',Attr:{class:'yges_hapview_capt'}});
	view.Rmks=YgEs.NewQHT({Target:view.Label,Tag:'span',Attr:{class:'yges_hapview_rmks'}});
	view.Info=YgEs.NewQHT({Target:view,Tag:'div',Attr:{class:'yges_hapview_info'}});
	view.List=YgEs.NewQHT({Target:view.Info,Tag:'ul',Attr:{class:'yges_hapview_list'}});
	view.Sub={}
	view.Hap={}

	let cleaned=null;

	view.Update=(tick=null)=>{
		if(!view.Element)return;
		if(tick==null)tick=++view._tick;
		else view._tick=tick;

		let f=src.IsCleaned();
		if(f===cleaned){}
		else if(f){
			cleaned=f;
			view.Status.Element.innerText='[OK]';
			view.Status.Element.setAttribute('class','yges_hapview_status_ok');
			}
		else{
			cleaned=f;
			view.Status.Element.innerText='['+src.CountIssues()+']';
			view.Status.Element.setAttribute('class','yges_hapview_status_ng');
		}
		view.Capt.Element.innerText=src.name;
		view.Rmks.Element.innerText='{'+src.GetInstanceID()+'}';

		for(let hap of src.GetIssues()){
			let iid=hap.GetInstanceID();
			if(view.Hap[iid])view.Hap[iid].Update(tick);
			else view.Hap[iid]=_view_hap(view.List,hap,tick);
		}
		for(let iid in view.Hap){
			if(tick==view.Hap[iid]._tick)continue;
			view.Hap[iid].Remove();
			delete view.Hap[iid];
		}

		for(let src2 of src.GetChildren()){
			let iid=src2.GetInstanceID();
			if(view.Sub[iid])view.Sub[iid].Update(tick);
			else{
				view.Sub[iid]=YgEs.NewQHT({Target:view.Info,Tag:'div',Attr:{class:'yges_hapview_subview'}});
				_view_manager(view.Sub[iid],src2);
			}
		}
		for(let iid in view.Sub){
			if(tick==view.Sub[iid]._tick)continue;
			view.Sub[iid].Remove();
			delete view.Sub[iid];
		}
	}

	view.Update();
	return view;
}

YgEs.HappeningView={
	name:'YgEs.HappeningView',
	User:{},

	SetUp:(target,src=null)=>{
		if(!src)src=YgEs.HappeningManager;
		let view=YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:'yges_hapview_window'}});
		return _view_manager(view,src);
	},
}

})();
