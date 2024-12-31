// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

// Unit Test Utility for web ------------ //
(()=>{ // local namespace 

function _cpmsg(msg,v1,op,v2){
	if(!msg)msg='Test Mismatch:';
	return ''+msg+' ('+YgEs.inspect(v1)+' '+op+' '+YgEs.inspect(v2)+')';
}

function _assert(cond,msg){

	if(cond)return;
	throw new Error('Test Assertion: '+msg);
}

YgEs.Test={
	name:'YgEs_UnitTest',
	User:{},
	scenaria:{},

	never:(msg=null)=>{_assert(false,msg)},
	chk:(cond,msg=null)=>{_assert(cond,msg)},
	chk_loose:(v1,v2,msg=null)=>{_assert(v1==v2,_cpmsg(msg,v1,'==',v2))},
	chk_strict:(v1,v2,msg=null)=>{_assert(v1===v2,_cpmsg(msg,v1,'===',v2))},
	chk_less:(v1,v2,msg=null)=>{_assert(v1<v2,_cpmsg(msg,v1,'<',v2))},
	chk_less_eq:(v1,v2,msg=null)=>{_assert(v1<=v2,_cpmsg(msg,v1,'<=',v2))},
	chk_great:(v1,v2,msg=null)=>{_assert(v1>v2,_cpmsg(msg,v1,'>',v2))},
	chk_great_eq:(v1,v2,msg=null)=>{_assert(v1>=v2,_cpmsg(msg,v1,'>=',v2))},

	run:(scn)=>{
		// dummy 
	},

	setupView:(launcher,target,baseurl,dirent,cb_result)=>{

		let runs=0;
		let errored=false;

		let ul=YgEs.newQHT({target:target,tag:'ul',attr:{class:'yges_test_layer'}});
		for(let fn in dirent.files){
			++runs;
			let li=YgEs.newQHT({target:ul,tag:'li',attr:{class:'yges_test_file'}});
			let st=YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_stat_loading'},sub:['(loading)']});
			YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_caption'},sub:[fn]});
			let url=baseurl+fn;
			YgEs.HTTPClient.getText(url,(src)=>{
				// install test source 
				st.replace('(install)');
				st.Element.setAttribute('class','yges_test_stat_install');
				src='YgEs.Test.scenaria["'+url+'"]=(()=>{'+src+'return scenaria;})();';
				YgEs.newQHT({target:li,tag:'script',sub:[src]});

				st.replace('(running)');
				st.Element.setAttribute('class','yges_test_stat_running');
				let ul2=YgEs.newQHT({target:li,tag:'ul'});
				let puf=false;
				let que=[]
				for(let scn of YgEs.Test.scenaria[url]){
					if(scn.pickup)puf=true;
					let li2=YgEs.newQHT({target:ul2,tag:'li',attr:{class:'yges_test_scn'}});
					let st2=YgEs.newQHT({target:li2,tag:'span',attr:{class:'yges_test_stat_standby'},sub:['(standby)']});
					YgEs.newQHT({target:li2,tag:'span',attr:{class:'yges_test_caption'},sub:[scn.title]});
					que.push({
						scn:scn,
						stat:st2,
						content:li2,
					});
				}
				YgEs.Timing.toPromise(async ()=>{
					let ng=false;
					for(let q of que){
						if(q.scn.filter===false || (puf && !q.scn.pickup)){
							q.stat.replace('(skip)');
							q.stat.Element.setAttribute('class','yges_test_stat_skip');
							continue;
						}
						try{
							q.stat.replace('(running)');
							q.stat.Element.setAttribute('class','yges_test_stat_running');
							await q.scn.proc({
								Launcher:YgEs.Engine.createLauncher(),
								Log:YgEs.Log.createLocal(q.scn.title,YgEs.Log.LEVEL.DEBUG),
							});
							q.stat.replace('[OK]');
							q.stat.Element.setAttribute('class','yges_test_stat_ok');
						}
						catch(e){
							q.stat.replace('[NG]');
							q.stat.Element.setAttribute('class','yges_test_stat_ng');
							YgEs.newQHT({target:q.content,tag:'div',attr:{class:'yges_test_error'},sub:e.toString()});
							ng=true;
						}
					}
					st.replace(ng?'[NG]':'[OK]');
					st.Element.setAttribute('class','yges_test_stat_'+(ng?'ng':'ok'));
					if(ng)errored=true;
					if(--runs<=0)cb_result(errored);
				});
			},(hap)=>{
				st.replace('(error)');
				st.Element.setAttribute('class','yges_test_stat_error');
				YgEs.newQHT({target:li,tag:'div',attr:{class:'yges_test_error'},sub:hap.toString()});
			});
		}
		for(let dn in dirent.dirs){
			++runs;
			let li=YgEs.newQHT({target:ul,tag:'li',attr:{class:'yges_test_dir'}});
			let st=YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_stat_loading'},sub:['[...]']});
			YgEs.newQHT({target:li,tag:'span',attr:{class:'yges_test_caption'},sub:[dn]});
			YgEs.Test.setupView(launcher,li,baseurl+dn+'/',dirent.dirs[dn],(ng)=>{
				st.replace(ng?'[NG]':'[OK]');
				st.Element.setAttribute('class','yges_test_stat_'+(ng?'ng':'ok'));
				if(ng)errored=true;
				if(--runs<=0)cb_result(errored);
			});
		}
		if(runs<=0)cb_result(true);
	},

	setupGUI:(launcher,target,baseurl,dirent)=>{

		let view=YgEs.newQHT({target:target,tag:'div'});
		let ctrl={
			View:view,
		}
		YgEs.Test.setupView(launcher,view,baseurl,dirent,(result)=>{
		});
		return ctrl;
	},
};

})();
