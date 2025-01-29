@page pg_class_procedure_view ProcedureView

# What's It?

(web only)  
created by @ref pg_class_launcher_view  
this class is inherited from @ref pg_class_qht  

-----
# Properties

| Name | Type | Means |
|------|------|-------|
| Status | @ref pg_class_qht | status view |
| Info | @ref pg_class_qht | info view |
| Haps | @ref pg_class_qht | happenings view |

-----
# Methods

-----
## Update() {#ProcedureView_Update}

update info  

### Spec

Update(tick=null):void

### Args

| Name | Type | Means |
|------|------|-------|
| tick | int? | updating tick counter (always null for user calling) |
