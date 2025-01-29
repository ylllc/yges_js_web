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

-----
## Parse() {#URLBuilder_Parse}

### Spec

Parse(url):@ref pg_class_parsedurl

### Args

| Name | Type | Means |
|------|------|-------|
| url | string | parsing source URL |

### Returns

parse a URL and store it.  

-----
## ExtractHost() {#URLBuilder_ExtractHost}

split by .

### Spec

ExtractHost(src):string[]

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source host name |

### Returns

extracted host name

-----
## BakeHost() {#URLBuilder_BakeHost}

join with .

### Spec

BakeHost(src):string

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source host name |

### Returns

baked host name

-----
## ExtractPath() {#URLBuilder_ExtractPath}

split by / and URL decode

### Spec

ExtractPath(src):string[]

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source path name |

### Returns

extracted path name

-----
## BakePath() {#URLBuilder_BakePath}

URL encode and join with /

### Spec

BakePath(src):string

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source path name |

### Returns

baked path name

-----
## ExtractArgs() {#URLBuilder_ExtractArgs}

split by + and URL decode

### Spec

ExtractArgs(src):string[]

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source query |

### Returns

extracted query

-----
## BakeArgs() {#URLBuilder_BakeArgs}

URL encode and join with +

### Spec

BakeArgs(src):string

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source query |

### Return

baked query

-----
## ExtractProp() {#URLBuilder_ExtractProp}

extract to a KVS structure.  
that supported PHP's substructure partially.  
PHP's array can coexistence sequential array and KVS structure.  
but JavaScript not.  

### Spec

ExtractProp(src):dict<string,string>

### Args

| Name | Type | Means |
|------|------|-------|
| src | string | extracting source query |

### Return

extracted query

-----
## BakeProp() {#URLBuilder_BakeProp}

bake from a KVS structure.  

### Spec

BakeProp(src):string

### Args

| Name | Type | Means |
|------|------|-------|
| src | dict<string,string> | baking source query |

### Return

baked query
