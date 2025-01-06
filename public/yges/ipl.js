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

	let ll={}
	for(let i=0;i<src.length;++i)ll[src[i]]=i;
	return Object.freeze(ll);
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
const _level_lookup=YgEs.createEnum(_level_names.concat(['NEVER']));

// default settings 
const _default_showable=_level_lookup.INFO;

function _default_format(src){

	switch(typeof src.Msg){
		case 'function': src.Msg=src.Msg(); break;
		case 'object': src.Msg=YgEs.inspect(src.Msg); break;
	}

	let lev=_level_names[src.Lev]??('?'+src.Lev+'?');
	let capt=src.Capt?('{'+src.Capt+'} '):'';
	src.Msg=src.Date+': ['+lev+'] '+capt+src.Msg;
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
			let src={
				Date:new Date().toISOString(),
				Capt:t.getCaption(),
				Lev:lev,
				Msg:msg
			}
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

const Log=YgEs.Log=_create_local();
YgEs.Log.name='YgEs_GlobalLogger';

})();

// Utilities ---------------------------- //
(()=>{ // local namespace 

const _rx_zero=/^(0+(|\.)0*|0*(|\.)0+)$/;
const _rx_null=/^null$/i;
const _rx_false=/^false$/i;
const _rx_undefined=/^undefined$/i;

let Util=YgEs.Util={
	name:'YgEs_Utilities',
	User:{},

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
	toPromise:(cb_proc,cb_ok=null,cb_ng=null)=>{
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

	delay:(ms,cb_done,cb_abort=null)=>{

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

function _default_happened(hap){
	Log.fatal(hap.toString(),hap.getProp());	
}
function _default_abandoned(hap){
	Log.warn('* Abandoned * '+hap.toString(),hap.getProp());	
}
function _default_resolved(hap){
	Log.debug('* Resolved * '+hap.toString(),hap.getProp());	
}

function _create_happening(cbprop,cbstr,cberr,init={}){

	let resolved=false;
	let abandoned=false;
	let cb_resolved=init.cb_resolved??_default_resolved;
	let cb_abandoned=init.cb_abandoned??_default_abandoned;

	let hap={
		name:init.name??'YgEs_Happening',
		User:init.user??{},

		getProp:cbprop,
		toString:cbstr,
		toJSON:()=>JSON.stringify(hap.getProp()),
		toError:cberr,

		isResolved:()=>resolved,
		resolve:()=>{
			if(resolved)return;
			resolved=true;
			abandoned=false;
			if(cb_resolved)cb_resolved(hap);
		},

		isAbandoned:()=>abandoned && !resolved,
		abandon:()=>{
			if(resolved)return;
			if(abandoned)return;
			abandoned=true;
			if(cb_abandoned)cb_abandoned(hap);
		},
	}
	return hap;
}

function _create_manager(prm,parent=null){

	let issues=[]
	let children=[]

	let mng={
		name:prm.name??'YgEs_HappeningManager',
		Happened:prm.happen??null,
		User:prm.user??{},

		createLocal:(prm={})=>{
			let cm=_create_manager(prm,mng);
			children.push(cm);
			return cm;
		},

		getParent:()=>parent,
		getChildren:()=>children,
		getIssues:()=>issues,

		abandon:()=>{
			for(let sub of children){
				sub.abandon();
			}
			for(let hap of issues){
				hap.abandon();
			}
			issues=[]
		},

		countIssues:()=>{
			let ct=issues.length;
			for(let sub of children){
				ct+=sub.countIssues();
			}
			return ct;
		},
		isCleaned:()=>{
			if(issues.length>0)return false;
			for(let sub of children){
				if(!sub.isCleaned())return false;
			}
			return true;
		},
		cleanup:()=>{
			let tmp=[]
			for(let hap of issues){
				if(!hap.isResolved())tmp.push(hap);
			}
			issues=tmp;

			for(let sub of children){
				sub.cleanup();
			}
		},

		getInfo:()=>{
			let info={name:mng.name,_issues:[],_children:[]}
			for(let hap of issues){
				if(hap.isResolved())continue;
				info._issues.push({name:hap.name,prop:hap.getProp()});
			}
			for(let sub of children){
				let si=sub.getInfo();
				if(si._issues.length>0 || si._children.length>0)info._children.push(si);
			}
			return info;
		},

		poll:(cb)=>{
			if(!cb)return;
			for(let hap of issues){
				if(hap.isResolved())continue;
				if(hap.isAbandoned())continue;
				cb(hap);
			}
			for(let sub of children){
				sub.poll(cb);
			}
		},

		_callHappened:(hap)=>{
			if(mng.Happened)mng.Happened(hap);
			else if(parent)parent._callHappened(hap);
			else _default_happened(hap);
		},
		happen:(hap)=>{
			issues.push(hap);
			mng._callHappened(hap);
			return hap;
		},
		happenMsg:(msg,init={})=>{
			return mng.happen(_create_happening(
				()=>{return {msg:''+msg}},
				()=>''+msg,
				()=>new Error(msg),
				init
			));
		},

		happenProp:(prop,init={})=>{
			return mng.happen(_create_happening(
				()=>prop,
				()=>JSON.stringify(prop),
				()=>new Error(JSON.stringify(prop)),
				init
			));
		},

		happenError:(err,init={})=>{
			return mng.happen(_create_happening(
				()=>{return YgEs.fromError(err)},
				()=>''+err,
				()=>err,
				init
			));
		},
	}
	return mng;
}

YgEs.HappeningManager=_create_manager('YgEs_GlobalHappeningManager');

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

	let sublauncher=[]
	let launched=[]
	let active=[]

	let lnc={
		name:prm.name??CLASS_LAUNCHER,
		HappenTo:(prm.happen??HappeningManager).createLocal(),
		Limit:prm.limit??-1,
		Cycle:prm.cycle??DEFAULT_LAUNCHER_CYCLE,
		User:prm.user??{},

		isEnd:()=>{
			if(launched.length>0)return false;
			if(active.length>0)return false;
			for(let sub of sublauncher){
				if(!sub.isEnd())return false;
			}
			return true;
		},
		isAbandoned:()=>abandoned,
		countActive:()=>{
			let n=active.length
			for(let sub of sublauncher)n+=sub.countActive();
			return n;
		},
		countHeld:()=>{
			let n=launched.length
			for(let sub of sublauncher)n+=sub.countHeld();
			return n;
		},

		abandon:()=>{
			abandoned=true;
			lnc.abort();
		},

		createLauncher:(prm={})=>{
			let sub=_yges_enginge_create_launcher(prm);
			sublauncher.push(sub);
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
			if(lnc.Limit<0 || active.length<lnc.Limit){
				active.push(proc);
				proc._start();
			}
			else{
				launched.push(proc);
			}
			return proc;
		},
		abort:()=>{
			if(lnc.isEnd())return;
			aborted=true;
			for(let sub of sublauncher)sub.abort();
			sublauncher=[]
			for(let proc of launched)proc.abort();
			launched=[]
			for(let proc of active)proc.abort();
			active=[]
		},
		poll:()=>{
			for(let sub of sublauncher){
				sub.poll();
			}

			let cont=[]
			for(let proc of active){
				if(proc.poll())cont.push(proc);
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

// Statemachine ------------------------- //
(()=>{ // local namespace 

const Engine=YgEs.Engine;
const HappeningManager=YgEs.HappeningManager;

function _run(start,states={},opt={}){

	let launcher=opt.launcher??YgEs.Engine;
	let cur=null;

	let name=opt.name??'YgEs_Statemachine';
	let happen=opt.happen??HappeningManager;
	let user=opt.user??{};

	let state_prev=null;
	let state_cur=null;
	let state_next=start;

	let ctrl={
		name:name+'_Control',
		User:{},
		getHappeningManager:()=>happen,
		getPrevState:()=>state_prev,
		getCurState:()=>state_cur,
		getNextState:()=>state_next,
	}

	let getInfo=(phase)=>{
		return {
			name:name,
			prev:state_prev,
			cur:state_cur,
			next:state_next,
			phase:phase,
			ctrl:ctrl.User,
			user:user,
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
			stmac.happen.happenProp({
				class:'YgEs_Statemachine_Error',
				cause:'state missing: '+state_next,
				info:getInfo('selecing'),
			});
			poll_cur=poll_nop;
			return;
		}
		state_prev=state_cur;
		state_cur=state_next;
		state_next=null;
		try{
			if(cur.cb_start)cur.cb_start(ctrl,user);
			poll_cur=poll_up;
		}
		catch(e){
			stmac.happen.happenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:getInfo('cb_start'),
				err:YgEs.fromError(e),
			});
			poll_cur=poll_nop;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_up=(user)=>{
		try{
			var r=cur.poll_up?cur.poll_up(ctrl,user):true;
		}
		catch(e){
			stmac.happen.happenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:getInfo('poll_up'),
				err:YgEs.fromError(e),
			});
			r=false;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.abort();
		else if(r===true){
			try{
				// normal transition 
				if(cur.cb_ready)cur.cb_ready(ctrl,user);
				poll_cur=poll_keep;
			}
			catch(e){
				stmac.happen.happenProp({
					class:'YgEs_Statemachine_Error',
					cause:'throw from a callback',
					info:getInfo('cb_ready'),
					err:YgEs.fromError(e),
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
			var r=cur.poll_keep?cur.poll_keep(ctrl,user):true;
		}
		catch(e){
			stmac.happen.happenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:getInfo('poll_keep'),
				err:YgEs.fromError(e),
			});
			r=false;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.abort();
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
			if(cur.cb_stop)cur.cb_stop(ctrl,user);
			poll_cur=poll_down;
		}
		catch(e){
			stmac.happen.happenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:getInfo('cb_stop'),
				err:YgEs.fromError(e),
			});
			poll_cur=poll_nop;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_down=(user)=>{
		try{
			var r=cur.poll_down?cur.poll_down(ctrl,user):true;
		}
		catch(e){
			stmac.happen.happenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:getInfo('poll_down'),
				err:YgEs.fromError(e),
			});
			r=false;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.abort();
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
			if(cur.cb_end)cur.cb_end(ctrl,user);
			call_start(user);
		}
		catch(e){
			stmac.happen.happenProp({
				class:'YgEs_Statemachine_Error',
				cause:'throw from a callback',
				info:getInfo('cb_end'),
				err:YgEs.fromError(e),
			});
			poll_cur=poll_nop;
		}
	}

	let stmac={
		name:name,
		happen:happen,
		user:user,

		cb_start:(user)=>{
			call_start(user);
		},
		cb_poll:(user)=>{
			poll_cur(user);
			return !!cur;
		},
		cb_done:opt.cb_done??'',
		cb_abort:opt.cb_abort??'',
	}

	let proc=launcher.launch(stmac);
	ctrl.isStarted=proc.isStarted;
	ctrl.isFinished=proc.isFinished;
	ctrl.isAborted=proc.isAborted;
	ctrl.isEnd=proc.isEnd;
	ctrl.abort=proc.abort;
	ctrl.sync=proc.sync;
	ctrl.toPromise=proc.toPromise;
	return ctrl;
}

YgEs.StateMachine={
	name:'YgEs_StateMachineContainer',
	User:{},

	run:_run,
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

	let name=prm.name??'YgEs_Agent';
	let happen=prm.happen??HappeningManager.createLocal();
	let launcher=prm.launcher??Engine.createLauncher();
	let user=prm.user??{};

	let getInfo=(phase)=>{
		return {
			name:name,
			phase:phase,
			state:ctrl?ctrl.getCurState():'NONE',
			wait:wait,
			user:user,
		}
	}

	let states={
		'IDLE':{
			poll_keep:(ctrl,user)=>{
				if(opencount<1)return true;
				restart=false;

				happen.cleanup();
				return happen.isCleaned()?'UP':'REPAIR';
			},
		},
		'BROKEN':{
			poll_keep:(ctrl,user)=>{
				if(opencount<1)return true;
				restart=false;

				return 'REPAIR';
			},
		},
		'REPAIR':{
			cb_start:(ctrl,user)=>{

				try{
					//start repairing 
					wait=[]
					if(prm.cb_repair)prm.cb_repair(agent);
				}
				catch(e){
					happen.happenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:getInfo('cb_repair'),
						err:YgEs.fromError(e),
					});
				}
			},
			poll_keep:(ctrl,user)=>{
				if(opencount<1){
					happen.cleanup();
					return happen.isCleaned()?'IDLE':'BROKEN';
				}

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d())continue;
						cont.push(d);
					}
					catch(e){
						happen.happenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:getInfo('wait for repair'),
							err:YgEs.fromError(e),
						});
					}
				}
				wait=cont;
				if(wait.length>0)return;

				// wait for all happens resolved 
				happen.cleanup();
				if(happen.isCleaned())return 'UP';
			},
		},
		'DOWN':{
			cb_start:(ctrl,user)=>{
				try{
					wait=[]

					// down dependencles too 
					if(prm.dependencies){
						Util.safeDictIter(prm.dependencies,(k,h)=>{
							h.close();
						});
					}

					if(ctrl.getPrevState()=='UP'){
						if(prm.cb_back)prm.cb_back(agent);
					}
					else{
						if(prm.cb_close)prm.cb_close(agent);
					}
				}
				catch(e){
					happen.happenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:getInfo('cb_close'),
						err:YgEs.fromError(e),
					});
				}
			},
			poll_keep:(ctrl,user)=>{

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d())continue;
						cont.push(d);
					}
					catch(e){
						happen.happenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:getInfo('wait for down'),
							err:YgEs.fromError(e),
						});
					}
				}
				wait=cont;
				if(wait.length>0)return null;
				happen.cleanup();
				return happen.isCleaned()?'IDLE':'BROKEN';
			},
		},
		'UP':{
			cb_start:(ctrl,user)=>{
				try{
					wait=[]
					if(prm.cb_open)prm.cb_open(agent);

					// up dependencles too 
					if(prm.dependencies){
						Util.safeDictIter(prm.dependencies,(k,h)=>{
							h.open();
							wait.push(()=>h.isReady());
						});
					}
				}
				catch(e){
					happen.happenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:getInfo('cb_open'),
						err:YgEs.fromError(e),
					});
				}
			},
			poll_keep:(user)=>{
				if(opencount<1 || restart)return 'DOWN';

				// wait for delendencies 
				let cont=[]
				for(let d of wait){
					try{
						if(d())continue;
						cont.push(d);
					}
					catch(e){
						happen.happenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:getInfo('wait for up'),
							err:YgEs.fromError(e),
						});
					}
				}
				wait=cont;
				if(!happen.isCleaned())return 'DOWN';
				if(wait.length<1)return 'HEALTHY';
			},
			cb_end:(ctrl,user)=>{
				if(ctrl.getNextState()=='HEALTHY'){
					try{
						// mark ready before callback 
						ready=true;
						if(prm.cb_ready)prm.cb_ready(agent);
					}
					catch(e){
						happen.happenProp({
							class:'YgEs_Agent_Error',
							cause:'throw from a callback',
							src:getInfo('cb_ready'),
							err:YgEs.fromError(e),
						});
					}
				}
			},
		},
		'HEALTHY':{
			poll_keep:(ctrl,user)=>{
				if(opencount<1 || restart){
					ready=false;
					return 'DOWN';
				}
				if(!happen.isCleaned())return 'TROUBLE';

				try{
					if(prm.poll_healthy)prm.poll_healthy(agent);
				}
				catch(e){
					happen.happenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:getInfo('poll_healthy'),
						err:YgEs.fromError(e),
					});
					return 'TROUBLE';
				}
			},
		},
		'TROUBLE':{
			poll_keep:(ctrl,user)=>{
				if(opencount<1 || restart){
					ready=false;
					return 'DOWN';
				}
				happen.cleanup();
				if(happen.isCleaned())return 'HEALTHY';

				try{
					if(prm.poll_trouble)prm.poll_trouble(agent);
				}
				catch(e){
					happen.happenProp({
						class:'YgEs_Agent_Error',
						cause:'throw from a callback',
						src:getInfo('poll_trouble'),
						err:YgEs.fromError(e),
					});
				}
				if(!happen.isCleaned())return 'HALT';
			},
		},
		'HALT':{
			cb_start:(ctrl,user)=>{
				halt=true;
			},
			poll_keep:(ctrl,user)=>{
				if(opencount<1 || restart){
					ready=false;
					return 'DOWN';
				}
				happen.cleanup();
				if(happen.isCleaned())return 'HEALTHY';
			},
			cb_end:(ctrl,user)=>{
				halt=false;
			},
		},
	}

	let agent={
		name:name,
		User:user,

		isOpen:()=>opencount>0,
		isBusy:()=>!!ctrl || opencount>0,
		isReady:()=>ready && opencount>0,
		isHalt:()=>halt,
		getState:()=>ctrl?ctrl.getCurState():'NONE',

		getLauncher:()=>{return launcher;},
		getHappeningManager:()=>{return happen;},
		getDependencies:()=>{return prm.dependencies;},

		waitFor:(cb)=>{wait.push(cb)},
		restart:()=>{restart=true;},

		fetch:()=>{
			return handle(agent);
		},
		open:()=>{
			let h=agent.fetch();
			h.open();
			return h;
		},
	}

	let ctrlopt={
		name:name+'_Control',
		happen:happen,
		launcher:launcher,
		User:user,
		cb_done:(user)=>{
			ctrl=null;
			aborted=false;
			if(prm.cb_finish)prm.cb_finish(agent,happen.isCleaned());
		},
		cb_abort:(user)=>{
			ctrl=null;
			aborted=true;
			if(prm.cb_abort)prm.cb_abort(agent);
		},
	}

	let handle=(w)=>{
		let in_open=false;
		let h={
			name:name+'_Handle',

			getAgent:()=>{return agent;},
			getLauncher:()=>agent.getLauncher(),
			getHappeningManager:()=>agent.getHappeningManager(),
			getDependencies:()=>agent.getDependencies(),

			isOpenHandle:()=>in_open,
			isOpenAgent:()=>agent.isOpen(),
			isBusy:()=>agent.isBusy(),
			isReady:()=>agent.isReady(),
			isHalt:()=>agent.isHalt(),
			getState:()=>agent.getState(),

			restart:()=>agent.restart(),

			open:()=>{
				if(!in_open){
					in_open=true;
					++opencount;
				}
				if(!ctrl)ctrl=StateMachine.run('IDLE',states,ctrlopt);
			},
			close:()=>{
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
	name:'YgEs_AgentManager',
	User:{},

	standby:_standby,
	launch:(prm)=>{return _standby(prm).fetch();},
	run:(prm)=>{return _standby(prm).open();},
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

function _retry(ctx,hap){
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
		ok:false,
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
					user:{retry:()=>_retry(ctx,hap)},
				});
				if(cbng)cbng(hap);
				return;
			}
		}
		else if(res.status>299){
			var hap=happen.happenProp(res,{
				name:'YgEs_HTTP_Bad',
				user:{retry:()=>_retry(ctx,hap)},
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
					user:{retry:()=>_retry(ctx,hap)},
				});
				if(cbng)cbng(hap);
			}
			else if(r===null){
				var hap=happen.happenProp({
					name:'YgEs_HTTP_Invalid',
					msg:'invalid response:',
					res:req.response,
					user:{retry:()=>_retry(ctx,hap)},
				});
				if(cbng)cbng(hap);
			}
			else{
				ctx.ok=true;
				if(cbok)cbok(r);
			}
		}
		else{
			ctx.ok=true;
			if(cbok)cbok(res.body);
		}
	});
	req.addEventListener('error',(ev)=>{
		if(ctx.end)return;
		ctx.end=true;
		res.msg='HTTP request error';

		if(cbng)cbng(happen.happenMsg(res.msg,{
			name:'YgEs_HTTP_Error',
			user:{retry:()=>_retry(ctx,hap)},
		}));
		else log_fatal(res.msg);
	});
	req.addEventListener('timeout',(ev)=>{
		if(ctx.end)return;
		ctx.end=true;
		res.timeout=true;
		res.msg='HTTP timeout';

		if(cbng)cbng(happen.happenMsg(res.msg,{
			name:'YgEs_HTTP_Error',
			user:{retry:()=>_retry(ctx,hap)},
		}));
		else log_fatal(res.msg);
	});
	req.addEventListener('abort',(ev)=>{
		if(ctx.end)return;
		ctx.end=true;
		res.msg='aborted';

		if(cbng)cbng(happen.happenMsg(res.msg,{
			name:'YgEs_HTTP_Error',
			user:{retry:()=>_retry(ctx,hap)},
		}));
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

// Download Monitor --------------------- //
(()=>{ // local namespace 

function _setup(target,show){

	let visible=false;
	let view=YgEs.newQHT({target:target,tag:'div',attr:{class:'yges_loadmon_view'}});
	let tbl=YgEs.newQHT({tag:'table',attr:{class:'yges_loadmon_table',border:'border'}});
	let head=YgEs.newQHT({target:tbl,tag:'tr',attr:{class:'yges_loadmon_thr'},sub:[
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadmon_th_type'},sub:['Type']}).Element,
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadmon_th_name'},sub:['Name']}).Element,
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadmon_th_cond'},sub:['Cond']}).Element,
	]});

	let ctrl={
		isVisible:()=>visible,
		dispose:()=>{
			view.remove();
			view=null;
			tbl=null;
			head=null;
			ctrl=null;
		},
		hide:()=>{
			if(!visible)return;
			visible=false;
			view.clear();
		},
		show:()=>{
			if(visible)return;
			visible=true;
			view.clear();
			view.append(tbl.Element);
		},
		detach:(view)=>{
			view.row.remove();
		},
		attach:(ctx)=>{
			let v_row={
			}

			v_row.row=YgEs.newQHT({target:tbl,tag:'tr'});
			YgEs.newQHT({target:v_row.row,tag:'td',sub:[ctx.type]});
			YgEs.newQHT({target:v_row.row,tag:'td',sub:[ctx.label]});
			v_row.cond=YgEs.newQHT({target:v_row.row,tag:'td'});
			v_row.meter=YgEs.newQHT({target:v_row.cond,tag:'meter',attr:{min:0,max:100,value:0}});
			v_row.msg=YgEs.newQHT({target:v_row.cond,tag:'span'});

			v_row.progress=(val)=>{
				v_row.meter.Element.setAttribute('value',val*100);
			},
			v_row.apply=()=>{
				v_row.msg.replace('(applying)');
			};
			v_row.done=()=>{
				v_row.msg.replace('[OK]');
			};
			v_row.happen=(msg,cb_retry)=>{
				v_row.msg.replace(msg);
				let btn=YgEs.newQHT({target:v_row.msg,tag:'button',sub:['Retry']});
				btn.Element.onclick=()=>{
					cb_retry();
				}
			};
			v_row.unload=()=>{
				v_row.msg.replace('(unloading)');
			};

			return v_row;
		},
	}
	if(show)ctrl.show();
	return ctrl;
}

YgEs.DownloadMonitor={
	setup:_setup,
}

})();
