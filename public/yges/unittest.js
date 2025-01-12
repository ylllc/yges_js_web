// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Unit Test Utility for web ------------ //
(()=>{ // local namespace 

function _cpmsg(msg,v1,op,v2){
	if(!msg)msg='Test Mismatch:';
	return ''+msg+' ('+YgEs.Inspect(v1)+' '+op+' '+YgEs.Inspect(v2)+')';
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
		if(view)view.SetMsg(s);
	}
	const updateResult=(r)=>{
		if(r===result)return;
		result=r;
		if(view)view.UpdateResult(result);
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
			OnStart:(ctrl,user)=>{
				setMsg('(download)');
				YgEs.HTTPClient.GetText(url,(src)=>{
					setMsg('(install)');
					src='YgEs.Test.Scenaria["'+url+'"]=(()=>{'+src+'return scenaria;})();';
					YgEs.NewQHT({Target:target,Tag:'script',Sub:[src]});
					if(!YgEs.Test.Scenaria[url]){
						user.Hap=launcher.HappenTo.HappenMsg('Syntex Error');
					}
					else{
						for(let scn of YgEs.Test.Scenaria[url]){
							++runs;
							let sct={
								Scenario:scn,
								View:null,
								SetView:(v)=>{
									sct.View=v;
									if(v)v.UpdateResult(result);
								},
							}
							user.Scenaria.push(sct);
						}
						user.Done=true;
						if(view)view.SetScenaria(user.Scenaria);
					}
				},(hap)=>{
					user.Hap=hap;
				});
			},
			OnPollInKeep:(ctrl,user)=>{
				if(user.Hap){
					setMsg('(error) '+user.Hap.ToString());
					return false;
				}
				if(user.Done)return 'Run';
			},
		},
		'Run':{
			OnStart:(ctrl,user)=>{
				setMsg('(standby)');
				YgEs.Timing.ToPromise(async ()=>{

					let puf=false;
					for(let i=0;i<user.Scenaria.length;++i){
						let sct=user.Scenaria[i];
						if(!sct.Scenario.Pickup)continue;
						puf=true;
						break;
					}

					setMsg('(running)');
					for(let i=0;i<user.Scenaria.length;++i){
						let sct=user.Scenaria[i];
						try{
							if(sct.Scenario.Filter===false || (puf && !sct.Scenario.Pickup)){
								--runs;
								if(sct.View){
									sct.View.Skip();
									if(result==null && runs<1)report(true);
								}
								continue;
							}

							await sct.Scenario.Proc({
								Launcher:launcher.CreateLauncher(),
								Log:YgEs.Log.CreateLocal(sct.Scenario.Title,YgEs.Log.LEVEL.DEBUG),
							});
							if(sct.View)sct.View.UpdateResult(true);
							report(true);
						}
						catch(e){
							if(sct.View)sct.View.SetError(e);
							report(false);
						}
					}
					setMsg('');
				});
			},
		},
	}

	let ctrl={
		Scenaria:[],
		Hap:null,
		Done:false,
	}
	let proc=YgEs.StateMachine.Run('Download',states,{
		Name:'YgEs.UnitTest_Proc',
		Launcher:launcher,
		User:ctrl,
	});

	ctrl.SetView=(v)=>{
		view=v;
		if(view){
			view.UpdateResult(result);
			view.SetMsg(msg);
			if(ctrl.Done)view.SetScenaria(ctrl.Scenaria);
		}
	}

	return ctrl;
}

function _setupTestDir(launcher,target,url,src,reportParent){

	let result=null;
	let runs=0;
	let ctrl={Dirs:{},Files:{}}
	let view=null;

	const updateResult=(r)=>{
		if(r===result)return;
		result=r;
		if(view)view.UpdateResult(result);
		reportParent(r);
	}

	const report=(f)=>{
		--runs;
		if(!f)updateResult(false);
		else if(result===false){}
		else if(runs<1)updateResult(true);
		else return;
	}

	for(let fn in src.Files){
		++runs;
		ctrl.Files[fn]=_setupTestFile(launcher,target,url+fn,src.Files[fn],report);
	}
	for(let dn in src.Dirs){
		++runs;
		ctrl.Dirs[dn]=_setupTestDir(launcher,target,url+dn+'/',src.Dirs[dn],report);
	}

	ctrl.SetView=(v)=>{
		view=v;
		if(view)view.UpdateResult(result);
	}

	return ctrl;
}

YgEs.Test={
	name:'YgEs_UnitTest',
	User:{},
	Scenaria:{},

	Never:(msg=null)=>{_assert(false,msg)},
	Chk:(cond,msg=null)=>{_assert(cond,msg)},
	ChkLoose:(v1,v2,msg=null)=>{_assert(v1==v2,_cpmsg(msg,v1,'==',v2))},
	ChkStrict:(v1,v2,msg=null)=>{_assert(v1===v2,_cpmsg(msg,v1,'===',v2))},
	ChkLess:(v1,v2,msg=null)=>{_assert(v1<v2,_cpmsg(msg,v1,'<',v2))},
	ChkLessEq:(v1,v2,msg=null)=>{_assert(v1<=v2,_cpmsg(msg,v1,'<=',v2))},
	ChkGreat:(v1,v2,msg=null)=>{_assert(v1>v2,_cpmsg(msg,v1,'>',v2))},
	ChkGreatEq:(v1,v2,msg=null)=>{_assert(v1>=v2,_cpmsg(msg,v1,'>=',v2))},

	Run:(scn)=>{
		// dummy 
	},

	SetUp:(launcher,target,url,src)=>{
		return _setupTestDir(launcher,target,url,src,()=>{});
	},

};

})();
