// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Common Store ------------------------- //

// export target 
let YgEs={
	name:'YgEs',
	User:{},
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

	let s=src.Text;
	if(src.Prop)s+='; '+YgEs.Inspect(src.Prop);
	console.log(s);
}

// create local instance 
function _create_local(capt=null,showable=null,parent=null){

	const format=(src)=>{
		for(let inst=t;inst;inst=inst.GetParent()){
			if(inst.Format!==null){
				inst.Format(src);
				return;
			}
		}
		_default_format(src);
	}
	const write=(src)=>{
		for(let inst=t;inst;inst=inst.GetParent()){
			if(inst.Way!==null){
				inst.Way(src);
				return;
			}
		}
		_default_way(src);
	}

	const iid=YgEs.NextID();
	let t={
		name:'YgEs.LocalLog',
		User:{},

		Showable:showable,
		Caption:capt,
		Format:null,
		Way:null,

		LEVEL_NAMES:_level_names,
		LEVEL:_level_lookup,

		CreateLocal:(capt=null,showable=null)=>_create_local(capt,showable,t),

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
			format(src);
			write(src);
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

const Log=YgEs.Log=_create_local();
YgEs.Log.name='YgEs.GlobalLog';

})();

// Utilities ---------------------------- //
(()=>{ // local namespace 

const _rx_zero=/^(0+(|\.)0*|0*(|\.)0+)$/;
const _rx_null=/^null$/i;
const _rx_false=/^false$/i;
const _rx_undefined=/^undefined$/i;

let Util=YgEs.Util={
	name:'YgEs.Util',
	User:{},

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
			HappeningManager.HappenProp({msg:'backward',bgn:bgn,end:end,step:step});
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
	name:'YgEs_Timing',
	User:{},

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

		GetInstanceID:()=>iid,
		GetProp:cbprop,
		ToString:cbstr,
		toString:cbstr,
		ToJSON:()=>JSON.stringify(hap.GetProp()),
		ToError:cberr,

		IsResolved:()=>resolved,
		Resolve:()=>{
			if(resolved)return;
			resolved=true;
			abandoned=false;
			if(onResolved)onResolved(hap);
		},

		IsAbandoned:()=>abandoned && !resolved,
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

	const onHappen=(hap)=>{
		for(let hm=mng;hm;hm=hm.GetParent()){
			if(!hm.OnHappen)continue;
			hm.OnHappen(hap);
			return;
		}
		_default_happened(hap);
	}

	const iid=YgEs.NextID();
	let mng={
		name:prm.Name??'YgEs.HappeningManager',
		OnHappen:prm.OnHappen??null,
		User:prm.User??{},

		CreateLocal:(prm={})=>{
			let cm=_create_manager(prm,mng);
			children.push(cm);
			return cm;
		},

		GetInstanceID:()=>iid,
		GetParent:()=>parent,
		GetChildren:()=>children,
		GetIssues:()=>issues,

		Abandon:()=>{
			for(let sub of children){
				sub.Abandon();
			}
			for(let hap of issues){
				hap.Abandon();
			}
			issues=[]
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

			for(let sub of children){
				sub.CleanUp();
			}
		},

		GetInfo:()=>{
			let info={Name:mng.name,Issues:[],Children:[]}
			for(let hap of issues){
				if(hap.IsResolved())continue;
				info.Issues.push({Name:hap.name,Prop:hap.GetProp()});
			}
			for(let sub of children){
				let si=sub.GetInfo();
				if(si.Issues.length>0 || si.Children.length>0)info.Children.push(si);
			}
			return info;
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

		Happen:(hap)=>{
			issues.push(hap);
			onHappen(hap);
			return hap;
		},
		HappenMsg:(msg,init={})=>{
			return mng.Happen(_create_happening(
				()=>{return {msg:''+msg}},
				()=>''+msg,
				()=>new Error(msg),
				init
			));
		},

		HappenProp:(prop,init={})=>{
			return mng.Happen(_create_happening(
				()=>prop,
				()=>JSON.stringify(prop),
				()=>new Error(JSON.stringify(prop)),
				init
			));
		},

		HappenError:(err,init={})=>{
			return mng.Happen(_create_happening(
				()=>{return YgEs.FromError(err)},
				()=>''+err,
				()=>err,
				init
			));
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

function _create_proc(prm){

	let onStart=prm.OnStart??null;
	let onPoll=prm.OnPoll;
	let onDone=prm.OnDone??null;
	let onAbort=prm.OnAbort??null;

	let started=false;
	let finished=false;
	let aborted=false;

	const iid=YgEs.NextID();
	let proc={
		name:prm.Name??CLASS_PROC,
		HappenTo:(prm.HappenTo??HappeningManager).CreateLocal(),
		User:prm.User??{},

		GetInstanceID:()=>iid,
		IsStarted:()=>started,
		IsFinished:()=>finished,
		IsAborted:()=>aborted,
		IsEnd:()=>finished||aborted,

		_start:()=>{
			if(started)return;
			if(proc.IsEnd())return;
			started=true;
			if(onStart){
				try{
					onStart(proc.User);
				}
				catch(e){
					proc.HappenTo.HappenProp({
						class:CLASS_PROC,
						cause:'throw from start',
						src:proc,
						err:YgEs.FromError(e),
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
					proc.HappenTo.HappenProp({
						class:CLASS_PROC,
						cause:'throw from abort',
						src:proc,
						err:YgEs.FromError(e),
					});
				}
			}
			else{
				proc.HappenTo.HappenProp({
					class:CLASS_PROC,
					cause:'abort',
					src:proc,
				});
			}
		},
		Poll:()=>{
			if(proc.IsEnd())return false;
			try{
				if(onPoll(proc.User))return true;
			}
			catch(e){
				proc.HappenTo.HappenProp({
					class:CLASS_PROC,
					cause:'throw from poll',
					src:proc,
					err:YgEs.FromError(e),
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
					proc.HappenTo.HappenProp({
						class:CLASS_PROC,
						cause:'throw from done',
						src:proc,
						err:YgEs.FromError(e),
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
				proc.HappenTo.HappenProp({
					class:CLASS_LAUNCHER,
					cause:'empty callback from sync',
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
						proc.HappenTo.HappenProp({
							class:CLASS_PROC,
							cause:'throw from sync',
							src:proc,
							err:YgEs.FromError(e),
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
		name:prm.Name??CLASS_LAUNCHER,
		HappenTo:(prm.HappenTo??HappeningManager).CreateLocal(),
		Limit:prm.Limit??-1,
		Cycle:prm.Cycle??DEFAULT_LAUNCHER_CYCLE,
		User:prm.User??{},

		GetInstanceID:()=>iid,
		GetActive:()=>active,
		GetHeld:()=>launched,
		GetSub:()=>sublauncher,

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
				lnc.HappenTo.HappenMsg('the Engine was abandoned, no longer launch new procedures.');
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
				lnc.HappenTo.HappenProp({
					class:CLASS_LAUNCHER,
					cause:'empty pollee',
				});
				return;
			}

			let proc=_create_proc(prm);
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
				lnc.HappenTo.HappenProp({
					class:CLASS_LAUNCHER,
					cause:'empty callback from sync',
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
						lnc.HappenTo.HappenProp({
							class:CLASS_PROC,
							cause:'throw from sync',
							src:lnc,
							err:YgEs.FromError(e),
						});
					}
				}
			);
		},

		ToPromise:(breakable,interval=null)=>{
			return Timing.ToPromise((ok,ng)=>{
				lnc.Sync(()=>{
					if(breakable || !aborted)ok(lnc.User);
					else ng(new Error('abort',{cause:lnc.User}));
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

// Statemachine ------------------------- //
(()=>{ // local namespace 

const Engine=YgEs.Engine;
const HappeningManager=YgEs.HappeningManager;

function _run(start,states={},opt={}){

	let launcher=opt.Launcher??YgEs.Engine;
	let cur=null;

	let name=opt.Name??'YgEs.StateMachine';
	let happen=opt.HappenTo??HappeningManager;
	let user=opt.User??{};

	let state_prev=null;
	let state_cur=null;
	let state_next=start;

	let ctrl={
		name:name+'_Control',
		User:user,
		GetHappeningManager:()=>happen,
		GetPrevState:()=>state_prev,
		GetCurState:()=>state_cur,
		GetNextState:()=>state_next,
	}

	let GetInfo=(phase)=>{
		return {
			Name:name,
			Prev:state_prev,
			Cur:state_cur,
			Next:state_next,
			Phase:phase,
			User:user,
		}
	}

	let poll_nop=(user)=>{}
	let poll_cur=poll_nop;

	let call_start=(user)=>{
		if(state_next==null){
			// normal end 
			cur=null;
			poll_cur=poll_nop;
			return;
		}
		cur=states[state_next]??null;
		if(!cur){
			stmac.HappenTo.HappenProp({
				class:'YgEs_Statemachine_Error',
				cause:'state missing: '+state_next,
				info:GetInfo('selecing'),
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
			stmac.HappenTo.HappenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:GetInfo('cb_start'),
				err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_up=(user)=>{
		try{
			var r=cur.OnPollInUp?cur.OnPollInUp(ctrl,user):true;
		}
		catch(e){
			stmac.HappenTo.HappenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:GetInfo('poll_up'),
				err:YgEs.FromError(e),
			});
			r=false;
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
				stmac.HappenTo.HappenProp({
					class:'YgEs_Statemachine_Error',
					cause:'throw from a callback',
					info:GetInfo('cb_ready'),
					err:YgEs.FromError(e),
				});
				poll_cur=poll_nop;
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
			stmac.HappenTo.HappenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:GetInfo('poll_keep'),
				err:YgEs.FromError(e),
			});
			r=false;
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
			stmac.HappenTo.HappenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:GetInfo('cb_stop'),
				err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_down=(user)=>{
		try{
			var r=cur.OnPollInDown?cur.OnPollInDown(ctrl,user):true;
		}
		catch(e){
			stmac.HappenTo.HappenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:GetInfo('poll_down'),
				err:YgEs.FromError(e),
			});
			r=false;
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
			stmac.HappenTo.HappenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:GetInfo('cb_end'),
				err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
		}
	}

	let stmac={
		Name:name,
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
	name:'YgEs_StateMachineContainer',
	User:{},

	Run:_run,
}

})();

// Agent -------------------------------- //
(()=>{ // local namespace 

const HappeningManager=YgEs.HappeningManager;
const Engine=YgEs.Engine;
const StateMachine=YgEs.StateMachine;
const Util=YgEs.Util;

// state 
const _state_names=Object.freeze(['IDLE','BROKEN','DOWN','REPAIR','UP','REST','TROUBLE','HEALTHY']);

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
	let happen=prm.HappenTo??HappeningManager.CreateLocal();
	let launcher=prm.Launcher??Engine.CreateLauncher();
	let user=prm.User??{};

	let GetInfo=(phase)=>{
		return {
			Name:name,
			Phase:phase,
			State:ctrl?ctrl.GetCurState():'NONE',
			Wait:wait,
			User:user,
		}
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
					happen.HappenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:GetInfo('OnRepair'),
						err:YgEs.FromError(e),
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
						if(d())continue;
						cont.push(d);
					}
					catch(e){
						happen.HappenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:GetInfo('wait for repair'),
							err:YgEs.FromError(e),
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
					happen.HappenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:GetInfo(back?'OnBack':'OnClose'),
						err:YgEs.FromError(e),
					});
				}
			},
			OnPollInKeep:(ctrl,user)=>{

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d())continue;
						cont.push(d);
					}
					catch(e){
						happen.HappenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:GetInfo('wait for down'),
							err:YgEs.FromError(e),
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
							wait.push(()=>h.IsReady());
						});
					}
				}
				catch(e){
					happen.HappenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:GetInfo('OnOpen'),
						err:YgEs.FromError(e),
					});
				}
			},
			OnPollInKeep:(user)=>{
				if(opencount<1 || restart)return 'DOWN';

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d())continue;
						cont.push(d);
					}
					catch(e){
						happen.HappenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:GetInfo('wait for up'),
							err:YgEs.FromError(e),
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
						happen.HappenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:GetInfo('OnReady'),
							err:YgEs.FromError(e),
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
					happen.HappenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:GetInfo('OnPollInHealthy'),
						err:YgEs.FromError(e),
					});
					return 'TROUBLE';
				}
			},
		},
		'TROUBLE':{
			OnPollInKeep:(ctrl,user)=>{
				if(opencount<1 || restart){
					ready=false;
					return 'DOWN';
				}
				happen.CleanUp();
				if(happen.IsCleaned())return 'HEALTHY';

				try{
					if(prm.OnPollInTrouble)prm.OnPollInTrouble(agent);
				}
				catch(e){
					happen.HappenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:GetInfo('OnPollInTrouble'),
						err:YgEs.FromError(e),
					});
				}
				if(!happen.IsCleaned())return 'HALT';
			},
		},
		'HALT':{
			OnStart:(ctrl,user)=>{
				halt=true;
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
			},
		},
	}

	let agent={
		name:name,
		User:user,

		IsOpen:()=>opencount>0,
		IsBusy:()=>!!ctrl || opencount>0,
		IsReady:()=>ready && opencount>0,
		IsHalt:()=>halt,
		GetState:()=>ctrl?ctrl.GetCurState():'NONE',

		GetLauncher:()=>{return launcher;},
		GetHappeningManager:()=>{return happen;},
		GetDependencies:()=>{return prm.Dependencies;},

		WaitFor:(cb)=>{wait.push(cb)},
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
		Name:name+'_Control',
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
			name:name+'_Handle',

			GetAgent:()=>{return agent;},
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
				if(!ctrl)ctrl=StateMachine.Run('IDLE',states,ctrlopt);
			},
			Close:()=>{
				if(!in_open)return;
				in_open=false;
				--opencount;
			},
		}
		return h;
	}

	return agent;
}

YgEs.AgentManager={
	name:'YgEs.AgentManager',
	User:{},

	StandBy:_standby,
	Launch:(prm)=>{return _standby(prm).Fetch();},
	Run:(prm)=>{return _standby(prm).Open();},
}

})();

// Quick HyperText for web -------------- //
(()=>{ // local namespace 

YgEs.ToQHT=(el)=>{

	let qht={
		name:'YgEs.QuickHyperText',
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

YgEs.CreateSaver=()=>{
	let saver=YgEs.NewQHT({Tag:'a'});
	saver.save=(data,name='',type='application/octet-stream')=>{
		var blob=new Blob([data],{type:type});
		saver.Element.href=URL.createObjectURL(blob);
		if(name)saver.Element.download=name;
		saver.Element.click();
	}
	return saver;
}

})();

// Low Level HTTP for web --------------- //
(()=>{ // local namespace 

YgEs.HTTPClient={
	name:'YgEs.HTTP',
	User:{},
}

function _retry(ctx,hap){
	hap.Resolve();
	return ctx.Retry();
}

YgEs.HTTPClient.Request=(method,url,opt,cb_res=null,cb_ok=null,cb_ng=null)=>{

	var req=new XMLHttpRequest();
	var ctx={
		name:'YgEs.HTTP_Request',
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
				var hap=happen.HappenError(e,{
					Name:'YgEs.HTTP_Error',
					User:{Retry:()=>_retry(ctx,hap)},
				});
				if(cb_ng)cb_ng(hap);
				return;
			}
		}
		else if(res.Status>299){
			var hap=happen.HappenProp(res,{
				Name:'YgEs_HTTP_Bad',
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
				var hap=happen.HappenError(e,{
					Name:'YgEs.HTTP_Error',
					User:{Retry:()=>_retry(ctx,hap)},
				});
				if(cb_ng)cb_ng(hap);
			}
			else if(r===null){
				var hap=happen.HappenProp({
					Name:'YgEs_HTTP_Invalid',
					Msg:'invalid response:',
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

		if(cb_ng)cb_ng(happen.HappenMsg(res.Msg,{
			Name:'YgEs.HTTP_Error',
			User:{Retry:()=>_retry(ctx,hap)},
		}));
		else log_fatal(res.Msg);
	});
	req.addEventListener('timeout',(ev)=>{
		if(ctx.End)return;
		ctx.End=true;
		res.TimeOut=true;
		res.Msg='HTTP timeout';

		if(cb_ng)cb_ng(happen.HappenMsg(res.Msg,{
			Name:'YgEs.HTTP_Error',
			User:{Retry:()=>_retry(ctx,hap)},
		}));
		else log_fatal(res.Msg);
	});
	req.addEventListener('abort',(ev)=>{
		if(ctx.End)return;
		ctx.End=true;
		res.Msg='aborted';

		if(cb_ng)cb_ng(happen.HappenMsg(res.Msg,{
			Name:'YgEs.HTTP_Error',
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
	SetUp:_setup,
}

})();
