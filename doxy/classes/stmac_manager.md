@page pg_class_stmac_manager StMacManager

# What's It?

@sa @ref pg_feat_stmac @n

# Methods

## run(start,states,opt):StMacContext

### Args

Name | Type | Means
-----|------|------
start | string | select startpoint of states
states | dict<string,StateSettings> | states settings by each state name
opt | StatesOption | optional settings

### Returns

running procedure on the Engine


## Type: StatesSettings

Name | Type | Means
-----|------|------
cb_start | function<StateContext,UserProp> | call at begin of current state up
poll_up | function<StateContext,UserProp>:StateSwitching | call by each polling in up phase
cb_ready | function<StateContext,UserProp> | call at end of current state up
poll_keep | function<StateContext,UserProp>:StateSwitching | call by each polling in keep phase
cb_stop | function<StateContext,UserProp> | call at begin of current state down
poll_down | function<StateContext,UserProp>:StateSwitching | call by each polling in down phase
cb_end | function<StateContext,UserProp> | call at end of current state down

## Type: UserProp

user definitions in an object

## Type: StatesOption

Name | Type | Means
-----|------|------
name | string? | class name
happen | HappeningManager? | user happening handler
user | UserProp | user definitions
cb_done | function<UserProp> | call at normal end of the states procedure
cb_abort | function<UserProp> | call at abend of the states procedure

