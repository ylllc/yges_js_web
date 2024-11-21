@page pg_class_parsedurl ParsedURL

# What's It?

@sa @ref pg_feat_urlbuild @n


# Properties

Name | Type | Means
-----|------|------
scheme | string | scheme name
slashes | string | additional slashes after scheme separator
user | string | user name
pass | string | password
host | string | host name
port | string | port number
path | string | path (URL encoded)
query | string | query (URL encoded)
fragment | string | fragment (URL encoded)


# Methods

## bake():string

### Returns

baked URL


## extractHost():array

### Return

extracted host name


## bakeHost(src)

### Args

Name | Type | Means
-----|------|------
src | array | baking source host name


## extractPath():array

### Return

extracted path name


## bakePath(src)

### Args

Name | Type | Means
-----|------|------
src | array | baking source path name


## extractArgs():array

extract query as args

### Return

extracted query


## bakeArgs(src)

### Args

Name | Type | Means
-----|------|------
src | array | baking source query


## extractProp():dict

extract query as prop

### Return

extracted query


## bakeProp(src)

### Args

Name | Type | Means
-----|------|------
src | dict | baking source query
