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
# Types

-----
## TestScenario {#TestScenario}

| Name | Type | Means |
|------|------|-------|
| title | string | test title |
| proc | func<@ref TestTools> | test procedure |
| pickup | bool? | in puckup mode, true to run |
| filter | bool? | when defined, true to run |

-----
## TestTools {#TestTools}

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
## never(msg=null)

mark always failed

### Args

| Name | Type | Means |
|------|------|-------|
| msg | string | message for AssertionError |

-----
## chk(cond,msg=null)

### Args

| Name | Type | Means |
|------|------|-------|
| cond | bool | testing contition |
| msg | string | message for AssertionError |

-----
## chk_loose(v1,v2,msg=null)

check v1 == v2

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## chk_strict(v1,v2,msg=null)

check v1 === v2

### Args

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## chk_less(v1,v2,msg,msg=null)

### Args

check v1 < v2

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## chk_less_eq(v1,v2,msg=null)

### Args

check v1 <= v2

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## chk_great(v1,v2,msg=null)

### Args

check v1 > v2

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## chk_great_eq(v1,v2,msg=null)

### Args

check v1 >= v2

| Name | Type | Means |
|------|------|-------|
| v1 | any | 1st value |
| v2 | any | 2nd value |
| msg | string | message for AssertionError |

-----
## chk_great_eq(v1,v2,range,msg=null)

### Args

check ABS(v1-v2) <= range

| Name | Type | Means |
|------|------|-------|
| v1 | number | 1st value |
| v2 | number | 2nd value |
| range | number | allowed range |
| msg | string | message for AssertionError |

-----
## Run(scn)

(for Node,Deno)  
run test scenaria.  

(for web)  
it's dummy.  

### Args

| Name | Type | Means |
|------|------|-------|
| scn | @ref TestScenario[] | test scenaria |

-----
## setupGUI(launcher,target,baseurl,dirent)

(for web only)  
build Test Runner view and run tests.  

| Name | Type | Means |
|------|------|-------|
| launcher | @ref pg_class_launcher | test scenaria run on it |
| target | QHT | build view in it |
| baseurl | string | test scripts are downloaded from it |
| dirent | DirEnt | file entries on a test directory |
