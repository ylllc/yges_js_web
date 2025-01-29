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
| Dirs | @ref Test_TestDirInfo | test dirs |
| Files | @ref Test_TestFileInfo | test files |
| SetView | func<@ref Test_TestDirView> | test view |

-----
## TestDirView {#Test_TestDirView}

| Name | Type | Means |
|------|------|-------|
| UpdateResult | func<bool?> | test result |

-----
## TestFileInfo {#Test_TestFileInfo}

| Name | Type | Means |
|------|------|-------|
| Scenaria | @ref Test_TestScenaria | test scenaria |
| Hap | @ref pg_class_happening | happening |
| Done | bool | test done |
| SetView | func<@ref Test_TestFileView> | test view |

-----
## TestFileView {#Test_TestFileView}

| Name | Type | Means |
|------|------|-------|
| SetMsg | func<string> | tes running message for the file |
| UpdateResult | func<bool?> | test result |
| SetScenaria | func<@ref Test_TestScenaria> | scenaria info |

-----
## TestScenaria {#Test_TestScenaria}

| Name | Type | Means |
|------|------|-------|
| Scenario | @ref Test_TestScenario | test scenario |
| View | TestScenarioView | view instance |
| SetView | func<@ref Test_TestScenarioView> | test view |

-----
## TestScenario {#Test_TestScenario}

| Name | Type | Means |
|------|------|-------|
| Title | string | test title |
| Proc | func<@ref TestTools> | test procedure |
| PickUp | bool? | in puckup mode, true to run |
| Filter | bool? | when defined, true to run |

-----
## TestScenarioView {#Test_TestScenarioView}

| Name | Type | Means |
|------|------|-------|
| UpdateResult | func<bool?> | test result |
| Skip | func | test is skipped |
| SetError | func<Error> | an error happened in the test |

-----
## TestTools {#Test_TestTools}

| Name | Type | Means |
|------|------|-------|
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

### Spec

Never(msg=null)

mark always failed

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

setup test runner.  
(for web only)  

### Spec 

Setup(launcher,target,url,src):@ref pg_class_unittest_dirinfo

### Args

| Name | Type | Means |
|------|------|-------|
| launcher | @ref pg_class_launcher | procedure runs on |
| target | @ref pg_class_qht | test scripts load on |
| url | string | URL base |
| src | @ref Test_TestDirInfo | test files info |
