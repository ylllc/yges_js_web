// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2025 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

// Object View -------------------------- //
(()=>{ // local namespace 

// view type 
const _type_names=Object.freeze(['FRAME','VALUE','TEXT','PAIR','PROP','ARRAY']);
// make reverse lookup 
const _type_lookup=Object.freeze(YgEs.CreateEnum(_type_names));

function _setControl(view,key,src,bridge,type,parent){

	let key1=key;
	view.GetViewType=()=>type;
	view.GetKey=()=>key1;
	view.GetValue=()=>src;
	view.GetParent=()=>parent;

	view._renumber=(k)=>{key1=k;}
	view._change=(v)=>{src=v;}

	const remove_view=view.Remove;
	view.Remove=()=>{
		view.Deactivate();
		remove_view();
		if(key1!=null)parent._cutoff(key1);
	}
	view.Replace=(src)=>{
		if(parent)parent._replace(key1,src);
	}
	view.Rename=(key2)=>{
		if(parent)parent._rename(key1,key2);
	}
	view.Insert=(src)=>{
		if(parent)parent._insert(key1,src);
	}

	view.Activate=()=>{
		if(view==bridge.Focus)return;
		if(bridge.Focus)bridge.Focus.Deactivate();
		bridge.Focus=view;
		bridge.OnActive(view);
	}
	view.Deactivate=()=>{
		if(view!=bridge.Focus)return;
		bridge.OnDeactive(view);
		bridge.Focus=null;
	}

	view.Element.onclick=(ev)=>{
		// don't call parent onclick 
		ev.stopPropagation();

		view.Activate();
	}

	return view;
}

function _build_value(view,key,src,bridge){

	let view2=YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:bridge.StylePrefix+'_value'},Sub:[YgEs.Inspect(src)]});
	return _setControl(view2,key,src,bridge,_type_lookup.VALUE,view);
}

function _build_text(view,key,src,bridge){

	let large=src.length>bridge.StringBorder;
	let view2=YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:bridge.StylePrefix+(large?'_text':'_value')},Sub:[YgEs.Inspect(src)]});
	return _setControl(view2,key,src,bridge,_type_lookup.TEXT,view);
}

function _build_array(view,key,src,bridge){

	let view2=YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:bridge.StylePrefix+'_array'}});
	let ref=[]

	for(let k=0;k<src.length;++k){
		let v=src[k];
		let poly=YgEs.Util.IsPoly(v);
		ref[k]=_build(view2,k,v,bridge);
	}

	view2.Push=(val)=>{
		src.push(val);
		ref.push(_build(view2,ref.length,val,bridge));
	}
	view2._cutoff=(key)=>{
		ref.splice(key,1);
		src.splice(key,1);
		for(let i=key;i<ref.length;++i)ref[i]._renumber(i);
	}
	view2._replace=(key,val)=>{
		src[key]=val;
		let view3=_build(view2,key,val,bridge);
		ref[key]._change(val);
		ref[key].Element.innerHTML=view3.Element.innerHTML;
		view3.Element.remove();
	}
	view2._insert=(key,val)=>{
		src.splice(key,0,val);
		let view3=_build(view2,ref.length,val,bridge);
		ref.push(view3);
		let back=view3.Element.innerHTML;
		for(let i=ref.length-1;i>key;--i){
			ref[i]._change(src[i]);
			ref[i].Element.innerHTML=ref[i-1].Element.innerHTML;
		}
		ref[key]._change(src[key]);
		ref[key].Element.innerHTML=back;
	}

	return _setControl(view2,key,src,bridge,_type_lookup.ARRAY,view);
}

function _build_prop(view,key,src,bridge){

	let view2=YgEs.NewQHT({Target:view,Tag:'span',Attr:{class:bridge.StylePrefix+'_prop'}});
	let ref={}

	const setChild=(k,v)=>{
		let view3=YgEs.NewQHT({Target:view2,Tag:'span',Attr:{class:bridge.StylePrefix+'_pair'}});

		view3.KeyView=YgEs.NewQHT({Target:view3,Tag:'span',Attr:{class:bridge.StylePrefix+'_key'},Sub:[k]});
		view3.ValView=_build(view3,k,v,bridge);
		_setControl(view3,k,v,bridge,_type_lookup.PAIR,view2);
		view3._cutoff=(key)=>{view3.Remove();}
		view3._replace=(key,val)=>{view2._replace(key,val);}
		ref[k]=view3;
	}

	for(let k in src){
		let v=src[k];
		setChild(k,v);
	}

	view2.Register=(key)=>{
		if(ref[key])return;
		setChild(key,undefined);
	}
	view2._cutoff=(key)=>{
		delete ref[key]
		delete src[key]
	}
	view2._rename=(key1,key2)=>{

		if(ref[key2]){
			ref[key2].Remove();
			delete ref[key2]
		}

		ref[key2]=ref[key1];
		delete ref[key1];
		ref[key2].KeyView.Element.innerText=key2;

		let back=src[key1];
		delete src[key1]
		src[key2]=back;
	}
	view2._replace=(key,val)=>{
		let view3=ref[key];
		view3.ValView.Element.remove();
		view3.ValView=_build(view3,key,val,bridge);
		_setControl(view3,key,val,bridge,_type_lookup.PAIR,view2);
		src[key]=val;
	}

	return _setControl(view2,key,src,bridge,_type_lookup.PROP,view);
}

function _build(view,key,src,bridge){

	if(src===null)return _build_value(view,key,src,bridge);
	else if(Array.isArray(src))return _build_array(view,key,src,bridge);
	else switch(typeof src){
		case 'object': return _build_prop(view,key,src,bridge);
		case 'string': return _build_text(view,key,src,bridge);
		default: return _build_value(view,key,src,bridge);
	}
}

YgEs.ObjView={
	Name:'YgEs.ObjView',
	User:{},

	TYPE:_type_lookup,
	TYPE_NAMES:_type_names,

	SetUp:(target,src,opt={})=>{
		let bridge={
			StringBorder:opt.StringBorder??50,
			StylePrefix:opt.StylePrefix??'yges_objview',
			Focus:null,
			OnActive:opt.OnActive??(()=>{}),
			OnDeactive:opt.OnDeactive??(()=>{}),
		}

		let view=YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:bridge.StylePrefix+'_frame'}});
		_build(view,null,src,bridge);
		_setControl(view,null,src,bridge,_type_lookup.FRAME,null);
		view._replace=(key,val)=>{
			view.Clear();
			_build(view,null,val,bridge);
			_setControl(view,null,val,bridge,_type_lookup.FRAME,null);
		}

		view.GetStringBorder=()=>bridge.StringBorder;

		return view;
	},
}

})();
