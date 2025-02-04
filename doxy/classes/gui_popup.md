@page pg_class_gui_popup GUI.PopUp

# What's It?

created by @ref GUI_PopUp @n
this class is inherited from @ref pg_class_qht  

-----
# Structures

## Option {#GUI_PopUp_Option}

| Name | Type | Means |
|------|------|-------|
| Class | string? | class name of div tag |
| Sub | @ref QHT_QHTPrm[]? | popup contents |
| User | dict<string,any>? | user definition, share on this instance |

-----
# Methods

-----
## Show() {#GUI_Dialog_Show}

show the popup

### Spec

Show():void

-----
## Hide() {#GUI_Dialog_Hide}

hide the popup

### Spec

Hide():void

