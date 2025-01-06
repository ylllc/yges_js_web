@page pg_class_dir_target DirTarget

# What's It?

means a directory  
created by [DirControl.target()](pg_class_dir_control.html#target)  
it inherited from @ref pg_class_agent  

-----
# Additional Mathods

-----
## getPath():string {#getPath}

### Returns 

target directory path  

-----
## exists():bool {#exists}

### Returns

target directry is exist  

-----
## relative(path):string {#relative}

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | relative path from target directory |

### Returns

combined path  

-----
## subdir(path,prepare):DirTarget {#subdir}

### Args

| Name | Type | Means |
|------|------|-------|
| path | string | relative path from target directory |
| prepare | bool | auto creation when not exists in opening this |

### Returns

new @ref pg_class_dir_target instance of a subdirectory  

-----
## glob(ptn='*'):Promise<string[]> {#glob}

find files on target directory  

### Args

| Name | Type | Means |
|------|------|-------|
| ptn | string | file pattern |

### Returns

a Promise of procedure  

### Brings

files list  
