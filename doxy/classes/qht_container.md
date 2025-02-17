@page pg_class_qht_container QHT.Container

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
## QHTContent {#QHT_QHTContent}

| Type | Means |
|------|-------|
| Element | HTML element |
| @ref pg_class_qht | Element in QHT instance |
| string | plain string |

-----
## QHTPrm {#QHT_QHTPrm}

### Args

| Name | Type | Means |
|------|------|-------|
| Target | @ref pg_class_qht | apeend to |
| Tag | string | HTML tag name |
| Attr | dict<string,string> | attributes |
| Style | dict<string,string> | styles |
| Sub | @ref QHT_QHTContent[] | inner contents |

-----
# Methods

-----
## ToQHT() {#QHT_ToQHT}

create @ref pg_class_qht from an Element.  

### Spec

ToQHT(elem):@ref pg_class_qht

### Args

| Name | Type | Means |
|------|------|-------|
| elem | Element | HTML element |

### Returns

created @ref pg_class_qht instance.

-----
## NewQHT() {#QHT_NewQHT}

create new @ref pg_class_qht instance.

### Spec

NewQHT(prm):@ref pg_class_qht

### Args

| Name | Type | Means |
|------|------|-------|
| prm | @ref QHT_QHTPrm | params |

### Returns

created @ref pg_class_qht instance.
