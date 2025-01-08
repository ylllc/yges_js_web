// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Download Manager --------------------- //
(()=>{ // local namespace 

function _create(launcher,monitor=null){

	let plugs={}
	let ctxs={}

	let ctrl={
		Ready:{},

		Plug:(type,p)=>{
			p.Launcher=launcher;
			plugs[type]=p;
		},
		Unload:(label)=>{
			if(!ctxs[label])return;
			var ctx=ctxs[label];
			if(ctx.State.SigUnload)return;
			ctx.State.SigUnload=true;
			ctx.State.Ready=false;
			if(ctx.View)ctx.View.Unload();
		},
		Load:(label,type,url,depends=[],cb_ok=null,cb_ng=null)=>{
			if(ctxs[label])ctxs[label].Abort();

			let ctx={
				Name:'YgEs.Downloader_Context',
				User:{},
				Label:label,
				Type:type,
				State:{
					Happening:null,
					Loaded:false,
					Ready:false,
					Unloaded:false,
					SigUnload:false,
				},
				Loader:null,
				Source:null,
				View:null,
				Abort:()=>{
					if(!ctx,Proc)return;
					ctx,Proc.Abort();
					ctx,Proc=null;
				},
			}
			ctxs[label]=ctx;

			let states={
				'Setup':{
					OnPollInKeep:(smc,user)=>{
						ctx.Loader=plugs[type].OnStart(url,(src)=>{
							ctx.Source=src;
							if(ctx.View)ctx.View.Apply();
							user.Loaded=true;
						},(hap)=>{
							user.Happening=hap;
							let p=hap.GetProp();
							let msg=p.status?
								('['+p.status+'] '+p.msg):
								hap.ToString();
							if(ctx.View)ctx.View.Happen(msg,()=>{
								ctx.Loader=hap.User.Retry();
							});
						});
						return 'Download';
					},
				},
				'Download':{
					OnPollInKeep:(smc,user)=>{
						if(user.Happening)return 'Failure';
						if(ctx.View)ctx.View.Progress(ctx.Loader.Progress);
						if(!user.Loaded)return;
						return 'WaitDeps';
					},
				},
				'WaitDeps':{
					OnPollInKeep:(smc,user)=>{
						for(let dep of depends){
							if(ctrl.Ready[dep]===undefined)return;
						}
						return 'Apply';
					},
				},
				'Apply':{
					OnReady:(smc,user)=>{
						plugs[type].OnInit(ctx.Source,(res)=>{
							ctrl.Ready[label]=res;
							user.Ready=true;
							if(ctx.View)ctx.View.Done();
						},(hap)=>{
							let msg=hap.ToString();
							if(ctx.View)ctx.View.Happen(msg,()=>{
								ctx.Loader=hap.User.Retry();
							});
						});
					},
					OnPollInKeep:(smc,user)=>{
						if(user.Happening)return 'Failure';
						if(user.Ready)return 'Ready';
					},
				},
				'Failure':{
					OnPollInKeep:(smc,user)=>{
						if(user.Happening.IsResolved()){
							user.Happening=null;
							return 'Download';
						}
					},
				},
				'Ready':{
					OnPollInKeep:(smc,user)=>{
						if(!user.Ready)return 'Unload';
					},
				},
				'Unload':{
					OnReady:(smc,user)=>{
						plugs[ctx.Type].OnUnload(ctrl.Ready[label],()=>{
							user.Unloaded=true;
						},(hap)=>{
							user.Unloaded=true;
						});
					},
					OnPollInKeep:(smc,user)=>{
						if(!user.Unloaded)return;

						if(ctx.View){
							monitor.Detach(ctx.View);
							ctx.View=null;
						}
						delete ctxs[label];
						delete ctrl.Ready[label];
						return true;
					},
				},
			}

			ctx.Proc=YgEs.StateMachine.Run('Setup',states,{
				Name:'YgEs_Downloader_Proc',
				Launcher:launcher,
				User:ctx.State,
			});

			if(monitor)ctx.View=monitor.Attach(ctx);

			return ctx;
		},
		IsReady:()=>{
			for(var label in ctxs){
				if(!ctxs[label].State.Ready)return false;
			}
			return true;
		},
	}
	return ctrl;
}

function _plugCSS(store){

	let plug={
		OnStart:(url,cb_ok,cb_ng)=>{
			return YgEs.HTTPClient.GetText(url,cb_ok,cb_ng);
		},
		OnInit:(src,cb_ok,cb_ng)=>{
			cb_ok(YgEs.NewQHT({Target:store,Tag:'style',Sub:[src]}));
		},
		OnUnload:(img,cb_ok,cb_ng)=>{
			img.Remove();
			cb_ok();
		},
	}
	return plug;
}

function _plugJS(store){

	let plug={
		OnStart:(url,cb_ok,cb_ng)=>{
			return YgEs.HTTPClient.GetText(url,cb_ok,cb_ng);
		},
		OnInit:(src,cb_ok,cb_ng)=>{
			cb_ok(YgEs.NewQHT({Target:store,Tag:'script',Sub:[src]}));
		},
		OnUnload:(img,cb_ok,cb_ng)=>{
			img.Remove();
			cb_ok();
		},
	}
	return plug;
}

function _plugJSON(){

	let plug={
		OnStart:(url,cb_ok,cb_ng)=>{
			return YgEs.HTTPClient.GetText(url,cb_ok,cb_ng);
		},
		OnInit:(src,cb_ok,cb_ng)=>{
			try{
				cb_ok(JSON.parse(src));
			}
			catch(e){
				cb_ng(plug.Launcher.HappenTo.happenError(e));
			}
		},
		OnUnload:(img,cb_ok,cb_ng)=>{
			cb_ok();
		},
	}
	return plug;
}


YgEs.DownloadManager={

	Create:_create,

	PlugCSS:_plugCSS,
	PlugJS:_plugJS,
	PlugJSON:_plugJSON,
}

})();
