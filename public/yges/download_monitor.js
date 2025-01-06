// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Download Monitor --------------------- //
(()=>{ // local namespace 

function _setup(target,show){

	let visible=false;
	let view=YgEs.newQHT({target:target,tag:'div',attr:{class:'yges_loadmon_view'}});
	let tbl=YgEs.newQHT({tag:'table',attr:{class:'yges_loadmon_table',border:'border'}});
	let head=YgEs.newQHT({target:tbl,tag:'tr',attr:{class:'yges_loadmon_thr'},sub:[
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadmon_th_type'},sub:['Type']}).Element,
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadmon_th_name'},sub:['Name']}).Element,
		YgEs.newQHT({tag:'th',attr:{class:'yges_loadmon_th_cond'},sub:['Cond']}).Element,
	]});

	let ctrl={
		isVisible:()=>visible,
		dispose:()=>{
			view.remove();
			view=null;
			tbl=null;
			head=null;
			ctrl=null;
		},
		hide:()=>{
			if(!visible)return;
			visible=false;
			view.clear();
		},
		show:()=>{
			if(visible)return;
			visible=true;
			view.clear();
			view.append(tbl.Element);
		},
		detach:(view)=>{
			view.row.remove();
		},
		attach:(ctx)=>{
			let v_row={
			}

			v_row.row=YgEs.newQHT({target:tbl,tag:'tr'});
			YgEs.newQHT({target:v_row.row,tag:'td',sub:[ctx.type]});
			YgEs.newQHT({target:v_row.row,tag:'td',sub:[ctx.label]});
			v_row.cond=YgEs.newQHT({target:v_row.row,tag:'td'});
			v_row.meter=YgEs.newQHT({target:v_row.cond,tag:'meter',attr:{min:0,max:100,value:0}});
			v_row.msg=YgEs.newQHT({target:v_row.cond,tag:'span'});

			v_row.progress=(val)=>{
				v_row.meter.Element.setAttribute('value',val*100);
			},
			v_row.apply=()=>{
				v_row.msg.replace('(applying)');
			};
			v_row.done=()=>{
				v_row.msg.replace('[OK]');
			};
			v_row.happen=(msg,cb_retry)=>{
				v_row.msg.replace(msg);
				let btn=YgEs.newQHT({target:v_row.msg,tag:'button',sub:['Retry']});
				btn.Element.onclick=()=>{
					cb_retry();
				}
			};
			v_row.unload=()=>{
				v_row.msg.replace('(unloading)');
			};

			return v_row;
		},
	}
	if(show)ctrl.show();
	return ctrl;
}

YgEs.DownloadMonitor={
	setup:_setup,
}

})();
