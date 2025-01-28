// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;
const HappeningManager=YgEs.HappeningManager;

// Happening Manager Test --------------- //

const scenaria=[
	{
		Title:'Happening Info',
		Proc:(tool)=>{
			let hap_local=tool.HappenTo.CreateLocal({
				OnHappen:(hap)=>{
					if(!hap.User.ForMyTest){
						// unknown happens send to parent 
						tool.HappenTo.Happen(hap);
						return;
					}

					let info=hap.GetInfo();
					Test.ChkStrict('Happen Test',info.Msg);
					Test.ChkStrict('Posed',info.Status);
					Test.ChkStrict(1,info.Prop.A);
					Test.ChkStrict(-2,info.Prop.B);
					Test.ChkStrict(true,info.User.ForMyTest);

					hap.Resolve();
					Test.ChkStrict('Resolved',hap.GetInfo().Status);
				},
			});
			
			hap_local.Happen('Happen Test',{A:1,B:-2},{User:{ForMyTest:true}});
			hap_local.User.Test='test';

			let info=hap_local.GetInfo();
			Test.ChkStrict('Available',info.Status);
			Test.ChkStrict('test',info.User.Test);
			Test.ChkStrict('Happen Test',info.Issues[0].Msg);

			hap_local.Abandon();
			Test.ChkStrict('Abandoned',hap_local.GetInfo().Status);
		},
	},
]

Test.Run(scenaria);
