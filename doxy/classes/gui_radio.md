@page pg_class_gui_radio GUI.Radio

# What's It?

created by @ref GUI_Radio @n
this class is inherited from @ref pg_class_qht  

-----
# Callbacks

-----
## CB_Changing {#GUI_Radio_CB_Changing}

call by selection is changing  

### Spec

CB_Changing(prev,next):bool

### Args

| Name | Type | Means |
|------|------|-------|
| view | @ref pg_class_gui_radio | caller instance |
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
## ItemOption {#GUI_Radio_ItemOption}

| Name | Type | Means |
|------|------|-------|
| Value | string | internal value of this item |
| Label | string? | visible value of this item (or same to internal) |
| User | struct? | user definition, share on this item |

-----
## SelectOption {#GUI_Radio_SelectOption}

| Name | Type | Means |
|------|------|-------|
| WindowClass | string? | class name of div tag |
| ItemClass | string? | class name of button tag |
| Init | string? | initial selectted key |
| OnChanging | @ref GUI_Radio_CB_Changing | call by selection changing |
| User | struct? | user definition, share on this instance |

-----
## SelectItem {#GUI_Radio_SelectItem}

| Name | Type | Means |
|------|------|-------|
| Value | string | selection value |
| View | @ref pg_class_qht | selection view |

-----
# Unions

-----
## ItemDefinition {#GUI_Radio_ItemDefinition}

| Type | Means |
|------|-------|
| string | simple value |
| @ref GUI_Radio_ItemOption | value with options |
| @ref QHT_QHTPrm | insertion view definition |

-----
# Properties

-----

| Name | Type | Means |
|------|------|-------|
| OnChanging | @ref GUI_Radio_CB_Changing | call by selection changing |
| User | struct? | user definition |

-----
# Methods

-----
## GetItem() {#GUI_Radio_GetItem}

### Spec

GetItem(val):@ref GUI_Radio_SelectItem?

### Args

| Name | Type | Means |
|------|------|-------|
| val | string | selectable value |

### Returns

selection item (or null)

-----
## GetSelected() {#GUI_Radio_GetSelected}

### Spec

GetSelected():@ref GUI_Radio_SelectItem?

### Returns

curent selecting item (or null)

-----
## Select() {#GUI_Radio_Select}

select an item  

### Spec

Select(val):void

### Args

| Name | Type | Means |
|------|------|-------|
| val | string | selectable value |

-----
## SetEnabled() {#GUI_Radio_SetEnabled}

set enablity to a selection  

### Spec

SetEnabled(val,side):void

### Args

| Name | Type | Means |
|------|------|-------|
| val | string | selectable value |
| side | bool | enablity |
