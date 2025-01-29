@page pg_class_happening_view HappeningView

# What's It?

(web only)  
created by @ref pg_class_happening_manager_view  
this class is inherited from @ref pg_class_qht  

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| Status | @ref pg_class_qht | status view |
| Capt | @ref pg_class_qht | caption view |
| Rmks | @ref pg_class_qht | remarks view |
| Prop | @ref pg_class_qht | properties view |

-----
# Methods

-----
## Update() {#HappeningView_Update}

update info  

### Spec

Update(tick=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| tick | int? | updating tick counter (always null for user calling) |
