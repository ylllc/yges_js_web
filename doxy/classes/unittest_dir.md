@page pg_class_unittest_dir TestDir

# What's It?

(web only)
created by @ref pg_feat_unittest

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| Dirs | @ref pg_class_unittest_dir[] | test subdirs |
| Files | @ref pg_class_unittest_file[] | test files |

-----
# Methods

-----
## SetView() {#TestDir_SetView}

### Spec

SetView(view):void

### Args

| Name | Type | Means |
|------|------|-------|
| view | @ref pg_class_qht | test directory view |

-----
## Reset() {#TestDir_Reset}

reset test directory

### Spec

Reset(src2=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| src2 | @ref Test_TestDirInfo | new test directory (or same to previous) |

-----
## Load() {#TestDir_Load}

download all test files

### Spec

Load():void

-----
## Run() {#TestDir_Run}

run all test files

### Spec

Run():void
