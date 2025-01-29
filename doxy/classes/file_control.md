@page pg_class_file_control FileControl

# What's It?

@sa @ref pg_feat_dir @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.File | file control |

-----
# Structures

-----
## StatOption {#FileControl_StatOption}

| Name | Type | Means |
|------|------|-------|
| bigint | bool? | use bigint |
| ... | any | unwrapped extra spec |

-----
## LoadOption {#FileControl_LoadOption}

| Name | Type | Means |
|------|------|-------|
| encoding | string? | text encoding |
| flag | string? | filesystem open mode |
| ... | any | unwrapped extra spec |

-----
## SaveOption {#FileControl_SaveOption}

| Name | Type | Means |
|------|------|-------|
| encoding | string? | text encoding |
| mode | int? | file permission |
| flag | string? | filesystem open mode |
| ... | any | unwrapped extra spec |

-----
# Unions

-----
## Path {#FileControl_Path}

| Type | Means |
|------|-------|
| string | file path or URL |
| other | unwrapped extra spec |

-----
## SaveSource {#FileControl_SaveSource}

| Type | Means |
|------|-------|
| string | encoded string |
| Buffer | streamed binary |
| other | unwrapped extra spec |

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
## Exists() {#FileControl_Exists}

check path exists immediately.  

### Spec

Exists(path):bool

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |

### Returns

path exists

-----
## IsFile() {#FileControl_IsFile}

check path is file via Promise.  

### Spec

IsFile(path):Promise<bool?>

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |

### Returns

a Promise of procedure  

### Brings

| Value | Means |
|-------|-------|
| true | is file |
| false | not file |
| null | not exists |

-----
## Stat() {#FileControl_Stat}

detect file stat.  

### Spec

Stat(path,opt={}):Promise<FileStat>

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |
| opt | @ref StatOption | optional params |

### Returns

a Promise of procedure  

### Brings

file stat info wrapped to @ref pg_class_file_stat

-----
## Load() {#FileControl_Load}

load a file  

### Spec

Load(path,opt={}):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| path | @ref Path | load from |
| opt | @ref LoadOption | optional params |

### Returns

a Promise of procedure  

### Brings

loaded data  

-----
## Save() {#FileControl_Save}

save to file  

### Spec

Save(path,data,opt={}):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| path | @ref Path | save to |
| data | @ref SaveSource | save source |
| opt | @ref SaveOption | optional params |

### Returns

a Promise of procedure  

-----
## Remove() {#FileControl_Remove}

remove target file  

### Spec

Remove(path,opt={}):Promise

### Args

| Name | Type | Means |
|------|------|-------|
| path | @ref Path | save to |
| opt | @ref SaveOption | optional params |

### Returns

a Promise of procedure  

-----
## Glob() {#FileControl_Glob}

find files on a directory  

### Spec

Glob(dir,ptn='*'):Promise<string[]>

### Args

| Name | Type | Means |
|------|------|-------|
| dir | string | find files on |
| ptn | string | file pattern |

### Returns

a Promise of procedure  

### Brings

files list  
