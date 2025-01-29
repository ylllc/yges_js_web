@page pg_class_unittest Test

# What's It?

@sa @ref pg_feat_unittest

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Test | test features |

-----
# Structures

-----
## TestDirInfo {#Test_TestDirInfo}

| Name | Type | Means |
|------|------|-------|
| Parent | bool | has parent, not base directory |
| Dirs | @ref Test_TestDirInfo[] | test dirs |
| Files | @ref Test_TestFileInfo[] | test files |

-----
## TestFileInfo {#Test_TestFileInfo}

| Name | Type | Means |
|------|------|-------|
| Size | int | file size |
| MTime | string | modifiled time in ISO 8601 |

-----
## TestScenario {#Test_TestScenario}

| Name | Type | Means |
|------|------|-------|
| Title | string | test title |
| Proc | func<@ref TestTools> | test procedure |
| PickUp | bool? | in puckup mode, true to run |
| Filter | bool? | when defined, true to run |

-----
## TestTools {#Test_TestTools}

| Name | Type | Means |
|------|------|-------|
| HappenTo | @ref pg_class_happening_manager | happenings put in |
| Launcher | @ref pg_class_launcher | local launcher instance |
| Log | @ref pg_class_logger | local log instance |

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| User | object | user definitions |

-----
# Methods

-----
## Never() {#Test_Never}

mark always failed

### Spec

Never(msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message for AssertionError |

-----
## Chk() {#Test_Chk}

### Spec

Chk(cond,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| cond | bool | testing contition |
| msg | string | message for AssertionError |

-----
## ChkLoose() {#Test_ChkLoose}

check v1 == v2

### Spec

ChkLoose(v1,v2,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## ChkStrict() {#Test_ChkStrict}

check v1 === v2

### Spec

ChkStrict(v1,v2,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## ChkLess() {#Test_ChkLess}

check v1 < v2

### Spec

ChkLess(v1,v2,msg,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## ChkLessEq() {#Test_ChkLessEq}

check v1 <= v2

### Spec

ChkLessEq(v1,v2,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## ChkGreat() {#Test_ChkGreat}

check v1 > v2

### Spec

ChkGreat(v1,v2,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## ChkGreatEq() {#Test_ChkGreatEq}

check v1 >= v2

### Spec

ChkGreatEq(v1,v2,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## ChkApprox() {#Test_ChkApprox}

check |v1-v2| <= range

### Spec

ChkApprox(v1,v2,range,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | number | 1st value |
| v2 | number | 2nd value |
| range | number | allowed range |
| msg | string | message for AssertionError |

-----
## Run() {#Test_Run}

(for Node,Deno)  
run test scenaria.  

(for web)  
it's dummy.  

### Spec

Run(scn):void

### Args

| Name | Type | Means |
|------|------|-------|
| scn | @ref TestScenario[] | test scenaria |

-----
## SetUp() {#Test_SetUp}

(web only)  
setup test runner.  

### Spec 

Setup(launcher,target,url,src):@ref pg_class_unittest_dir

### Args

| Name | Type | Means |
|------|------|-------|
| launcher | @ref pg_class_launcher | procedure runs on |
| target | @ref pg_class_qht | test scripts load on |
| url | string | URL base |
| src | @ref Test_TestDirInfo | test files info |
