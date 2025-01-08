@page pg_class_dir_target DirTarget

# What's It?

means a directory  
created by @ref pg_class_dir_control  
it inherited from @ref pg_class_agent  

-----
# Methods

-----
## GetPath {#DirTarget_GetPath}

### Spec

GetPath():string

### Returns 

target directory path  

-----
## Exists {#DirTarget_Exists}

### Spec

Exists():bool

### Returns

target directry is exist  

-----
## Relative {#DirTarget_Relative}

### Spec

Relative(path):string

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | relative path from target directory |

### Returns

combined path  

-----
## SubDir {#DirTarget_SubDir}

### Spec

SubDir(path):@ref pg_class_dir_target

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | relative path from target directory |

### Returns

new instance of a subdirectory  

-----
## Glob {#DirTarget_Glob}

### Spec

Glob(ptn='*'):Promise<string[]>

find files on target directory  

### Args

| Name | Type | Means |
|------|------|-------|
| ptn | string | file pattern |

### Returns

a Promise of procedure  

### Brings

files list  
