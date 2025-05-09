// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Common Store ------------------------- //

// export target 
let YgEs={
	Name:'YgEs',
	User:{},
	_private_:{},
};

(()=>{ // local namespace 

let _prevID=(1234567890+Date.now())&0x7fffffff;
let _deltaID=727272727; // 31bit prime number, except 2 

YgEs.InitID=(init,delta=null)=>{
	_prevID=init;
	if(delta)_deltaID=delta;
}

YgEs.NextID=()=>{
	_prevID=(_prevID+_deltaID)&0x7fffffff;
	return _prevID;
}

YgEs.CreateEnum=(src)=>{

	let ll={}
	for(let i=0;i<src.length;++i)ll[src[i]]=i;
	return ll;
}

YgEs.SetDefault=(dst,def)=>{

	if(Array.isArray(def))return dst;
	if(typeof def!=='object')return dst;
	if(dst==null)dst={}

	for(let k in def){
		dst[k]=(dst[k]===undefined)?def[k]:
			YgEs.SetDefault(dst[k],def[k]);
	}
	return dst;
}

YgEs.FromError=(err)=>{
	return {
		Name:err.name,
		Msg:err.message,
		Cause:err.cause,
		File:err.fileName,
		Line:err.lineNumber,
		Col:err.columnNumber,
		Stack:err.stack,
		Src:err,
	}
}

YgEs.JustString=(val)=>{
	switch(typeof val){
		case 'undefined': return 'undefined';
		case 'boolean': return val?'true':'false';
		case 'string': return val;
		case 'number': return val.toString();

		case 'object':
		if(val===null)return 'null';
		else if(Array.isArray(val)){
			let sub=[]
			for(let v of val)sub.push(YgEs.JustString(v));
			return '['+sub.join(',')+']';
		}
		else{
			let sub=[]
			for(let k in val)sub.push([JSON.stringify(k),YgEs.JustString(val[k])]);
			let sub2=[]
			for(let s of sub)sub2.push(s.join(':'));
			return '{'+sub2.join(',')+'}';
		}
		break;
	}
	return val.toString();
}

YgEs.Inspect=(val)=>{
	switch(typeof val){
		case 'undefined': return 'undefined';
		case 'number': return val.toString();

		case 'object':
		if(val===null)return 'null';
		else if(Array.isArray(val)){
			let sub=[]
			for(let v of val)sub.push(YgEs.Inspect(v));
			return '['+sub.join(',')+']';
		}
		else{
			let sub=[]
			for(let k in val)sub.push([JSON.stringify(k),YgEs.Inspect(val[k])]);
			let sub2=[]
			for(let s of sub)sub2.push(s.join(':'));
			return '{'+sub2.join(',')+'}';
		}
		break;
	}
	return JSON.stringify(val);
}

YgEs.InitFrontend=(moduleplace=null,viewplace=null)=>{

	YgEs.Engine.Start();
	let hapmng=YgEs.HappeningManager.CreateLocal({
		Name:'LoaderHaps',
	});
	let launcher=YgEs.Engine.CreateLauncher({
		Name:'LoaderProcs',
		HappenTo:hapmng,
		SharedHappen:true,
	});
	let monitor=viewplace?YgEs.DownloadMonitor.SetUp(viewplace,true):null;
	let loader=YgEs.DownloadManager.Create(launcher,monitor);

	if(moduleplace){
		loader.Plug('CSS',YgEs.DownloadManager.PlugCSS(moduleplace));
		loader.Plug('JS',YgEs.DownloadManager.PlugJS(moduleplace));
	}
	loader.Plug('JSON',YgEs.DownloadManager.PlugJSON());

	YgEs.LoadCSS=(url,label=null)=>{
		if(!moduleplace){
			YgEs.Log.Fatal('no place for downloaded style, assign a QHT and call YgEs.InitFrontend()');
			return;
		}
		if(!label)label=url;
		loader.Load(label,'CSS',url);
	}
	YgEs.LoadJS=(url,depends=[],label=null)=>{
		if(!moduleplace){
			YgEs.Log.Fatal('no place for downloaded script, assign a QHT and call YgEs.InitFrontend()');
			return;
		}
		if(!label)label=url;
		loader.Load(label,'JS',url,depends);
	}
	YgEs.LoadJSON=(url,label=null)=>{
		if(!label)label=url;
		loader.Load(label,'JSON',url);
	}
	YgEs.LoadSync=(cb_done=null,cb_abort=null,interval=null)=>{
		if(!interval)interval=10;
		return YgEs.Timing.SyncKit(interval,()=>{return loader.IsReady();},cb_done,cb_abort);
	}
	YgEs.Peek=(label)=>{
		return loader.Ready[label];
	}
	YgEs.Unload=(label)=>{
		loader.Unload(label);
	}
	YgEs.DisposeMonitor=()=>{
		if(!monitor)return;
		monitor.Dispose();
		monitor=null;
	}

	YgEs.LocalSave=(data,name='',type='application/octet-stream')=>{
		let saver=YgEs.NewQHT({Tag:'a'});
		var blob=new Blob([data],{type:type});
		saver.Element.href=URL.createObjectURL(blob);
		if(name)saver.Element.download=name;
		saver.Element.click();
		saver.Remove();
	}
	YgEs.LocalLoad=(textmode,filter,cb_done,cb_fail=null,cb_cancel=null)=>{
		var loader=YgEs.NewQHT({
			Tag:'input',
			Attr:{type:'file',accept:filter},
		});
		loader.Element.addEventListener('cancel',()=>{
			if(cb_cancel)cb_cancel();
			loader.Remove();
		});
		loader.Element.addEventListener('change',(ev)=>{
			if(ev.target.files.length<1){
				if(cb_cancel)cb_cancel();
				loader.Remove();
				return;
			}
			let fr=new FileReader();
			fr.onerror=()=>{
				if(cb_fail)cb_fail(fr.error);
				loader.Remove();
			}
			fr.onload=()=>{
				if(cb_done)cb_done(fr.result);
				loader.Remove();
			}
			if(textmode)fr.readAsText(ev.target.files[0]);
			else fr.readAsArrayBuffer(ev.target.files[0]);
		});
		loader.Element.click();
	}
}

})();

// Logger ------------------------------- //
(()=>{ // local namespace 

// log level 
const _level_names=Object.freeze(['TICK','TRACE','DEBUG','INFO','NOTICE','WARN','FATAL','CRIT','ALERT','EMERG']);
// make reverse lookup 
const _level_lookup=Object.freeze(YgEs.CreateEnum(_level_names.concat(['NEVER'])));

// default settings 
const _default_showable=_level_lookup.INFO;

function _default_format(src){

	switch(typeof src.Msg){
		case 'function': src.Msg=src.Msg(); break;
		case 'object': src.Msg=YgEs.Inspect(src.Msg); break;
	}

	let lev=_level_names[src.Lev]??('?'+src.Lev+'?');
	let capt=src.Capt?('{'+src.Capt+'} '):'';
	src.Text=src.Date+': ['+lev+'] '+capt+src.Msg;
}

function _default_way(src){

	switch(src.Lev){
		case Log.LEVEL.TICK:
		case Log.LEVEL.TRACE:
		case Log.LEVEL.DEBUG:
		console.debug(src.Msg);
		break;

		case Log.LEVEL.INFO:
		case Log.LEVEL.NOTICE:
		console.info(src.Msg);
		break;

		case Log.LEVEL.WARN:
		console.warn(src.Msg);
		break;

		case Log.LEVEL.FATAL:
		case Log.LEVEL.CRIT:
		case Log.LEVEL.ALERT:
		case Log.LEVEL.EMERG:
		console.error(src.Msg);
		break;

		default:
		console.log(src.Msg);
	}

	if(src.Prop)console.dir(src.Prop);
}

function _do_format(t,src){

	for(let inst=t;inst;inst=inst.GetParent()){
		if(inst.Format!==null){
			inst.Format(inst,src);
			return;
		}
	}
	_default_format(src);
}

function _do_write(t,src){

	for(let inst=t;inst;inst=inst.GetParent()){
		if(inst.Way!==null){
			inst.Way(inst,src);
			return;
		}
	}
	_default_way(src);
}

// create local instance 
function _create_local(capt=null,showable=null,parent=null){

	const iid=YgEs.NextID();
	let t={
		Name:'YgEs.LocalLog',
		User:{},
		_private_:{},

		Showable:showable,
		Caption:capt,
		Format:null,
		Way:null,

		LEVEL_NAMES:_level_names,
		LEVEL:_level_lookup,

		CreateLocal:(capt=null,showable=null)=>_create_local(capt,showable,t),
		CreateSplitter:(capt=null,showable=null)=>_create_splitter(capt,showable,t),

		GetInstanceID:()=>iid,
		GetParent:()=>parent,
		GetCaption:()=>{
			for(let inst=t;inst;inst=inst.GetParent()){
				if(inst.Caption!==null)return inst.Caption;
			}
			return '';
		},
		GetShowable:()=>{
			for(let inst=t;inst;inst=inst.GetParent()){
				if(inst.Showable!==null)return inst.Showable;
			}
			return _default_showable;
		},

		Put:(lev,msg,prop=null)=>{
			if(lev>=t.LEVEL_NAMES.length)return;
			if(lev<t.GetShowable())return;
			let src={
				Date:new Date().toISOString(),
				Capt:t.GetCaption(),
				Lev:lev,
				Msg:msg
			}
			if(prop)src.Prop=prop;
			_do_format(t,src);
			_do_write(t,src);
		},

		Tick:(msg,prop=null)=>{t.Put(t.LEVEL.TICK,msg,prop);},
		Trace:(msg,prop=null)=>{t.Put(t.LEVEL.TRACE,msg,prop);},
		Debug:(msg,prop=null)=>{t.Put(t.LEVEL.DEBUG,msg,prop);},
		Info:(msg,prop=null)=>{t.Put(t.LEVEL.INFO,msg,prop);},
		Notice:(msg,prop=null)=>{t.Put(t.LEVEL.NOTICE,msg,prop);},
		Warn:(msg,prop=null)=>{t.Put(t.LEVEL.WARN,msg,prop);},
		Fatal:(msg,prop=null)=>{t.Put(t.LEVEL.FATAL,msg,prop);},
		Crit:(msg,prop=null)=>{t.Put(t.LEVEL.CRIT,msg,prop);},
		Alert:(msg,prop=null)=>{t.Put(t.LEVEL.ALERT,msg,prop);},
		Emerg:(msg,prop=null)=>{t.Put(t.LEVEL.EMERG,msg,prop);},
	}
	return t;
}

function _create_splitter(capt=null,showable=null,parent=null){

	let t=_create_local(capt,showable,parent);
	t._private_.slot={}
	t.Format=(logger,src)=>{
		for(let sub of Object.values(t._private_.slot)){
			if(src.Lev<sub.GetShowable())continue;
			_do_format(sub,src);
		}
	}
	t.Way=(logger,src)=>{
		for(let sub of Object.values(t._private_.slot)){
			if(src.Lev<sub.GetShowable())continue;
			_do_write(sub,src);
		}
	}
	t.Ref=(id)=>{
		return t._private_.slot[id];
	}
	t.Attach=(id,logger)=>{
		if(!logger){
			t.Detach(id);
			return;
		}
		t._private_.slot[id]=logger;
	}
	t.Detach=(id)=>{
		if(!t._private_.slot[id])return;
		delete t._private_.slot[id];
	}

	return t;
}

const Log=YgEs.Log=_create_local();
YgEs.Log.Name='YgEs.GlobalLog';

})();

// Utilities ---------------------------- //
(()=>{ // local namespace 

const _rx_zero=/^(0+(|\.)0*|0*(|\.)0+)$/;
const _rx_null=/^null$/i;
const _rx_false=/^false$/i;
const _rx_undefined=/^undefined$/i;

let Util=YgEs.Util={
	Name:'YgEs.Util',
	User:{},
	_private_:{},

	IsJustNaN:(val)=>{
		if(typeof val!=='number')return false;
		return isNaN(val);
	},

	IsJustInfinity:(val)=>{
		if(val===Infinity)return true;
		if(val===-Infinity)return true;
		return false;
	},

	IsEmpty:(val)=>{
		if(val===null)return true;
		if(val===undefined)return true;
		if(val==='')return true;
		return false;
	},

	IsValid:(val)=>{
		if(val===null)return false;
		if(val===undefined)return false;
		if(Util.IsJustNaN(val))return false;
		return true;
	},

	IsPoly:(val)=>{
		if(val===null)return false;
		if(typeof val==='object')return true;
		return false;
	},

	Booleanize:(val,stringable=false)=>{
		if(val===null)return false;
		if(val===undefined)return false;
		switch(typeof val){
			case 'boolean':
			return val;

			case 'number':
			if(isNaN(val))return true;
			break;

			case 'string':
			if(stringable){
				if(val.match(_rx_zero))return false;
				if(val.match(_rx_false))return false;
				if(val.match(_rx_null))return false;
				if(val.match(_rx_undefined))return false;
			}
			break;

			case 'object':
			return true;
		}
		return !!val;
	},

	Trinarize:(val,stringable=false)=>{
		if(val==null)return null;
		if(val===undefined)return null;
		switch(typeof val){
			case 'string':
			if(stringable){
				if(val.match(_rx_null))return null;
				if(val.match(_rx_undefined))return null;
			}
			break;
		}
		return Util.Booleanize(val,stringable);
	},

	FillZero:(val,col,sgn=false)=>{
		let sf=val<0;
		if(sf)val=-val;

		let ss=sf?'-':sgn?'+':'';
		col-=ss.length;
		let vs=''+val;
		if(vs.length>=col)return ss+vs;

		vs='0'.repeat(col-1)+vs;
		return ss+vs.substring(vs.length-col);
	},

	SafeStepIter:(bgn,end,step,cb_iter)=>{

		let cnt=bgn;
		if(!step){
			// zero stride, do nothing 
			return cnt;
		}
		if(bgn==end)return cnt;

		if(step<0 != end-bgn<0){
			HappeningManager.Happen('backward',{bgn:bgn,end:end,step:step});
			return cnt;
		}

		let abort=false;
		for(;(step<0)?(cnt>end):(cnt<end);cnt+=step){
			if(abort)return cnt;
			((cnt_)=>{
				if(cb_iter(cnt_)===false)abort=true;
			})(cnt);
		}

		return cnt;
	},

	SafeArrayIter:(src,cb_iter)=>{

		let abort=false;
		for(let t of src){
			if(abort)return;
			((t_)=>{
				if(cb_iter(t_)===false)abort=true;
			})(t);
		}
	},

	SafeDictIter:(src,cb_iter)=>{

		let abort=false;
		for(let k in src){
			if(abort)return;
			((k_)=>{
				if(cb_iter(k_,src[k_])===false)abort=true;
			})(k);
		}
	},
}

})();

// Basic Timing Features ---------------- //
(()=>{ // local namespace 

let Timing=YgEs.Timing={
	Name:'YgEs.Timing',
	User:{},
	_private_:{},

	FromPromise:(promise,cb_ok=null,cb_ng=null)=>{
		new Promise(async (ok,ng)=>{
			try{
				ok(await promise);
			}
			catch(e){
				ng(e);
			}
		}).then((r)=>{
			if(cb_ok)cb_ok(r);
			return r;
		}).catch((e)=>{
			if(cb_ng)cb_ng(e);
			else throw e;
		});
	},
	ToPromise:(cb_proc,cb_ok=null,cb_ng=null)=>{
		return new Promise((ok,ng)=>{
			cb_proc(ok,ng);
		}).then((r)=>{
			if(cb_ok)cb_ok(r);
			return r;
		}).catch((e)=>{
			if(cb_ng)cb_ng(e);
			else throw e;
		});
	},

	Delay:(ms,cb_done,cb_abort=null)=>{

		let h=null;
		if(!cb_done)return ()=>{
			if(cb_abort)cb_abort();
		};

		h=setTimeout(()=>{
			h=null;
			cb_done();
		},ms);

		// canceller 
		return async ()=>{
			if(h==null)return;
			clearTimeout(h);
			h=null;
			if(cb_abort)cb_abort();
		}
	},

	Poll:(ms,cb_poll,cb_abort=null)=>{

		if(!cb_poll)return ()=>{
			if(cb_abort)cb_abort();
		};

		let cancel=null;
		let next=()=>{
			cancel=Timing.Delay(ms,()=>{
				cb_poll();
				if(!cancel)return;
				cancel=null;
				next();
			});
		}
		next();
		return ()=>{
			if(!cancel)return;
			cancel();
			cancel=null;
			if(cb_abort)cb_abort();
		}
	},

	Sync:(ms,cb_chk,cb_done,cb_abort=null)=>{

		if(!cb_chk)return ()=>{};
		if(!cb_done)return ()=>{};

		let cancel=null;
		if(cb_chk()){
			cb_done();
			return ()=>{};
		}

		cancel=Timing.Poll(ms,()=>{
			if(!cb_chk())return;
			if(cancel){
				cancel();
				cancel=null;
			}
			cb_done();
		});

		return ()=>{
			if(!cancel)return;
			cancel();
			cancel=null;
			cb_abort();
		}
	},

	DelayKit:(ms,cb_done=null,cb_cancel=null)=>{
		let kit={}
		kit.ToPromise=()=>Timing.ToPromise((ok,ng)=>{
			kit.Cancel=Timing.Delay(ms,
			()=>{
				if(cb_done)cb_done();
				ok();
			},()=>{
				if(cb_cancel)cb_cancel();
				ng(new Error('Delay Cancelled'));
			});
		});
		return kit;
	},
	SyncKit:(ms,cb_chk,cb_done=null,cb_abort=null)=>{
		let kit={}
		kit.ToPromise=()=>Timing.ToPromise((ok,ng)=>{
			kit.Cancel=Timing.Sync(ms,cb_chk,
			()=>{
				if(cb_done)ok(cb_done());
				else ok();
			},()=>{
				if(cb_abort)cb_abort();
				ng(new Error('Sync Aborted'));
			});
			if(!cb_chk)ng(new Error('No Conditions for Sync'));
		});
		return kit;
	},

}

})();

// Happening Manager -------------------- //
(()=>{ // local namespace 

const Log=YgEs.Log;

function _default_happened(hap){
	Log.Fatal(hap.ToString(),hap.GetProp());	
}
function _default_abandoned(hap){
	Log.Warn('* Abandoned * '+hap.ToString(),hap.GetProp());	
}
function _default_resolved(hap){
	Log.Debug('* Resolved * '+hap.ToString(),hap.GetProp());	
}

function _create_happening(cbprop,cbstr,cberr,init={}){

	let resolved=false;
	let abandoned=false;
	let onResolved=init.OnResolved??_default_resolved;
	let onAbandoned=init.OnAbandoned??_default_abandoned;

	const iid=YgEs.NextID();
	let hap={
		Name:init.Name??'YgEs.Happening',
		User:init.User??{},
		_private_:{},

		_yges_happening_:true, // means this is YgEs.Happening 

		GetInstanceID:()=>iid,
		GetProp:cbprop,
		ToString:cbstr,
		toString:cbstr,
		ToError:cberr,

		IsResolved:()=>resolved,
		IsAbandoned:()=>abandoned && !resolved,

		GetStatus:()=>{
			if(resolved)return 'Resolved';
			if(abandoned)return 'Abandoned';
			return 'Posed';
		},
		GetInfo:()=>{return {
			InstanceID:iid,
			Name:hap.Name,
			Status:hap.GetStatus(),
			Msg:cbstr(),
			Prop:cbprop(),
			User:hap.User,
		}},

		Resolve:()=>{
			if(resolved)return;
			resolved=true;
			abandoned=false;
			if(onResolved)onResolved(hap);
		},

		Abandon:()=>{
			if(resolved)return;
			if(abandoned)return;
			abandoned=true;
			if(onAbandoned)onAbandoned(hap);
		},
	}
	return hap;
}

function _create_manager(prm,parent=null){

	let issues=[]
	let children=[]
	let abandoned=false;

	const onHappen=(hap)=>{
		for(let hm=mng;hm;hm=hm.GetParent()){
			if(!hm.OnHappen)continue;
			hm.OnHappen(hm,hap);
			return;
		}
		_default_happened(hap);
	}

	const iid=YgEs.NextID();
	let mng={
		Name:prm.Name??'YgEs.HappeningManager',
		User:prm.User??{},
		_private_:{},

		OnHappen:prm.OnHappen??null,

		CreateLocal:(prm={})=>{
			let cm=_create_manager(prm,mng);
			children.push(cm);
			return cm;
		},

		GetInstanceID:()=>iid,
		GetParent:()=>parent,
		GetChildren:()=>children,
		GetIssues:()=>issues,
		IsAbandoned:()=>abandoned,

		GetStatus:()=>{
			if(abandoned)return 'Abandoned';
			return 'Available';
		},
		GetInfo:()=>{
			let r={
				InstanceID:iid,
				Name:mng.Name,
				Status:mng.GetStatus(),
				User:mng.User,
				Issues:[],
				Sub:[],
			}
			for(let hap of issues)r.Issues.push(hap.GetInfo());
			for(let sub of children)r.Sub.push(sub.GetInfo());
			return r;
		},

		Abandon:()=>{
			for(let sub of children){
				sub.Abandon();
			}
			for(let hap of issues){
				hap.Abandon();
			}
			issues=[]
			abandoned=true;
		},

		CountIssues:()=>{
			let ct=issues.length;
			for(let sub of children){
				ct+=sub.CountIssues();
			}
			return ct;
		},
		IsCleaned:()=>{
			if(issues.length>0)return false;
			for(let sub of children){
				if(!sub.IsCleaned())return false;
			}
			return true;
		},
		CleanUp:()=>{
			let tmp=[]
			for(let hap of issues){
				if(!hap.IsResolved())tmp.push(hap);
			}
			issues=tmp;

			tmp=[]
			for(let sub of children){
				if(sub.IsAbandoned())continue;
				sub.CleanUp();
				tmp.push(sub);
			}
			children=tmp;
		},

		Poll:(cb)=>{
			if(!cb)return;
			for(let hap of issues){
				if(hap.IsResolved())continue;
				if(hap.IsAbandoned())continue;
				cb(hap);
			}
			for(let sub of children){
				sub.Poll(cb);
			}
		},

		Happen:(src,prop={},init={})=>{

			let hap=null;
			if(typeof src!='object'){
				hap=_create_happening(
					()=>prop,
					()=>''+src,
					()=>new Error(''+src,{cause:prop}),
					init
				);
			}
			else if(src._yges_happening_){
				hap=_create_happening(
					()=>src.GetProp(),
					()=>''+src,
					()=>new Error(''+src,{cause:src.GetProp()}),
					init
				);
			}
			else if(src instanceof Error){
				hap=_create_happening(
					()=>YgEs.FromError(src),
					()=>'{'+src.Name+'} '+src.message,
					()=>src,
					init
				);
			}
			else{
				hap=_create_happening(
					()=>Object.assign(src,prop),
					()=>'Happening',
					()=>new Error('Happening',{cause:Object.assign(src,prop)}),
					init
				);
			}

			issues.push(hap);
			onHappen(hap);
			return hap;
		},
	}
	return mng;
}

YgEs.HappeningManager=_create_manager({Name:'YgEs.GlobalHappeningManager'});

})();

// Async Procedure Engine --------------- //
(()=>{ // local namespace 

const HappeningManager=YgEs.HappeningManager;
const Log=YgEs.Log;
const Timing=YgEs.Timing;

const DEFAULT_ROOT_CYCLE=20;
const DEFAULT_LAUNCHER_CYCLE=20;
const DEFAULT_SYNC_CYCLE=10;
const CLASS_PROC='YgEs.Procedure';
const CLASS_LAUNCHER='YgEs.Launcher';
const CLASS_LAUNCHERPROC='YgEs.LauncherProc';
const CLASS_DELAYPROC='YgEs.DelayProc';
const CLASS_ROOT='YgEs.RootLauncher';

function _create_proc(prm,launcher){

	let onStart=prm.OnStart??null;
	let onPoll=prm.OnPoll;
	let onDone=prm.OnDone??null;
	let onAbort=prm.OnAbort??null;

	let started=false;
	let finished=false;
	let aborted=false;

	const iid=YgEs.NextID();
	let proc={
		Name:prm.Name??CLASS_PROC,
		User:prm.User??{},
		_private_:{},

		Log:prm.Log??launcher.Log??Log,
		HappenTo:prm.HappenTo??launcher.HappenTo??HappeningManager,

		GetInstanceID:()=>iid,
		IsStarted:()=>started,
		IsFinished:()=>finished,
		IsAborted:()=>aborted,
		IsEnd:()=>finished||aborted,

		GetStatus:()=>{
			if(finished)return 'Finished';
			if(aborted)return 'Aborted';
			if(started)return 'Running';
			return 'StandBy';
		},
		GetInfo:(site='')=>{return {
			InstanceID:iid,
			Name:proc.Name,
			CrashSite:site,
			Status:proc.GetStatus(),
			User:proc.User,
		}},

		_start:()=>{
			if(started)return;
			if(proc.IsEnd())return;
			started=true;
			if(onStart){
				try{
					onStart(proc.User);
				}
				catch(e){
					proc.HappenTo.Happen(e,{
						Class:CLASS_PROC,
						Cause:'ThrownFromCallback',
						Info:proc.GetInfo('OnStart'),
					});
					proc.Abort();
				}
			}
		},
		Abort:()=>{
			if(proc.IsEnd())return;
			aborted=true;
			if(onAbort){
				try{
					onAbort(proc.User);
				}
				catch(e){
					proc.HappenTo.Happen(e,{
						Class:CLASS_PROC,
						Cause:'ThrownFromCallback',
						Info:proc.GetInfo('OnAbort'),
					});
				}
			}
			else{
				proc.HappenTo.Happen(
					'Aborted',{
					Class:CLASS_PROC,
					Cause:'Aborted',
					Info:proc.GetInfo('Aborted'),
				});
			}
		},
		Poll:()=>{
			if(proc.IsEnd())return false;
			try{
				if(onPoll(proc.User))return true;
			}
			catch(e){
				proc.HappenTo.Happen(e,{
					Class:CLASS_PROC,
					Cause:'ThrownFromCallback',
					Info:proc.GetInfo('OnPoll'),
				});
				proc.Abort();
				return false;
			}
			if(onDone){
				try{
					onDone(proc.User);
					finished=true;
				}
				catch(e){
					proc.HappenTo.Happen(e,{
						Class:CLASS_PROC,
						Cause:'ThrownFromCallback',
						Info:proc.GetInfo('OnDone'),
					});
					proc.Abort();
					return false;
				}
			}
			else{
				finished=true;
			}
			return false;
		},

		Sync:(cb_sync,interval=null)=>{
			if(!cb_sync){
				proc.HappenTo.Happen(
					'Empty callback for sync',{
					Class:CLASS_PROC,
					Cause:'EmptySyncCallback',
					Info:proc.GetInfo('CannotSync'),
				});
				return;
			}
			if(interval===null)interval=DEFAULT_SYNC_CYCLE;
			Timing.Sync(interval,
				()=>{return proc.IsEnd();},
				()=>{
					try{
						cb_sync(proc.User);
					}
					catch(e){
						proc.HappenTo.Happen(e,{
							Class:CLASS_PROC,
							Cause:'ThrownFromCallback',
							Info:proc.GetInfo('OnSync'),
						});
					}
				},
			);
		},
		ToPromise:(breakable,interval=null)=>{
			return Timing.ToPromise((ok,ng)=>{
				proc.Sync(()=>{
					if(breakable || finished)ok(proc.User);
					else ng(new Error('abort',{cause:proc.User}));
				},interval);
			});
		},
	}
	return proc;
}

function _yges_enginge_create_launcher(prm){

	let abandoned=false;
	let aborted=false;

	let sublauncher=[]
	let launched=[]
	let active=[]

	const iid=YgEs.NextID();
	let lnc={
		Name:prm.Name??CLASS_LAUNCHER,
		User:prm.User??{},
		_private_:{},

		Log:prm.Log??undefined,
		HappenTo:prm.HappenTo??HappeningManager,
		Limit:prm.Limit??-1,
		Cycle:prm.Cycle??DEFAULT_LAUNCHER_CYCLE,

		GetInstanceID:()=>iid,
		GetActive:()=>active,
		GetHeld:()=>launched,
		GetSub:()=>sublauncher,

		GetStatus:()=>{
			if(abandoned)return 'Abandoned';
			if(aborted)return 'Aborted';
			return 'Ready';
		},
		GetInfo:(site='')=>{
			let r={
				InstanceID:iid,
				Name:lnc.Name,
				CrashSite:site,
				Status:lnc.GetStatus(),
				Limit:lnc.Limit,
				Cycle:lnc.Cycle,
				User:lnc.User,
				Active:[],
				Held:[],
				Sub:[],
			}
			for(let proc of active)r.Active.push(proc.GetInfo());
			for(let proc of launched)r.Held.push(proc.GetInfo());
			for(let sub of sublauncher)r.Sub.push(sub.GetInfo());
			return r;
		},

		IsEnd:()=>{
			if(launched.length>0)return false;
			if(active.length>0)return false;
			for(let sub of sublauncher){
				if(!sub.IsEnd())return false;
			}
			return true;
		},
		IsAbandoned:()=>abandoned,
		CountActive:()=>{
			let n=active.length
			for(let sub of sublauncher)n+=sub.CountActive();
			return n;
		},
		CountHeld:()=>{
			let n=launched.length
			for(let sub of sublauncher)n+=sub.CountHeld();
			return n;
		},

		Abandon:()=>{
			abandoned=true;
			lnc.Abort();
		},

		CreateLauncher:(prm={})=>{
			let sub=_yges_enginge_create_launcher(prm);
			sublauncher.push(sub);
			return sub;
		},

		Launch:(prm={})=>{
			if(Engine.IsAbandoned()){
				lnc.HappenTo.Happen('the Engine was abandoned, no longer launch new procedures.');
				return;
			}
			if(!_working){
				Log.Notice('the Engine not started. call Start() to run.');
			}
			if(abandoned){
				if(prm.OnAbort)prm.OnAbort();
				return;
			}
			if(!prm.OnPoll){
				lnc.HappenTo.Happen(
					'Empty callback for poll',{
					Class:CLASS_LAUNCHER,
					Cause:'CannotPoll',
				});
				return;
			}

			let proc=_create_proc(prm,lnc);
			if(lnc.Limit<0 || active.length<lnc.Limit){
				active.push(proc);
				proc._start();
			}
			else{
				launched.push(proc);
			}
			return proc;
		},
		Abort:()=>{
			if(lnc.IsEnd())return;
			aborted=true;
			for(let sub of sublauncher)sub.Abort();
			sublauncher=[]
			for(let proc of launched)proc.Abort();
			launched=[]
			for(let proc of active)proc.Abort();
			active=[]
		},
		Poll:()=>{
			for(let sub of sublauncher){
				sub.Poll();
			}

			let cont=[]
			for(let proc of active){
				if(proc.Poll())cont.push(proc);
			}
			active=cont;

			if(lnc.Limit<0 || active.length<lnc.Limit){
				let hold=[]
				for(let proc of launched){
					if(lnc.Limit>=0 && active.length>=lnc.Limit)hold.push(proc);
					else{
						proc._start();
						active.push(proc);
					}
				}
				launched=hold;
			}
		},

		Sync:(cb_sync,interval=null)=>{
			if(!cb_sync){
				lnc.HappenTo.Happen(
					'Empty callback for sync',{
					Class:CLASS_LAUNCHER,
					Cause:'CannotSync',
				});
				return;
			}
			if(interval===null)interval=DEFAULT_SYNC_CYCLE;
			Timing.Sync(interval,
				()=>{
					lnc.Poll();
					return lnc.IsEnd();
				},
				()=>{
					try{
						cb_sync(lnc.User);
					}
					catch(e){
						lnc.HappenTo.Happen(e,{
							Class:CLASS_PROC,
							Cause:'ThrownFromCallback',
							Info:lnc.GetInfo('OnSync'),
						});
					}
				}
			);
		},

		ToPromise:(breakable,interval=null)=>{
			return Timing.ToPromise((ok,ng)=>{
				lnc.Sync(()=>{
					if(breakable || !aborted)ok(lnc.User);
					else ng(new Error('abort',{cause:lnc.GetInfo('abort')}));
				},interval);
			});
		},

		Delay:(time,cb_done,cb_abort=null)=>{
			let until=new Date(Date.now()+time);
			return lnc.Launch({
					Name:CLASS_DELAYPROC,
					OnPoll:(user)=>{
						return Date.now()<until;
					},
					OnDone:cb_done,
					OnAbort:cb_abort??cb_done,
				});
		},
	}
	return lnc;
}

let Engine=YgEs.Engine=_yges_enginge_create_launcher({
	Name:CLASS_ROOT,
	Cycle:DEFAULT_ROOT_CYCLE,
});

let _working=false;
let _cancel=null;

function _poll_engine(){

	if(!_working)return;
	if(Engine.IsAbandoned())return;

	Engine.Poll();

	_cancel=Timing.Delay(Engine.Cycle,()=>{
		_cancel=null;
		_poll_engine();
	});
}

function _stop(){

	_working=false;
	if(_cancel!=null)_cancel();
}

YgEs.Engine.Start=()=>{

	if(Engine.IsAbandoned())return;
	if(_working)return;
	_working=true;
	_poll_engine();
}

YgEs.Engine.Stop=()=>{

	_stop();
	if(Engine.IsAbandoned())return;
	Engine.Abort();
}

YgEs.Engine.ShutDown=()=>{
	Engine.Abandon();
	_stop();
}

})();

// StateMachine ------------------------- //
(()=>{ // local namespace 

const Engine=YgEs.Engine;
const HappeningManager=YgEs.HappeningManager;
const Log=YgEs.Log;

function _run(start,states={},opt={}){

	let launcher=opt.Launcher??Engine;
	let cur=null;

	let name=opt.Name??'YgEs.StateMachine';
	let log=opt.Log??Log;
	let happen=opt.HappenTo??HappeningManager;
	let user=opt.User??{};

	let state_prev=null;
	let state_cur=null;
	let state_next=start;

	let GetInfo=(site='')=>{
		return {
			Name:name,
			CrashSite:site,
			Prev:state_prev,
			Cur:state_cur,
			Next:state_next,
			User:user,
		}
	}

	let ctrl={
		Name:name+'.Control',
		User:user,
		_private_:{},

		GetLogger:()=>log,
		GetHappeningManager:()=>happen,
		GetPrevState:()=>state_prev,
		GetCurState:()=>state_cur,
		GetNextState:()=>state_next,
		GetInfo:()=>GetInfo(),
	}

	let poll_nop=(user)=>{}
	let poll_cur=poll_nop;

	let call_start=(user)=>{
		if(state_next==null){
			// normal end 
			cur=null;
			state_prev=state_cur;
			state_cur=null;
			poll_cur=poll_nop;
			return;
		}
		cur=states[state_next]??null;
		if(!cur){
			happen.Happen(
				'Missing State: '+state_next,{
				Class:'YgEs.StateMachine',
				Cause:'MissingState',
				Info:GetInfo('selecting'),
			});
			poll_cur=poll_nop;
			return;
		}
		state_prev=state_cur;
		state_cur=state_next;
		state_next=null;
		try{
			if(cur.OnStart)cur.OnStart(ctrl,user);
			poll_cur=poll_up;
		}
		catch(e){
			happen.Happen(e,{
				Class:'YgEs.StateMachine',
				Cause:'ThrownFromCallback',
				Info:GetInfo('OnStart'),
			});
			poll_cur=poll_nop;
			return;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_up=(user)=>{
		try{
			var r=cur.OnPollInUp?cur.OnPollInUp(ctrl,user):true;
		}
		catch(e){
			happen.Happen(e,{
				Class:'YgEs.StateMachine',
				Cause:'ThrownFromCallback',
				Info:GetInfo('OnPollInUp'),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			try{
				// normal transition 
				if(cur.OnReady)cur.OnReady(ctrl,user);
				poll_cur=poll_keep;
			}
			catch(e){
				happen.Happen(e,{
					Class:'YgEs.StateMachine',
					Cause:'ThrownFromCallback',
					Info:GetInfo('OnReady'),
				});
				poll_cur=poll_nop;
				return;
			}
			// can try extra polling 
			poll_cur(user);
		}
		else{
			// interruption 
			state_next=r.toString();
			call_end(user);
		}
	}
	let poll_keep=(user)=>{
		try{
			var r=cur.OnPollInKeep?cur.OnPollInKeep(ctrl,user):true;
		}
		catch(e){
			happen.Happen(e,{
				Class:'YgEs.StateMachine',
				Cause:'ThrownFromCallback',
				Info:GetInfo('OnPollInKeep'),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			// normal end 
			state_next=null;
			call_stop(user);
		}
		else{
			// normal transition 
			state_next=r.toString();
			call_stop(user);
		}
	}
	let call_stop=(user)=>{
		try{
			if(cur.OnStop)cur.OnStop(ctrl,user);
			poll_cur=poll_down;
		}
		catch(e){
			happen.Happen(e,{
				Class:'YgEs.StateMachine',
				Cause:'ThrownFromCallback',
				Info:GetInfo('OnStop'),
			});
			poll_cur=poll_nop;
			return;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_down=(user)=>{
		try{
			var r=cur.OnPollInDown?cur.OnPollInDown(ctrl,user):true;
		}
		catch(e){
			happen.Happen(e,{
				Class:'YgEs.StateMachine',
				Cause:'ThrownFromCallback',
				Info:GetInfo('OnPollInDown'),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			// normal transition 
			call_end(user);
		}
		else{
			// interruption 
			state_next=r.toString();
			call_end(user);
		}
	}
	let call_end=(user)=>{
		try{
			if(cur.OnEnd)cur.OnEnd(ctrl,user);
			call_start(user);
		}
		catch(e){
			happen.Happen(e,{
				Class:'YgEs.StateMachine',
				Cause:'ThrownFromCallback',
				Info:GetInfo('OnEnd'),
			});
			poll_cur=poll_nop;
			return;
		}
	}

	let stmac={
		Name:name+'.Proc',
		Log:log,
		HappenTo:happen,
		User:user,
		OnStart:(user)=>{
			call_start(user);
		},
		OnPoll:(user)=>{
			poll_cur(user);
			return !!cur;
		},
		OnDone:opt.OnDone??'',
		OnAbort:opt.OnAbort??'',
	}

	let proc=launcher.Launch(stmac);
	let ProcInfo=proc.GetInfo;
	proc.GetInfo=()=>Object.assign(ProcInfo(),{StateMachine:GetInfo()});
	ctrl.IsStarted=proc.IsStarted;
	ctrl.IsFinished=proc.IsFinished;
	ctrl.IsAborted=proc.IsAborted;
	ctrl.IsEnd=proc.IsEnd;
	ctrl.Abort=proc.Abort;
	ctrl.Sync=proc.Sync;
	ctrl.ToPromise=proc.ToPromise;
	return ctrl;
}

YgEs.StateMachine={
	Name:'YgEs.StateMachine.Container',
	User:{},
	_private_:{},

	Run:_run,
}

})();

// Agent -------------------------------- //
(()=>{ // local namespace 

const HappeningManager=YgEs.HappeningManager;
const Log=YgEs.Log;
const Engine=YgEs.Engine;
const StateMachine=YgEs.StateMachine;
const Util=YgEs.Util;

// state 
const _state_names=Object.freeze(['IDLE','BROKEN','DOWN','REPAIR','UP','HALT','TROUBLE','HEALTHY']);

// make reverse lookup 
let ll={}
for(let i in _state_names)ll[_state_names[i]]=parseInt(i);
const _state_lookup=Object.freeze(ll);

function _standby(prm){

	let opencount=0;
	let ctrl=null;
	let ready=false;
	let halt=false;
	let restart=false;
	let aborted=false;
	let wait=[]

	let name=prm.Name??'YgEs.Agent';
	let log=prm.Log??Log;
	let happen=prm.HappenTo??HappeningManager;
	let launcher=prm.Launcher??Engine;
	let user=prm.User??{};
	let abps=prm.AgentBypasses??[];
	let ubps=prm.UserBypasses??[];

	let GetInfo=(site='')=>{
		let r={
			Name:name,
			CrashSite:site,
			State:ctrl?ctrl.GetCurState():'NONE',
			Busy:!!ctrl,
			Ready:ready,
			Halt:halt,
			Aborted:aborted,
			Restarting:restart,
			Handles:opencount,
			User:user,
			Waiting:[],
			Happening:happen.GetInfo(),
			Launcher:launcher.GetInfo(),
		}
		for(let w of wait)r.Waiting.push({Label:w.Label,Prop:w.Prop});
		return r;
	}

	let states={
		'IDLE':{
			OnPollInKeep:(ctrl,user)=>{
				if(opencount<1)return true;
				restart=false;

				happen.CleanUp();
				return happen.IsCleaned()?'UP':'REPAIR';
			},
		},
		'BROKEN':{
			OnPollInKeep:(ctrl,user)=>{
				if(opencount<1)return true;
				restart=false;

				return 'REPAIR';
			},
		},
		'REPAIR':{
			OnStart:(ctrl,user)=>{

				try{
					//start repairing 
					wait=[]
					if(prm.OnRepair)prm.OnRepair(agent);
				}
				catch(e){
					happen.Happen(e,{
						Class:'YgEs.Agent',
						Cause:'ThrownFromCallback',
						Info:GetInfo('OnRepair'),
					});
				}
			},
			OnPollInKeep:(ctrl,user)=>{
				if(opencount<1){
					happen.CleanUp();
					return happen.IsCleaned()?'IDLE':'BROKEN';
				}

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d.Chk(d.Prop))continue;
						cont.push(d);
					}
					catch(e){
						happen.Happen(e,{
							Class:'YgEs.Agent',
							Cause:'ThrownFromCallback',
							Info:GetInfo('wait for repair'),
						});
					}
				}
				wait=cont;
				if(wait.length>0)return;

				// wait for all happens resolved 
				happen.CleanUp();
				if(happen.IsCleaned())return 'UP';
			},
		},
		'DOWN':{
			OnStart:(ctrl,user)=>{
				let back=false;
				try{
					wait=[]

					// down dependencles too 
					if(prm.Dependencies){
						Util.SafeDictIter(prm.Dependencies,(k,h)=>{
							h.Close();
						});
					}

					if(ctrl.GetPrevState()=='UP'){
						back=true;
						if(prm.OnBack)prm.OnBack(agent);
					}
					else{
						if(prm.OnClose)prm.OnClose(agent);
					}
				}
				catch(e){
					happen.Happen(e,{
						Class:'YgEs.Agent',
						Cause:'ThrownFromCallback',
						Info:GetInfo(back?'OnBack':'OnClose'),
					});
				}
			},
			OnPollInKeep:(ctrl,user)=>{

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d.Chk(d.Prop))continue;
						cont.push(d);
					}
					catch(e){
						happen.Happen(e,{
							Class:'YgEs.Agent',
							Cause:'ThrownFromCallback',
							Info:GetInfo('wait for down'),
						});
					}
				}
				wait=cont;
				if(wait.length>0)return null;
				happen.CleanUp();
				return happen.IsCleaned()?'IDLE':'BROKEN';
			},
		},
		'UP':{
			OnStart:(ctrl,user)=>{
				try{
					wait=[]
					if(prm.OnOpen)prm.OnOpen(agent);

					// up dependencles too 
					if(prm.Dependencies){
						Util.SafeDictIter(prm.Dependencies,(k,h)=>{
							h.Open();
							wait.push({
								Label:'Depends '+h.GetAgent().Name,
								Chk:()=>h.IsReady(),
							});
						});
					}
				}
				catch(e){
					happen.Happen(e,{
						Class:'YgEs.Agent',
						Cause:'ThrownFromCallback',
						Info:GetInfo('OnOpen'),
					});
				}
			},
			OnPollInKeep:(user)=>{
				if(opencount<1 || restart)return 'DOWN';

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d.Chk(d.Prop))continue;
						cont.push(d);
					}
					catch(e){
						happen.Happen(e,{
							Class:'YgEs.Agent',
							Cause:'ThrownFromCallback',
							Info:GetInfo('wait for up'),
						});
					}
				}
				wait=cont;
				if(!happen.IsCleaned())return 'DOWN';
				if(wait.length<1)return 'HEALTHY';
			},
			OnEnd:(ctrl,user)=>{
				if(ctrl.GetNextState()=='HEALTHY'){
					try{
						// mark ready before callback 
						ready=true;
						if(prm.OnReady)prm.OnReady(agent);
					}
					catch(e){
						happen.Happen(e,{
							Class:'YgEs.AgentError',
							Cause:'ThrownFromCallback',
							Info:GetInfo('OnReady'),
						});
					}
				}
			},
		},
		'HEALTHY':{
			OnPollInKeep:(ctrl,user)=>{
				if(opencount<1 || restart){
					ready=false;
					return 'DOWN';
				}
				if(!happen.IsCleaned())return 'TROUBLE';

				try{
					if(prm.OnPollInHealthy)prm.OnPollInHealthy(agent);
				}
				catch(e){
					happen.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:GetInfo('OnPollInHealthy'),
					});
					return 'TROUBLE';
				}
			},
		},
		'TROUBLE':{
			OnStart:(ctrl,user)=>{
				try{
					if(prm.OnTrouble)prm.OnTrouble(agent);
				}
				catch(e){
					happen.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:GetInfo('OnTrouble'),
					});
				}
			},
			OnPollInKeep:(ctrl,user)=>{
				if(opencount<1 || restart){
					ready=false;
					return 'DOWN';
				}
				happen.CleanUp();
				if(happen.IsCleaned())return 'HEALTHY';

				try{
					let c=happen.CountIssues();
					if(prm.OnPollInTrouble)prm.OnPollInTrouble(agent);
					if(c<happen.CountIssues())return 'HALT';
				}
				catch(e){
					happen.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:GetInfo('OnPollInTrouble'),
					});
					return 'HALT';
				}
			},
			OnEnd:(ctrl,user)=>{
				if(ctrl.GetNextState()=='HEALTHY'){
					try{
						if(prm.OnRecover)prm.OnRecover(agent);
					}
					catch(e){
						happen.Happen(e,{
							Class:'YgEs.AgentError',
							Cause:'ThrownFromCallback',
							Info:GetInfo('OnRecover'),
						});
					}
				}
			},
		},
		'HALT':{
			OnStart:(ctrl,user)=>{
				halt=true;

				try{
					if(prm.OnHalt)prm.OnHalt(agent);
				}
				catch(e){
					happen.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:GetInfo('OnHalt'),
					});
				}
			},
			OnPollInKeep:(ctrl,user)=>{
				if(opencount<1 || restart){
					ready=false;
					return 'DOWN';
				}
				happen.CleanUp();
				if(happen.IsCleaned())return 'HEALTHY';
			},
			OnEnd:(ctrl,user)=>{
				halt=false;

				if(ctrl.GetNextState()=='HEALTHY'){
					try{
						if(prm.OnRecover)prm.OnRecover(agent);
					}
					catch(e){
						happen.Happen(e,{
							Class:'YgEs.AgentError',
							Cause:'ThrownFromCallback',
							Info:GetInfo('OnRecover'),
						});
					}
				}
			},
		},
	}

	let agent={
		Name:name+'.Worker',
		User:user,
		_private_:{},

		IsOpen:()=>opencount>0,
		IsBusy:()=>!!ctrl || opencount>0,
		IsReady:()=>ready && opencount>0,
		IsHalt:()=>halt,
		GetState:()=>ctrl?ctrl.GetCurState():'NONE',
		GetInfo:()=>GetInfo(''),

		GetLogger:()=>log,
		GetLauncher:()=>{return launcher;},
		GetHappeningManager:()=>{return happen;},
		GetDependencies:()=>{return prm.Dependencies;},

		WaitFor:(label,cb_chk,prop={})=>{
			wait.push({Label:label,Chk:cb_chk,Prop:prop});
		},
		Restart:()=>{restart=true;},

		Fetch:()=>{
			return handle(agent);
		},
		Open:()=>{
			let h=agent.Fetch();
			h.Open();
			return h;
		},
	}

	let ctrlopt={
		Name:name+'.StateMachine',
		Log:log,
		HappenTo:happen,
		Launcher:launcher,
		User:user,
		OnDone:(user)=>{
			ctrl=null;
			aborted=false;
			if(prm.OnFinish)prm.OnFinish(agent,happen.IsCleaned());
		},
		OnAbort:(user)=>{
			ctrl=null;
			aborted=true;
			if(prm.OnAbort)prm.OnAbort(agent);
		},
	}

	let handle=(w)=>{
		let in_open=false;
		let h={
			Name:name+'.Handle',
			User:{},

			GetAgent:()=>{return agent;},
			GetLogger:()=>agent.GetLogger(),
			GetLauncher:()=>agent.GetLauncher(),
			GetHappeningManager:()=>agent.GetHappeningManager(),
			GetDependencies:()=>agent.GetDependencies(),

			IsOpenHandle:()=>in_open,
			IsOpenAgent:()=>agent.IsOpen(),
			IsBusy:()=>agent.IsBusy(),
			IsReady:()=>agent.IsReady(),
			IsHalt:()=>agent.IsHalt(),
			GetState:()=>agent.GetState(),

			Restart:()=>agent.Restart(),

			Open:()=>{
				if(!in_open){
					in_open=true;
					++opencount;
				}
				if(!ctrl){
					ctrl=StateMachine.Run('IDLE',states,ctrlopt);
					let StMacInfo=ctrl.GetInfo;
					ctrl.GetInfo=()=>Object.assign(StMacInfo(),{Agent:GetInfo('')});
				}
			},
			Close:()=>{
				if(!in_open)return;
				in_open=false;
				--opencount;
			},
		}
		for(let n of abps){
			h[n]=(...args)=>{
				if(!h.IsReady()){
					h.GetLogger().Notice('not ready');
					return null;
				}
				return agent[n].call(null,...args);
			}
		}
		for(let n of ubps){
			h[n]=(...args)=>{
				if(!h.IsReady()){
					h.GetLogger().Notice('not ready');
					return null;
				}
				return agent.User[n].call(null,...args);
			}
		}

		return h;
	}

	return agent;
}

YgEs.AgentManager={
	Name:'YgEs.AgentManager',
	User:{},
	_private_:{},

	StandBy:_standby,
	Launch:(prm)=>{return _standby(prm).Fetch();},
	Run:(prm)=>{return _standby(prm).Open();},
}

})();

// Quick HyperText for web -------------- //
(()=>{ // local namespace 

YgEs.ToQHT=(el)=>{

	let qht={
		Name:'YgEs.QHT.Unit',
		_yges_qht_:true,
		User:{},
		Element:el,

		Remove:()=>{
			if(!qht.Element)return;
			qht.Element.remove();
			qht.Element=null;
		},
		Clear:()=>{
			if(!qht.Element)return;
			qht.Element.innerText='';
		},
		Append:(src)=>{
			if(!qht.Element)return;
			if(src==null)return;
			if(typeof src==='object'){
				if(src._yges_qht_)qht.Element.append(src.Element);
				else qht.Element.append(src);
			}
			else qht.Element.append(src);
		},
		Replace:(src)=>{
			if(!qht.Element)return;
			qht.Element.innerText='';
			qht.Append(src);
		},
		BR:()=>{
			if(!qht.Element)return;
			qht.Element.append(document.createElement('br'));
		},
		HR:()=>{
			if(!qht.Element)return;
			qht.Element.append(document.createElement('hr'));
		},
	}
	return qht;
}

YgEs.NewQHT=(prm)=>{

	if(!prm.Tag)return null;

	let el=document.createElement(prm.Tag);

	if(prm.Attr){
		for(let k in prm.Attr){
			el.setAttribute(k,prm.Attr[k]);
		}
	}
	if(prm.Style){
		for(let k in prm.Style){
			el.style[k]=prm.Style[k];
		}
	}
	if(prm.Sub){
		for(let t of prm.Sub){
			if(t===null){}
			else if(typeof t==='object'){
				if(t._yges_qht_)el.append(t.Element);
				else el.append(t);
			}
			else el.append(t);
		}
	}
	if(prm.Target)prm.Target.Append(el);

	return YgEs.ToQHT(el);
}

})();

// Low Level HTTP for web --------------- //
(()=>{ // local namespace 

YgEs.HTTPClient={
	Name:'YgEs.HTTP',
	User:{},
}

function _retry(ctx,hap){
	hap.Resolve();
	return ctx.Retry();
}

YgEs.HTTPClient.Request=(method,url,opt,cb_res=null,cb_ok=null,cb_ng=null)=>{

	var req=new XMLHttpRequest();
	var ctx={
		Name:'YgEs.HTTP.Request',
		User:{},
		URL:url,
		Opt:opt,
		Accepted:false,
		End:false,
		OK:false,
		SendProgress:0.0,
		RecvProgress:0.0,
		Progress:0.0,
		Req:req,
		Abort:()=>{
			req.abort();
		},
		Retry:()=>{
			return YgEs.HTTPClient.Request(method,url,opt,cb_res,cb_ok,cb_ng);
		},
	}
	var res={
		Status:0,
		Msg:'',
		TimeOut:false,
		Data:null,
	}

	var happen=opt.HappenTo??YgEs.HappeningManager;

	var sendratio=opt.SendRatio??0.0;
	if(sendratio<0.0)sendratio=0.0;
	else if(sendratio>1.0)sendratio=1.0;

	req.addEventListener('loadstart',(ev)=>{
		ctx.Accepted=true;
		ctx.SendProgress=1.0;
		ctx.Progress=sendratio;
	});
	req.addEventListener('Progress',(ev)=>{
		if(!ev.lengthComputable)return;
		if(ev.total<1)return;
		ctx.RecvProgress=ev.loaded/ev.total;
		ctx.Progress=sendratio+((1.0-sendratio)*ctx.RecvProgress);
	});
	req.addEventListener('load',(ev)=>{
		if(ctx.End)return;
		ctx.End=true;
		ctx.RecvProgress=1.0;
		res.Status=req.status;
		res.Msg=req.statusText;
		res.Body=req.response;
		res.head={}
		if(opt.RefHead){
			for(var k of opt.RefHead){
				res.head[k]=req.getResponseHeader(k);
			}
		}

		if(opt.OnGate){
			try{
				var r=opt.OnGate(res);
				if(r)cb_res=r;
			}
			catch(e){
				var hap=happen.Happen(e,{},{
					Name:'YgEs.HTTP.Error',
					User:{Retry:()=>_retry(ctx,hap)},
				});
				if(cb_ng)cb_ng(hap);
				return;
			}
		}
		else if(res.Status>299){
			var hap=happen.Happen(
				'Bad Status',res,{
				Name:'YgEs.HTTP.Bad',
				User:{Retry:()=>_retry(ctx,hap)},
			});
			if(cb_ng)cb_ng(hap);
			return;
		}

		if(cb_res){
			var r=null;
			var e=null;
			try{
				r=cb_res(res);
			}
			catch(exc){
				e=exc;
				r=null;
			}

			if(e){
				var hap=happen.Happen(e,{},{
					Name:'YgEs.HTTP.Error',
					User:{Retry:()=>_retry(ctx,hap)},
				});
				if(cb_ng)cb_ng(hap);
			}
			else if(r===null){
				var hap=happen.Happen(
					'Invalid Response',{
					Name:'YgEs.HTTP.Invalid',
					Res:req.response,
					User:{Retry:()=>_retry(ctx,hap)},
				});
				if(cb_ng)cb_ng(hap);
			}
			else{
				ctx.OK=true;
				if(cb_ok)cb_ok(r);
			}
		}
		else{
			ctx.OK=true;
			if(cb_ok)cb_ok(res.Body);
		}
	});
	req.addEventListener('error',(ev)=>{
		if(ctx.End)return;
		ctx.End=true;
		res.Msg='HTTP request error';

		if(cb_ng)cb_ng(happen.Happen(res.Msg,{},{
			Name:'YgEs.HTTP.Error',
			User:{Retry:()=>_retry(ctx,hap)},
		}));
		else log_fatal(res.Msg);
	});
	req.addEventListener('timeout',(ev)=>{
		if(ctx.End)return;
		ctx.End=true;
		res.TimeOut=true;
		res.Msg='HTTP timeout';

		if(cb_ng)cb_ng(happen.Happen(res.Msg,{},{
			Name:'YgEs.HTTP.Error',
			User:{Retry:()=>_retry(ctx,hap)},
		}));
		else log_fatal(res.Msg);
	});
	req.addEventListener('abort',(ev)=>{
		if(ctx.End)return;
		ctx.End=true;
		res.Msg='aborted';

		if(cb_ng)cb_ng(happen.Happen(res.Msg,{},{
			Name:'YgEs.HTTP.Error',
			User:{Retry:()=>_retry(ctx,hap)},
		}));
		else log_notice(res.Msg);
	});

	if(opt.ResType)req.responseType=opt.ResType;
	if(opt.TimeOut)req.timeout=opt.TimeOut;
	if(opt.Header){
		for(var k in opt.Header){
			req.setRequestHeader(k,opt.Header[k]);
		}
	}

	if(opt.Body){
		req.upload.addEventListener('Progress',(ev)=>{
			if(ctx.End)return;
			if(ev.total<1)return;
			ctx.SendProgress=ev.loaded/ev.total;
			ctx.Progress=sendratio*ctx.SendProgress;
		});
	}

	req.open(method,url);
	if(opt.Body){
		if(opt.Type)req.setRequestHeader('Content-Type',opt.Type);
		req.send(opt.Body);
	}
	else req.send();

	return ctx;
}

YgEs.HTTPClient.GetText=(url,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('GET',url,opt,
	(res)=>{
		if(res.Status!=200)return null;
		return res.Body;
	},cb_ok,cb_ng);
}

YgEs.HTTPClient.GetBlob=(url,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('GET',url,Object.assign({
		ResType:'blob',
	},opt),
	(res)=>{
		if(res.Status!=200)return null;
		return res.Body;
	},cb_ok,cb_ng);
}

YgEs.HTTPClient.GetBuf=(url,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('GET',url,Object.assign({
		ResType:'arraybuffer',
	},opt),
	(res)=>{
		if(res.Status!=200)return null;
		return res.Body;
	},cb_ok,cb_ng);
}

YgEs.HTTPClient.GetJSON=(url,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('GET',url,opt,
	(res)=>{
		if(res.Status!=200)return null;
		return JSON.parse(res.Body);
	},cb_ok,cb_ng);
}

YgEs.HTTPClient.GetXML=(url,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('GET',url,opt,
	(res)=>{
		if(res.Status!=200)return null;
		var psr=new DOMParser();
		return psr.parseFromString(res.Body,"text/xml");
	},cb_ok,cb_ng);
}

YgEs.HTTPClient.PostText=(url,text,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('POST',url,Object.assign({
		headers:{'Content-Type':'text/plain'},
		Body:text,
		SendRatio:0.99,
	},opt),
	(res)=>{
		return res.Body;
	},cb_ok,cb_ng);
}

YgEs.HTTPClient.PostJSON=(url,data,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('POST',url,Object.assign({
		headers:{'Content-Type':'application/json'},
		Body:JSON.stringify(data),
		SendRatio:0.99,
	},opt),
	(res)=>{
		return res.Body;
	},cb_ok,cb_ng);
}

YgEs.HTTPClient.PostFile=(url,bin,file,cb_ok=null,cb_ng=null,opt={})=>{

	readfile(bin,file,(name,data)=>{
		return YgEs.HTTPClient.Request('POST',url,Object.assign({
			Type:file.type?file.type:'application/octet-stream',
			Body:data,
			SendRatio:0.99,
		},opt),
		(res)=>{
			return res.Body;
		},cb_ok,cb_ng);
	},cb_ng);
}

YgEs.HTTPClient.Delete=(url,cb_ok=null,cb_ng=null,opt={})=>{

	return YgEs.HTTPClient.Request('DELETE',url,opt,
	(res)=>{
		return res.Body;
	},cb_ok,cb_ng);
}

})();

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
			if(ctx.View){
				ctx.View.Unload();
				monitor.Detach(ctx.View);
				ctx.View=null;
			}
			delete ctxs[label];
			delete ctrl.Ready[label];
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
						if(user.Ready)return true;
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
		OnStart:(url,cb_ok,cb_ng,opt)=>{
			return YgEs.HTTPClient.GetText(url,cb_ok,cb_ng,opt);
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
		OnStart:(url,cb_ok,cb_ng,opt)=>{
			return YgEs.HTTPClient.GetText(url,cb_ok,cb_ng,opt);
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
		OnStart:(url,cb_ok,cb_ng,opt)=>{
			return YgEs.HTTPClient.GetText(url,cb_ok,cb_ng,opt);
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

// Download Monitor --------------------- //
(()=>{ // local namespace 

function _setup(target,show){

	let visible=false;
	let view=YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:'yges_loadmon_view'}});
	let tbl=YgEs.NewQHT({Tag:'table',Attr:{class:'yges_loadmon_table',border:'border'}});
	let head=YgEs.NewQHT({Target:tbl,Tag:'tr',Attr:{class:'yges_loadmon_thr'},Sub:[
		YgEs.NewQHT({Tag:'th',Attr:{class:'yges_loadmon_th_type'},Sub:['Type']}),
		YgEs.NewQHT({Tag:'th',Attr:{class:'yges_loadmon_th_name'},Sub:['Name']}),
		YgEs.NewQHT({Tag:'th',Attr:{class:'yges_loadmon_th_cond'},Sub:['Cond']}),
	]});

	let ctrl={
		IsVisible:()=>visible,
		Dispose:()=>{
			view.Remove();
			view=null;
			tbl=null;
			head=null;
			ctrl=null;
		},
		Hide:()=>{
			if(!visible)return;
			visible=false;
			view.Clear();
		},
		Show:()=>{
			if(visible)return;
			visible=true;
			view.Clear();
			view.Append(tbl);
		},
		Detach:(view)=>{
			view.Row.Remove();
		},
		Attach:(ctx)=>{
			let v_row={
			}

			v_row.Row=YgEs.NewQHT({Target:tbl,Tag:'tr'});
			YgEs.NewQHT({Target:v_row.Row,Tag:'td',Sub:[ctx.Type]});
			YgEs.NewQHT({Target:v_row.Row,Tag:'td',Sub:[ctx.Label]});
			v_row.Cond=YgEs.NewQHT({Target:v_row.Row,Tag:'td'});
			v_row.Meter=YgEs.NewQHT({Target:v_row.Cond,Tag:'meter',Attr:{min:0,max:100,value:0}});
			v_row.Msg=YgEs.NewQHT({Target:v_row.Cond,Tag:'span'});

			v_row.Progress=(val)=>{
				v_row.Meter.Element.setAttribute('value',val*100);
			},
			v_row.Apply=()=>{
				v_row.Msg.Replace('(applying)');
			};
			v_row.Done=()=>{
				v_row.Msg.Replace('[OK]');
			};
			v_row.Happen=(msg,cb_retry)=>{
				v_row.Msg.Replace(msg);
				let btn=YgEs.NewQHT({Target:v_row.Msg,Tag:'button',Sub:['Retry']});
				btn.Element.onclick=()=>{
					cb_retry();
				}
			};
			v_row.Unload=()=>{
				v_row.Msg.Replace('(unloading)');
			};

			return v_row;
		},
	}
	if(show)ctrl.Show();
	return ctrl;
}

YgEs.DownloadMonitor={
	Name:'YgEs.DownloadMonitor',
	User:{},
	_private_:{},

	SetUp:_setup,
}

})();
