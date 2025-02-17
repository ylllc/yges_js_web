// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Unit Test View for web --------------- //
(()=>{ // local namespace 

function _view_scenaria(target,src){

	let ul=YgEs.NewQHT({Target:target,Tag:'ul',Attr:{class:'yges_testrun_layer'}});

	for(let sct of src){
		let li=YgEs.NewQHT({Target:ul,Tag:'li',Attr:{class:'yges_testrun_scn'}});
		let st=YgEs.NewQHT({Target:li,Tag:'span'});
		YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_caption'},Sub:[sct.Scenario.Title]});
		let dbg=YgEs.NewQHT({Target:li,Tag:'div'});
		let endmon=null;
		const view={
			Skip:()=>{
				st.Replace('(skip)');
				st.Element.setAttribute('class','yges_testrun_stat_skip');
			},
			Start:(logger,launcher)=>{
				st.Replace('[...]');
				st.Element.setAttribute('class','yges_testrun_stat_wip');
				let lv=YgEs.LogView.SetUp(dbg,logger);
				let ev=YgEs.EngineView.SetUp(dbg,launcher);
				endmon=YgEs.Timing.Poll(100,()=>{ev.Update();});
			},
			UpdateResult:(f)=>{
				if(f){
					if(endmon)endmon();
					st.Replace('[OK]');
					st.Element.setAttribute('class','yges_testrun_stat_ok');
					dbg.Remove();
					dbg=null;
				}
				else if(f===false){
					if(endmon)endmon();
					st.Replace('[NG]');
					st.Element.setAttribute('class','yges_testrun_stat_ng');
				}
			},
			SetError:(e)=>{
				view.UpdateResult(false);
				YgEs.NewQHT({Target:li,Tag:'div',Attr:{class:'yges_testrun_error'},Sub:[e.toString()]});
			},
		}
		sct.SetView(view);
	}
}

function _view_file(target,src,fn){

	let ul=YgEs.NewQHT({Target:target,Tag:'ul',Attr:{class:'yges_testrun_layer'}});
	let li=YgEs.NewQHT({Target:ul,Tag:'li',Attr:{class:'yges_testrun_file'}});
	let st=YgEs.NewQHT({Target:li,Tag:'span'});
	YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_caption'},Sub:[fn]});
	let msg=YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_msg'}});
	let sub=YgEs.NewQHT({Target:li,Tag:'div'});

	src.SetView({
		Reset:()=>{
			st.Replace('[--]');
			st.Element.setAttribute('class','yges_testrun_stat_idle');
			sub.Clear();
		},
		SetMsg:(s)=>{
			msg.Replace(s);
		},
		UpdateResult:(f)=>{
			if(f){
				st.Replace('[OK]');
				st.Element.setAttribute('class','yges_testrun_stat_ok');
			}
			else if(f===false){
				st.Replace('[NG]');
				st.Element.setAttribute('class','yges_testrun_stat_ng');
			}
			else{
				st.Replace('[...]');
				st.Element.setAttribute('class','yges_testrun_stat_wip');
			}
		},
		SetScenaria:(src)=>{
			_view_scenaria(sub,src);
		},
	});
}

function _view_dir(target,src,dn){

	let ul=YgEs.NewQHT({Target:target,Tag:'ul',Attr:{class:'yges_testrun_layer'}});
	let li=YgEs.NewQHT({Target:ul,Tag:'li',Attr:{class:'yges_testrun_dir'}});
	let st=YgEs.NewQHT({Target:li,Tag:'span'});
	YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_caption'},Sub:[dn]});
	let sub=YgEs.NewQHT({Target:li,Tag:'div'});
	let view={
		Reset:()=>{
			st.Replace('[--]');
			st.Element.setAttribute('class','yges_testrun_stat_idle');
			sub.Clear();
			for(let fn in src.Files){
				_view_file(sub,src.Files[fn],fn);
			}
			for(let dn in src.Dirs){
				_view_dir(sub,src.Dirs[dn],dn);
			}
		},
		UpdateResult:(f)=>{
			if(f){
				st.Replace('[OK]');
				st.Element.setAttribute('class','yges_testrun_stat_ok');
			}
			else if(f===false){
				st.Replace('[NG]');
				st.Element.setAttribute('class','yges_testrun_stat_ng');
			}
			else{
				st.Replace('[...]');
				st.Element.setAttribute('class','yges_testrun_stat_wip');
			}
		},
	}
	src.SetView(view);
	view.Reset();
}

YgEs.TestView={
	Name:'YgEs.TestView.Container',
	User:{},

	SetUp:(target,src)=>{
		_view_dir(target,src,'(all)');
	},
};

})();
