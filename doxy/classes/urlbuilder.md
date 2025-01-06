@page pg_class_urlbuilder URLBuilder

# What's It?

@sa @ref pg_feat_urlbuild @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.URLBuilder | URL builder |

-----
# Methods

## parse(url):ParsedURL

### Args

| Name | Type | Means |
|------|------|-------|
| url | string | parsing source URL |

### Returns

parse a URL and store it.  

-----
## extractHost(src):string[]

split by .

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source host name |

### Returns

extracted host name

-----
## bakeHost(src):string

join with .

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source host name |

### Returns

baked host name

-----
## extractPath(src):string[]

split by / and URL decode

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source path name |

### Returns

extracted path name

-----
## bakePath(src):string

URL encode and join with /

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source path name |

### Returns

baked path name

-----
## extractArgs(src):string[]

split by + and URL decode

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source query |

### Returns

extracted query

-----
## bakeArgs(src):string

URL encode and join with +

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source query |

### Return

baked query

-----
## extractProp(src):dict<string,string>

extract to a KVS structure.  
that supported PHP's substructure partially.  
PHP's array can coexistence sequential array and KVS structure.  
but JavaScript not.  

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source query |

### Return

extracted query

-----
## bakeProp(src):string

bake from a KVS structure.  

### Args

| Name | Type | Means |
|------|------|-------|
| src | dict<string,string> | baking source query |

### Return

baked query
