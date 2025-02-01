@page pg_class_gui_toggle GUI.Toggle

# What's It?

created by @ref GUI_Toggle @n
this class is inherited from @ref pg_class_qht  

-----
# Callbacks

-----
## CB_Changing {#GUI_Toggle_CB_Changing}

call by toggle is changing  

### Spec

CB_Changing(side):bool

### Args

| Name | Type | Means |
|------|------|-------|
| side | bool | new side |

### Returns

| Value | Means |
|-------|-------|
| true | allow changing |
| false | deny changing |

-----
# Structures

-----
## Option {#GUI_Toggle_Option}

| Name | Type | Means |
|------|------|-------|
| OffClass | string? | class name of button tag for toggle off |
| OnClass | string? | class name of button tag for toggle on |
| OnChanging | @ref GUI_Toggle_CB_Changing | call by click |
| User | dict<string,any>? | user definition, share on this instance |

-----
# Properties

-----

| Name | Type | Means |
|------|------|-------|
| OnChanging | @ref GUI_Toggle_CB_Changing | call by click |
| User | dict<string,any>? | user definition |

