@page pg_class_stmac_container StateMachine.Container

# What's It?

@sa @ref pg_feat_stmac @n

-----
# Namespaces

-----
| Symbol | Purpose |
|--------|---------|
| YgEs.StateMachine | statemachine container |

-----
# Methods

-----
## Run() {#StMac_Run}

### Spec

Run(start,states,opt):@ref pg_class_stmac_context

### Args

| Name | Type | Means |
|------|------|-------|
| start | string | select startpoint of states |
| states | dict<string,@ref StMac_StateSettings> | states settings by each state name |
| opt | @ref StMac_StatesOption | optional settings |

### Returns

statemachine context
