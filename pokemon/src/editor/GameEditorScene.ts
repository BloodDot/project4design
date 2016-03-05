/**
 *
 * @author 
 *
 */
class GameEditorScene extends eui.Component{
    private image_own_monster: eui.Image;
    private image_enemy_monster: eui.Image;
    private txt_own: eui.TextInput;
    private txt_enemy: eui.TextInput;
    private btn_own_skill1: eui.Button;
    private btn_own_skill2: eui.Button;
    private btn_own_skill3: eui.Button;
    private btn_own_skill4: eui.Button;
    
    private btn_enemy_skill1: eui.Button;
    private btn_enemy_skill2: eui.Button;
    private btn_enemy_skill3: eui.Button;
    private btn_enemy_skill4: eui.Button;
    
	public constructor() {
        super();
        this.skinName = GameEditorSceneSkin;
	}
	
	public childrenCreated():void{
        super.childrenCreated();
        this.addEvent();
	}
	
	private addEvent():void{
        this.txt_own.addEventListener(egret.TextEvent.CHANGE,this.__onOwnTxtChange,this);
        this.txt_enemy.addEventListener(egret.TextEvent.CHANGE,this.__onEnemyTxtChange,this);
	}
	
	private removeEvent():void{
        this.txt_own.removeEventListener(egret.TextEvent.CHANGE,this.__onOwnTxtChange,this);
        this.txt_enemy.removeEventListener(egret.TextEvent.CHANGE,this.__onEnemyTxtChange,this);
	}
	
	private __onOwnTxtChange(evt:egret.TextEvent):void{
        var num = parseInt(this.txt_own.text);
        if(this.txt_own.text == ""){
            num = 0;
        } else if(num > 649){
            num = 649;
            this.txt_own.text = "649";
        }
        this.image_own_monster.source = num + "_png";
	}
	
	private __onEnemyTxtChange(evt:egret.TextEvent):void{
        var num = parseInt(this.txt_enemy.text);
        if(this.txt_enemy.text == "") {
            num = 0;
        } else if(num > 649) {
            num = 649;
            this.txt_enemy.text = "649";
        }
        
        this.image_enemy_monster.source = num + "_png";
	}
	
	public dispose():void{
        this.removeEvent();
	}
}
