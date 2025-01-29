@page pg_class_parsedurl ParsedURL

# What's It?

created by @ref pg_class_urlbuilder

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| Scheme | string | scheme name |
| Slashes | string | additional slashes after scheme separator |
| User | string | user name |
| Pass | string | password |
| Host | string | host name |
| Port | string | port number |
| Path | string | path (URL encoded) |
| Query | string | query (URL encoded) |
| Fragment | string | fragment (URL encoded) |

-----
# Methods

-----
## Bake() {#ParsedURL_Bake}

### Spec

Bake():string

### Returns

baked URL

-----
## ExtractHost() {#ParsedURL_ExtractHost}

### Spec

ExtractHost():string[]

### Return

extracted host name

-----
## BakeHost() {#ParsedURL_BakeHost}

### Spec

BakeHost(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source host name |

-----
## ExtractPath() {#ParsedURL_ExtractPath}

### Spec

ExtractPath():string[]

### Return

extracted path name

-----
## BakePath() {#ParsedURL_BakePath}

### Spec

BakePath(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source path name |

-----
## ExtractArgs() {#ParsedURL_ExtractArgs}

### Spec

ExtractArgs():string[]

extract query as args

### Return

extracted query

-----
## BakeArgs() {#ParsedURL_BakeArgs}

### Spec

BakeArgs(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source query |

-----
## ExtractProp() {#ParsedURL_ExtractProp}

### Spec

ExtractProp():dict<string,string>

extract query as prop

### Return

extracted query

-----
## BakeProp() {#ParsedURL_ExtractProp}

### Spec

BakeProp(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | dict<string,string> | baking source query |
