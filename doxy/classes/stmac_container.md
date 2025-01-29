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
# Unions

-----
## StateSwitching {#StMac_StateSwitching}

| Type | Means |
|------|-------|
| null or undefined | keep polling |
| true | step to next phase |
| false | abortion |
| string | switch to next state |

-----
# Structures

-----
## StateSettings {#StMac_StateSettings}

| Name | Type | Means |
|------|------|-------|
| OnStart | func<@ref pg_class_stmac_context,@ref StMac_UserShared> | call at begin of current state up |
| OnPollInUp | func<@ref pg_class_stmac_context,@ref StMac_UserShared>:@ref StMac_StateSwitching | call by each polling in up phase |
| OnReady | func<@ref pg_class_stmac_context,@ref StMac_UserShared> | call at end of current state up |
| OnPollInKeep | func<@ref pg_class_stmac_context,@ref StMac_UserShared>:@ref StMac_StateSwitching | call by each polling in keep phase |
| OnStop | func<@ref pg_class_stmac_context,@ref StMac_UserShared> | call at begin of current state down |
| OnPollinDown | func<@ref pg_class_stmac_context,@ref StMac_UserShared>:@ref StMac_StateSwitching | call by each polling in down phase |
| OnEnd | func<@ref pg_class_stmac_context,@ref StMac_UserShared> | call at end of current state down |

-----
## UserShared {#StMac_UserShared}

user defined object kept in a control

-----
## StatesOption {#StMac_StatesOption}

| Name | Type | Means |
|------|------|-------|
| Name | string? | user class name |
| HappenTo | @ref pg_class_happening_manager? | user happening handler |
| Launcher | @ref pg_class_launcher? | procedure runs on it |
| User | @ref StMac_UserShared | user definitions and kept in created context |
| OnDone | func<@ref StMac_UserShared> | call at normal end of the states procedure |
| OnAbort | func<@ref StMac_UserShared> | call at abend of the states procedure |

-----
# Methods

-----
## Run() {#StMac_Run}

### Spec

Run(start,states,opt):@ref pg_class_stmac_context

### Args

| Name | Type | Means |
|------|------|-------|
| start | string | select startpoint of states |
| states | dict<string,@ref StMac_StateSettings> | states settings by each state name |
| opt | @ref StMac_StatesOption | optional settings |

### Returns

statemachine context
