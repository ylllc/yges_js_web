@page pg_class_urlbuilder URLBuilder

# What's It?

@sa @ref pg_feat_urlbuild @n


# Methods

## parse(url):ParsedURL

### Args

Name | Type | Means
-----|------|------
url | string | parsing source URL

### Returns

parse a URL and store it.  


## extractHost(src):array

split by .

### Args

Name | Type | Means
-----|------|------
src | string | extracting source host name

### Return

extracted host name


## bakeHost(src):string

join with .

### Args

Name | Type | Means
-----|------|------
src | array | baking source host name

### Return

baked host name


## extractPath(src):array

split by / and URL decode

### Args

Name | Type | Means
-----|------|------
src | string | extracting source path name

### Return

extracted path name


## bakePath(src):string

URL encode and join with /

### Args

Name | Type | Means
-----|------|------
src | array | baking source path name

### Return

baked path name


## extractArgs(src):array

split by + and URL decode

### Args

Name | Type | Means
-----|------|------
src | string | extracting source query

### Return

extracted query


## bakeArgs(src):string

URL encode and join with +

### Args

Name | Type | Means
-----|------|------
src | array | baking source query

### Return

baked query


## extractProp(src):dict

extract to a KVS structure.  
that supported PHP's substructure partially.  
PHP's array can coexistence sequential array and KVS structure.  
but JavaScript not.  

### Args

Name | Type | Means
-----|------|------
src | string | extracting source query

### Return

extracted query


## bakeProp(src):string

bake from a KVS structure.  

### Args

Name | Type | Means
-----|------|------
src | dict | baking source query

### Return

baked query

