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

const _rx_zero=/^(0+(|\.)0*|0*(|\.)0+)$/;
const _rx_null=/^null$/i;
const _rx_false=/^false$/i;
const _rx_undefined=/^undefined$/i;

let _prevID=(1234567890+Date.now())&0x7fffffff;
let _deltaID=727272727; // 31bit prime number, except 2 

YgEs.ShowPrivate=false;

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

YgEs.CoreError=(src,prop=undefined)=>{

	if(YgEs.HappeningManager)YgEs.HappeningManager.Happen(src,prop);
	else throw src;
}

YgEs.CoreWarn=(src,prop=undefined)=>{

	if(YgEs.HappeningManager)YgEs.HappeningManager.Happen(src,prop);
	else if(YgEs.Log)YgEs.Log.Warn(src,prop);
	else{
		console.warn(src);
		console.dir(prop);
	}
}

YgEs.Clone=(src)=>{

	if(src===null)return null;
	else if(Array.isArray(src)){
		let dst=[]
		for(let v of src)dst.push(YgEs.Clone(v));
		return dst;
	}
	else if(typeof src==='object'){
		let dst={}
		for(let k in src)dst[k]=YgEs.Clone(src[k]);
		return dst;
	}

	return src;
}

function _validate_number(src,attr,tag){

	let dst=src;
	if(attr.Max!==undefined){
		if(dst>attr.Max){
			YgEs.CoreWarn(tag+' is too much: '+src+'/'+attr.Max);
			dst=attr.Max;
		}
	}
	if(attr.Min!==undefined){
		if(dst<attr.Min){
			YgEs.CoreWarn(tag+' is too less: '+src+'/'+attr.Min);
			dst=attr.Min;
		}
	}
	if(attr.Integer){
		let d2=Math.round(dst);
		if(d2!=dst){
			YgEs.CoreWarn(tag+' have fragments: '+dst);
			dst=d2;
		}
	}

	return dst;
}

function _validate_string(src,attr,tag){

	let dst=src;
	if(attr.Max!==undefined){
		if(src.length>attr.Max){
			YgEs.CoreWarn(tag+' is too long: '+src.length+'/'+attr.Max);
			dst=src.substring(0,attr.Max);
		}
	}
	if(attr.Min!==undefined){
		if(src.length<attr.Min){
			YgEs.CoreWarn(tag+' is too short: '+src.length+'/'+attr.Min);
		}
	}

	return dst;
}

function _fix_undefined(src,attr,tag){

	if(src===null)return src;
	if(src!==undefined)return src;
	if(attr.Default!==undefined)return attr.Default;

	if(attr.List)return []
	if(attr.Dict)return {}

	if(attr.Required){
		YgEs.CoreWarn(tag+' is missing');
	}

	return src;
}

YgEs.Validate=(src,attr,tag='',dcf=false)=>{

	let dst=src;
	if(attr.Clone)dcf=true;

	if(attr.Any){}
	else switch(typeof src){
		case 'function':
		if(!attr.Callable){
			YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
			dst=undefined;
		}
		break;

		case 'boolean':
		if(!attr.Boolable){
			YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
			if(attr.Integer || attr.Numeric)dst=src?1:0;
			else if(attr.Literal)dst=src?'true':'false';
			else dst=undefined;
		}
		break;

		case 'number':
		if(attr.Key){
			if(!attr.Key[src]){
				YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
				dst=undefined;
			}
		}
		else if(!attr.Integer && !attr.Numeric){
			YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
			if(attr.Literal)dst=''+dst;
			else if(attr.Boolable)dst=!!dst;
			else dst=undefined;
		}
		else dst=_validate_number(src,attr,tag);
		break;

		case 'string':
		if(attr.Key){
			if(!attr.Key[src]){
				YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
				dst=undefined;
			}
		}
		else if(!attr.Literal){
			YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
			if(attr.Integer){
				dst=parseInt(dst);
				if(!attr.NaNable && Number.isNaN(dst)){
					if(attr.Boolable)dst=!!src;
					else dst=undefined;
				}
			}
			else if(attr.Numeric){
				dst=parseFloat(dst);
				if(!attr.NaNable && Number.isNaN(dst)){
					if(attr.Boolable)dst=!!src;
					else dst=undefined;
				}
			}
			else if(attr.Boolable)dst=YgEs.Booleanize(src,true);
			else dst=undefined;
		}
		else dst=_validate_string(src,attr,tag);
		break;

		case 'object':
		if(src===null){
			if(!attr.Nullable){
				YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
				if(attr.Boolable)dst=false;
				else if(attr.Integer || attr.Numeric)dst=0;
				else if(attr.Literal)dst='';
				else dst=undefined;
			}
		}
		else if(Array.isArray(src)){
			if(attr.List){
				let sa=attr.List;
				if(typeof sa==='object'){
					dst=[];
					for(let k in src){
						dst[k]=YgEs.Validate(src[k],sa,tag+'['+k+']',dcf);
					}
				}
				else if(dcf)dst=YgEs.Clone(src);
			}
			else if(attr.Dict){
				let sa=attr.Dict;
				if(typeof sa==='object'){
					dst=[];
					for(let k in src){
						dst[k]=YgEs.Validate(src[k],sa,tag+'['+k+']',dcf);
					}
				}
				else if(dcf)dst=YgEs.Clone(src);
			}
			else{
				YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
				dst=undefiend;
			}
		}
		else{
			let cnt=(attr.Dict?1:0)+(attr.Struct?1:0)+(attr.Class?1:0);
			if(cnt>1){
				YgEs.CoreWarn(tag+' has object types in a chaos',attr);
				if(dcf)dst=YgEs.Clone(src);
			}
			else if(attr.Dict){
				let sa=attr.Dict;
				if(typeof sa==='object'){
					dst={}
					for(let k in src){
						dst[k]=YgEs.Validate(src[k],sa,tag+'["'+k+'"]',dcf);
					}
				}
				else if(dcf)dst=YgEs.Clone(src);
			}
			else if(attr.Struct){
				let sa=attr.Struct;
				if(typeof sa==='object'){
					dst={}
					for(let k in sa){
						dst[k]=YgEs.Validate(src[k],sa[k],tag+'["'+k+'"]',dcf);
					}
					for(let k in src){
						if(sa[k])continue;
						// undefined item 
						if(attr.Others)dst[k]=src[k];
						else{
							YgEs.CoreWarn(tag+'["'+k+'"] is undefined spec',src[k]);
						}
					}
				}
				else if(dcf)dst=YgEs.Clone(src);
			}
			else if(attr.Class){
				switch(typeof attr.Class){
					case 'string':
					if(!src.IsComprised(attr.Class)){
						YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
						dst=undefined;
					}
					break;

					case 'function':
					if(!src instanceof attr.Class){
						YgEs.CoreWarn(tag+' is invalid: '+YgEs.Inspect(src));
						dst=undefined;
					}
					break;

					default:
					YgEs.CoreWarn(tag+' specified by invalid attr',attr);
					dst=undefined;
				}
			}
			else{
				YgEs.CoreWarn(tag+' has unknown object type',attr);
				if(dcf)dst=YgEs.Clone(src);
			}
		}
		break;
	}

	if(attr.Validator)dst=attr.Validator(dst,attr,tag);

	dst=_fix_undefined(dst,attr,tag);

	return dst;
}

YgEs.InstanceOf=(obj,name)=>{

	if(obj===null)return false;
	if(typeof obj==='object')return false;
	if(!obj.IsComprised)return false;
	return obj.IsComprised(name);
}

YgEs.SoftClass=(name=undefined,user=undefined)=>{

	let priv_idx={}

	const basename='YgEs.SoftClass';
	const entrait=(subname,priv,pub)=>{

		if(priv_idx[subname]){
			YgEs.CoreWarn('** '+subname+' already exists in class table of '+self.GetCaption()+' **',Object.keys(priv_idx));
		}

		let t=priv?priv:{}
		priv_idx[subname]=t;
		if(pub)Object.assign(self,pub);
		return t;
	}

	let self={
		Name:name,
		User:user??{},
		_class_:basename,
		_genealogy_:[],
		_private_:YgEs.ShowPrivate?priv_idx:{},
		GetCaption:()=>self.Name??self._class_,
		GetClassName:()=>self._class_,
		GetGenealogy:()=>self._genealogy_,
		IsComprised:(subname)=>!!priv_idx[subname],
		Trait:(subname,priv=null,pub=null)=>{
			let t=entrait(subname,priv,pub);
			priv_cur._trait_.push({_class_:subname,_user_:t});
			return t;
		},
		Extend:(subname,priv=null,pub=null)=>{

			let t=entrait(subname,priv,pub);
			let pn=self._class_;
			self._class_=subname;
			self._genealogy_.push(subname);
			priv_cur={_class_:subname,_parent_:priv_cur,_trait_:[],_super_:{},_user_:t}
			if(YgEs.ShowPrivate)self._inherit_=priv_cur;
			return t;
		},
		Inherit:(symbol,override)=>{
			if(priv_cur._super_[symbol]){
				YgEs.CoreWarn('** '+symbol+' already exists in inheritance table of '+self.GetCaption()+' **',priv_cur._super_);
			}

			const dst=priv_cur._super_[symbol]=self[symbol];
			self[symbol]=override;
			return dst;
		},
	}
	let priv_cur={_class_:basename,_trait_:[],_super_:{},_user_:entrait(basename)}
	if(YgEs.ShowPrivate){
		self._inherit_=priv_cur;
		self._private_=priv_idx;
	}

	return self;
}

// [Deprecated] 
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

YgEs.Booleanize=(val,stringable=false)=>{
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
}

YgEs.Trinarize=(val,stringable=false)=>{

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
	return YgEs.Booleanize(val,stringable);
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
		if(inst.Format){
			inst.Format(inst,src);
			return;
		}
	}
	_default_format(src);
}

function _do_write(t,src){

	for(let inst=t;inst;inst=inst.GetParent()){
		if(inst.Way){
			inst.Way(inst,src);
			return;
		}
	}
	_default_way(src);
}

// create local instance 
function _create_local(capt=undefined,showable=undefined,parent=undefined){

	capt=YgEs.Validate(capt,{Literal:true,Nullable:true},'capt');
	showable=YgEs.Validate(showable,{Integer:true,Nullable:true,Min:0,Max:_level_names.length},'showable');
	parent=YgEs.Validate(parent,{Class:'YgEs.LocalLog'},parent);

	const iid=YgEs.NextID();

	let self=YgEs.SoftClass();
	self.Extend('YgEs.LocalLog',{
		// private
	},{
		// public
		Showable:showable,
		Caption:capt,
		Format:undefined,
		Way:undefined,

		LEVEL_NAMES:_level_names,
		LEVEL:_level_lookup,

		CreateLocal:(capt=undefined,showable=undefined)=>_create_local(capt,showable,self),
		CreateSplitter:(capt=undefined,showable=undefined)=>_create_splitter(capt,showable,self),

		GetInstanceID:()=>iid,
		GetParent:()=>parent,
		GetCaption:()=>{
			for(let t=self;t;t=t.GetParent()){
				if(t.Caption!=null)return t.Caption;
			}
			return '';
		},
		GetShowable:()=>{
			for(let t=self;t;t=t.GetParent()){
				if(t.Showable!=null)return t.Showable;
			}
			return _default_showable;
		},

		Put:(lev,msg,prop=undefined)=>{
			if(lev>=self.LEVEL_NAMES.length)return;
			if(lev<self.GetShowable())return;
			let src={
				Date:new Date().toISOString(),
				Capt:self.GetCaption(),
				Lev:lev,
				Msg:msg
			}
			if(prop)src.Prop=prop;
			_do_format(self,src);
			_do_write(self,src);
		},

		Tick:(msg,prop=undefined)=>{self.Put(self.LEVEL.TICK,msg,prop);},
		Trace:(msg,prop=undefined)=>{self.Put(self.LEVEL.TRACE,msg,prop);},
		Debug:(msg,prop=undefined)=>{self.Put(self.LEVEL.DEBUG,msg,prop);},
		Info:(msg,prop=undefined)=>{self.Put(self.LEVEL.INFO,msg,prop);},
		Notice:(msg,prop=undefined)=>{self.Put(self.LEVEL.NOTICE,msg,prop);},
		Warn:(msg,prop=undefined)=>{self.Put(self.LEVEL.WARN,msg,prop);},
		Fatal:(msg,prop=undefined)=>{self.Put(self.LEVEL.FATAL,msg,prop);},
		Crit:(msg,prop=undefined)=>{self.Put(self.LEVEL.CRIT,msg,prop);},
		Alert:(msg,prop=undefined)=>{self.Put(self.LEVEL.ALERT,msg,prop);},
		Emerg:(msg,prop=undefined)=>{self.Put(self.LEVEL.EMERG,msg,prop);},
	});

	return self;
}

function _create_splitter(capt=undefined,showable=undefined,parent=undefined){

	let self=_create_local(capt,showable,parent);
	let priv=self.Extend('YgEs.LogSplitter',{
		// private 
		slot:{},
	},{
		// public 
		Format:(logger,src)=>{
			for(let sub of Object.values(priv.slot)){
				if(src.Lev<sub.GetShowable())continue;
				_do_format(sub,src);
			}
		},
		Way:(logger,src)=>{
			for(let sub of Object.values(priv.slot)){
				if(src.Lev<sub.GetShowable())continue;
				_do_write(sub,src);
			}
		},
		Ref:(id)=>{
			return priv.slot[id];
		},
		Attach:(id,logger)=>{
			if(!logger){
				self.Detach(id);
				return;
			}
			priv.slot[id]=logger;
		},
		Detach:(id)=>{
			if(!priv.slot[id])return;
			delete priv.slot[id];
		},
	});

	return self;
}

const Log=YgEs.Log=_create_local('Global');

})();

// Utilities ---------------------------- //
(()=>{ // local namespace 

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

	Booleanize:YgEs.Booleanize,
	Trinarize:YgEs.Trinarize,
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

function _default_happened(mng,hap){
	Log.Fatal(hap.ToString(),hap.GetProp());	
}
function _default_abandoned(hap){
	Log.Warn('* Abandoned * '+hap.ToString(),hap.GetProp());	
}
function _default_resolved(hap){
	Log.Debug('* Resolved * '+hap.ToString(),hap.GetProp());	
}

function _create_happening(cbprop,cbstr,cberr,prm={}){

	prm=YgEs.Validate(prm,{Others:true,Struct:{
		Name:{Literal:true},
		User:{Struct:true},

		OnResolved:{Callable:true,Default:_default_resolved},
		OnAbandoned:{Callable:true,Default:_default_abandoned},
	}},'prm');

	const iid=YgEs.NextID();

	let self=YgEs.SoftClass(prm.Name,prm.User);

	let priv=self.Extend('YgEs.Happening',{
		// private 
		resolved:false,
		abandoned:false,
	},{
		// public 
		GetInstanceID:()=>iid,
		GetProp:cbprop,
		ToString:cbstr,
		toString:cbstr,
		ToError:cberr,

		IsResolved:()=>priv.resolved,
		IsAbandoned:()=>priv.abandoned && !priv.resolved,

		GetStatus:()=>{
			if(priv.resolved)return 'Resolved';
			if(priv.abandoned)return 'Abandoned';
			return 'Posed';
		},
		GetInfo:()=>{return {
			InstanceID:iid,
			Name:self.Name,
			Status:self.GetStatus(),
			Msg:cbstr(),
			Prop:cbprop(),
			User:self.User,
		}},

		Resolve:()=>{
			if(priv.resolved)return;
			priv.resolved=true;
			priv.abandoned=false;
			prm.OnResolved(self);
		},

		Abandon:()=>{
			if(priv.resolved)return;
			if(priv.abandoned)return;
			priv.abandoned=true;
			prm.OnAbandoned(self);
		},
	});

	return self;
}

function _create_manager(prm,parent=null){

	prm=YgEs.Validate(prm,{Others:true,Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		OnHappen:{Callable:true},
	}},'prm');

	const iid=YgEs.NextID();

	const onHappen=(hap)=>{
		for(let hm=self;hm;hm=hm.GetParent()){
			if(!hm.OnHappen)continue;
			hm.OnHappen(self,hap);
			return;
		}
		_default_happened(self,hap);
	}

	let self=YgEs.SoftClass(prm.Name,prm.User);

	let priv=self.Extend('YgEs.HappeningManager',{
		// private 
		abandoned:false,
		issues:[],
		children:[],
	},{
		// public 
		OnHappen:prm.OnHappen,

		CreateLocal:(prm={})=>{
			let cm=_create_manager(prm,self);
			priv.children.push(cm);
			return cm;
		},

		GetInstanceID:()=>iid,
		GetParent:()=>parent,
		GetChildren:()=>priv.children,
		GetIssues:()=>priv.issues,
		IsAbandoned:()=>priv.abandoned,

		GetStatus:()=>{
			if(priv.abandoned)return 'Abandoned';
			return 'Available';
		},
		GetInfo:()=>{
			let r={
				InstanceID:iid,
				Name:self.GetCaption(),
				Status:self.GetStatus(),
				User:self.User,
				Issues:[],
				Sub:[],
			}
			for(let hap of priv.issues)r.Issues.push(hap.GetInfo());
			for(let sub of priv.children)r.Sub.push(sub.GetInfo());
			return r;
		},

		Abandon:()=>{
			for(let sub of priv.children){
				sub.Abandon();
			}
			for(let hap of priv.issues){
				hap.Abandon();
			}
			priv.issues=[]
			priv.abandoned=true;
		},

		CountIssues:()=>{
			let ct=priv.issues.length;
			for(let sub of priv.children){
				ct+=sub.CountIssues();
			}
			return ct;
		},
		IsCleaned:()=>{
			if(priv.issues.length>0)return false;
			for(let sub of priv.children){
				if(!sub.IsCleaned())return false;
			}
			return true;
		},
		CleanUp:()=>{
			let tmp=[]
			for(let hap of priv.issues){
				if(!hap.IsResolved())tmp.push(hap);
			}
			priv.issues=tmp;

			tmp=[]
			for(let sub of priv.children){
				if(sub.IsAbandoned())continue;
				sub.CleanUp();
				tmp.push(sub);
			}
			priv.children=tmp;
		},

		Poll:(cb)=>{
			if(!cb)return;
			for(let hap of priv.issues){
				if(hap.IsResolved())continue;
				if(hap.IsAbandoned())continue;
				cb(hap);
			}
			for(let sub of priv.children){
				sub.Poll(cb);
			}
		},

		Happen:(src,prop=null,prm={})=>{

			let hap=null;
			if(src==null || typeof src!='object'){
				hap=_create_happening(
					()=>prop,
					()=>''+src,
					()=>new Error(''+src,{cause:prop}),
					prm
				);
			}
			else if(src instanceof Error){
				hap=_create_happening(
					()=>YgEs.FromError(src),
					()=>'{'+src.Name+'} '+src.message,
					()=>src,
					prm
				);
			}
			else if(YgEs.InstanceOf(src,'YgEs.Happening')){
				hap=_create_happening(
					()=>src.GetProp(),
					()=>''+src,
					()=>new Error(''+src,{cause:src.GetProp()}),
					prm
				);
			}
			else{
				hap=_create_happening(
					()=>Object.assign(src,prop),
					()=>'Happening',
					()=>new Error('Happening',{cause:Object.assign(src,prop)}),
					prm
				);
			}

			priv.issues.push(hap);
			onHappen(hap);
			return hap;
		},
	});

	return self;
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

function _create_proc(prm,launcher){

	prm=YgEs.Validate(prm,{Others:true,Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Log:{Class:'YgEs.LocalLog',Default:launcher.Log??Log},
		HappenTo:{Class:'YgEs.HappeningManager',Default:launcher.HappenTo??HappeningManager},
		OnStart:{Callable:true,Default:(self)=>{}},
		OnPoll:{Callable:true,Default:(self)=>{}},
		OnDone:{Callable:true,Default:(self)=>{}},
		OnAbort:{Callable:true,Default:(self)=>{
			self.HappenTo.Happen(
				'Aborted',{
				Class:self.GetClassName(),
				Cause:'Aborted',
				Info:self.GetInfo('Aborted'),
			});
		}},
	}},'prm');

	const iid=YgEs.NextID();

	let self=YgEs.SoftClass(prm.Name,prm.User);

	let priv=self.Extend('YgEs.Procedure',{
		// private 
		started:false,
		finished:false,
		aborted:false,
	},{
		// public 
		Log:prm.Log,
		HappenTo:prm.HappenTo,

		GetInstanceID:()=>iid,
		IsStarted:()=>priv.started,
		IsFinished:()=>priv.finished,
		IsAborted:()=>priv.aborted,
		IsEnd:()=>priv.finished||priv.aborted,

		GetStatus:()=>{
			if(priv.finished)return 'Finished';
			if(priv.aborted)return 'Aborted';
			if(priv.started)return 'Running';
			return 'StandBy';
		},
		GetInfo:(site='')=>{return {
			InstanceID:iid,
			Name:self.Name,
			CrashSite:site,
			Status:self.GetStatus(),
			User:self.User,
		}},

		_start:()=>{
			if(priv.started)return;
			if(self.IsEnd())return;
			priv.started=true;
			try{
				prm.OnStart(self);
			}
			catch(e){
				self.HappenTo.Happen(e,{
					Class:self.GetClassName(),
					Cause:'ThrownFromCallback',
					Info:self.GetInfo('OnStart'),
				});
				self.Abort();
			}
		},
		Abort:()=>{
			if(self.IsEnd())return;
			priv.aborted=true;
			try{
				prm.OnAbort(self);
			}
			catch(e){
				self.HappenTo.Happen(e,{
					Class:self.GetClassName(),
					Cause:'ThrownFromCallback',
					Info:self.GetInfo('OnAbort'),
				});
			}
		},
		Poll:()=>{
			if(self.IsEnd())return false;
			try{
				if(prm.OnPoll(self))return true;
			}
			catch(e){
				self.HappenTo.Happen(e,{
					Class:self.GetClassName(),
					Cause:'ThrownFromCallback',
					Info:self.GetInfo('OnPoll'),
				});
				self.Abort();
				return false;
			}
			try{
				prm.OnDone(self);
				priv.finished=true;
			}
			catch(e){
				YgEs.Trinarize.HappenTo.Happen(e,{
					Class:self.GetClassName(),
					Cause:'ThrownFromCallback',
					Info:self.GetInfo('OnDone'),
				});
				self.Abort();
				return false;
			}
			return false;
		},

		Sync:(cb_sync,interval=null)=>{
			if(!cb_sync){
				self.HappenTo.Happen(
					'Empty callback for sync',{
					Class:self.GetClassName(),
					Cause:'EmptySyncCallback',
					Info:self.GetInfo('CannotSync'),
				});
				return;
			}
			if(interval===null)interval=DEFAULT_SYNC_CYCLE;
			Timing.Sync(interval,
				()=>{return self.IsEnd();},
				()=>{
					try{
						cb_sync(self.User);
					}
					catch(e){
						self.HappenTo.Happen(e,{
							Class:self.GetClassName(),
							Cause:'ThrownFromCallback',
							Info:self.GetInfo('OnSync'),
						});
					}
				},
			);
		},
		ToPromise:(breakable,interval=null)=>{
			return Timing.ToPromise((ok,ng)=>{
				self.Sync(()=>{
					if(breakable || priv.finished)ok(self.User);
					else ng(new Error('abort',{cause:self.User}));
				},interval);
			});
		},
	});

	return self;
}

function _yges_enginge_create_launcher(prm){

	prm=YgEs.Validate(prm,{Others:true,Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Log:{Class:'YgEs.LocalLog'},
		HappenTo:{Class:'YgEs.HappeningManager',Default:HappeningManager},
		Limit:{Integer:true,Min:-1,Default:-1},
		Cycle:{Numeric:true,Default:DEFAULT_LAUNCHER_CYCLE},
		OnAbort:{Callable:true,Default:(lnc)=>{}},
	}},'prm');

	const iid=YgEs.NextID();

	let self=YgEs.SoftClass(prm.Name,prm.User);

	let priv=self.Extend('YgEs.Launcher',{
		// private 
		abandoned:false,
		aborted:false,
		sublauncher:[],
		launched:[],
		active:[],
	},{
		// public 
		Log:prm.Log,
		HappenTo:prm.HappenTo,
		Limit:prm.Limit,
		Cycle:prm.Cycle,

		GetInstanceID:()=>iid,
		GetActive:()=>priv.active,
		GetHeld:()=>priv.launched,
		GetSub:()=>priv.sublauncher,

		GetStatus:()=>{
			if(priv.abandoned)return 'Abandoned';
			if(priv.aborted)return 'Aborted';
			return 'Ready';
		},
		GetInfo:(site='')=>{
			let r={
				InstanceID:iid,
				Name:self.Name,
				CrashSite:site,
				Status:self.GetStatus(),
				Limit:self.Limit,
				Cycle:self.Cycle,
				User:self.User,
				Active:[],
				Held:[],
				Sub:[],
			}
			for(let proc of priv.active)r.Active.push(proc.GetInfo());
			for(let proc of priv.launched)r.Held.push(proc.GetInfo());
			for(let sub of priv.sublauncher)r.Sub.push(sub.GetInfo());
			return r;
		},

		IsEnd:()=>{
			if(priv.launched.length>0)return false;
			if(priv.active.length>0)return false;
			for(let sub of priv.sublauncher){
				if(!sub.IsEnd())return false;
			}
			return true;
		},
		IsAbandoned:()=>priv.abandoned,
		CountActive:()=>{
			let n=priv.active.length
			for(let sub of priv.sublauncher)n+=sub.CountActive();
			return n;
		},
		CountHeld:()=>{
			let n=priv.launched.length
			for(let sub of priv.sublauncher)n+=sub.CountHeld();
			return n;
		},

		Abandon:()=>{
			priv.abandoned=true;
			self.Abort();
		},

		CreateLauncher:(prm2={})=>{
			let sub=_yges_enginge_create_launcher(prm2);
			priv.sublauncher.push(sub);
			return sub;
		},

		Launch:(prm2={})=>{
			if(Engine.IsAbandoned()){
				self.HappenTo.Happen('the Engine was abandoned, no longer launch new procedures.');
				return;
			}
			if(!e_priv.working){
				Log.Notice('the Engine not started. call Start() to run.');
			}
			if(priv.abandoned){
				prm2.OnAbort(self);
				return;
			}
			if(!prm2.OnPoll){
				self.HappenTo.Happen(
					'Empty callback for poll',{
					Class:self.GetClassName(),
					Cause:'CannotPoll',
				});
				return;
			}

			let proc=_create_proc(prm2,self);
			if(self.Limit<0 || priv.active.length<self.Limit){
				priv.active.push(proc);
				proc._start();
			}
			else{
				priv.launched.push(proc);
			}
			return proc;
		},
		Abort:()=>{
			if(self.IsEnd())return;
			priv.aborted=true;
			for(let sub of priv.sublauncher)sub.Abort();
			priv.sublauncher=[]
			for(let proc of priv.launched)proc.Abort();
			priv.launched=[]
			for(let proc of priv.active)proc.Abort();
			priv.active=[]
		},
		Poll:()=>{
			for(let sub of priv.sublauncher){
				sub.Poll();
			}

			let cont=[]
			for(let proc of priv.active){
				if(proc.Poll())cont.push(proc);
			}
			priv.active=cont;

			if(self.Limit<0 || priv.active.length<self.Limit){
				let hold=[]
				for(let proc of priv.launched){
					if(self.Limit>=0 && priv.active.length>=self.Limit)hold.push(proc);
					else{
						proc._start();
						priv.active.push(proc);
					}
				}
				priv.launched=hold;
			}
		},

		Sync:(cb_sync,interval=null)=>{
			if(!cb_sync){
				self.HappenTo.Happen(
					'Empty callback for sync',{
					Class:self.GetClassName(),
					Cause:'CannotSync',
				});
				return;
			}
			if(interval===null)interval=DEFAULT_SYNC_CYCLE;
			Timing.Sync(interval,
				()=>{
					self.Poll();
					return self.IsEnd();
				},
				()=>{
					try{
						cb_sync(self.User);
					}
					catch(e){
						self.HappenTo.Happen(e,{
							Class:self.GetClassName(),
							Cause:'ThrownFromCallback',
							Info:self.GetInfo('OnSync'),
						});
					}
				}
			);
		},

		ToPromise:(breakable,interval=null)=>{
			return Timing.ToPromise((ok,ng)=>{
				self.Sync(()=>{
					if(breakable || !priv.aborted)ok(self.User);
					else ng(new Error('abort',{cause:self.GetInfo('abort')}));
				},interval);
			});
		},

		Delay:(time,cb_done,cb_abort=null)=>{
			let until=new Date(Date.now()+time);
			return self.Launch({
					Name:'YgEs.DelayProc',
					OnPoll:(proc)=>{
						return Date.now()<until;
					},
					OnDone:cb_done,
					OnAbort:cb_abort??cb_done,
				});
		},
	});	

	return self;
}

let Engine=YgEs.Engine=_yges_enginge_create_launcher({
	Cycle:DEFAULT_ROOT_CYCLE,
});

let e_priv=Engine.Extend('YgEs.Engine',{
	// private 
	working:false,
	cancel:null,

	poll_engine:()=>{
		if(!e_priv.working)return;
		if(Engine.IsAbandoned())return;

		Engine.Poll();

		e_priv.cancel=Timing.Delay(Engine.Cycle,()=>{
			e_priv.cancel=null;
			e_priv.poll_engine();
		});
	},

	stop:()=>{
		e_priv.working=false;
		if(e_priv.cancel!=null)e_priv.cancel();
	},
},{
	// public 

	Start:()=>{
		if(Engine.IsAbandoned())return;
		if(e_priv.working)return;
		e_priv.working=true;
		e_priv.poll_engine();
	},

	Stop:()=>{
		e_priv.stop();
		if(Engine.IsAbandoned())return;
		Engine.Abort();
	},

	ShutDown:()=>{
		Engine.Abandon();
		e_priv.stop();
	},
});

})();

// StateMachine ------------------------- //
(()=>{ // local namespace 

const Engine=YgEs.Engine;
const HappeningManager=YgEs.HappeningManager;
const Log=YgEs.Log;

function _run(start,states={},opt={}){

	start=YgEs.Validate(start,{Key:states,Nullable:true},'start');
	states=YgEs.Validate(states,{Dict:true},'states');
	opt=YgEs.Validate(opt,{Others:true,Struct:{
		Name:{Literal:true,Default:'YgEs.StateMachine'},
		User:{Struct:true},
		Log:{Class:'YgEs.LocalLog',Default:Log},
		HappenTo:{Class:'YgEs.HappeningManager',Default:HappeningManager},
		Launcher:{Class:'YgEs.Launcher',Default:Engine},
		OnDone:{Callable:true},
		OnAbort:{Callable:true},
	}},'opt');

	let ctrl=YgEs.SoftClass(opt.Name,opt.User);

	let priv=ctrl.Extend('YgEs.StateMachine',{
		// private 
		cur:null,
		state_prev:null,
		state_cur:null,
		state_next:start,
	},{
		// public 
		GetLogger:()=>opt.Log,
		GetHappeningManager:()=>opt.HappenTo,
		GetPrevState:()=>priv.state_prev,
		GetCurState:()=>priv.state_cur,
		GetNextState:()=>priv.state_next,
		GetInfo:(site='')=>{
			return {
				Name:ctrl.GetCaption(),
				CrashSite:site,
				Prev:priv.state_prev,
				Cur:priv.state_cur,
				Next:priv.state_next,
				User:opt.User,
			}
		},
	});

	let poll_nop=(proc)=>{}
	let poll_cur=poll_nop;

	let call_start=(proc)=>{
		if(priv.state_next==null){
			// normal end 
			priv.cur=null;
			priv.state_prev=priv.state_cur;
			priv.state_cur=null;
			poll_cur=poll_nop;
			return;
		}
		priv.cur=states[priv.state_next]??null;
		if(!priv.cur){
			opt.HappenTo.Happen(
				'Missing State: '+priv.state_next,{
				Source:ctrl.GetCaption(),
				Cause:'MissingState',
				Info:ctrl.GetInfo('selecting'),
			});
			poll_cur=poll_nop;
			return;
		}
		priv.state_prev=priv.state_cur;
		priv.state_cur=priv.state_next;
		priv.state_next=null;
		try{
			if(priv.cur.OnStart)priv.cur.OnStart(ctrl,proc);
			poll_cur=poll_up;
		}
		catch(e){
			opt.HappenTo.Happen(e,{
				Source:ctrl.GetCaption(),
				Cause:'ThrownFromCallback',
				Info:ctrl.GetInfo('OnStart'),
			});
			poll_cur=poll_nop;
			return;
		}
		// can try extra polling 
		poll_cur(proc);
	}
	let poll_up=(proc)=>{
		try{
			var r=priv.cur.OnPollInUp?priv.cur.OnPollInUp(ctrl,proc):true;
		}
		catch(e){
			opt.HappenTo.Happen(e,{
				Source:ctrl.GetCaption(),
				Cause:'ThrownFromCallback',
				Info:ctrl.GetInfo('OnPollInUp'),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			try{
				// normal transition 
				if(priv.cur.OnReady)priv.cur.OnReady(ctrl,proc);
				poll_cur=poll_keep;
			}
			catch(e){
				opt.HappenTo.Happen(e,{
					Source:ctrl.GetCaption(),
					Cause:'ThrownFromCallback',
					Info:ctrl.GetInfo('OnReady'),
				});
				poll_cur=poll_nop;
				return;
			}
			// can try extra polling 
			poll_cur(proc);
		}
		else{
			// interruption 
			priv.state_next=r.toString();
			call_end(proc);
		}
	}
	let poll_keep=(proc)=>{
		try{
			var r=priv.cur.OnPollInKeep?priv.cur.OnPollInKeep(ctrl,proc):true;
		}
		catch(e){
			opt.HappenTo.Happen(e,{
				Source:ctrl.GetCaption(),
				Cause:'ThrownFromCallback',
				Info:ctrl.GetInfo('OnPollInKeep'),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			// normal end 
			priv.state_next=null;
			call_stop(proc);
		}
		else{
			// normal transition 
			priv.state_next=r.toString();
			call_stop(proc);
		}
	}
	let call_stop=(proc)=>{
		try{
			if(priv.cur.OnStop)priv.cur.OnStop(ctrl,proc);
			poll_cur=poll_down;
		}
		catch(e){
			opt.HappenTo.Happen(e,{
				Source:ctrl.GetCaption(),
				Cause:'ThrownFromCallback',
				Info:ctrl.GetInfo('OnStop'),
			});
			poll_cur=poll_nop;
			return;
		}
		// can try extra polling 
		poll_cur(proc);
	}
	let poll_down=(proc)=>{
		try{
			var r=priv.cur.OnPollInDown?priv.cur.OnPollInDown(ctrl,proc):true;
		}
		catch(e){
			opt.HappenTo.Happen(e,{
				Source:ctrl.GetCaption(),
				Cause:'ThrownFromCallback',
				Info:ctrl.GetInfo('OnPollInDown'),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			// normal transition 
			call_end(proc);
		}
		else{
			// interruption 
			priv.state_next=r.toString();
			call_end(proc);
		}
	}
	let call_end=(proc)=>{
		try{
			if(priv.cur.OnEnd)priv.cur.OnEnd(ctrl,proc);
			call_start(proc);
		}
		catch(e){
			opt.HappenTo.Happen(e,{
				Source:ctrl.GetCaption(),
				Cause:'ThrownFromCallback',
				Info:ctrl.GetInfo('OnEnd'),
			});
			poll_cur=poll_nop;
			return;
		}
	}

	let proc=opt.Launcher.Launch({
		Name:opt.Name+'.Proc',
		Log:opt.Log,
		HappenTo:opt.HappenTo,
		User:opt.User,
		OnStart:(proc)=>{
			call_start(proc);
		},
		OnPoll:(proc)=>{
			poll_cur(proc);
			return !!priv.cur;
		},
		OnDone:opt.OnDone,
		OnAbort:opt.OnAbort,
	});

	proc.Trait('YgEs.StateMachine.Proc');
	const proc_GetInfo=proc.Inherit('GetInfo',()=>{
		return {
			StateMachine:{
				Name:ctrl.GetCaption(),
				Prev:priv.state_prev,
				Cur:priv.state_cur,
				Next:priv.state_next,
			},
			Procedure:proc_GetInfo('ProcInfo'),
		}
	});

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

function _standby(field){

	field=YgEs.Validate(field,{Others:true,Struct:{
		Name:{Literal:true,Default:'YgEs.Agent'},
		User:{Struct:true},
		Log:{Class:'YgEs.LocalLog',Default:Log},
		HappenTo:{Class:'YgEs.HappeningManager',Default:HappeningManager},
		Launcher:{Class:'YgEs.Launcher',Default:Engine},
		AgentBypasses:{List:{Literal:true}},
		UserBypasses:{List:{Literal:true}},
		Dependencies:{Dict:{Class:'YgEs.Handle'}},
		OnOpen:{Callable:true,Default:(agent)=>{}},
		OnClose:{Callable:true,Default:(agent)=>{}},
		OnBack:{Callable:true,Default:(agent)=>{}},
		OnRepair:{Callable:true,Default:(agent)=>{}},
		OnReady:{Callable:true,Default:(agent)=>{}},
		OnTrouble:{Callable:true,Default:(agent)=>{}},
		OnRecover:{Callable:true,Default:(agent)=>{}},
		OnHalt:{Callable:true,Default:(agent)=>{}},
		OnPollInHealthy:{Callable:true,Default:(agent)=>{}},
		OnPollInTrouble:{Callable:true,Default:(agent)=>{}},
		OnFinish:{Callable:true,Default:(agent,cleaned)=>{}},
		OnAbort:{Callable:true,Default:(agent)=>{}},
	}},'field');

	let states={
		'IDLE':{
			OnPollInKeep:(ctrl,proc)=>{
				if(priv_a.opencount<1)return true;
				priv_a.restart=false;

				field.HappenTo.CleanUp();
				return field.HappenTo.IsCleaned()?'UP':'REPAIR';
			},
		},
		'BROKEN':{
			OnPollInKeep:(ctrl,proc)=>{
				if(priv_a.opencount<1)return true;
				priv_a.restart=false;

				return 'REPAIR';
			},
		},
		'REPAIR':{
			OnStart:(ctrl,proc)=>{

				try{
					//start repairing 
					priv_a.wait=[]
					field.OnRepair(agent);
				}
				catch(e){
					field.HappenTo.Happen(e,{
						Class:'YgEs.Agent',
						Cause:'ThrownFromCallback',
						Info:agent.GetInfo('OnRepair'),
					});
				}
			},
			OnPollInKeep:(ctrl,proc)=>{
				if(priv_a.opencount<1){
					field.HappenTo.CleanUp();
					return field.HappenTo.IsCleaned()?'IDLE':'BROKEN';
				}

				// wait for delendencies 
				let cont=[]
				for(let d of priv_a.wait){
					try{
						if(d.Chk(d.Prop))continue;
						cont.push(d);
					}
					catch(e){
						field.HappenTo.Happen(e,{
							Class:'YgEs.Agent',
							Cause:'ThrownFromCallback',
							Info:agent.GetInfo('wait for repair'),
						});
					}
				}
				priv_a.wait=cont;
				if(priv_a.wait.length>0)return;

				// wait for all happens resolved 
				field.HappenTo.CleanUp();
				if(field.HappenTo.IsCleaned())return 'UP';
			},
		},
		'DOWN':{
			OnStart:(ctrl,proc)=>{
				let back=false;
				try{
					priv_a.wait=[]

					// down dependencles too 
					if(field.Dependencies){
						Util.SafeDictIter(field.Dependencies,(k,h)=>{
							h.Close();
						});
					}

					if(ctrl.GetPrevState()=='UP'){
						back=true;
						field.OnBack(agent);
					}
					else{
						field.OnClose(agent);
					}
				}
				catch(e){
					field.HappenTo.Happen(e,{
						Class:'YgEs.Agent',
						Cause:'ThrownFromCallback',
						Info:agent.GetInfo(back?'OnBack':'OnClose'),
					});
				}
			},
			OnPollInKeep:(ctrl,proc)=>{

				// wait for delendencies 
				let cont=[]
				for(let d of priv_a.wait){
					try{
						if(d.Chk(d.Prop))continue;
						cont.push(d);
					}
					catch(e){
						field.HappenTo.Happen(e,{
							Class:'YgEs.Agent',
							Cause:'ThrownFromCallback',
							Info:agent.GetInfo('wait for down'),
						});
					}
				}
				priv_a.wait=cont;
				if(priv_a.wait.length>0)return null;
				field.HappenTo.CleanUp();
				return field.HappenTo.IsCleaned()?'IDLE':'BROKEN';
			},
		},
		'UP':{
			OnStart:(ctrl,proc)=>{
				try{
					priv_a.wait=[]
					field.OnOpen(agent);

					// up dependencles too 
					if(field.Dependencies){
						Util.SafeDictIter(field.Dependencies,(k,h)=>{
							h.Open();
							priv_a.wait.push({
								Label:'Depends '+h.GetAgent().Name,
								Chk:()=>h.IsReady(),
							});
						});
					}
				}
				catch(e){
					field.HappenTo.Happen(e,{
						Class:'YgEs.Agent',
						Cause:'ThrownFromCallback',
						Info:agent.GetInfo('OnOpen'),
					});
				}
			},
			OnPollInKeep:(ctrl,proc)=>{
				if(priv_a.opencount<1 || priv_a.restart)return 'DOWN';

				// wait for delendencies 
				let cont=[]
				for(let d of priv_a.wait){
					try{
						if(d.Chk(d.Prop))continue;
						cont.push(d);
					}
					catch(e){
						field.HappenTo.Happen(e,{
							Class:'YgEs.Agent',
							Cause:'ThrownFromCallback',
							Info:agent.GetInfo('wait for up'),
						});
					}
				}
				priv_a.wait=cont;
				if(!field.HappenTo.IsCleaned())return 'DOWN';
				if(priv_a.wait.length<1)return 'HEALTHY';
			},
			OnEnd:(ctrl,proc)=>{
				if(ctrl.GetNextState()=='HEALTHY'){
					try{
						// mark ready before callback 
						priv_a.ready=true;
						field.OnReady(agent);
					}
					catch(e){
						field.HappenTo.Happen(e,{
							Class:'YgEs.AgentError',
							Cause:'ThrownFromCallback',
							Info:agent.GetInfo('OnReady'),
						});
					}
				}
			},
		},
		'HEALTHY':{
			OnPollInKeep:(ctrl,proc)=>{
				if(priv_a.opencount<1 || priv_a.restart){
					priv_a.ready=false;
					return 'DOWN';
				}
				if(!field.HappenTo.IsCleaned())return 'TROUBLE';

				try{
					field.OnPollInHealthy(agent);
				}
				catch(e){
					field.HappenTo.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:agent.GetInfo('OnPollInHealthy'),
					});
					return 'TROUBLE';
				}
			},
		},
		'TROUBLE':{
			OnStart:(ctrl,proc)=>{
				try{
					field.OnTrouble(agent);
				}
				catch(e){
					field.HappenTo.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:agent.GetInfo('OnTrouble'),
					});
				}
			},
			OnPollInKeep:(ctrl,proc)=>{
				if(priv_a.opencount<1 || priv_a.restart){
					priv_a.ready=false;
					return 'DOWN';
				}
				field.HappenTo.CleanUp();
				if(field.HappenTo.IsCleaned())return 'HEALTHY';

				try{
					let c=field.HappenTo.CountIssues();
					field.OnPollInTrouble(agent);
					if(c<field.HappenTo.CountIssues())return 'HALT';
				}
				catch(e){
					field.HappenTo.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:agent.GetInfo('OnPollInTrouble'),
					});
					return 'HALT';
				}
			},
			OnEnd:(ctrl,proc)=>{
				if(ctrl.GetNextState()=='HEALTHY'){
					try{
						field.OnRecover(agent);
					}
					catch(e){
						field.HappenTo.Happen(e,{
							Class:'YgEs.AgentError',
							Cause:'ThrownFromCallback',
							Info:agent.GetInfo('OnRecover'),
						});
					}
				}
			},
		},
		'HALT':{
			OnStart:(ctrl,proc)=>{
				priv_a.halt=true;

				try{
					field.OnHalt(agent);
				}
				catch(e){
					field.HappenTo.Happen(e,{
						Class:'YgEs.AgentError',
						Cause:'ThrownFromCallback',
						Info:agent.GetInfo('OnHalt'),
					});
				}
			},
			OnPollInKeep:(ctrl,proc)=>{
				if(priv_a.opencount<1 || priv_a.restart){
					priv_a.ready=false;
					return 'DOWN';
				}
				field.HappenTo.CleanUp();
				if(field.HappenTo.IsCleaned())return 'HEALTHY';
			},
			OnEnd:(ctrl,proc)=>{
				priv_a.halt=false;

				if(ctrl.GetNextState()=='HEALTHY'){
					try{
						field.OnRecover(agent);
					}
					catch(e){
						field.HappenTo.Happen(e,{
							Class:'YgEs.AgentError',
							Cause:'ThrownFromCallback',
							Info:agent.GetInfo('OnRecover'),
						});
					}
				}
			},
		},
	}

	let agent=YgEs.SoftClass(field.Name+'.Worker',field.User);

	let priv_a=agent.Extend('YgEs.Agent',{
		// private 
		opencount:0,
		ctrl:null,
		ready:false,
		halt:false,
		restart:false,
		aborted:false,
		wait:[],
	},{
		// public 
		IsOpen:()=>priv_a.opencount>0,
		IsBusy:()=>!!priv_a.ctrl || priv_a.opencount>0,
		IsReady:()=>priv_a.ready && priv_a.opencount>0,
		IsHalt:()=>priv_a.halt,
		GetState:()=>priv_a.ctrl?priv_a.ctrl.GetCurState():'NONE',
		GetInfo:(site='')=>{
			let r={
				Name:field.Name,
				CrashSite:site,
				State:priv_a.ctrl?priv_a.ctrl.GetCurState():'NONE',
				Busy:!!priv_a.ctrl,
				Ready:priv_a.ready,
				Halt:priv_a.halt,
				Aborted:priv_a.aborted,
				Restarting:priv_a.restart,
				Handles:priv_a.opencount,
				User:field.User,
				Waiting:[],
				Happening:field.HappenTo.GetInfo(),
			}
			for(let w of priv_a.wait)r.Waiting.push({Label:w.Label,Prop:w.Prop});
			return r;
		},

		GetLogger:()=>field.Log,
		GetLauncher:()=>{return field.Launcher;},
		GetHappeningManager:()=>{return field.HappenTo;},
		GetDependencies:()=>{return field.Dependencies;},

		WaitFor:(label,cb_chk,prop={})=>{
			priv_a.wait.push({Label:label,Chk:cb_chk,Prop:prop});
		},
		Restart:()=>{priv_a.restart=true;},

		Fetch:()=>{
			return handle(agent);
		},
		Open:()=>{
			let h=agent.Fetch();
			h.Open();
			return h;
		},
	});

	let ctrlopt={
		Name:field.Name+'.StateMachine',
		Log:field.Log,
		HappenTo:field.HappenTo,
		Launcher:field.Launcher,
		User:field.User,
		OnDone:(proc)=>{
			priv_a.ctrl=null;
			priv_a.aborted=false;
			if(field.OnFinish)field.OnFinish(agent,field.HappenTo.IsCleaned());
		},
		OnAbort:(proc)=>{
			priv_a.ctrl=null;
			priv_a.aborted=true;
			if(field.OnAbort)field.OnAbort(agent);
		},
	}

	let handle=(w)=>{

		let h=YgEs.SoftClass(field.Name+'.Handle');
		let priv_h=h.Extend('YgEs.Handle',{
			// private
			in_open:false,
		},{
			// public
			GetAgent:()=>{return agent;},
			GetLogger:()=>agent.GetLogger(),
			GetLauncher:()=>agent.GetLauncher(),
			GetHappeningManager:()=>agent.GetHappeningManager(),
			GetDependencies:()=>agent.GetDependencies(),

			IsOpenHandle:()=>priv_h.in_open,
			IsOpenAgent:()=>agent.IsOpen(),
			IsBusy:()=>agent.IsBusy(),
			IsReady:()=>agent.IsReady(),
			IsHalt:()=>agent.IsHalt(),
			GetState:()=>agent.GetState(),

			Restart:()=>agent.Restart(),

			Open:()=>{
				if(!priv_h.in_open){
					priv_h.in_open=true;
					++priv_a.opencount;
				}
				if(!priv_a.ctrl){
					priv_a.ctrl=StateMachine.Run('IDLE',states,ctrlopt);
					const stmac_GetInfo=priv_a.ctrl.Inherit('GetInfo',()=>{
						return {
							Agent:agent.GetInfo('StMacInfo'),
							StMac:stmac_GetInfo(),
						}
					});
				}
			},
			Close:()=>{
				if(!priv_h.in_open)return;
				priv_h.in_open=false;
				--priv_a.opencount;
			},
		});

		for(let n of field.AgentBypasses){
			h[n]=(...args)=>{
				if(!h.IsReady()){
					h.GetLogger().Notice('not ready');
					return null;
				}
				return agent[n].call(null,...args);
			}
		}
		for(let n of field.UserBypasses){
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
	Launch:(field)=>{return _standby(field).Fetch();},
	Run:(field)=>{return _standby(field).Open();},
}

})();

// Quick HyperText for web -------------- //
(()=>{ // local namespace 

YgEs.ToQHT=(el,name=undefined,user=undefined)=>{

	let qht=YgEs.SoftClass(name,user);
	qht.Extend('YgEs.QHT.Unit',{
		// private 
	},{
		// public 
		_yges_qht_:true,
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
	});

	return qht;
}

YgEs.NewQHT=(prm)=>{

	if(!prm.Tag)return null;

	prm=YgEs.Validate(prm,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Target:{Class:'YgEs.QHT.Unit',Nullable:true},
		Tag:{Literal:true},
		Attr:{Dict:{Literal:true,Numeric:true}},
		Style:{Dict:{Literal:true}},
		Sub:{List:true},
	}},'prm');

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

	return YgEs.ToQHT(el,prm.Name,prm.User);
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
					OnPollInKeep:(smc,proc)=>{
						ctx.Loader=plugs[type].OnStart(url,(src)=>{
							ctx.Source=src;
							if(ctx.View)ctx.View.Apply();
							proc.User.Loaded=true;
						},(hap)=>{
							proc.User.Happening=hap;
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
					OnPollInKeep:(smc,proc)=>{
						if(proc.User.Happening)return 'Failure';
						if(ctx.View)ctx.View.Progress(ctx.Loader.Progress);
						if(!proc.User.Loaded)return;
						return 'WaitDeps';
					},
				},
				'WaitDeps':{
					OnPollInKeep:(smc,proc)=>{
						for(let dep of depends){
							if(ctrl.Ready[dep]===undefined)return;
						}
						return 'Apply';
					},
				},
				'Apply':{
					OnReady:(smc,proc)=>{
						plugs[type].OnInit(ctx.Source,(res)=>{
							ctrl.Ready[label]=res;
							proc.User.Ready=true;
							if(ctx.View)ctx.View.Done();
						},(hap)=>{
							let msg=hap.ToString();
							if(ctx.View)ctx.View.Happen(msg,()=>{
								ctx.Loader=hap.User.Retry();
							});
						});
					},
					OnPollInKeep:(smc,proc)=>{
						if(proc.User.Happening)return 'Failure';
						if(proc.User.Ready)return true;
					},
				},
				'Failure':{
					OnPollInKeep:(smc,proc)=>{
						if(proc.User.Happening.IsResolved()){
							proc.User.Happening=null;
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
