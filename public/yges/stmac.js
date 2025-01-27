﻿// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

// StateMachine ------------------------- //
(()=>{ // local namespace 

const Engine=YgEs.Engine;
const HappeningManager=YgEs.HappeningManager;

function _run(start,states={},opt={}){

	let launcher=opt.Launcher??Engine;
	let cur=null;

	let name=opt.Name??'YgEs.StateMachine';
	let happen=opt.HappenTo??HappeningManager;
	let user=opt.User??{};

	let state_prev=null;
	let state_cur=null;
	let state_next=start;

	let ctrl={
		name:name+'_Control',
		User:user,
		GetHappeningManager:()=>happen,
		GetPrevState:()=>state_prev,
		GetCurState:()=>state_cur,
		GetNextState:()=>state_next,
	}

	let GetInfo=(phase)=>{
		return {
			Name:name,
			Prev:state_prev,
			Cur:state_cur,
			Next:state_next,
			Phase:phase,
			User:user,
		}
	}

	let poll_nop=(user)=>{}
	let poll_cur=poll_nop;

	let call_start=(user)=>{
		if(state_next==null){
			// normal end 
			cur=null;
			poll_cur=poll_nop;
			return;
		}
		cur=states[state_next]??null;
		if(!cur){
			happen.HappenProp({
				Class:'YgEs_Statemachine_Error',
				Cause:'state missing: '+state_next,
				Info:GetInfo('selecing'),
			});
			poll_cur=poll_nop;
			return;
		}
		state_prev=state_cur;
		state_cur=state_next;
		state_next=null;
		try{
			if(cur.OnStart)cur.OnStart(ctrl,user);
			poll_cur=poll_up;
		}
		catch(e){
			happen.HappenProp({
				Class:'YgEs_Statemachine_Error',
				Cause:'throw from a callback',
				Info:GetInfo('cb_start'),
				Err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
			return;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_up=(user)=>{
		try{
			var r=cur.OnPollInUp?cur.OnPollInUp(ctrl,user):true;
		}
		catch(e){
			happen.HappenProp({
				Class:'YgEs_Statemachine_Error',
				Cause:'throw from a callback',
				Info:GetInfo('poll_up'),
				Err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			try{
				// normal transition 
				if(cur.OnReady)cur.OnReady(ctrl,user);
				poll_cur=poll_keep;
			}
			catch(e){
				happen.HappenProp({
					Class:'YgEs_Statemachine_Error',
					Cause:'throw from a callback',
					Info:GetInfo('cb_ready'),
					Err:YgEs.FromError(e),
				});
				poll_cur=poll_nop;
				return;
			}
			// can try extra polling 
			poll_cur(user);
		}
		else{
			// interruption 
			state_next=r.toString();
			call_end(user);
		}
	}
	let poll_keep=(user)=>{
		try{
			var r=cur.OnPollInKeep?cur.OnPollInKeep(ctrl,user):true;
		}
		catch(e){
			happen.HappenProp({
				Class:'YgEs_Statemachine_Error',
				Cause:'throw from a callback',
				Info:GetInfo('poll_keep'),
				Err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			// normal end 
			state_next=null;
			call_stop(user);
		}
		else{
			// normal transition 
			state_next=r.toString();
			call_stop(user);
		}
	}
	let call_stop=(user)=>{
		try{
			if(cur.OnStop)cur.OnStop(ctrl,user);
			poll_cur=poll_down;
		}
		catch(e){
			happen.HappenProp({
				Class:'YgEs_Statemachine_Error',
				Cause:'throw from a callback',
				Info:GetInfo('cb_stop'),
				Err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
			return;
		}
		// can try extra polling 
		poll_cur(user);
	}
	let poll_down=(user)=>{
		try{
			var r=cur.OnPollInDown?cur.OnPollInDown(ctrl,user):true;
		}
		catch(e){
			happenHappenProp({
				Class:'YgEs_Statemachine_Error',
				Cause:'throw from a callback',
				Info:GetInfo('poll_down'),
				Err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
			return;
		}
		if(r==null)return; // continuing 
		else if(r===false)proc.Abort();
		else if(r===true){
			// normal transition 
			call_end(user);
		}
		else{
			// interruption 
			state_next=r.toString();
			call_end(user);
		}
	}
	let call_end=(user)=>{
		try{
			if(cur.OnEnd)cur.OnEnd(ctrl,user);
			call_start(user);
		}
		catch(e){
			happen.HappenProp({
				Class:'YgEs_Statemachine_Error',
				Cause:'throw from a callback',
				Info:GetInfo('cb_end'),
				Err:YgEs.FromError(e),
			});
			poll_cur=poll_nop;
			return;
		}
	}

	let stmac={
		Name:name,
		HappenTo:happen,
		User:user,

		OnStart:(user)=>{
			call_start(user);
		},
		OnPoll:(user)=>{
			poll_cur(user);
			return !!cur;
		},
		OnDone:opt.OnDone??'',
		OnAbort:opt.OnAbort??'',
	}

	let proc=launcher.Launch(stmac);
	proc.GetInfo=()=>GetInfo('');
	ctrl.IsStarted=proc.IsStarted;
	ctrl.IsFinished=proc.IsFinished;
	ctrl.IsAborted=proc.IsAborted;
	ctrl.IsEnd=proc.IsEnd;
	ctrl.Abort=proc.Abort;
	ctrl.Sync=proc.Sync;
	ctrl.ToPromise=proc.ToPromise;
	return ctrl;
}

YgEs.StateMachine={
	name:'YgEs_StateMachineContainer',
	User:{},

	Run:_run,
}

})();
