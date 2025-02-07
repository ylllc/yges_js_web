@page pg_feat_gui GUI Helper

# What's It?

imprement GUI parts easily.  

-----
# Import

## for web (only)

```
<script src="yges/ipl.js"></script>
<script src="yges/gui.js"></script>
```
use YgEs

## for Node/Deno

(not supported)

-----
# How to Use

-----
## Button

```
YgEs.GUI.Button(TargetQHT,'ButtonLabel',{
	User:{/* user definition, refered by OnClick */},
	OnClick:(user)=>{
		// call by clicked 
	},
});
```

-----
## Toggle


```
YgEs.GUI.Toggle(ctrlpnl,'ButtonLabel',true,{
	OffClass:'ButtonClassForToggleOff',
	OnClass:'ButtonClassForToggleOn',
	OnChanging:(side)=>{
		// call by clicked 
		// return true to allow switching 
		return true;
	},
});
```

-----
## Radio Button Set

```
YgEs.GUI.Radio(TargetQHT,[
		0,1,2,3,4,5, // simple selections 
		{Tag:'hr'}, // can insert QHT  
		{Value:999999,Label:'mode...'}, // selection with props 
	],{
	Init:2, // initial selection 
	OnChanging:(prev,next)=>{
		// call by selection changing 
		// return true to allow 
		return true;
	},
});

```

-----
## Select Box

```
YgEs.GUI.Select(TargetQHT,[
		0,1,2,3,4,5, // simple selections 
		{Value:999999,Label:'mode...'}, // selection with props 
	],{
	Init:2, // initial selection 
	OnChanging:(prev,next)=>{
		// call by selection changing 
		// return true to allow 
		return true;
	},
});

```

-----
## Dialog

```
const dialog=YgEs.GUI.Dialog(TargetQHT,IsModal,{
	Sub:[
			:
		Dialog Contents
			:
	]
});

	:
	:
dialog.Open();
	:
	:
dialog.Close();

```

-----
## PopUp

```
const popup=YgEs.GUI.PopUp(TargetQHT,{
	Sub:[
			:
		PopUp Contents
			:
	]
});

	:
	:
popup.Show();
	:
	:
popup.Hide();

```

-----
## PopUp Menu

```
const popup=YgEs.GUI.PopUpManu(TargetQHT,{
	{Label:'Item1',OnAction:()=>{ /* call by click Item1 */ }},
	{Tag:'hr'}, // can insert QHT  
	{Label:'Item2',OnAction:()=>{ /* call by click Item2 */ }},
});
	:
	:
popup.Show();
	:
	:
popup.Hide();

```

-----
# Class Reference

@sa @ref pg_class_gui @n
