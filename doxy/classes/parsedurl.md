@page pg_class_parsedurl ParsedURL

# What's It?

@sa @ref pg_feat_urlbuild @n

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| scheme | string | scheme name |
| slashes | string | additional slashes after scheme separator |
| user | string | user name |
| pass | string | password |
| host | string | host name |
| port | string | port number |
| path | string | path (URL encoded) |
| query | string | query (URL encoded) |
| fragment | string | fragment (URL encoded) |

-----
# Methods

-----
## bake():string

### Returns

baked URL

-----
## extractHost():string[]

### Return

extracted host name

-----
## bakeHost(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source host name |

-----
## extractPath():string[]

### Return

extracted path name

-----
## bakePath(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source path name |

-----
## extractArgs():string[]

extract query as args

### Return

extracted query

-----
## bakeArgs(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | string[] | baking source query |

-----
## extractProp():dict<string,string>

extract query as prop

### Return

extracted query

-----
## bakeProp(src)

### Args

| Name | Type | Means |
|------|------|-------|
| src | dict<string,string> | baking source query |
