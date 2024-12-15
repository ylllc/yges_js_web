@page pg_class_timing Timing

# What's It?

@sa @ref pg_feat_timing @n

# Methods

## delay(msec,cb):function

call cb after about msec.  

### Args

Name | Type | Means
-----|------|------
msec | int | waiting in msec
cb | function | calling target

### Returns

cancelling function

## poll(msec,cb):function

call cb repeatedly every about msec.  

### Args

Name | Type | Means
-----|------|------
msec | int | waiting in msec
cb | function | calling target

### Returns

cancelling function

## sync(msec,cb_chk,cb_done,cb_abort):function

wait for cb_chk returns true.  

### Args

Name | Type | Means
-----|------|------
msec | int | waiting in msec
cb_chk | function:bool | calling repeatedly until returns true
cb_done | function | called on cb_chk returns true
cb_abort | function | called on aborted

### Returns

cancelling function
