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

function _setupTestFile(launcher,scriptstore,url,stat,reportParent){

	let sig_reset=false;
	let sig_load=false;
	let sig_run=false;
	let pickup=false;
	let running=false;
	let result=null;
	let items=0;
	let runs=0;
	let runloc=0;
	let msg='';
	let loaded=null;
	let installed=null;
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
				if(view)view.UpdateResult(result);
				YgEs.HTTPClient.GetText(url,(src)=>{
					loaded='YgEs.Test.Scenaria["'+url+'"]=(()=>{'+src+'return scenaria;})();';
					user.Loaded=true;
				},(hap)=>{
					user.Hap=hap;
				});
			},
			OnPollInKeep:(ctrl,user)=>{
				if(user.Hap){
					setMsg('(error) '+user.Hap.ToString());
					return false;
				}
				if(!user.Loaded)return;
				return 'Install';
			},
		},
		'Install':{
			OnStart:(ctrl,user)=>{
				setMsg('(install)');
				installed=YgEs.NewQHT({Target:scriptstore,Tag:'script',Sub:[loaded]});
				if(!YgEs.Test.Scenaria[url]){
					user.Hap=launcher.HappenTo.Happen('Syntex Error');
				}
				else{
					for(let scn of YgEs.Test.Scenaria[url]){
						++items;
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
					user.Installed=true;
					setMsg('(standby)');
					if(view)view.SetScenaria(user.Scenaria);
				}
			},
			OnPollInKeep:(ctrl,user)=>{
				if(user.Hap){
					setMsg('(error) '+user.Hap.ToString());
					return false;
				}
				if(!user.Installed)return;
				if(!sig_run)return;
				sig_run=false;
				runs=items;
				runloc=0;
				pickup=false;
				for(let i=0;i<user.Scenaria.length;++i){
					let sct=user.Scenaria[i];
					if(!sct.Scenario.Pickup)continue;
					pickup=true;
					break;
				}
				setMsg('(running)');
				return 'Select';
			},
		},
		'Select':{
			OnStart:(ctrl,user)=>{

				for(;runloc<user.Scenaria.length;++runloc){
					let sct=user.Scenaria[runloc];
					if(sct.Scenario.Filter===false || (pickup && !sct.Scenario.Pickup)){
						--runs;
						if(sct.View){
							sct.View.Skip();
							if(result==null && runs<1)report(true);
						}
						continue;
					}
					break;
				}
			},
			OnPollInKeep:(ctrl,user)=>{
				if(runloc>=user.Scenaria.length)return 'Unload';
				else return 'Run';
			},
		},
		'Run':{
			OnStart:(ctrl,user)=>{
				running=true;
				let sct=user.Scenaria[runloc];
				YgEs.Timing.ToPromise(async (ok,ng)=>{

					let abend=false;
					let hap2=YgEs.HappeningManager.CreateLocal({
						Name:'Happened in '+sct.Scenario.Title,
						OnHappen:(hap)=>{
							abend=true;
							console.error(hap.ToString());
							console.dir(hap.GetProp());
						},
					});
					let log2=YgEs.Log.CreateLocal(sct.Scenario.Title,YgEs.Log.LEVEL.DEBUG);
					let lnc2=YgEs.Engine.CreateLauncher({
						HappenTo:hap2,
					});
					let end=YgEs.Timing.Poll(10,()=>{
						if(abend)lnc2.Abort();
					});
					if(sct.View)sct.View.Start(log2,lnc2);
					try{
						YgEs.HappeningManager.CleanUp();
						await sct.Scenario.Proc({
							HappenTo:hap2,
							Launcher:lnc2,
							Log:log2,
						});
						end();
						lnc2.Abort();
					}
					catch(e){
						end();
						lnc2.Abort();
						hap2.Happen(e);
					}
					hap2.CleanUp();
					let err=lnc2.HappenTo.IsCleaned()?null:new Error('Happen in Test: '+sct.Scenario.Title,{cause:lnc2.HappenTo.GetInfo()});
					lnc2.Abandon();
					hap2.Abandon();
					if(err)ng(err);
					else ok();
				},(r)=>{
					if(sct.View)sct.View.UpdateResult(true);
					report(true);
					running=false;
				},(e)=>{
					if(sct.View)sct.View.SetError(e);
					report(false);
					running=false;
				});
			},
			OnPollInKeep:(ctrl,user)=>{
				if(running)return;
				++runloc;
				return 'Select';
			},
		},
		'Unload':{
			OnStart:(ctrl,user)=>{
				setMsg('');
				installed.Clear();
				installed=null;
			},
			OnPollInKeep:(ctrl,user)=>{
				return true;
			},
		},
	}

	let ctrl={
		Scenaria:[],
		Hap:null,
		Loaded:false,
		Installed:false,
		Done:false,
	}

	ctrl.Reset=()=>{
		sig_reset=true;
		sig_load=false;
		sig_run=false;
	}

	ctrl.Load=()=>{
		if(sig_load)return;
		sig_load=true;
		items=0;
		YgEs.StateMachine.Run('Download',states,{
			Name:'YgEs.UnitTest_Proc',
			Launcher:launcher,
			User:ctrl,
		});
	}

	ctrl.Run=()=>{
		if(sig_run)return;
		ctrl.Load();
		sig_run=true;
	}

	ctrl.SetView=(v)=>{
		view=v;
		if(view){
			view.Reset();
			view.SetMsg(msg);
			if(ctrl.Done)view.SetScenaria(ctrl.Scenaria);
		}
	}
	return ctrl;
}

function _setupTestDir(launcher,scriptstore,url,src,reportParent){

	let result=null;
	let items=0;
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

	ctrl.Reset=(src2=null)=>{
		if(!src2)src2=src;

		if(view)view.Reset();

		ctrl.Dirs={}
		ctrl.Files={}
		items=0;

		for(let fn in src2.Files){
			++items;
			ctrl.Files[fn]=_setupTestFile(launcher,scriptstore,url+fn,src2.Files[fn],report);
		}
		for(let dn in src2.Dirs){
			++items;
			ctrl.Dirs[dn]=_setupTestDir(launcher,scriptstore,url+dn+'/',src2.Dirs[dn],report);
		}
	}

	ctrl.Load=()=>{
		if(view)view.UpdateResult(result);
		for(let fn in ctrl.Files)ctrl.Files[fn].Load();
		for(let dn in ctrl.Dirs)ctrl.Dirs[dn].Load();
	}

	ctrl.Run=()=>{
		runs=items;
		for(let fn in ctrl.Files)ctrl.Files[fn].Run();
		for(let dn in ctrl.Dirs)ctrl.Dirs[dn].Run();
	}
	ctrl.SetView=(v)=>{
		view=v;
		if(view)view.Reset();
	}

	ctrl.Reset();
	return ctrl;
}

YgEs.Test={
	Name:'YgEs.Test',
	User:{},
	_private:{},
	
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

	SetUp:(launcher,scriptstore,url,src)=>{
		return _setupTestDir(launcher,scriptstore,url,src,()=>{});
	},

};

})();
