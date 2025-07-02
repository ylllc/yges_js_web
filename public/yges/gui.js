// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2025 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

// GUI Utilities ------------------------ //
(()=>{ // local namespace 

YgEs.GUI={
	Name:'YgEs.GUI',
	User:{},
	_private_:{},
}

YgEs.GUI.Button=(target,label,opt={})=>{

	opt=YgEs.Validate(opt,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Class:{Literal:true},
		OnClick:{Callable:true},
	}},'opt');

	let a={}
	if(opt.Class)a.class=opt.Class;
	let view=YgEs.NewQHT({
		Name:opt.Name,
		User:opt.User,
		Target:target,
		Tag:'button',
		Attr:a,
		Sub:[label],
	});
	if(opt.OnClick)view.Element.onclick=()=>opt.OnClick(view);
	return view;
}

YgEs.GUI.Toggle=(target,label,init,opt={})=>{

	opt=YgEs.Validate(opt,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		OffClass:{Literal:true},
		OnClass:{Literal:true},
		OnChanging:{Callable:true},
	}},'opt');

	let cur=init;

	const setStyle=()=>{
		if(cur){
			if(opt.OnClass)view.Element.setAttribute('class',opt.OnClass);
			else view.Element.style['background-color']='#ce4';
		}
		else{
			if(opt.OffClass)view.Element.setAttribute('class',opt.OffClass);
			else view.Element.style['background-color']='#888';
		}
	}

	let view=YgEs.GUI.Button(target,label,{
		Name:opt.Name,
		User:opt.User,
		OnClick:(btnview)=>{
			let ok=true;
			if(view.OnChanging)ok=view.OnChanging(view,!cur);
			if(ok){
				cur=!cur;
				setStyle();
			}
		},
	});
	view.GetSide=()=>cur;
	view.SetSide=(val)=>{
		cur=val;
		setStyle();
	}

	setStyle();
	if(opt.OnChanging)view.OnChanging=opt.OnChanging;
	return view;
}

YgEs.GUI.Radio=(target,items,opt={})=>{

	opt=YgEs.Validate(opt,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Nullable:{Boolable:true},
		Init:{Literal:true,Numeric:true,Nullable:true},
		WindowClass:{Literal:true},
		OffClass:{Literal:true},
		OnClass:{Literal:true},
		OnChanging:{Callable:true},
	}},'opt');

	let attr={}
	if(opt.WindowClass)attr.class=opt.WindowClass;
	let view=YgEs.NewQHT({
		Name:opt.Name,
		User:opt.User,
		Target:target,
		Tag:'div',
		Attr:attr,
	});

	let nullable=!!opt.Nullable;
	let cur=null;
	let ent={}

	if(!items){}
	else for(let t of items){
		let a={}
		let o={}
		let lab='';
		let val=null;
		let u=null;

		if(t==null){
			continue;
		}
		else if(typeof t!=='object'){
			val=lab=t;
		}
		else if(t.Tag){
			view.Append(YgEs.NewQHT(t));
			continue;
		}
		else{
			if(t.Value!=undefined)val=t.Value;
			lab=t.Label??val;
			u=t.User;
		}

		if(opt.Init!=undefined && opt.Init==val){
			cur=val;
		}
		if(opt.OffClass)o.OffClass=opt.OffClass;
		if(opt.OnClass)o.OnClass=opt.OnClass;
		o.OnChanging=(subview,side)=>{
			if(side){
				if(view.OnChanging){
					if(!view.OnChanging(view,cur,val))return false;
				}
				if(ent[cur])ent[cur].View.SetSide(false);
				cur=val;
				return true;
			}
			else{
				if(cur===val){
					if(!nullable)return false;
					if(view.OnChanging){
						if(!view.OnChanging(view,cur,null))return false;
					}
					cur=null;
					return true;
				}
				else{
					return false;
				}
			}
		}
		let v=YgEs.GUI.Toggle(view,lab,cur===val,o);
		if(u)v.User=u;
		ent[val]={Value:val,View:v}
	}

	if(opt.OnChanging)view.OnChanging=opt.OnChanging;

	view.GetItem=(val)=>ent[val];
	view.GetSelected=()=>cur;
	view.Select=(val)=>{
		if(cur===val)return;
		if(ent[cur])ent[cur].View.SetSide(false);
		if(ent[val])ent[val].View.SetSide(true);
		cur=val;
	}
	view.SetEnabled=(val,side)=>{
		let item=ent[val]
		if(!item)return;
		item.View.Element.disabled=!side;
	}

	return view;
}

YgEs.GUI.Select=(target,items,opt={})=>{

	opt=YgEs.Validate(opt,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Init:{Literal:true,Numeric:true,Nullable:true},
		Class:{Literal:true},
		OnChanging:{Callable:true},
	}},'opt');

	let attr={}
	if(opt.Class)attr.class=opt.Class;
	let view=YgEs.NewQHT({
		Name:opt.Name,
		User:opt.User,
		Target:target,
		Tag:'select',
		Attr:attr,
	});

	let cur=null;
	let ent=[]

	if(!items){}
	else for(let t of items){
		let a={}
		let lab='';
		let u=null;
		if(t==null){
		}
		else if(typeof t!=='object'){
			a.value=lab=t;
		}
		else{
			if(t.Value!=undefined)a.value=t.Value;
			lab=t.Label??a.value;
			u=t.User;
		}

		if(opt.Init!=undefined && opt.Init==a.value){
			cur=a.value;
			a.selected='selected';
		}
		let v=YgEs.NewQHT({
			Target:view,
			Attr:a,
			Tag:'option',
			Sub:[lab]
		});
		if(u)v.User=u;
		ent.push({Value:a.value,View:v});
	}

	if(opt.OnChanging)view.OnChanging=opt.OnChanging;
	let changing=false;
	view.Element.onchange=()=>{
		if(changing)return;
		changing=true;
		let sel=view.Element.selectedIndex;
		let next=ent[sel];
		if(cur!==next.Value){
			let ok=true;
			let prev=cur;
			if(opt.OnChanging){
				if(!opt.OnChanging(view,prev,next.Value))ok=false;
			}
			if(ok)cur=next.Value;
			else view.Element.value=prev;
		}
		changing=false;
	}

	view.GetItem=(val)=>ent[val];
	view.GetSelected=()=>cur;
	view.Select=(val)=>{
		if(cur===val)return;
		changing=true;
		view.Element.value=val;
		cur=val;
		changing=false;
	}

	return view;
}

YgEs.GUI.Dialog=(target,modal,opt={})=>{

	opt=YgEs.Validate(opt,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Class:{Literal:true},
		Sub:{List:true},
	}},'opt');

	let a={}
	if(opt.Class)a.class=opt.Class;
	let view=YgEs.NewQHT({
		Name:opt.Name,
		User:opt.User,
		Target:target,
		Tag:'dialog',
		Attr:a,
		Sub:opt.Sub,
	});

	view.Open=()=>{
		if(modal)view.Element.showModal();
		else view.Element.show();
	}
	view.Close=()=>{
		view.Element.close();
	}
	return view;
}

YgEs.GUI.PopUp=(target,opt={})=>{

	opt=YgEs.Validate(opt,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		Class:{Literal:true},
		Sub:{List:true},
	}},'opt');

	let a={}
	if(opt.Class)a.class=opt.Class;
	let view=YgEs.NewQHT({
		Name:opt.Name,
		User:opt.User,
		Target:target,
		Tag:'div',
		Attr:a,
		Style:{display:'none'},
		Sub:opt.Sub,
	});

	view.Show=()=>{
		view.Element.style.display='block';
	}
	view.Hide=()=>{
		view.Element.style.display='none';
	}
	return view;
}

YgEs.GUI.PopUpMenu=(target,items,opt={})=>{

	opt=YgEs.Validate(opt,{Struct:{
		Name:{Literal:true},
		User:{Struct:true},
		WindowClass:{Literal:true},
		ItemClass:{Literal:true},
		Sub:{List:true},
	}},'opt');

	let baseopt={}
	if(opt.Name)baseopt.Name=opt.Name;
	if(opt.User)baseopt.User=opt.User;
	if(opt.WindowClass)baseopt.Class=opt.WindowClass;
	let view=YgEs.GUI.PopUp(target,baseopt);
	view.Items=[]
	let ref={}

	for(let it of items){
		if(it.Tag){
			view.Append(YgEs.NewQHT(it));
			continue;
		}

		let a={}
		if(opt.ItemClass)a.class=opt.ItemClass;
		let onact=it.OnAction;
		let key=it.Key??it.Label;
		let view2=YgEs.NewQHT({
			Target:view,
			Tag:'button',
			Attr:a,
			Sub:[it.Label],
		});
		view2.Element.onclick=()=>{
			if(onact)onact(view,key);
		}
		view.Items.push(view2);
		ref[key]=view2;
	}

	view.GetItem=(key)=>ref[key];
	view.SetEnabled=(key,side)=>{
		let item=ref[key]
		if(!item)return;
		item.Element.disabled=!side;
	}

	return view
}

})();
