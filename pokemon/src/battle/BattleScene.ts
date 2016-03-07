/**
 *
 * @author 
 *
 */
class BattleScene extends eui.Component{
    private bar_enemy_hp: eui.ProgressBar;
    private bar_own_hp: eui.ProgressBar;
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
    
    private group_operate: eui.Group;
    private group_desc: eui.Group;
    
    private label_desc: eui.Label;
    
    private _ownFtvo: FighterVO;
    private _enemyFtvo: FighterVO;
    
    private _ownObj: any;
    private _enemyObj: any;
    
    private _isCreated: boolean;
    private _isOwnRound: boolean;
        
	public constructor() {
        super();
        this.skinName = BattleSceneSkin;
	}
	
    public childrenCreated():void{
        super.childrenCreated();
        this._isCreated = true;
        this.group_desc.visible = false;
        this.group_operate.visible = true;
        this.updateInfo();
        this.addEvent();
	}
	
	private addEvent():void{
        this.btn_skill1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
        this.btn_skill2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
        this.btn_skill3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
        this.btn_skill4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
	}
	
	private removeEvent():void{
        this.btn_skill1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
        this.btn_skill2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
        this.btn_skill3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
        this.btn_skill4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSkillTap,this);
	}
	
	private __onSkillTap(evt:egret.TouchEvent):void{
        var cell: SkillCell = evt.target.cell;
        this.skillStart(this._ownFtvo,this._enemyFtvo,cell);
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
            this._ownFtvo = new FighterVO();
            this._ownFtvo.side = 1;
            this._enemyFtvo = new FighterVO();
            this._enemyFtvo.side = 2;
    	    
            this.label_own_cur_hp.text = this.label_own_max_hp.text = ""+FightConst.MAX_HP;
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
            
            this._isOwnRound = true;
            
            SoundManager.getInstance().playBattleSound();
            
//            var loader: egret.URLLoader = new egret.URLLoader();
//            loader.addEventListener(egret.Event.COMPLETE,function loadOver(event: egret.Event) {
//                var sound: egret.Sound = loader.data;
//                sound.play();
//            },this);
//            loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
//            loader.load(new egret.URLRequest("resource/assets/pokemon/battle.mp3"));
	    }
	}
	
	private skillStart(taft:FighterVO,tbft:FighterVO,tcell:SkillCell):void{
        var aimg: eui.Image = this.getFtByVO(taft);
        var bimg: eui.Image = this.getFtByVO(tbft);
        
        this.group_desc.visible = true;
        this.group_operate.visible = false;
        var content: string = "";
        if(this._isOwnRound) {
            content = "我方使用" + tcell.name + "对敌方造成" + tcell.damage + "伤害";
            this._enemyFtvo.hp -= tcell.damage;
        } else {
            content = "敌方使用" + tcell.name + "对我方造成" + tcell.damage + "伤害";
            this._ownFtvo.hp -= tcell.damage;
        }
        this.label_desc.text = content;
        
        AnimeManager.getInstance().playAtk(aimg,bimg,tcell,this.updateBar.bind(this),tcell,this._isOwnRound,this);
	}
	
	private updateBar(tcell:SkillCell):void{
        if(this._isOwnRound){
            this.bar_enemy_hp.value = 100 * this._enemyFtvo.hp / FightConst.MAX_HP;
        }else{
            this.bar_own_hp.value = 100* this._ownFtvo.hp / FightConst.MAX_HP;
            this.label_own_cur_hp.text = "" + this._ownFtvo.hp;
        }
        
        egret.setTimeout(this.skillEnd,this,500);
	}
	
	private skillEnd():void{
        if(this._ownFtvo.hp <=0){
            this.dispatchEventWith("lose",true);
            return;
        }else if(this._enemyFtvo.hp<=0){
            this.dispatchEventWith("win",true);
            return;
        }
    	
        this.label_desc.text = "";
        this._isOwnRound = !this._isOwnRound;
        if(!this._isOwnRound){
            this.skillStart(this._enemyFtvo,this._ownFtvo,this.getRandomEnmeySkill());
        }else{
            this.group_desc.visible = false;
            this.group_operate.visible = true;
        }
	}
	
	private getFtByVO(tftvo:FighterVO):eui.Image{
	    if(tftvo.side == 1){
            return this.img_own_monster;
	    }else{
            return this.img_enemy_monster;
	    }
	}
	
	private getRandomEnmeySkill():SkillCell{
        var arr: Array<SkillCell> = [];
        if(this._enemyObj["1"]){
            arr.push(this._enemyObj["1"]);
        }
        if(this._enemyObj["2"]){
            arr.push(this._enemyObj["2"]);
        }
        if(this._enemyObj["3"]) {
            arr.push(this._enemyObj["3"]);
        }
        if(this._enemyObj["4"]) {
            arr.push(this._enemyObj["4"]);
        }
        
        var index = Math.round((Math.random() * (arr.length - 1)));
        return arr[index];
	}
}
