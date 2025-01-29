// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Downloader --------------------------- //
(()=>{ // local namespace 

function _yges_downloader_create(launcher){

	let types={}
	let procs={}

	let ctrl={
		Ready:{},

		setType:(type,prm)=>{
			types[type]=prm;
		},
		unload:(label)=>{
			if(!procs[label])return;
			var ctx=procs[label];
			types[ctx.type].cb_unload(ctx.ll,ctrl.Ready[label]);
			delete procs[label];
			delete ctrl.Ready[label];
		},
		load:(label,type,url,cb_ok=null,cb_ng=null)=>{
			if(procs[label])procs[label].abort();

			let ctx={
				name:'YgEs_Downloader_Context',
				User:{},
				label:label,
				type:type,
				ll:null,
				abort:()=>{
					if(!ctx,proc)return;
					ctx,proc.abort();
					ctx,proc=null;
				},
			}
			procs[label]=ctx;

			ctx.proc=launcher.launch({
				name:'YgEs_Downloader_Proc',
				cb_start:(user)=>{
					ctx.ll=types[type].cb_setup(ctx,url,(src)=>{
						let res=ctrl.Ready[label]=types[type].cb_init(ctx.ll,src);
						if(res===undefined){
							types[type].cb_bad(ctx.ll,src);
						}
						else{
							if(cb_ok)cb_ok(res);
						}
					},(err)=>{
						launcher.HappenTo.happenError(err);
					});
				},
				cb_poll:(user)=>{
					types[type].cb_poll(ctx.ll);
					return ctrl.Ready[label]===undefined;
				},
				cb_done:(user)=>{},
				cb_abort:(user)=>{
					ctrl.unload(label);
				},
			});

			return ctx;
		},
	}
	return ctrl;
}

function _yges_downloader_setupGUI(launcher,target,preset,modules=null){

	let tbl=YgEs.newQHT({target:target,tag:'table',attr:{class:'yges_loadview_table',border:'border'}});
	let head=YgEs.newQHT({target:tbl,tag:'tr',attr:{class:'yges_loadview_thr'},sub:[
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadview_th_type'},sub:['Type']}).Element,
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadview_th_name'},sub:['Name']}).Element,
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadview_th_cond'},sub:['Cond']}).Element,
	]});

	let loader=YgEs.Downloader.create(launcher);

	loader.View={
		table:tbl,
		head:head,
	}

	const prm_default={
		cb_setup:(ctx,url,cb_ok,cb_ng)=>{
			let view_row=YgEs.newQHT({target:tbl,tag:'tr'});
			YgEs.newQHT({target:view_row,tag:'td',sub:[ctx.type]});
			YgEs.newQHT({target:view_row,tag:'td',sub:[ctx.label]});
			let view_cond=YgEs.newQHT({target:view_row,tag:'td'});
			let view_meter=YgEs.newQHT({target:view_cond,tag:'meter',attr:{min:0,max:100,value:0}});
			let view_msg=YgEs.newQHT({target:view_cond,tag:'span'});

			let setHappen=(hap,msg)=>{
				view_msg.replace(' '+msg+' ');
				let btn=YgEs.newQHT({target:view_msg,tag:'button',sub:['Retry']});
				btn.Element.onclick=()=>{
					ll.proc=hap.User.retry();
				}
			}

			let ll={
				proc:YgEs.HTTPClient.getText(url,(src)=>{
					view_msg.replace(' [OK]');
					if(cb_ok)cb_ok(src);
				},(hap)=>{
					let p=hap.getProp();
					setHappen(hap,p.timeout?'[NG] Timeout ':
						('['+p.status+'] '+p.msg));
				}),
				view_row:view_row,
				view_cond:view_cond,
				view_meter:view_meter,
				view_msg:view_msg,
				abort:()=>{
					if(!ll.proc)return;
					ll.proc.abort();
					ll.proc=null;
				},
				remove:()=>{
					ll.abort();
					if(!ll.view_row)return;
					ll.view_row.remove();
					ll.view_row=null;
					ll.view_cond=null;
					ll.view_meter=null;
					ll.view_msg=null;
				},
			}
			return ll;
		},
		cb_unload:(ll,img)=>{
			ll.remove();
		},
		cb_poll:(ll)=>{
			if(!ll)return;
			if(!ll.view_meter)return;
			ll.view_meter.Element.setAttribute('value',ll.proc.progress*100);
		},
		cb_init:(ll,src)=>{
			return src;
		},
		cb_bad:(ll,src)=>{
			setHappen(hap,'[NG] Bad Content');
		},
		cb_abort:(ll)=>{
			ll.abort();
			ll.view_msg.replace('Aborted');
		},
	}

	let setType_org=loader.setType;
	loader.setType=(type,prm)=>{
		setType_org(type,Object.assign({},prm_default,prm));
	}

	if(!preset)return loader;

	if(!modules)modules=YgEs.newQHT({target:target,tag:'div'});

	loader.setType('CSS',{
		cb_init:(ll,src)=>{
			return YgEs.newQHT({target:modules,tag:'style',sub:[src]});
		},
		cb_unload:(ll,img)=>{
			img.remove();
			ll.remove();
		},
	});
	loader.setType('JS',{
		cb_init:(ll,src)=>{
			return YgEs.newQHT({target:modules,tag:'script',sub:[src]});
		},
		cb_unload:(ll,img)=>{
			img.remove();
			ll.remove();
		},
	});
	loader.setType('JSON',{
		cb_init:(ll,src)=>{
			try{
				return JSON.parse(src);
			}
			catch(e){
				return undefined;
			}
		},
	});

	return loader;
}

YgEs.Downloader={

	create:_yges_downloader_create,
	setupGUI:_yges_downloader_setupGUI,
}

})();
