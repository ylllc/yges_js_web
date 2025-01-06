// † Yggdrasil Essense for JavaScript † //
// ====================================== //
// © 2024-5 Yggdrasil Leaves, LLC.        //
//        All rights reserved.            //

const Test=YgEs.Test;

// Enum Test ---------------------------- //

const scenaria=[
	{
		title:'Enum',
		proc:async (tool)=>{
			let src=['ZERO','ONE','TWO','THREE','FOUR',
				'FIVE','SIX','SEVEN','EIGHT','NINE','TEN']
			let lut=YgEs.createEnum(src);

			Test.chk_strict(src.length,Object.keys(lut).length,'must same size');
			for(let i=0;i<src.length;++i){
				Test.chk_strict(i,lut[src[i]],'reverse lookup compareing');
			}
		},
	},
]

Test.run(scenaria);
