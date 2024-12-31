// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

// Common Store ------------------------- //

// export target 
let YgEs={
	name:'YgEs',
	User:{},
}

YgEs.createEnum=(src)=>{
}

YgEs.fromError=(err)=>{
	return {
		name:err.name,
		msg:err.message,
		file:err.fileName,
		line:err.lineNumber,
		col:err.columnNumber,
		stack:err.stack,
		src:err,
	}
}

YgEs.justString=(val)=>{
	switch(typeof val){
		case 'undefined': return 'undefined';
		case 'boolean': return val?'true':'false';
		case 'string': return val;
		case 'number': return val.toString();

		case 'object':
		if(val===null)return 'null';
		else if(Array.isArray(val)){
			let sub=[]
			for(let v of val)sub.push(YgEs.justString(v));
			return '['+sub.join(',')+']';
		}
		else{
			let sub=[]
			for(let k in val)sub.push([JSON.stringify(k),YgEs.justString(val[k])]);
			let sub2=[]
			for(let s of sub)sub2.push(s.join(':'));
			return '{'+sub2.join(',')+'}';
		}
		break;
	}
	return val.toString();
}

YgEs.inspect=(val)=>{
	switch(typeof val){
		case 'undefined': return 'undefined';
		case 'number': return val.toString();

		case 'object':
		if(val===null)return 'null';
		else if(Array.isArray(val)){
			let sub=[]
			for(let v of val)sub.push(YgEs.inspect(v));
			return '['+sub.join(',')+']';
		}
		else{
			let sub=[]
			for(let k in val)sub.push([JSON.stringify(k),YgEs.inspect(val[k])]);
			let sub2=[]
			for(let s of sub)sub2.push(s.join(':'));
			return '{'+sub2.join(',')+'}';
		}
		break;
	}
	return JSON.stringify(val);
}

// Logger ------------------------------- //
(()=>{ // local namespace 

// log level 
const _level_names=Object.freeze(['TICK','TRACE','DEBUG','INFO','NOTICE','WARN','FATAL','CRIT','ALERT','EMERG']);

// make reverse lookup 
let ll={}
for(let i in _level_names)ll[_level_names[i]]=parseInt(i);
ll['NEVER']=_level_names.length;
const _level_lookup=Object.freeze(ll);

// default settings 
const _default_showable=_level_lookup.INFO;

function _default_format(src){

	switch(typeof src.Msg){
		case 'function': src.Msg=src.Msg(); break;
		case 'object': src.Msg=YgEs.inspect(src.Msg); break;
	}

	let lev=_level_names[src.Lev]??('?'+src.Lev+'?');
	let capt=src.Capt?('{'+src.Capt+'} '):'';
	src.Msg=new Date().toISOString()+': ['+lev+'] '+capt+src.Msg;
}

function _default_way(src){

	let msg=src.Msg;
	if(src.Prop)msg+='; '+YgEs.inspect(src.Prop);
	console.log(msg);
}

// create local instance 
function _create_local(capt=null,showable=null,parent=null){

	let t={
		name:'YgEs_Logger',
		User:{},

		Showable:showable,
		Caption:capt,
		Format:null,
		Way:null,

		LEVEL_NAMES:_level_names,
		LEVEL:_level_lookup,

		createLocal:(capt=null,showable=null)=>_create_local(capt,showable,t),

		getCaption:()=>{
			if(t.Caption!==null)return t.Caption;
			if(parent)return parent.getCaption();
			return '';
		},
		getShowable:()=>{
			if(t.Showable!==null)return t.Showable;
			if(parent)return parent.getShowable();
			return _default_showable;
		},
		format:(src)=>{
			if(t.Format!==null)t.Format(src);
			else if(parent)parent.format(src);
			else _default_format(src);
		},
		write:(src)=>{
			if(t.Way!==null)t.Way(src);
			else if(parent)parent.write(src);
			else _default_way(src);
		},

		put:(lev,msg,prop=null)=>{
			if(lev>=t.LEVEL_NAMES.length)return;
			if(lev<t.getShowable())return;
			let src={Capt:t.getCaption(),Lev:lev,Msg:msg}
			if(prop)src.Prop=prop;
			t.format(src);
			t.write(src);
		},

		tick:(msg,prop=null)=>{t.put(t.LEVEL.TICK,msg,prop);},
		trace:(msg,prop=null)=>{t.put(t.LEVEL.TRACE,msg,prop);},
		debug:(msg,prop=null)=>{t.put(t.LEVEL.DEBUG,msg,prop);},
		info:(msg,prop=null)=>{t.put(t.LEVEL.INFO,msg,prop);},
		notice:(msg,prop=null)=>{t.put(t.LEVEL.NOTICE,msg,prop);},
		warn:(msg,prop=null)=>{t.put(t.LEVEL.WARN,msg,prop);},
		fatal:(msg,prop=null)=>{t.put(t.LEVEL.FATAL,msg,prop);},
		crit:(msg,prop=null)=>{t.put(t.LEVEL.CRIT,msg,prop);},
		alert:(msg,prop=null)=>{t.put(t.LEVEL.ALERT,msg,prop);},
		emerg:(msg,prop=null)=>{t.put(t.LEVEL.EMERG,msg,prop);},
	}
	return t;
}

YgEs.Log=_create_local();
YgEs.Log.name='YgEs_GlobalLogger';

})();

// Utilities ---------------------------- //
(()=>{ // local namespace 

const HapMng=YgEs.HapMng;

const _rx_zero=/^(0+(|\.)0*|0*(|\.)0+)$/;
const _rx_null=/^null$/i;
const _rx_false=/^false$/i;
const _rx_undefined=/^undefined$/i;

let Util=YgEs.Util={
	name:'YgEs_Utilities',
	User:{},

	createEnum:YgEs.createEnum,
	fromError:YgEs.fromError,
	justString:YgEs.justString,
	inspect:YgEs.inspect,

	isJustNaN:(val)=>{
		if(typeof val!=='number')return false;
		return isNaN(val);
	},

	isJustInfinity:(val)=>{
		if(val===Infinity)return true;
		if(val===-Infinity)return true;
		return false;
	},

	isEmpty:(val)=>{
		if(val===null)return true;
		if(val===undefined)return true;
		if(val==='')return true;
		return false;
	},

	isValid:(val)=>{
		if(val===null)return false;
		if(val===undefined)return false;
		if(Util.isJustNaN(val))return false;
		return true;
	},

	booleanize:(val,stringable=false)=>{
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

	trinarize:(val,stringable=false)=>{
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
		return Util.booleanize(val,stringable);
	},

	zerofill:(val,col,sgn=false)=>{
		let sf=val<0;
		if(sf)val=-val;

		let ss=sf?'-':sgn?'+':'';
		col-=ss.length;
		let vs=''+val;
		if(vs.length>=col)return ss+vs;

		vs='0'.repeat(col-1)+vs;
		return ss+vs.substring(vs.length-col);
	},

	safeStepIter:(bgn,end,step,cbiter)=>{

		let cnt=bgn;
		if(!step){
			// zero stride, do nothing 
			return cnt;
		}
		if(bgn==end)return cnt;

		if(step<0 != end-bgn<0){
			HapMng.happenProp({msg:'backward',bgn:bgn,end:end,step:step});
			return cnt;
		}

		let abort=false;
		for(;(step<0)?(cnt>end):(cnt<end);cnt+=step){
			if(abort)return cnt;
			((cnt_)=>{
				if(cbiter(cnt_)===false)abort=true;
			})(cnt);
		}

		return cnt;
	},

	safeArrayIter:(src,cbiter)=>{

		let abort=false;
		for(let t of src){
			if(abort)return;
			((t_)=>{
				if(cbiter(t_)===false)abort=true;
			})(t);
		}
	},

	safeDictIter:(src,cbiter)=>{

		let abort=false;
		for(let k in src){
			if(abort)return;
			((k_)=>{
				if(cbiter(k_,src[k_])===false)abort=true;
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

	fromPromise:(promise,cb_ok=null,cb_ng=null)=>{
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
	toPromise:(cb_proc,cb_done=null,cb_fail=null)=>{
		let p=new Promise((ok,ng)=>{
			cb_proc(ok,ng);
		}).then((r)=>{
			if(cb_done)cb_done(r);
			return r;
		}).catch((e)=>{
			if(cb_fail)cb_fail(e);
			else throw e;
		});
		return p;
	},

	delay:(ms,cb_done,cb_cancel=null)=>{

		let h=null;
		if(!cb_done)return ()=>{
			if(cb_cancel)cb_cancel();
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
			if(cb_cancel)cb_cancel();
		}
	},

	poll:(ms,cb_poll,cb_abort=null)=>{

		if(!cb_poll)return ()=>{
			if(cb_abort)cb_abort();
		};

		let cancel=null;
		let next=()=>{
			cancel=Timing.delay(ms,()=>{
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

	sync:(ms,cb_chk,cb_done,cb_abort=null)=>{

		if(!cb_chk)return ()=>{};
		if(!cb_done)return ()=>{};

		let cancel=null;
		if(cb_chk()){
			cb_done();
			return ()=>{};
		}

		cancel=Timing.poll(ms,()=>{
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

	delayKit:(ms,cb_done=null,cb_cancel=null)=>{
		let kit={}
		kit.promise=()=>Timing.toPromise((ok,ng)=>{
			kit.cancel=Timing.delay(ms,
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
	syncKit:(ms,cb_chk,cb_done=null,cb_abort=null)=>{
		let kit={}
		kit.promise=()=>Timing.toPromise((ok,ng)=>{
			kit.cancel=Timing.sync(ms,cb_chk,
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

function _yges_happening_default_happened(hap){
	Log.fatal(hap.getProp());	
}
function _yges_happening_default_abandoned(hap){
	Log.warn('* Abandoned * '+hap.toString());	
}
function _yges_happening_default_resolved(hap){
	Log.debug('* Resolved * '+hap.toString());	
}

function _yges_happening_create_happening(cbprop,cbstr,cberr,init={}){

	let cb_resolved=init.cb_resolved??_yges_happening_default_resolved;
	let cb_abandoned=init.cb_abandoned??_yges_happening_default_abandoned;

	let hap={
		name:init.name??'YgEs_Happening',
		resolved:false,
		abandoned:false,
		User:init.user??{},

		getProp:cbprop,
		toString:cbstr,
		toJSON:()=>JSON.stringify(hap.getProp()),
		toError:cberr,

		isResolved:()=>hap.resolved,
		resolve:()=>{
			if(hap.resolved)return;
			hap.resolved=true;
			hap.abandoned=false;
			if(cb_resolved)cb_resolved(hap);
		},

		isAbandoned:()=>hap.abandoned && !hap.resolved,
		abandon:()=>{
			if(hap.resolved)return;
			if(hap.abandoned)return;
			hap.abandoned=true;
			if(cb_abandoned)cb_abandoned(hap);
		},
	}
	return hap;
}

function _yges_happening_create_manager(prm,parent=null){

	let mng={
		name:prm.name??'YgEs_HappeningManager',
		issues:[],
		children:[],
		Happened:prm.happen??null,
		User:prm.user??{},

		createLocal:(prm={})=>_yges_happening_create_manager(prm,mng),

		abandon:()=>{
			for(let sub of mng.children){
				sub.abandon();
			}
			for(let hap of mng.issues){
				hap.abandon();
			}
			mng.issues=[]
		},

		countIssues:()=>{
			let ct=mng.issues.length;
			for(let sub of mng.children){
				ct+=sub.countIssues();
			}
			return ct;
		},
		isCleaned:()=>{
			if(mng.issues.length>0)return false;
			for(let sub of mng.children){
				if(!sub.isCleaned())return false;
			}
			return true;
		},
		cleanup:()=>{
			let tmp=[]
			for(let hap of mng.issues){
				if(!hap.resolved)tmp.push(hap);
			}
			mng.issues=tmp;

			for(let sub of mng.children){
				sub.cleanup();
			}
		},

		getInfo:()=>{
			let info={name:mng.name,issues:[],children:[]}
			for(let hap of mng.issues){
				if(hap.resolved)continue;
				info.issues.push({name:hap.name,prop:hap.getProp()});
			}
			for(let sub of mng.children){
				let si=sub.getInfo();
				if(si.issues.length>0 || si.children.length>0)info.children.push(si);
			}
			return info;
		},

		poll:(cb)=>{
			if(!cb)return;
			for(let hap of mng.issues){
				if(hap.resolved)continue;
				if(hap.abandoned)continue;
				cb(hap);
			}
			for(let sub of mng.children){
				sub.poll(cb);
			}
		},

		_callHappened:(hap)=>{
			if(mng.Happened)mng.Happened(hap);
			else if(parent)parent._callHappened(hap);
			else _yges_happening_default_happened(hap);
		},
		happen:(hap)=>{
			mng.issues.push(hap);
			mng._callHappened(hap);
			return hap;
		},
		happenMsg:(msg,init={})=>{
			return mng.happen(_yges_happening_create_happening(
				()=>{return {msg:''+msg}},
				()=>''+msg,
				()=>new Error(msg),
				init
			));
		},

		happenProp:(prop,init={})=>{
			return mng.happen(_yges_happening_create_happening(
				()=>prop,
				()=>JSON.stringify(prop),
				()=>new Error(JSON.stringify(prop)),
				init
			));
		},

		happenError:(err,init={})=>{
			return mng.happen(_yges_happening_create_happening(
				()=>{return YgEs.fromError(err)},
				()=>''+err,
				()=>err,
				init
			));
		},
	}
	if(parent)parent.children.push(mng);
	return mng;
}

YgEs.HappeningManager=_yges_happening_create_manager('YgEs_GlobalHappeningManager');

})();

// Async Procedure Engine --------------- //
(()=>{ // local namespace 

const HappeningManager=YgEs.HappeningManager;
const Log=YgEs.Log;
const Timing=YgEs.Timing;

const DEFAULT_ROOT_CYCLE=20;
const DEFAULT_LAUNCHER_CYCLE=20;
const DEFAULT_SYNC_CYCLE=10;
const CLASS_PROC='YgEs_Procedure';
const CLASS_LAUNCHER='YgEs_Launcher';
const CLASS_LAUNCHERPROC='YgEs_LauncherProc';
const CLASS_DELAYPROC='YgEs_DelayProc';
const CLASS_ROOT='YgEs_RootLauncher';

function _create_proc(prm){

	let cb_start=prm.cb_start??null;
	let cb_poll=prm.cb_poll;
	let cb_done=prm.cb_done??null;
	let cb_abort=prm.cb_abort??null;

	let started=false;
	let finished=false;
	let aborted=false;

	let proc={
		name:prm.name??CLASS_PROC,
		HappenTo:(prm.happen??HappeningManager).createLocal(),
		User:prm.user??{},

		isStarted:()=>started,
		isFinished:()=>finished,
		isAborted:()=>aborted,
		isEnd:()=>finished||aborted,

		_start:()=>{
			if(started)return;
			if(proc.isEnd())return;
			started=true;
			if(cb_start){
				try{
					cb_start(proc.User);
				}
				catch(e){
					proc.HappenTo.happenProp({
						class:CLASS_PROC,
						cause:'throw from start',
						src:proc,
						err:YgEs.fromError(e),
					});
					proc.abort();
				}
			}
		},
		abort:()=>{
			if(proc.isEnd())return;
			aborted=true;
			if(cb_abort){
				try{
					cb_abort(proc.User);
				}
				catch(e){
					proc.HappenTo.happenProp({
						class:CLASS_PROC,
						cause:'throw from abort',
						src:proc,
						err:YgEs.fromError(e),
					});
				}
			}
			else{
				proc.HappenTo.happenProp({
					class:CLASS_PROC,
					cause:'abort',
					src:proc,
				});
			}
		},
		poll:()=>{
			if(proc.isEnd())return false;
			try{
				if(cb_poll(proc.User))return true;
			}
			catch(e){
				proc.HappenTo.happenProp({
					class:CLASS_PROC,
					cause:'throw from poll',
					src:proc,
					err:YgEs.fromError(e),
				});
				proc.abort();
				return false;
			}
			if(cb_done){
				try{
					cb_done(proc.User);
					finished=true;
				}
				catch(e){
					proc.HappenTo.happenProp({
						class:CLASS_PROC,
						cause:'throw from done',
						src:proc,
						err:YgEs.fromError(e),
					});
					proc.abort();
					return false;
				}
			}
			else{
				finished=true;
			}
			return false;
		},

		sync:(cb_sync,interval=null)=>{
			if(!cb_sync){
				proc.HappenTo.happenProp({
					class:CLASS_LAUNCHER,
					cause:'empty callback from sync',
				});
				return;
			}
			if(interval===null)interval=DEFAULT_SYNC_CYCLE;
			Timing.sync(interval,
				()=>{return proc.isEnd();},
				()=>{
					try{
						cb_sync(proc.User);
					}
					catch(e){
						proc.HappenTo.happenProp({
							class:CLASS_PROC,
							cause:'throw from sync',
							src:proc,
							err:YgEs.fromError(e),
						});
					}
				},
			);
		},
		toPromise:(breakable,interval=null)=>{
			return Timing.toPromise((ok,ng)=>{
				proc.sync(()=>{
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

	let lnc={
		name:prm.name??CLASS_LAUNCHER,
		HappenTo:(prm.happen??HappeningManager).createLocal(),
		Limit:prm.limit??-1,
		Cycle:prm.cycle??DEFAULT_LAUNCHER_CYCLE,
		User:prm.user??{},

		_sub:[],
		_launch:[],
		_active:[],

		isEnd:()=>{
			if(lnc._launch.length>0)return false;
			if(lnc._active.length>0)return false;
			for(let sub of lnc._sub){
				if(!sub.isEnd())return false;
			}
			return true;
		},
		isAbandoned:()=>abandoned,
		countActive:()=>{
			let n=lnc._active.length
			for(let sub of lnc._sub)n+=sub.countActive();
			return n;
		},
		countHeld:()=>{
			let n=lnc._launch.length
			for(let sub of lnc._sub)n+=sub.countHeld();
			return n;
		},

		abandon:()=>{
			abandoned=true;
			lnc.abort();
		},

		createLauncher:(prm={})=>{
			let sub=_yges_enginge_create_launcher(prm);
			lnc._sub.push(sub);
			return sub;
		},

		launch:(prm={})=>{
			if(Engine.isAbandoned()){
				lnc.HappenTo.happenMsg('the Engine was abandoned, no longer launch new procedures.');
				return;
			}
			if(!_working){
				Log.notice('the Engine not startted. call start() to run.');
			}
			if(abandoned){
				if(prm.cb_abort)prm.cb_abort();
				return;
			}
			if(!prm.cb_poll){
				lnc.HappenTo.happenProp({
					class:CLASS_LAUNCHER,
					cause:'empty pollee',
				});
				return;
			}

			let proc=_create_proc(prm);
			if(lnc.Limit<0 || lnc._active.length<lnc.Limit){
				lnc._active.push(proc);
				proc._start();
			}
			else{
				lnc._launch.push(proc);
			}
			return proc;
		},
		abort:()=>{
			if(lnc.isEnd())return;
			aborted=true;
			for(let sub of lnc._sub)sub.abort();
			lnc._sub=[]
			for(let proc of lnc._launch)proc.abort();
			lnc._launch=[]
			for(let proc of lnc._active)proc.abort();
			lnc._active=[]
		},
		poll:()=>{
			for(let sub of lnc._sub){
				sub.poll();
			}

			let cont=[]
			for(let proc of lnc._active){
				if(proc.poll())cont.push(proc);
			}
			lnc._active=cont;

			if(lnc.Limit<0 || lnc._active.length<lnc.Limit){
				let hold=[]
				for(let proc of lnc._launch){
					if(lnc.Limit>=0 && lnc._active.length>=lnc.Limit)hold.push(proc);
					else{
						proc._start();
						lnc._active.push(proc);
					}
				}
				lnc._launch=hold;
			}
		},

		sync:(cb_sync,interval=null)=>{
			if(!cb_sync){
				lnc.HappenTo.happenProp({
					class:CLASS_LAUNCHER,
					cause:'empty callback from sync',
				});
				return;
			}
			if(interval===null)interval=DEFAULT_SYNC_CYCLE;
			Timing.sync(interval,
				()=>{
					lnc.poll();
					return lnc.isEnd();
				},
				()=>{
					try{
						cb_sync(lnc.User);
					}
					catch(e){
						lnc.HappenTo.happenProp({
							class:CLASS_PROC,
							cause:'throw from sync',
							src:lnc,
							err:YgEs.fromError(e),
						});
					}
				}
			);
		},

		toPromise:(breakable,interval=null)=>{
			return Timing.toPromise((ok,ng)=>{
				lnc.sync(()=>{
					if(breakable || !aborted)ok(lnc.User);
					else ng(new Error('abort',{cause:lnc.User}));
				},interval);
			});
		},

		delay:(time,cb_done,cb_abort=null)=>{
			let until=new Date(Date.now()+time);
			return lnc.launch({
					name:CLASS_DELAYPROC,
					cb_poll:(user)=>{
						return Date.now()<until;
					},
					cb_done:cb_done,
					cb_abort:cb_abort??cb_done,
				});
		},
	}
	return lnc;
}

let Engine=YgEs.Engine=_yges_enginge_create_launcher({
	name:CLASS_ROOT,
	cycle:DEFAULT_ROOT_CYCLE,
});

let _working=false;
let _cancel=null;

function _poll_engine(){

	if(!_working)return;
	if(Engine.isAbandoned())return;

	Engine.poll();

	_cancel=Timing.delay(Engine.Cycle,()=>{
		_cancel=null;
		_poll_engine();
	});
}

function _stop(){

	_working=false;
	if(_cancel!=null)_cancel();
}

YgEs.Engine.start=()=>{

	if(Engine.isAbandoned())return;
	if(_working)return;
	_working=true;
	_poll_engine();
}

YgEs.Engine.stop=()=>{

	_stop();
	if(Engine.isAbandoned())return;
	Engine.abort();
}

YgEs.Engine.shutdown=()=>{
	Engine.abandon();
	_stop();
}

})();

// Quick HyperText for web -------------- //
(()=>{ // local namespace 

YgEs.toQHT=(el)=>{

	let qht={
		name:'YgEs_QuickHyperText',
		User:{},
		Element:el,

		remove:()=>{
			qht.Element.remove();
			qht.Element=null;
		},
		clear:()=>{
			if(!qht.Element)return;
			qht.Element.innerHTML='';
		},
		append:(src)=>{
			if(!qht.Element)return;
			if(src==null)return;
			if(typeof src==='object')qht.Element.append(src);
			else qht.Element.innerHTML+=src;
		},
		replace:(src)=>{
			if(!qht.Element)return;
			qht.Element.innerHTML='';
			qht.append(src);
		},
	}
	return qht;
}

YgEs.newQHT=(prm)=>{

	if(!prm.tag)return null;

	let el=document.createElement(prm.tag);

	if(prm.attr){
		for(let k in prm.attr){
			el.setAttribute(k,prm.attr[k]);
		}
	}
	if(prm.style){
		for(let k in prm.style){
			el.style[k]=prm.style[k];
		}
	}
	if(prm.sub){
		for(let t of prm.sub){
			if(t===null){}
			else if(typeof t==='object')el.append(t);
			else el.innerHTML+=t;
		}
	}
	if(prm.target)prm.target.append(el);

	return YgEs.toQHT(el);
}

})();

// Low Level HTTP for web --------------- //
(()=>{ // local namespace 

YgEs.HTTPClient={
	name:'YgEs_HTTP',
	User:{},
}

function _yges_http_retry(ctx,hap){
	hap.resolve();
	return ctx.retry();
}

YgEs.HTTPClient.request=(method,url,opt,cbres=null,cbok=null,cbng=null)=>{

	var req=new XMLHttpRequest();
	var ctx={
		name:'YgEs_HTTP_Request',
		User:{},
		url:url,
		opt:opt,
		accepted:false,
		end:false,
		send_progress:0.0,
		recv_progress:0.0,
		progress:0.0,
		req:req,
		abort:()=>{
			req.abort();
		},
		retry:()=>{
			return YgEs.HTTPClient.request(method,url,opt,cbres,cbok,cbng);
		},
	}
	var res={
		status:0,
		msg:'',
		timeout:false,
		data:null,
	}

	var happen=opt.happen??YgEs.HappeningManager;

	var sendratio=opt.sendratio??0.0;
	if(sendratio<0.0)sendratio=0.0;
	else if(sendratio>1.0)sendratio=1.0;

	req.addEventListener('loadstart',(ev)=>{
		ctx.accepted=true;
		ctx.send_progress=1.0;
		ctx.progress=sendratio;
	});
	req.addEventListener('progress',(ev)=>{
		if(!ev.lengthComputable)return;
		if(ev.total<1)return;
		ctx.recv_progress=ev.loaded/ev.total;
		ctx.progress=sendratio+((1.0-sendratio)*ctx.recv_progress);
	});
	req.addEventListener('load',(ev)=>{
		if(ctx.end)return;
		ctx.end=true;
		ctx.recv_progress=1.0;
		res.status=req.status;
		res.msg=req.statusText;
		res.body=req.response;
		res.head={}
		if(opt.refhead){
			for(var k of opt.refhead){
				res.head[k]=req.getResponseHeader(k);
			}
		}

		if(opt.cbgate){
			try{
				var r=opt.cbgate(res);
				if(r)cbres=r;
			}
			catch(e){
				var hap=happen.happenError(e,{
					name:'YgEs_HTTP_Error',
					user:{retry:()=>_yges_http_retry(ctx,hap)},
				});
				if(cbng)cbng(hap);
				return;
			}
		}
		else if(res.status>299){
			var hap=happen.happenProp(res,{
				name:'YgEs_HTTP_Bad',
				user:{retry:()=>_yges_http_retry(ctx,hap)},
			});
			if(cbng)cbng(hap);
			return;
		}

		if(cbres){
			var r=null;
			var e=null;
			try{
				r=cbres(res);
			}
			catch(exc){
				e=exc;
				r=null;
			}

			if(e){
				var hap=happen.happenError(e,{
					name:'YgEs_HTTP_Error',
					user:{retry:()=>_yges_http_retry(ctx,hap)},
				});
				if(cbng)cbng(hap);
			}
			else if(r===null){
				var hap=happen.happenProp({
					name:'YgEs_HTTP_Invalid',
					msg:'invalid response:',
					res:req.response,
					user:{retry:()=>_yges_http_retry(ctx,hap)},
				});
				if(cbng)cbng(hap);
			}
			else{
				if(cbok)cbok(r);
			}
		}
		else{
			if(cbok)cbok(res.body);
		}
	});
	req.addEventListener('error',(ev)=>{
		if(ctx.end)return;
		ctx.end=true;
		res.msg='HTTP request error';
		if(cbng)cbng(error_msg(res.msg));
		else log_fatal(res.msg);
	});
	req.addEventListener('timeout',(ev)=>{
		if(ctx.end)return;
		ctx.end=true;
		res.timeout=true;
		res.msg='HTTP timeout';
		if(cbng)cbng(error_msg(res.msg));
		else log_fatal(res.msg);
	});
	req.addEventListener('abort',(ev)=>{
		if(ctx.end)return;
		ctx.end=true;
		res.msg='aborted';
		if(cbng)cbng(error_msg(res.msg));
		else log_notice(res.msg);
	});

	if(opt.restype)req.responseType=opt.restype;
	if(opt.timeout)req.timeout=opt.timeout;
	if(opt.header){
		for(var k in opt.header){
			req.setRequestHeader(k,opt.header[k]);
		}
	}

	if(opt.body){
		req.upload.addEventListener('progress',(ev)=>{
			if(ctx.end)return;
			if(ev.total<1)return;
			ctx.send_progress=ev.loaded/ev.total;
			ctx.progress=sendratio*ctx.send_progress;
		});
	}

	req.open(method,url);
	if(opt.body){
		if(opt.type)req.setRequestHeader('Content-Type',opt.type);
		req.send(opt.body);
	}
	else req.send();

	return ctx;
}

YgEs.HTTPClient.getText=(url,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('GET',url,opt,
	(res)=>{
		if(res.status!=200)return null;
		return res.body;
	},cbok,cbng);
}

YgEs.HTTPClient.getBlob=(url,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('GET',url,Object.assign({
		restype:'blob',
	},opt),
	(res)=>{
		if(res.status!=200)return null;
		return res.body;
	},cbok,cbng);
}

YgEs.HTTPClient.getBuf=(url,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('GET',url,Object.assign({
		restype:'arraybuffer',
	},opt),
	(res)=>{
		if(res.status!=200)return null;
		return res.body;
	},cbok,cbng);
}

YgEs.HTTPClient.getJSON=(url,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('GET',url,opt,
	(res)=>{
		if(res.status!=200)return null;
		return JSON.parse(res.body);
	},cbok,cbng);
}

YgEs.HTTPClient.getXML=(url,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('GET',url,opt,
	(res)=>{
		if(res.status!=200)return null;
		var psr=new DOMParser();
		return psr.parseFromString(res.body,"text/xml");
	},cbok,cbng);
}

YgEs.HTTPClient.postText=(url,text,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('POST',url,Object.assign({
		headers:{'Content-Type':'text/plain'},
		body:text,
		sendratio:0.99,
	},opt),
	(res)=>{
		return res.body;
	},cbok,cbng);
}

YgEs.HTTPClient.postJSON=(url,data,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('POST',url,Object.assign({
		headers:{'Content-Type':'application/json'},
		body:JSON.stringify(data),
		sendratio:0.99,
	},opt),
	(res)=>{
		return res.body;
	},cbok,cbng);
}

YgEs.HTTPClient.postFile=(url,bin,file,cbok=null,cbng=null,opt={})=>{

	readfile(bin,file,(name,data)=>{
		return YgEs.HTTPClient.request('POST',url,Object.assign({
			type:file.type?file.type:'application/octet-stream',
			body:data,
			sendratio:0.99,
		},opt),
		(res)=>{
			return res.body;
		},cbok,cbng);
	},cbng);
}

YgEs.HTTPClient.delete=(url,cbok=null,cbng=null,opt={})=>{

	return YgEs.HTTPClient.request('DELETE',url,opt,
	(res)=>{
		return res.body;
	},cbok,cbng);
}

})();

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
