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

YgEs.CoreError=(src,prop={})=>{

	if(YgEs.HappeningManager)YgEs.HappeningManager.Happen(src,prop);
	else throw src;
}

YgEs.CoreWarn=(src,prop={})=>{

	if(YgEs.HappeningManager)YgEs.HappeningManager.Happen(src,prop);
	else if(YgEs.Log)YgEs.Log.Warn(src,prop);
	else{
		console.warn(src);
		console.dir(prop);
	}
}

YgEs.SoftClass=()=>{

	const name='YgEs.SoftClass';
	let priv_idx={}

	const entrait=(name,priv,pub)=>{

		if(priv_idx[name]){
			YgEs.CoreWarn('** '+name+' already exists in class table of '+inst.GetCaption()+' **',Object.keys(priv_idx));
		}

		let t=priv?priv:{}
		priv_idx[name]=t;
		if(pub)Object.assign(inst,pub);
		return t;
	}

	let inst={
		Name:undefined,
		User:{},
		_class_:name,
		_genealogy_:[],
		_private_:YgEs.ShowPrivate?priv_idx:{},
		GetCaption:()=>inst.Name??inst._class_,
		GetClassName:()=>inst._class_,
		GetGenealogy:()=>inst._genealogy_,
		IsComprised:(name)=>!!priv_idx[name],
		Trait:(name,priv=null,pub=null)=>{
			let t=entrait(name,priv,pub);
			priv_cur._trait_.push({_class_:name,_user_:t});
			return t;
		},
		Extend:(name,priv=null,pub=null)=>{

			let t=entrait(name,priv,pub);
			let pn=inst._class_;
			inst._class_=name;
			inst._genealogy_.push(name);
			priv_cur={_class_:name,_parent_:priv_cur,_trait_:[],_super_:{},_user_:t}
			if(YgEs.ShowPrivate)inst._inherit_=priv_cur;
			return t;
		},
		Inherit:(symbol,override)=>{
			if(priv_cur._super_[symbol]){
				YgEs.CoreWarn('** '+symbol+' already exists in inheritance table of '+inst.GetCaption()+' **',priv_cur._super_);
			}

			const dst=priv_cur._super_[symbol]=inst[symbol];
			inst[symbol]=override;
			return dst;
		},
	}
	let priv_cur={_class_:name,_trait_:[],_super_:{},_user_:entrait(name)}
	if(YgEs.ShowPrivate){
		inst._inherit_=priv_cur;
		inst._private_=priv_idx;
	}

	return inst;
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
