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

		plug:(type,p)=>{
			p.Launcher=launcher;
			plugs[type]=p;
		},
		unload:(label)=>{
			if(!ctxs[label])return;
			var ctx=ctxs[label];
			if(ctx.state.sig_unload)return;
			ctx.state.sig_unload=true;
			ctx.state.ready=false;
			if(ctx.view)ctx.view.unload();
		},
		load:(label,type,url,depends=[],cb_ok=null,cb_ng=null)=>{
			if(ctxs[label])ctxs[label].abort();

			let ctx={
				name:'YgEs_Downloader_Context',
				User:{},
				label:label,
				type:type,
				state:{
					happening:null,
					loaded:false,
					ready:false,
					unloaded:false,
					sig_unload:false,
				},
				loader:null,
				source:null,
				view:null,
				abort:()=>{
					if(!ctx,proc)return;
					ctx,proc.abort();
					ctx,proc=null;
				},
			}
			ctxs[label]=ctx;

			let states={
				'Setup':{
					poll_keep:(smc,user)=>{
						ctx.loader=plugs[type].cb_start(url,(src)=>{
							ctx.source=src;
							if(ctx.view)ctx.view.apply();
							user.loaded=true;
						},(hap)=>{
							happening=hap;
							let p=hap.getProp();
							let msg=p.status?
								('['+p.status+'] '+p.msg):
								hap.toString();
							if(ctx.view)ctx.view.happen(msg,()=>{
								ctx.loader=hap.User.retry();
							});
						});
						return 'Download';
					},
				},
				'Download':{
					poll_keep:(smc,user)=>{
						if(user.happening)return 'Failure';
						if(ctx.view)ctx.view.progress(ctx.loader.progress);
						if(!user.loaded)return;
						return 'WaitDeps';
					},
				},
				'WaitDeps':{
					poll_keep:(smc,user)=>{
						for(let dep of depends){
							if(ctrl.Ready[dep]===undefined)return;
						}
						return 'Apply';
					},
				},
				'Apply':{
					cb_ready:(smc,user)=>{
						plugs[type].cb_init(ctx.source,(res)=>{
							ctrl.Ready[label]=res;
							user.ready=true;
							if(ctx.view)ctx.view.done();
						},(hap)=>{
							let msg=hap.toString();
							if(ctx.view)ctx.view.happen(msg,()=>{
								ctx.loader=hap.User.retry();
							});
						});
					},
					poll_keep:(smc,user)=>{
						if(user.happening)return 'Failure';
						if(user.ready)return 'Ready';
					},
				},
				'Failure':{
					poll_keep:(smc,user)=>{
						if(user.happening.isResolved()){
							user.happening=null;
							return 'Download';
						}
					},
				},
				'Ready':{
					poll_keep:(smc,user)=>{
						if(!user.ready)return 'Unload';
					},
				},
				'Unload':{
					cb_ready:(smc,user)=>{
						plugs[ctx.type].cb_unload(ctrl.Ready[label],()=>{
							user.unloaded=true;
						},(hap)=>{
							user.unloaded=true;
						});
					},
					poll_keep:(smc,user)=>{
						if(!user.unloaded)return;

						if(ctx.view){
							monitor.detach(ctx.view);
							ctx.view=null;
						}
						delete ctxs[label];
						delete ctrl.Ready[label];
						return true;
					},
				},
			}

			ctx.proc=YgEs.StateMachine.run('Setup',states,{
				name:'YgEs_Downloader_Proc',
				launcher:launcher,
				user:ctx.state,
			});

			if(monitor)ctx.view=monitor.attach(ctx);

			return ctx;
		},
		isReady:()=>{
			for(var label in ctxs){
				if(!ctxs[label].state.ready)return false;
			}
			return true;
		},
	}
	return ctrl;
}

function _plugCSS(store){

	let plug={
		cb_start:(url,cb_ok,cb_ng)=>{
			return YgEs.HTTPClient.getText(url,cb_ok,cb_ng);
		},
		cb_init:(src,cb_ok,cb_ng)=>{
			cb_ok(YgEs.newQHT({target:store,tag:'style',sub:[src]}));
		},
		cb_unload:(img,cb_ok,cb_ng)=>{
			img.remove();
			cb_ok();
		},
	}
	return plug;
}

function _plugJS(store){

	let plug={
		cb_start:(url,cb_ok,cb_ng)=>{
			return YgEs.HTTPClient.getText(url,cb_ok,cb_ng);
		},
		cb_init:(src,cb_ok,cb_ng)=>{
			cb_ok(YgEs.newQHT({target:store,tag:'script',sub:[src]}));
		},
		cb_unload:(img,cb_ok,cb_ng)=>{
			img.remove();
			cb_ok();
		},
	}
	return plug;
}

function _plugJSON(){

	let plug={
		cb_start:(url,cb_ok,cb_ng)=>{
			return YgEs.HTTPClient.getText(url,cb_ok,cb_ng);
		},
		cb_init:(src,cb_ok,cb_ng)=>{
			try{
				cb_ok(JSON.parse(src));
			}
			catch(e){
				cb_ng(plug.Launcher.HappenTo.happenError(e));
			}
		},
		cb_unload:(img,cb_ok,cb_ng)=>{
			cb_ok();
		},
	}
	return plug;
}


YgEs.DownloadManager={

	create:_create,

	plugCSS:_plugCSS,
	plugJS:_plugJS,
	plugJSON:_plugJSON,
}

})();
