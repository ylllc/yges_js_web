@page pg_class_file_stat FileStat

# What's It?

result of [DirControl.Stat()](pg_class_dir_control.html#Stat)  
and [FileControl.Stat()](pg_class_file_control.html#Stat)  

-----
# Methods

-----
## GetPath() {#FileStat_GetPath}

### Spec

GetPath():string

### Returns

source path  

-----
## GetLowLevel() {#FileStat_GetLowLevel}

### Spec

GetLowLevel():any

### Returns

low level result  

-----
## IsFile() {#FileStat_IsFile}

### Spec

IsFile():bool?

### Returns

| Value | Means |
|-------|-------|
| true | is file |
| false | not file |
| null | not exists |

-----
## IsDir() {#FileStat_IsDir}

### Spec

IsDir():bool?

### Returns

| Value | Means |
|-------|-------|
| true | is directory |
| false | not directory |
| null | not exists |

-----
## IsSymLink() {#FileStat_IsSymLink}

### Spec

IsSymLink():bool?

### Returns

| Value | Means |
|-------|-------|
| true | is symbolic link |
| false | not symbolic link |
| null | not exists |

-----
## GetDevID() {#FileStat_GetDevID}

### Spec

GetDevID():int?

### Returns

device ID, is exists  

-----
## GetInode() {#FileStat_GetInode}

### Spec

GetInode():int?

### Returns

node number, is exists

-----
## GetMode() {#FileStat_GetMode}

### Spec

GetMode():int?

### Returns

file mode, is exists

-----
## GetGID() {#FileStat_GetGID}

### Spec

GetGID():int?

### Returns

group ID, is exists  

-----
## GetUID() {#FileStat_GetUID}

### Spec

GetUID():int?

### Returns

user ID, is exists  

-----
## GetSize() {#FileStat_GetSize}

### Spec

GetSize():int?

### Returns

file size, is exists  

-----
## GetAccessTime() {#FileStat_GetAccessTime}

### Spec

GetAccessTime():Date?

### Returns

last accessed time, is exists  

-----
## GetModifyTime() {#FileStat_GetModifyTime}

### Spec

GetModifyTime():Date?

### Returns

last modified time, is exists  

-----
## GetChangeTime() {#FileStat_GetChangeTime}

### Spec

GetChangeTime():Date?

### Returns

last status changed time, is exists  

-----
## GetBirthTime() {#FileStat_GetBirthTime}

### Spec

GetBirthTime():Date?

### Returns

created time, is exists
