@page pg_class_log_splitter LogSplitter

# What's It?

created by @ref pg_class_logger  
it inherited from @ref pg_class_logger  

-----
# Methods

-----
## Ref() {#Log_Ref}

### Spec

Ref(id):@ref pg_class_logger?

### Args

| Name | Type | Means |
|------|------|-------|
| id | string | id for @ref Log_Attach |

### Returns

attached logger  

-----
## Attach() {#Log_Attach}

attach a logger  
and transfered log entries from this splitter  

### Spec

Attach(id,logger):void

### Args

| Name | Type | Means |
|------|------|-------|
| id | string | attaching id in your defined |
| logger | @ref pg_class_logger | an attaching log instance |

-----
## Detach() {#Log_Detach}

detach a logger  
and no longer transfer log entries  

### Spec

Detach(id):void

### Args

| Name | Type | Means |
|------|------|-------|
| id | string | id for @ref Log_Attach |
