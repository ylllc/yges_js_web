// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

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
