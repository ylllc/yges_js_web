@page pg_class_gui_button GUI.Button

# What's It?

created by @ref GUI_Button @n
this class is inherited from @ref pg_class_qht  

-----
# Callbacks

-----
## CB_Click {#GUI_Button_CB_Click}

call by clicked  

### Spec

CB_Click(user):void

### Args

| Name | Type | Means |
|------|------|-------|
| view | @ref pg_class_gui_button | caller instance |
| user | dict<string,any> | user definition |

### Spec

CB_Click():void

-----
# Structures

-----
## Option {#GUI_Button_Option}

| Name | Type | Means |
|------|------|-------|
| Class | string? | class name of select tag |
| OnClick | @ref GUI_Button_CB_Click | call by clicked |
| User | dict<string,any>? | user definition, share on this instance |

-----
# Properties

-----

| Name | Type | Means |
|------|------|-------|
| OnClick | @ref GUI_Button_CB_Click | call by clicked |
| User | dict<string,any>? | user definition |

