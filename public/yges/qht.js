// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Quick HyperText for web -------------- //
(()=>{ // local namespace 

YgEs.ToQHT=(el)=>{

	let qht={
		name:'YgEs.QuickHyperText',
		_yges_qht_:true,
		User:{},
		Element:el,

		Remove:()=>{
			qht.Element.remove();
			qht.Element=null;
		},
		Clear:()=>{
			if(!qht.Element)return;
			qht.Element.innerHTML='';
		},
		Append:(src)=>{
			if(!qht.Element)return;
			if(src==null)return;
			if(typeof src==='object'){
				if(src._yges_qht_)qht.Element.append(src.Element);
				else qht.Element.append(src);
			}
			else qht.Element.innerHTML+=src;
		},
		Replace:(src)=>{
			if(!qht.Element)return;
			qht.Element.innerHTML='';
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
			else el.innerHTML+=t;
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
