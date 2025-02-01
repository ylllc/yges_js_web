@page pg_feat_qht Quick HyperText

# What's It?

QHT is very simple web view interface.  
1 QHT instance controls 1 HTML element.  

-----
# Import

## for web (only)

```
<script src="yges/ipl.js"></script>
```
use YgEs

## for Node/Deno

(not supported)

-----
# How to Use

-----
## Refer an element

```
let main=YgEs.ToQHT(document.getElementById('main'));
```

-----
## Create new element

```
let hw=YgEs.NewQHT({
	Target:main,
	Tag:'div',
	Attr:{class:'sub'},
	Style:{border:'ridge'},
	Sub:['Hello World!']
});

```

-----
## Remove an element

```
hw.Remove();
```

-----
# Class Reference

@sa @ref pg_class_qht @n
@sa @ref pg_class_qht_container @n
