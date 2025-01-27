@page pg_class_happening_manager_view HappeningManagerView

# What's It?

(web only)  
created by @ref pg_class_happening_view_container  
this class is inherited from @ref pg_class_qht  

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| Label | @ref pg_class_qht | label view |
| Status | @ref pg_class_qht | status view |
| Capt | @ref pg_class_qht | caption view |
| Rmks | @ref pg_class_qht | remarks view |
| Info | @ref pg_class_qht | info view |
| List | @ref pg_class_qht | happenings list view |
| Sub | @ref dict<int,@ref pg_class_happening_manager_view> | sub managers view |
| Hap | @ref dict<int,@ref pg_class_happening_view> | happenings view |

-----
# Methods

-----
## Update {#HappeningManagerView_Update}

update info  

### Spec

Update(tick=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| tick | int? | updating tick counter (always null for user calling) |
