@page pg_class_qht_container QHT Container

# What's It?

@sa @ref pg_feat_qht @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs | common store |

-----
# Types

-----
## QHTContent {#QHTContent}

| Type | Means |
|------|-------|
| Element | HTML element |
| string | plain string |

-----
## QHTPrm {#QHTPrm}

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | apeend to |
| tag | string | HTML tag name |
| attr | dict<string,string> | attributes |
| style | dict<string,string> | styles |
| sub | @ref QHTContent[] | inner contents |

-----
# Methods

-----
## toQHT(elem):QHT

create @ref pg_class_qht from an Element.  

### Args

| Name | Type | Means |
|------|------|-------|
| elem | Element | HTML element |

### Returns

created @ref pg_class_qht instance.

-----
## newQHT(prm):QHT

create new @ref pg_class_qht instance.

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref QHTPrm | params |

### Returns

created @ref pg_class_qht instance.
