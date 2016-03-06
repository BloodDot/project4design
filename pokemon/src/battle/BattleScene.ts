/**
 *
 * @author 
 *
 */
class BattleScene extends eui.Component{
    private bar_enemy_hp: eui.ProgressBar;
    private label_enemy_lv: eui.Label;
    private label_enemy_name: eui.Label;
    private label_own_lv: eui.Label;
    private label_own_name: eui.Label;
    private label_own_cur_hp: eui.Label;
    private label_own_max_hp: eui.Label;
    private img_enemy_monster: eui.Image;
    private img_own_monster: eui.Image;
    
    private btn_skill1: BattleSkillButton;
    private btn_skill2: BattleSkillButton;
    private btn_skill3: BattleSkillButton;
    private btn_skill4: BattleSkillButton;
    
    private _ownObj: any;
    private _enemyObj: any;
    
    private _isCreated: boolean;
        
	public constructor() {
        super();
        this.skinName = BattleSceneSkin;
	}
	
    public childrenCreated():void{
        super.childrenCreated();
        this._isCreated = true;
        this.updateInfo();
	}
	
	public set ownObj(value:any){
        this._ownObj = value;
        this.updateInfo();
	}
	
	public set enemyObj(value:any){
        this._enemyObj = value;
        this.updateInfo();
	}
	
	private updateInfo():void{
	    if(this._ownObj&&this._enemyObj&&this._isCreated){
            if(this._ownObj["1"]){
                this.btn_skill1.cell = this._ownObj["1"];
            }else{
                this.btn_skill1.visible = false;
            }
            if(this._ownObj["2"]){
                this.btn_skill2.cell = this._ownObj["2"];
            }else{
                this.btn_skill2.visible = false;
            }
            if(this._ownObj["3"]){
                this.btn_skill3.cell = this._ownObj["3"];
            }else{
                this.btn_skill3.visible = false;
            }
            if(this._ownObj["4"]){
                this.btn_skill4.cell = this._ownObj["4"];
            }else{
                this.btn_skill4.visible = false;
            }
            this.img_own_monster.source = this._ownObj["id"] + "_back_png";
            this.img_enemy_monster.source = this._enemyObj["id"]+"_front_png";
	    }
	}
}
