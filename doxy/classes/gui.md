@page pg_class_gui GUI

# What's It?

@sa @ref pg_feat_gui @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.GUI | GUI helpers |

-----
# Methods

-----
## Select() {#GUI_Select}

create a select box 

### Spec

Select(target,items,opt):@ref pg_class_gui_select

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | created GUI element put on |
| items | @ref GUI_Select_ItemDefinition[]? | selections |
| opt | @ref GUI_Select_SelectOption | optional params |

### Returns

created instance  
