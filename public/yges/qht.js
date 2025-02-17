// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

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
