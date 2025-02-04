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
## Button() {#GUI_Button}

create a button 

### Spec

Button(target,label,opt):@ref pg_class_gui_button

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | created GUI element put on |
| label | string | show on button |
| opt | @ref GUI_Button_Option | optional params |

### Returns

created instance  

-----
## Toggle() {#GUI_Toggle}

create a toggle button 

### Spec

Toggle(target,label,init,opt):@ref pg_class_gui_toggle

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | created GUI element put on |
| label | string | show on button |
| init | bool | initial side |
| opt | @ref GUI_Toggle_Option | optional params |

### Returns

created instance  

-----
## Radio() {#GUI_Radio}

create a radio buttons 

### Spec

Radio(target,items,opt):@ref pg_class_gui_radio

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | created GUI element put on |
| items | @ref GUI_Radio_ItemDefinition[]? | selections |
| opt | @ref GUI_Radio_SelectOption | optional params |

### Returns

created instance  

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

-----
## Dialog() {#GUI_Dialog}

create a dialog  

### Spec

Dialog(target,modal,opt={}):@ref pg_class_gui_dialog

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | created GUI element put on |
| modal | bool | exclusive controls during opening |
| opt | @ref GUI_Dialog_Option | optional params |

-----
## PopUp() {#GUI_PopUp}

create a popup window  

### Spec

PopUp(target,opt={}):@ref pg_class_gui_popup

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | created GUI element put on |
| opt | @ref GUI_PopUp_Option | optional params |

-----
## PopUpMenu() {#GUI_PopUpMenu}

create a popup menu window  

### Spec

PopUpMenu(target,item,opt={}):@ref pg_class_gui_popupmenu

### Args

| Name | Type | Means |
|------|------|-------|
| target | @ref pg_class_qht | created GUI element put on |
| items | @ref GUI_PopUpMenu_ItemDefinition[]? | button definitions |
| opt | @ref GUI_PopUpMenu_Option | optional params |
