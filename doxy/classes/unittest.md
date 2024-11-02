@page pg_class_unittest UnitTest

# What's It?

@sa @ref pg_feat_unittest


# Methods

## chk(cond,msg=null)

### Args

Name | Type | Means
-----|------|------
cond | bool | testing contition
msg | string | message for AssertionError

## chk_loose(v1,v2,msg,msg=null)

### Args

Name | Type | Means
-----|------|------
v1 | any | 1st value
v2 | any | 2nd value
msg | string | message for AssertionError

## chk_strict(v1,v2,msg,msg=null)

### Args

Name | Type | Means
-----|------|------
v1 | any | 1st value
v2 | any | 2nd value
msg | string | message for AssertionError

## run(scn)

### Args

Name | Type | Means
-----|------|------
scn | TestScenario[] | test scenaria

## Type: TestScenario

Name | Type | Means
-----|------|------
title | string | test title
proc | function | test procedure
pickup | bool? | in puckup mode, true to run 
filter | bool? | when defined, true to run
