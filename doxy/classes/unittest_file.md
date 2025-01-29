@page pg_class_unittest_file TestFile

# What's It?

(web only)
created by @ref pg_feat_unittest

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| Scenaria | @ref Test_TestScenario[] | test scenaria in this file |
| Hap | @ref pg_class_happening | happening |
| Loaded | bool | test files is downloaded |
| Installed | bool | test files is installed |
| Done | bool | test done |

-----
# Methods

-----
## SetView() {#TestFile_SetView}

### Spec

SetView(view):void

### Args

| Name | Type | Means |
|------|------|-------|
| view | @ref pg_class_qht | test directory view |

-----
## Reset() {#TestFile_Reset}

reset this test file

### Spec

Reset():void

-----
## Load() {#TestFile_Load}

download this test file

### Spec

Load():void

-----
## Run() {#TestFile_Run}

run all test scenaria in this file

### Spec

Run():void
