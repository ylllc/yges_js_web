// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

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
