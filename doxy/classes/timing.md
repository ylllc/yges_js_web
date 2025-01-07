@page pg_class_timing Timing

# What's It?

@sa @ref pg_feat_timing @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Timing | global Timing |

-----
# Structures

-----
## AsyncControl {#Timing_AsyncControl}

| Name | Type | Means |
|------|------|-------|
| cancel | func | cancel source procedure |
| promise | func:Promise | convert to a Promise |

-----
# Callbacks

-----
## AsyncProc {#Timing_AsyncProc}

typical async procedure

### Args

| Name | Type | Means |
|------|------|-------|
| ok | func<any> | call on done |
| ng | func<Error> | call on failed |

### Implements

your procedure in async  

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## FromPromise {#Timing_FromPromise}

wait for a Promise.  

### Spec

FromPromise(promise,cb_ok=null,cb_ng=null):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| promise | Promise | waiting source |
| cb_ok | func<any> | call on done |
| cb_ng | func<Error> | call on error |

### Returns

socketting Promise

-----
## ToPromise {#Timing_ToPromise}

convert to a Promise

### Spec

ToPromise(cb_proc,cb_ok=null,cb_ng=null):Promise

| Name | Type | Means |
|------|------|-------|
| cb_proc | @ref AsyncProc | waiting source |
| cb_ok | func<any> | call on done |
| cb_ng | func<Error> | call on error |

### Returns

wrapped Promise

-----
## Delay {#Timing_Delay}

call cb_done after about msec.  

### Spec

Delay(msec,cb_done,cb_abort=null):func

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_done | func | calling target |
| cb_abort | func | call on abort |

### Returns

aborting function

-----
## Poll {#Timing_Poll}

call cb_poll repeatedly every about msec.  

### Spec

Poll(msec,cb_poll,cb_abort=null):func

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_poll | func | calling target |
| cb_abort | func | call on abort |

### Returns

aborting function

-----
## Sync {#Timing_Sync}

wait for cb_chk returns true.  

### Spec

Sync(msec,cb_chk,cb_done=null,cb_abort=null):func

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_chk | func:bool | calling repeatedly until returns true |
| cb_done | func | called on cb_chk returns true |
| cb_abort | func | called on aborted |

### Returns

aborting function

-----
## DelayKit {#Timing_DelayKit}

call cb_done after about msec.  

### Spec

DelayKit(msec,cb_done=null,cb_abort=null):AsyncControl

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_done | func | calling target |
| cb_abort | func | call on abort |

### Returns

control kit instance

-----
## SyncKit {#Timing_SyncKit}

wait for cb_chk returns true.  

### Spec

SyncKit(msec,cb_chk,cb_done,cb_abort):AsyncControl

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_chk | func:bool | calling repeatedly until returns true |
| cb_done | func | called on cb_chk returns true |
| cb_abort | func | called on aborted |

### Returns

control kit instance
