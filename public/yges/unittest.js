// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
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

function _setupTestFile(launcher,target,url,stat,reportParent){

	let result=null;
	let runs=0;
	let msg='';
	let view=null;

	const setMsg=(s)=>{
		msg='';
		if(view)view.setMsg(s);
	}
	const updateResult=(r)=>{
		if(r===result)return;
		result=r;
		if(view)view.updateResult(result);
		reportParent(r);
	}
	const report=(f)=>{
		--runs;
		if(!f)updateResult(false);
		else if(result===false){}
		else if(runs<1)updateResult(true);
		else return;
	}

	let states={
		'Download':{
			cb_start:(ctrl,user)=>{
				setMsg('(download)');
				YgEs.HTTPClient.getText(url,(src)=>{
					setMsg('(install)');
					src='YgEs.Test.scenaria["'+url+'"]=(()=>{'+src+'return scenaria;})();';
					YgEs.newQHT({target:target,tag:'script',sub:[src]});
					if(!YgEs.Test.scenaria[url]){
						user.hap=launcher.HappenTo.happenMsg('Syntex Error');
					}
					else{
						for(let scn of YgEs.Test.scenaria[url]){
							++runs;
							let sct={
								scn:scn,
								view:null,
								setView:(v)=>{
									sct.view=v;
									if(v)v.updateResult(result);
								},
							}
							user.scenaria.push(sct);
						}
						user.done=true;
						if(view)view.setScenaria(user.scenaria);
					}
				},(hap)=>{
					user.hap=hap;
				});
			},
			poll_keep:(ctrl,user)=>{
				if(user.hap){
					setMsg('(error) '+hap.toString());
					return false;
				}
				if(user.done)return 'Run';
			},
		},
		'Run':{
			cb_start:(ctrl,user)=>{
				setMsg('(standby)');
				YgEs.Timing.toPromise(async ()=>{

					let puf=false;
					for(let i=0;i<user.scenaria.length;++i){
						let sct=user.scenaria[i];
						if(!sct.scn.pickup)continue;
						puf=true;
						break;
					}

					setMsg('(running)');
					for(let i=0;i<user.scenaria.length;++i){
						let sct=user.scenaria[i];
						try{
							if(sct.scn.filter===false || (puf && !sct.scn.pickup)){
								--runs;
								if(sct.view){
									sct.view.skip();
									if(result==null && runs<1)report(true);
								}
								continue;
							}

							await sct.scn.proc({
								Launcher:launcher.createLauncher(),
								Log:YgEs.Log.createLocal(sct.scn.title,YgEs.Log.LEVEL.DEBUG),
							});
							if(sct.view)sct.view.updateResult(true);
							report(true);
						}
						catch(e){
							if(sct.view)sct.view.setError(e);
							report(false);
						}
					}
					setMsg('');
				});
			},
		},
	}

	let user={
		scenaria:[],
		hap:null,
		done:false,
	}
	let proc=YgEs.StateMachine.run('Download',states,{
		name:'YgEs_UnitTest_Proc',
		launcher:launcher,
		user:user,
	});

	user.setView=(v)=>{
		view=v;
		if(view){
			view.updateResult(result);
			view.setMsg(msg);
			if(user.done)view.setScenaria(user.scenaria);
		}
	}

	return user;
}

function _setupTestDir(launcher,target,url,src,reportParent){

	let result=null;
	let runs=0;
	let ctrl={dirs:{},files:{}}
	let view=null;

	const updateResult=(r)=>{
		if(r===result)return;
		result=r;
		if(view)view.updateResult(result);
		reportParent(r);
	}

	const report=(f)=>{
		--runs;
		if(!f)updateResult(false);
		else if(result===false){}
		else if(runs<1)updateResult(true);
		else return;
	}

	for(let fn in src.files){
		++runs;
		ctrl.files[fn]=_setupTestFile(launcher,target,url+fn,src.files[fn],report);
	}
	for(let dn in src.dirs){
		++runs;
		ctrl.dirs[dn]=_setupTestDir(launcher,target,url+dn+'/',src.dirs[dn],report);
	}

	ctrl.setView=(v)=>{
		view=v;
		if(view)view.updateResult(result);
	}

	return ctrl;
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

	setup:(launcher,target,url,src)=>{
		return _setupTestDir(launcher,target,url,src,()=>{});
	},

};

})();
