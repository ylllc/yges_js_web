@page pg_class_stmac_container StateMachineContainer

# What's It?

@sa @ref pg_feat_stmac @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.StateMachine | statemachine container |

-----
# Types

-----
## StateSwitching {#StateSwitching}

| Type | Means |
|------|-------|
| null or undefined | keep polling |
| true | step to next phase |
| false | abortion |
| string | switch to next state |

-----
## StateSettings {#StateSettings}

| Name | Type | Means |
|------|------|-------|
| cb_start | func<@ref pg_class_stmac_control,@ref UserShared> | call at begin of current state up |
| poll_up | func<@ref pg_class_stmac_control,@ref UserShared>:@ref StateSwitching | call by each polling in up phase |
| cb_ready | func<@ref pg_class_stmac_control,@ref UserShared> | call at end of current state up |
| poll_keep | func<@ref pg_class_stmac_control,@ref UserShared>:@ref StateSwitching | call by each polling in keep phase |
| cb_stop | func<@ref pg_class_stmac_control,@ref UserShared> | call at begin of current state down |
| poll_down | func<@ref pg_class_stmac_control,@ref UserShared>:@ref StateSwitching | call by each polling in down phase |
| cb_end | func<@ref pg_class_stmac_control,@ref UserShared> | call at end of current state down |

## UserShared {#UserShared}

user defined object kept in a control

## StatesOption {#StatesOption}

| Name | Type | Means |
|------|------|-------|
| name | string? | user class name |
| happen | @ref pg_class_happening_manager? | user happening handler |
| launcher | @ref pg_class_launcher? | procedure runs on it |
| user | @ref UserShared | user definitions |
| cb_done | func<@ref UserShared> | call at normal end of the states procedure |
| cb_abort | func<@ref UserShared> | call at abend of the states procedure |

-----
# Methods

-----
## run(start,states,opt):StateMachineContext

### Args

| Name | Type | Means |
|------|------|-------|
| start | string | select startpoint of states |
| states | dict<string,@ref StateSettings> | states settings by each state name |
| opt | @ref StatesOption | optional settings |

### Returns

statemachine control
