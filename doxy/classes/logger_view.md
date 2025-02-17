@page pg_class_logger_view LogView.Unit

# What's It?

(web only)  
created by @ref pg_class_logger_view_container  
this class is inherited from @ref pg_class_qht

-----
# Methods

-----
## Clear() {#LogView_Clear}

clear view and pooled logs  

### Spec

Clear():void

-----
## Show() {#LogView_Show}

show this view  

### Spec

Show():void

-----
## Hide() {#LogView_Hide}

hide this view  
pooling logs are kept  

### Spec

Hide():void

-----
## GetText() {#LogView_GetText}

### Spec

GetText():string

### Returns

pooling logs as plain text
