// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2025 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

// GUI Utilities ------------------------ //
(()=>{ // local namespace 

YgEs.GUI={
	User:{},
}

YgEs.GUI.Button=(target,label,opt={})=>{

	let a={}
	if(opt.Class)a.class=opt.Class;
	let view=YgEs.NewQHT({Target:target,Tag:'button',Attr:a,Sub:[label]});
	if(opt.OnClick)view.Element.onclick=()=>opt.OnClick(view.User);
	if(opt.User)view.User=opt.User;
	return view;
}

YgEs.GUI.Toggle=(target,label,init,opt={})=>{

	let cur=init;
	let class_off=opt.OffClass;
	let class_on=opt.OnClass;

	const setStyle=()=>{
		if(cur){
			if(class_on)view.Element.setAttribute('class',class_on);
			else view.Element.style['background-color']='#ce4';
		}
		else{
			if(class_off)view.Element.setAttribute('class',class_off);
			else view.Element.style['background-color']='#888';
		}
	}

	let view=YgEs.GUI.Button(target,label,{
		OnClick:(user)=>{
			let ok=true;
			if(view.OnChanging)ok=view.OnChanging(!cur);
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
	if(opt.User)view.User=opt.User;
	return view;
}

YgEs.GUI.Radio=(target,items,opt={})=>{

	let attr={}
	if(opt.WindowClass)attr.class=opt.WindowClass;
	let view=YgEs.NewQHT({Target:target,Tag:'div',Attr:attr});
	if(opt.User)view.User=opt.User;

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
		o.OnChanging=(side)=>{
			if(side){
				if(view.OnChanging){
					if(!view.OnChanging(cur,val))return false;
				}
				if(ent[cur])ent[cur].View.SetSide(false);
				cur=val;
				return true;
			}
			else{
				if(cur===val){
					if(!nullable)return false;
					if(view.OnChanging){
						if(!view.OnChanging(cur,null))return false;
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

	let attr={}
	if(opt.Class)attr.class=opt.Class;
	let view=YgEs.NewQHT({Target:target,Attr:attr,Tag:'select'});
	if(opt.User)view.User=opt.User;

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
		let v=YgEs.NewQHT({Target:view,Attr:a,Tag:'option',Sub:[lab]});
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
				if(!opt.OnChanging(prev,next.Value))ok=false;
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

	let a={}
	if(opt.Class)a.class=opt.Class;
	let view=YgEs.NewQHT({Target:target,Tag:'dialog',Attr:a,Sub:opt.Sub??[]});
	if(opt.User)view.User=opt.User;

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

	let a={}
	if(opt.Class)a.class=opt.Class;
	let view=YgEs.NewQHT({Target:target,Tag:'div',Attr:a,Style:{display:'none'},Sub:opt.Sub??[]});
	if(opt.User)view.User=opt.User;

	view.Show=()=>{
		view.Element.style.display='block';
	}
	view.Hide=()=>{
		view.Element.style.display='none';
	}
	return view;
}

YgEs.GUI.PopUpMenu=(target,items,opt={})=>{

	let baseopt={}
	if(opt.WindowClass)baseopt.Class=opt.WindowClass;
	if(opt.User)baseopt.User=opt.User;
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
		let view2=YgEs.NewQHT({Target:view,Tag:'button',Attr:a,Sub:[it.Label]});
		view2.Element.onclick=()=>{
			if(onact)onact();
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
