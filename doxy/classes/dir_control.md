@page pg_class_dir_control DirControl

# What's It?

@sa @ref pg_feat_dir @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.Dir | directory control |

-----
# Structures

-----
## MkDirOption {#MkDirOption}

| Name | Type | Means |
|------|------|-------|
| recursive | bool? | recursive creation |
| mode | int? | permission |

-----
## StatOption {#StatOption}

| Name | Type | Means |
|------|------|-------|
| bigint | bool? | use bigint |

-----
# Properties

-----
| Name | Type | Means |
|------|------|-------|
| HappenTo | @ref pg_class_happening_manager | happenings kept on it |
| User | dict<string,any> | user definitions |

-----
# Methods

-----
## exists(path):bool {#exists}

check path exists immediately.  

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |

### Returns

path exists

-----
## isDir(path):Promise<bool?> {#isDir}

check path is directory via Promise.  

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |

### Returns

a Promise of procedure  

### Brings

| Value | Means |
|-------|-------|
| true | is directory |
| false | not directory |
| null | not exists |

-----
## stat(path,opt={}):Promise<FileStat> {#stat}

detect file stat.  

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |
| opt | StatOption | optional params |

### Returns

a Promise of procedure  

### Brings

file stat info wrapped to @ref pg_class_file_stat

-----
## mkdir(path,opt={}):Promise {#mkdir}

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | target path |
| opt | MkDirOption | optional params |

### Returns

a Promise of procedure  

-----
## target(dir,prepare):DirTarget {#target}

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | target path |
| prepare | bool | auto creation when not exists in opening this |

### Returns

new @ref pg_class_dir_target instance of target directory  
