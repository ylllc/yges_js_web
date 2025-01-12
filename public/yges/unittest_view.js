// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Unit Test View for web --------------- //
(()=>{ // local namespace 

function _view_scenaria(src,target){

	let ul=YgEs.NewQHT({Target:target,Tag:'ul',Attr:{class:'yges_testrun_layer'}});

	for(let sct of src){
		let li=YgEs.NewQHT({Target:ul,Tag:'li',Attr:{class:'yges_testrun_scn'}});
		let st=YgEs.NewQHT({Target:li,Tag:'span'});
		YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_caption'},Sub:[sct.Scenario.Title]});
		const view={
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
			Skip:()=>{
				st.Replace('(skip)');
				st.Element.setAttribute('class','yges_testrun_stat_skip');
			},
			SetError:(e)=>{
				view.UpdateResult(false);
				YgEs.NewQHT({Target:li,Tag:'div',Attr:{class:'yges_testrun_error'},Sub:[e.toString()]});
			},
		}
		sct.SetView(view);
	}
}

function _view_file(src,target,fn){

	let ul=YgEs.NewQHT({Target:target,Tag:'ul',Attr:{class:'yges_testrun_layer'}});
	let li=YgEs.NewQHT({Target:ul,Tag:'li',Attr:{class:'yges_testrun_file'}});
	let st=YgEs.NewQHT({Target:li,Tag:'span'});
	YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_caption'},Sub:[fn]});
	let msg=YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_msg'}});

	src.SetView({
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
			_view_scenaria(src,li);
		},
	});
}

function _view_dir(src,target,dn){

	let ul=YgEs.NewQHT({Target:target,Tag:'ul',Attr:{class:'yges_testrun_layer'}});
	let li=YgEs.NewQHT({Target:ul,Tag:'li',Attr:{class:'yges_testrun_dir'}});
	let st=YgEs.NewQHT({Target:li,Tag:'span'});
	YgEs.NewQHT({Target:li,Tag:'span',Attr:{class:'yges_testrun_caption'},Sub:[dn]});
	src.SetView({
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
	});

	for(let fn in src.Files){
		_view_file(src.Files[fn],li,fn);
	}
	for(let dn in src.Dirs){
		_view_dir(src.Dirs[dn],li,dn);
	}
}

YgEs.TestView={
	name:'YgEs.UnitTestView',
	User:{},

	SetUp:(src,target)=>{
		_view_dir(src,target,'(all)');
	},
};

})();
