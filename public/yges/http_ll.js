// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024 Yggdrasil Leaves, LLC.          //
//        All rights reserved.            //

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
