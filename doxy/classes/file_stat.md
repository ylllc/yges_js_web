@page pg_class_file_stat FileStat

# What's It?

result of [DirControl.stat()](pg_class_dir_control.html#stat)  
and [FileControl.stat()](pg_class_file_control.html#stat)  

-----
# Methods

-----
## getPath():string {#getPath}

### Returns

source path  

-----
## getLowLevel():any {#getLowLevel}

### Returns

low level result  

-----
## isFile():bool? {#isFile}

### Returns

| Value | Means |
|-------|-------|
| true | is file |
| false | not file |
| null | not exists |

-----
## isDir():bool? {#isDir}

### Returns

| Value | Means |
|-------|-------|
| true | is directory |
| false | not directory |
| null | not exists |

-----
## isSymLink():bool? {#isSymLink}

### Returns

| Value | Means |
|-------|-------|
| true | is symbolic link |
| false | not symbolic link |
| null | not exists |

-----
## getDevID():int? {#getDevID}

### Returns

device ID, is exists  

-----
## getInode():int? {#getInode}

### Returns

node number, is exists

-----
## getMode():int? {#getMode}

### Returns

file mode, is exists

-----
## getGID():int? {#getGID}

### Returns

group ID, is exists  

-----
## getUID():int? {#getUID}

### Returns

user ID, is exists  

-----
## getSize():int? {#getSize}

### Returns

file size, is exists  

-----
## getAccessTime():Date? {#getAccessTime}

### Returns

last accessed time, is exists  

-----
## getModifyTime():Date? {#getModifyTime}

### Returns

last modified time, is exists  

-----
## getChangeTime():Date? {#getChangeTime}

### Returns

last status changed time, is exists  

-----
## getBirthTime():Date? {#getBirthTime}

### Returns

created time, is exists
