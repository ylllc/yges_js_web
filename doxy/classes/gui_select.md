@page pg_class_gui_select GUI.Select

# What's It?

created by @ref GUI_Select @n
this class is inherited from @ref pg_class_qht  

-----
# Callbacks

-----
## CB_Changing {#GUI_Select_CB_Changing}

call by selection is changing  

### Spec

CB_Changing(prev,next):bool

### Args

| Name | Type | Means |
|------|------|-------|
| view | @ref pg_class_gui_select | caller instance |
| prev | string | previous selection |
| next | string | next selection |

### Returns

| Value | Means |
|-------|-------|
| true | allow changing |
| false | deny changing |

-----
# Structures

-----
## ItemOption {#GUI_Select_ItemOption}

| Name | Type | Means |
|------|------|-------|
| Value | string | internal value of this item |
| Label | string? | visible value of this item (or same to internal) |
| User | struct? | user definition, share on this item |

-----
## SelectOption {#GUI_Select_SelectOption}

| Name | Type | Means |
|------|------|-------|
| Class | string? | class name of select tag |
| Init | string? | initial selectted key |
| OnChanging | @ref GUI_Select_CB_Changing | call by selection changing |
| User | struct? | user definition, share on this instance |

-----
## SelectItem {#GUI_Select_SelectItem}

| Name | Type | Means |
|------|------|-------|
| Value | string | selection value |
| View | @ref pg_class_qht | selection view |

-----
# Unions

-----
## ItemDefinition {#GUI_Select_ItemDefinition}

| Type | Means |
|------|-------|
| string | simple value |
| @ref GUI_Select_ItemOption | value with options |

-----
# Properties

-----

| Name | Type | Means |
|------|------|-------|
| OnChanging | @ref GUI_Select_CB_Changing | call by selection changing |
| User | struct? | user definition |

-----
# Methods

-----
## GetItem() {#GUI_Select_GetItem}

### Spec

GetItem(val):@ref GUI_Select_SelectItem?

### Args

| Name | Type | Means |
|------|------|-------|
| val | string | selectable value |

### Returns

selection item (or null)

-----
## GetSelected() {#GUI_Select_GetSelected}

### Spec

GetSelected():@ref GUI_Select_SelectItem?

### Returns

curent selecting item (or null)

-----
## Select() {#GUI_Select_Select}

select an item  

### Spec

Select(val):void

### Args

| Name | Type | Means |
|------|------|-------|
| val | string | selectable value |
