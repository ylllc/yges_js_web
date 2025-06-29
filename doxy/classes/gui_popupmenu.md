@page pg_class_gui_popupmenu GUI.PopUpMenu

# What's It?

created by @ref GUI_PopUpMenu @n
this class is inherited from @ref GUI_PopUp  

-----
# Structures

-----
## ItemPrm {#GUI_PopUpMenu_ItemPrm}

| Name | Type | Means |
|------|------|-------|
| Key | string | internal value of this item |
| Label | string? | visible value of this item (or same to internal) |
| OnAction | func | call by button clicked |
| User | struct? | user definition, share on this item |

-----
## Option {#GUI_PopUpMenu_Option}

| Name | Type | Means |
|------|------|-------|
| WindowClass | string? | class name of div tag |
| ItemClass | string? | class name of button tag |
| User | struct? | user definition, share on this instance |

-----
# Unions

-----
## ItemDefinition {#GUI_PopUpMenu_ItemDefinition}

| Type | Means |
|------|-------|
| @ref GUI_PopUpMenu_ItemPrm | value with options |
| @ref QHT_QHTPrm | insertion view definition |

-----
# Methods

-----
## GetItem() {#GUI_PopUpMenu_GetItem}

### Spec

GetItem(key):@ref pg_class_qht?

### Args

| Name | Type | Means |
|------|------|-------|
| key | string | internal ref key |

### Returns

button view (or null)

-----
## SetEnabled() {#GUI_PopUpMenu_SetEnabled}

set enablity to a internal button  

### Spec

SetEnabled(key,side):void

### Args

| Name | Type | Means |
|------|------|-------|
| key | string | internal ref key |
| side | bool | enablity |
