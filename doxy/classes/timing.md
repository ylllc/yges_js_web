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
# Types

-----
## AsyncProc {#AsyncProc}

typical async procedure

### Args

| Name | Type | Means |
|------|------|-------|
| ok | func<any> | call on done |
| ng | func<Error> | call on failed |

-----
## AsyncControl {#AsyncControl}

| Name | Type | Means |
|------|------|-------|
| cancel | func | cancel source procedure |
| promise | func:Promise | convert to a Promise |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | object | user definitions |

-----
# Methods

-----
## fromPromise(promise,cb_ok=null,cb_ng=null):Promise

wait for a Promise.  

### Args

| Name | Type | Means |
|------|------|-------|
| promise | Promise | waiting source |
| cb_ok | func<any> | call on done |
| cb_ng | func<Error> | call on error |

### Returns

socketting Promise

-----
## toPromise(cb_proc,cb_ok=null,cb_ng=null):Promise

convert to a Promise

| Name | Type | Means |
|------|------|-------|
| cb_proc | @ref AsyncProc | waiting source |
| cb_ok | func<any> | call on done |
| cb_ng | func<Error> | call on error |

### Returns

wrapped Promise

-----
## delay(msec,cb_done,cb_abort=null):func

call cb_done after about msec.  

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_done | func | calling target |
| cb_abort | func | call on abort |

### Returns

aborting function

-----
## poll(msec,cb_poll,cb_abort=null):func

call cb_poll repeatedly every about msec.  

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_poll | func | calling target |
| cb_abort | func | call on abort |

### Returns

aborting function

-----
## sync(msec,cb_chk,cb_done=null,cb_abort=null):func

wait for cb_chk returns true.  

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
## delayKit(msec,cb_done=null,cb_abort=null):AsyncControl

call cb_done after about msec.  

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_done | func | calling target |
| cb_abort | func | call on abort |

### Returns

control kit instance

-----
## syncKit(msec,cb_chk,cb_done,cb_abort):AsyncControl

wait for cb_chk returns true.  

### Args

| Name | Type | Means |
|------|------|-------|
| msec | int | waiting in msec |
| cb_chk | func:bool | calling repeatedly until returns true |
| cb_done | func | called on cb_chk returns true |
| cb_abort | func | called on aborted |

### Returns

control kit instance
