﻿@page pg_class_stmac_context StateMachine.Control

# What's It?

created by @ref pg_class_stmac_container  
it inherited from @ref pg_class_softclass  

-----
# Callbacks

-----
## CB_Event {#StMac_CB_Event}

### Spec

CB_Event(ctx,proc):void

### Args

| Name | Type | Means |
|------|------|-------|
| ctx | @ref pg_class_stmac_context | caller instance |
| proc | @ref pg_class_launcher | StateMachine runs on |

-----
## CB_Poll {#StMac_CB_Poll}

### Spec

CB_Poll(ctx,proc):@ref StMac_StateSwitching

### Args

| Name | Type | Means |
|------|------|-------|
| ctx | @ref pg_class_stmac_context | caller instance |
| proc | @ref pg_class_launcher | StateMachine runs on |

### Returns

state switching way

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
| OnStart | @ref StMac_CB_Event | call at begin of current state up |
| OnPollInUp | @ref StMac_CB_Poll | call by each polling in up phase |
| OnReady | @ref StMac_CB_Event | call at end of current state up |
| OnPollInKeep | @ref StMac_CB_Poll | call by each polling in keep phase |
| OnStop | @ref StMac_CB_Event | call at begin of current state down |
| OnPollinDown | @ref StMac_CB_Poll | call by each polling in down phase |
| OnEnd | @ref StMac_CB_Event | call at end of current state down |

-----
## UserShared {#StMac_UserShared}

user defined object kept in a control

-----
## StatesOption {#StMac_StatesOption}

| Name | Type | Means |
|------|------|-------|
| Name | string? | user class name |
| Trace | bool? | tracing enbled |
| Trace_Proc | bool? | tracing enbled for internal procedure |
| Trace_StMac | bool? | tracing enbled for statemachine transition |
| Log | @ref pg_class_logger? | logs to it |
| HappenTo | @ref pg_class_happening_manager? | user happening handler |
| Launcher | @ref pg_class_launcher? | procedure runs on it |
| User | @ref StMac_UserShared | user definitions and kept in created context |
| OnDone | func<@ref StMac_UserShared> | call at normal end of the states procedure |
| OnAbort | func<@ref StMac_UserShared> | call at abend of the states procedure |
| User | @ref Launcher_UserShared | user definitions |

-----
## StateMachineInfo {#StMac_StateMachineInfo}

| Name | Type | Means |
|------|------|-------|
| Name | string | instance name |
| CrashSite | string | error at (or normally) |
| Prev | string | previous state |
| Cur | string | current state |
| Next | string | next state |
| User | struct | user definition |

-----
# Methods

-----
## SetTracing() {#Launcher_SetTracing}

set tracing enablity in all internal instances.  

### Spec

SetTracing(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | tracing enablity |

-----
## SetTracing_Proc() {#Launcher_SetTracing_Proc}

set tracing enablity for internal procedure.  

### Spec

SetTracing_Proc(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | tracing enablity |

-----
## SetTracing_StMac() {#Launcher_SetTracing_StMac}

set tracing enablity for statemachine transition only.  

### Spec

SetTracing_StMac(side):void

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | tracing enablity |

-----
## GetPrevState() {#StMac_GetPrevState}

### Spec

GetPrevState():string?

### Returns

previous state

-----
## GetCurState() {#StMac_GetCurState}

### Spec

GetCurState():string?

### Returns

current state

-----
## GetNextState() {#StMac_GetNextState}

### Spec

GetNextState():string?

### Returns

next state

-----
## GetInfo() {#StMac_GetInfo}

### Spec

GetInfo():@ref StMac_StateMachineInfo

### Returns

statemachine info.  

-----
## GetLogger() {#StMac_GetLogger}

### Spec

GetLogger():@ref pg_class_logger

### Returns

logs to it

-----
## GetHappeningManager() {#StMac_GetHappeningManager}

### Spec

GetHappeningManager():@ref pg_class_happening_manager

### Returns

target HappeningManager of this states 

-----
# Inherited

some methods are inherited from @ref pg_class_procedure  

- IsStarted()
- IsFinished()
- IsAborted()
- IsEnd()
- Abort()
- Sync()
- ToPromise()
