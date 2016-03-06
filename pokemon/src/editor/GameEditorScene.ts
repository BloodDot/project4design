/**
 *
 * @author 
 *
 */
class GameEditorScene extends eui.Component {
    private image_own_monster: eui.Image;
    private image_enemy_monster: eui.Image;
    private txt_own: eui.TextInput;
    private txt_enemy: eui.TextInput;
    private btn_own_skill1: BattleSkillButton;
    private btn_own_skill2: BattleSkillButton;
    private btn_own_skill3: BattleSkillButton;
    private btn_own_skill4: BattleSkillButton;

    private btn_enemy_skill1: BattleSkillButton;
    private btn_enemy_skill2: BattleSkillButton;
    private btn_enemy_skill3: BattleSkillButton;
    private btn_enemy_skill4: BattleSkillButton;

    private list_skill: GameSkillList;

    private _curSkill: BattleSkillButton;
    
    private btn_battle: eui.Button;

    private _ownSkobj: any;
    private _enemySkobj: any;

    public constructor() {
        super();
        this.skinName = GameEditorSceneSkin;
    }

    public childrenCreated(): void {
        super.childrenCreated();
        this._ownSkobj = {};
        this._enemySkobj = {};
        this.addEvent();
    }

    private addEvent(): void {
        this.txt_own.addEventListener(egret.TextEvent.CHANGE,this.__onOwnTxtChange,this);
        this.txt_enemy.addEventListener(egret.TextEvent.CHANGE,this.__onEnemyTxtChange,this);
        this.btn_own_skill1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);
        this.btn_own_skill2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);
        this.btn_own_skill3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);
        this.btn_own_skill4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);

        this.btn_enemy_skill1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);
        this.btn_enemy_skill2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);
        this.btn_enemy_skill3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);
        this.btn_enemy_skill4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);
        
        this.btn_battle.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onBattleTap,this);
        this.addEventListener("skillSelect",this.__onSkillSelect,this);
    }

    private removeEvent(): void {
        this.txt_own.removeEventListener(egret.TextEvent.CHANGE,this.__onOwnTxtChange,this);
        this.txt_enemy.removeEventListener(egret.TextEvent.CHANGE,this.__onEnemyTxtChange,this);

        this.btn_own_skill1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);
        this.btn_own_skill2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);
        this.btn_own_skill3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);
        this.btn_own_skill4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onOwnSkillTap,this);

        this.btn_enemy_skill1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);
        this.btn_enemy_skill2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);
        this.btn_enemy_skill3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);
        this.btn_enemy_skill4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onEnemySkillTap,this);

        this.btn_battle.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onBattleTap,this);
        this.removeEventListener("skillSelect",this.__onSkillSelect,this);
    }
    
    private __onBattleTap(evt:egret.Event):void{
        if(this.txt_own.text != "" && this.txt_enemy.text != "" 
            && (this._ownSkobj["1"] || this._ownSkobj["2"] || this._ownSkobj["3"] || this._ownSkobj["4"])
            && (this._enemySkobj["1"] || (this._enemySkobj["2"]) || (this._enemySkobj["3"]) || (this._enemySkobj["4"]))){
            this.dispatchEventWith("startBattle",true);
            }
    }

    private __onSkillSelect(evt: egret.Event): void {
        var cell: SkillCell = evt.data;
        switch(this._curSkill) {
            case this.btn_own_skill1:
                this._ownSkobj["1"] = cell;
                break;
            case this.btn_own_skill2:
                this._ownSkobj["2"] = cell;
                break;
            case this.btn_own_skill3:
                this._ownSkobj["3"] = cell;
                break;
            case this.btn_own_skill4:
                this._ownSkobj["4"] = cell;
                break;
            case this.btn_enemy_skill1:
                this._enemySkobj["1"] = cell;
                break;
            case this.btn_enemy_skill2:
                this._enemySkobj["2"] = cell;
                break;
            case this.btn_enemy_skill3:
                this._enemySkobj["3"] = cell;
                break;
            case this.btn_enemy_skill4:
                this._enemySkobj["4"] = cell;
                break;
        }
        this._curSkill.cell = cell;
        this.list_skill.visible = false;
    }

    private __onOwnSkillTap(evt: egret.TouchEvent): void {
        this._curSkill = evt.target;
        this.list_skill.visible = true;
    }

    private __onEnemySkillTap(evt: egret.TouchEvent): void {
        this._curSkill = evt.target;
        this.list_skill.visible = true;
    }

    private __onOwnTxtChange(evt: egret.TextEvent): void {
        var num = parseInt(this.txt_own.text);
        if(this.txt_own.text == "") {
            num = 0;
        } else if(num > 649) {
            num = 649;
            this.txt_own.text = "649";
        }
        this._ownSkobj["id"] = num;
        this.image_own_monster.source = num + "_png";
    }

    private __onEnemyTxtChange(evt: egret.TextEvent): void {
        var num = parseInt(this.txt_enemy.text);
        if(this.txt_enemy.text == "") {
            num = 0;
        } else if(num > 649) {
            num = 649;
            this.txt_enemy.text = "649";
        }
        this._enemySkobj["id"] = num;
        this.image_enemy_monster.source = num + "_png";
    }
    
    public get ownSkobj():any{
        return this._ownSkobj;
    }
    
    public get enemySkobj():any{
        return this._enemySkobj;
    }

    public dispose(): void {
        this.removeEvent();
    }
}
