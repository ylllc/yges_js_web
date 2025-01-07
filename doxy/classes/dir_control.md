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
## PrepareOption {#DirControl_PrepareOption}

| Name | Type | Means |
|------|------|-------|
| recursive | bool? | recursive creation |
| mode | int? | permission |

-----
## StatOption {#DirControl_StatOption}

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
## Exists {#DirControl_Exists}

### Spec

Exists(path):bool

check path exists immediately.  

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |

### Returns

path exists

-----
## IsDir {#DirControl_IsDir}

### Spec

IsDir(path):Promise<bool?>

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
## Stat {#DirControl_Stat}

### Spec

Stat(path,opt={}):Promise<FileStat>

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
## MkDir {#DirControl_MkDir}

## Spec

MkDir(path,opt={}):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | target path |
| opt | PrepareOption | optional params |

### Returns

a Promise of procedure  

-----
## Target {#DirControl_Target}

### Spec

Target(dir,prepare):DirTarget

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | target path |
| prepare | bool | auto creation when not exists in opening this |

### Returns

new @ref pg_class_dir_target instance of target directory  
