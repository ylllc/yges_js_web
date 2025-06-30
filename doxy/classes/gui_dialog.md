@page pg_class_gui_dialog GUI.Dialog

# What's It?

created by @ref GUI_Dialog @n
this class is inherited from @ref pg_class_qht  

-----
# Structures

## Option {#GUI_Dialog_Option}

| Name | Type | Means |
|------|------|-------|
| Class | string? | class name of dialog tag |
| Sub | @ref QHT_QHTPrm[]? | dialog contents |
| User | struct? | user definition, share on this instance |

-----
# Methods

-----
## Open() {#GUI_Dialog_Open}

show the dialog

### Spec

Open():void

-----
## Close() {#GUI_Dialog_Close}

hide the dialog

### Spec

Close():void

