@page pg_class_urlbuilder URLBuilder

# What's It?

@sa @ref pg_feat_urlbuilder @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.URLBuilder | URL builder |

-----
# Methods

## Parse {#URLBuilder_Parse}

### Spec

Parse(url):@ref pg_class_parsedurl

### Args

| Name | Type | Means |
|------|------|-------|
| url | string | parsing source URL |

### Returns

parse a URL and store it.  

-----
## ExtractHost {#URLBuilder_ExtractHost}

### Spec

ExtractHost(src):string[]

split by .

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source host name |

### Returns

extracted host name

-----
## BakeHost {#URLBuilder_BakeHost}

### Spec

BakeHost(src):string

join with .

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source host name |

### Returns

baked host name

-----
## ExtractPath {#URLBuilder_ExtractPath}

### Spec

ExtractPath(src):string[]

split by / and URL decode

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source path name |

### Returns

extracted path name

-----
## BakePath {#URLBuilder_BakePath}

### Spec

BakePath(src):string

URL encode and join with /

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source path name |

### Returns

baked path name

-----
## ExtractArgs {#URLBuilder_ExtractArgs}

### Spec

ExtractArgs(src):string[]

split by + and URL decode

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source query |

### Returns

extracted query

-----
## BakeArgs {#URLBuilder_BakeArgs}

### Spec

BakeArgs(src):string

URL encode and join with +

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source query |

### Return

baked query

-----
## ExtractProp {#URLBuilder_ExtractProp}

### Spec

ExtractProp(src):dict<string,string>

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
## BakeProp {#URLBuilder_BakeProp}

### Spec

BakeProp(src):string

bake from a KVS structure.  

### Args

| Name | Type | Means |
|------|------|-------|
| src | dict<string,string> | baking source query |

### Return

baked query
