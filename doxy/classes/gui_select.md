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
| User | dict<string,any>? | user definition, share on this item |

-----
## SelectOption {#GUI_Select_SelectOption}

| Name | Type | Means |
|------|------|-------|
| Class | string? | class name of select tag |
| Init | string? | initial selectted key |
| OnChanging | @ref GUI_Select_CB_Changing | call by selection changing |
| User | dict<string,any>? | user definition, share on this instance |

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
| User | dict<string,any>? | user definition |

