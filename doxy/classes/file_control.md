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
## StatOption {#StatOption}

| Name | Type | Means |
|------|------|-------|
| bigint | bool? | use bigint |
| ... | any | unwrapped extra spec |

-----
## LoadOption {#LoadOption}

| Name | Type | Means |
|------|------|-------|
| encoding | string? | text encoding |
| flag | string? | filesystem open mode |
| ... | any | unwrapped extra spec |

-----
## SaveOption {#SaveOption}

| Name | Type | Means |
|------|------|-------|
| encoding | string? | text encoding |
| mode | int? | file permission |
| flag | string? | filesystem open mode |
| ... | any | unwrapped extra spec |

-----
# Unions

-----
## Path {#Path}

| Type | Means |
|------|-------|
| string | file path or URL |
| other | unwrapped extra spec |

-----
## SaveSource {#SaveSource}

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
## exists(path):bool {#exists}

check path exists immediately.  

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | checking path |

### Returns

path exists

-----
## isFile(path):Promise<bool?> {#isFile}

check path is file via Promise.  

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
## stat(path,opt={}):Promise<FileStat> {#stat}

detect file stat.  

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
## load(path,opt={}):Promise {#load}

load a file  

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
## save(path,data,opt={}):Promise {#save}

save to file  

### Args

| Name | Type | Means |
|------|------|-------|
| path | @ref Path | save to |
| data | @ref SaveSource | save source |
| opt | @ref SaveOption | optional params |

### Returns

a Promise of procedure  

-----
## remove(path,opt={}):Promise {#remove}

remove target file  

### Args

| Name | Type | Means |
|------|------|-------|
| path | @ref Path | save to |
| opt | @ref SaveOption | optional params |

### Returns

a Promise of procedure  

-----
## glob(dir,ptn='*'):Promise<string[]> {#glob}

find files on a directory  

### Args

| Name | Type | Means |
|------|------|-------|
| dir | string | find files on |
| ptn | string | file pattern |

### Returns

a Promise of procedure  

### Brings

files list  
