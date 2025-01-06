// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Unit Test View for web --------------- //
(()=>{ // local namespace 

function _view_scenaria(src,target){

	let ul=YgEs.newQHT({target:target,tag:'ul',attr:{class:'yges_test_layer'}});

	for(let sct of src){
		let li=YgEs.newQHT({target:ul,tag:'li',attr:{class:'yges_test_scn'}});
		let st=YgEs.newQHT({target:li,tag:'span'});
		YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_caption'},sub:[sct.scn.title]});
		const view={
			updateResult:(f)=>{
				if(f){
					st.replace('[OK]');
					st.Element.setAttribute('class','yges_test_stat_ok');
				}
				else if(f===false){
					st.replace('[NG]');
					st.Element.setAttribute('class','yges_test_stat_ng');
				}
				else{
					st.replace('[...]');
					st.Element.setAttribute('class','yges_test_stat_wip');
				}
			},
			skip:()=>{
				st.replace('(skip)');
				st.Element.setAttribute('class','yges_test_stat_skip');
			},
			setError:(e)=>{
				view.updateResult(false);
				YgEs.newQHT({target:li,tag:'div',attr:{class:'yges_test_error'},sub:[e.toString()]});
			},
		}
		sct.setView(view);
	}
}

function _view_file(src,target,fn){

	let ul=YgEs.newQHT({target:target,tag:'ul',attr:{class:'yges_test_layer'}});
	let li=YgEs.newQHT({target:ul,tag:'li',attr:{class:'yges_test_file'}});
	let st=YgEs.newQHT({target:li,tag:'span'});
	YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_caption'},sub:[fn]});
	let msg=YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_msg'}});

	src.setView({
		setMsg:(s)=>{
			msg.replace(s);
		},
		updateResult:(f)=>{
			if(f){
				st.replace('[OK]');
				st.Element.setAttribute('class','yges_test_stat_ok');
			}
			else if(f===false){
				st.replace('[NG]');
				st.Element.setAttribute('class','yges_test_stat_ng');
			}
			else{
				st.replace('[...]');
				st.Element.setAttribute('class','yges_test_stat_wip');
			}
		},
		setScenaria:(src)=>{
			_view_scenaria(src,li);
		},
	});
}

function _view_dir(src,target,dn){

	let ul=YgEs.newQHT({target:target,tag:'ul',attr:{class:'yges_test_layer'}});
	let li=YgEs.newQHT({target:ul,tag:'li',attr:{class:'yges_test_dir'}});
	let st=YgEs.newQHT({target:li,tag:'span'});
	YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_caption'},sub:[dn]});
	src.setView({
		updateResult:(f)=>{
			if(f){
				st.replace('[OK]');
				st.Element.setAttribute('class','yges_test_stat_ok');
			}
			else if(f===false){
				st.replace('[NG]');
				st.Element.setAttribute('class','yges_test_stat_ng');
			}
			else{
				st.replace('[...]');
				st.Element.setAttribute('class','yges_test_stat_wip');
			}
		},
	});

	for(let fn in src.files){
		_view_file(src.files[fn],li,fn);
	}
	for(let dn in src.dirs){
		_view_dir(src.dirs[dn],li,dn);
	}
}

YgEs.TestView={
	name:'YgEs_UnitTestView',
	User:{},

	setup:(src,target)=>{
		_view_dir(src,target,'(root)');
	},

//	setupView:(launcher,target,baseurl,dirent,cb_result)=>{
//
//		let runs=0;
//		let errored=false;
//
//		for(let fn in dirent.files){
//			++runs;
//			let li=YgEs.newQHT({target:ul,tag:'li',attr:{class:'yges_test_file'}});
//			let st=YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_stat_loading'},sub:['(loading)']});
//			YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_caption'},sub:[fn]});
//			let url=baseurl+fn;
//			YgEs.HTTPClient.getText(url,(src)=>{
//				// install test source 
//				st.replace('(install)');
//				st.Element.setAttribute('class','yges_test_stat_install');
//				src='YgEs.Test.scenaria["'+url+'"]=(()=>{'+src+'return scenaria;})();';
//				YgEs.newQHT({target:li,tag:'script',sub:[src]});
//
//				st.replace('(running)');
//				st.Element.setAttribute('class','yges_test_stat_running');
//				let ul2=YgEs.newQHT({target:li,tag:'ul'});
//				let puf=false;
//				let que=[]
//				for(let scn of YgEs.Test.scenaria[url]){
//					if(scn.pickup)puf=true;
//					let li2=YgEs.newQHT({target:ul2,tag:'li',attr:{class:'yges_test_scn'}});
//					let st2=YgEs.newQHT({target:li2,tag:'span',attr:{class:'yges_test_stat_standby'},sub:['(standby)']});
//					YgEs.newQHT({target:li2,tag:'span',attr:{class:'yges_test_caption'},sub:[scn.title]});
//					que.push({
//						scn:scn,
//						stat:st2,
//						content:li2,
//					});
//				}
//				YgEs.Timing.toPromise(async ()=>{
//					let ng=false;
//					for(let q of que){
//						if(q.scn.filter===false || (puf && !q.scn.pickup)){
//							q.stat.replace('(skip)');
//							q.stat.Element.setAttribute('class','yges_test_stat_skip');
//							continue;
//						}
//						try{
//							q.stat.replace('(running)');
//							q.stat.Element.setAttribute('class','yges_test_stat_running');
//							await q.scn.proc({
//								Launcher:YgEs.Engine.createLauncher(),
//								Log:YgEs.Log.createLocal(q.scn.title,YgEs.Log.LEVEL.DEBUG),
//							});
//							q.stat.replace('[OK]');
//							q.stat.Element.setAttribute('class','yges_test_stat_ok');
//						}
//						catch(e){
//							q.stat.replace('[NG]');
//							q.stat.Element.setAttribute('class','yges_test_stat_ng');
//							YgEs.newQHT({target:q.content,tag:'div',attr:{class:'yges_test_error'},sub:e.toString()});
//							ng=true;
//						}
//					}
//					st.replace(ng?'[NG]':'[OK]');
//					st.Element.setAttribute('class','yges_test_stat_'+(ng?'ng':'ok'));
//					if(ng)errored=true;
//					if(--runs<=0)cb_result(errored);
//				});
//			},(hap)=>{
//				st.replace('(error)');
//				st.Element.setAttribute('class','yges_test_stat_error');
//				YgEs.newQHT({target:li,tag:'div',attr:{class:'yges_test_error'},sub:hap.toString()});
//			});
//		}
//		for(let dn in dirent.dirs){
//			++runs;
//			let li=YgEs.newQHT({target:ul,tag:'li',attr:{class:'yges_test_dir'}});
//			let st=YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_stat_loading'},sub:['[...]']});
//			YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_caption'},sub:[dn]});
//			YgEs.Test.setupView(launcher,li,baseurl+dn+'/',dirent.dirs[dn],(ng)=>{
//				st.replace(ng?'[NG]':'[OK]');
//				st.Element.setAttribute('class','yges_test_stat_'+(ng?'ng':'ok'));
//				if(ng)errored=true;
//				if(--runs<=0)cb_result(errored);
//			});
//		}
//		if(runs<=0)cb_result(true);
//	},
//
//	setupGUI:(launcher,target,baseurl,dirent)=>{
//
//		let view=YgEs.newQHT({target:target,tag:'div'});
//		let ctrl={
//			View:view,
//		}
//		YgEs.Test.setupView(launcher,view,baseurl,dirent,(result)=>{
//		});
//		return ctrl;
//	},
};

})();
