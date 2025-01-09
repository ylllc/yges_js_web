// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// Download Monitor --------------------- //
(()=>{ // local namespace 

function _setup(target,show){

	let visible=false;
	let view=YgEs.NewQHT({Target:target,Tag:'div',Attr:{class:'yges_loadmon_view'}});
	let tbl=YgEs.NewQHT({Tag:'table',Attr:{class:'yges_loadmon_table',border:'border'}});
	let head=YgEs.NewQHT({Target:tbl,Tag:'tr',Attr:{class:'yges_loadmon_thr'},Sub:[
		YgEs.NewQHT({Tag:'th',Attr:{class:'yges_loadmon_th_type'},Sub:['Type']}),
		YgEs.NewQHT({Tag:'th',Attr:{class:'yges_loadmon_th_name'},Sub:['Name']}),
		YgEs.NewQHT({Tag:'th',Attr:{class:'yges_loadmon_th_cond'},Sub:['Cond']}),
	]});

	let ctrl={
		IsVisible:()=>visible,
		Dispose:()=>{
			view.Remove();
			view=null;
			tbl=null;
			head=null;
			ctrl=null;
		},
		Hide:()=>{
			if(!visible)return;
			visible=false;
			view.Clear();
		},
		Show:()=>{
			if(visible)return;
			visible=true;
			view.Clear();
			view.Append(tbl);
		},
		Detach:(view)=>{
			view.Row.Remove();
		},
		Attach:(ctx)=>{
			let v_row={
			}

			v_row.Row=YgEs.NewQHT({Target:tbl,Tag:'tr'});
			YgEs.NewQHT({Target:v_row.Row,Tag:'td',Sub:[ctx.Type]});
			YgEs.NewQHT({Target:v_row.Row,Tag:'td',Sub:[ctx.Label]});
			v_row.Cond=YgEs.NewQHT({Target:v_row.Row,Tag:'td'});
			v_row.Meter=YgEs.NewQHT({Target:v_row.Cond,Tag:'meter',Attr:{min:0,max:100,value:0}});
			v_row.Msg=YgEs.NewQHT({Target:v_row.Cond,Tag:'span'});

			v_row.Progress=(val)=>{
				v_row.Meter.Element.setAttribute('value',val*100);
			},
			v_row.Apply=()=>{
				v_row.Msg.Replace('(applying)');
			};
			v_row.Done=()=>{
				v_row.Msg.Replace('[OK]');
			};
			v_row.Happen=(msg,cb_retry)=>{
				v_row.Msg.Replace(msg);
				let btn=YgEs.NewQHT({Target:v_row.Msg,Tag:'button',Sub:['Retry']});
				btn.Element.onclick=()=>{
					cb_retry();
				}
			};
			v_row.Unload=()=>{
				v_row.Msg.Replace('(unloading)');
			};

			return v_row;
		},
	}
	if(show)ctrl.Show();
	return ctrl;
}

YgEs.DownloadMonitor={
	SetUp:_setup,
}

})();
