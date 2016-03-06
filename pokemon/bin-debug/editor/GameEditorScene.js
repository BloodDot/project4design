/**
 *
 * @author
 *
 */
var GameEditorScene = (function (_super) {
    __extends(GameEditorScene, _super);
    function GameEditorScene() {
        _super.call(this);
        this.skinName = GameEditorSceneSkin;
    }
    var d = __define,c=GameEditorScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._ownSkobj = {};
        this._enemySkobj = {};
        this.addEvent();
    };
    p.addEvent = function () {
        this.txt_own.addEventListener(egret.TextEvent.CHANGE, this.__onOwnTxtChange, this);
        this.txt_enemy.addEventListener(egret.TextEvent.CHANGE, this.__onEnemyTxtChange, this);
        this.btn_own_skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_own_skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_own_skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_own_skill4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_enemy_skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_enemy_skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_enemy_skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_enemy_skill4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_battle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onBattleTap, this);
        this.addEventListener("skillSelect", this.__onSkillSelect, this);
    };
    p.removeEvent = function () {
        this.txt_own.removeEventListener(egret.TextEvent.CHANGE, this.__onOwnTxtChange, this);
        this.txt_enemy.removeEventListener(egret.TextEvent.CHANGE, this.__onEnemyTxtChange, this);
        this.btn_own_skill1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_own_skill2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_own_skill3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_own_skill4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onOwnSkillTap, this);
        this.btn_enemy_skill1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_enemy_skill2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_enemy_skill3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_enemy_skill4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onEnemySkillTap, this);
        this.btn_battle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onBattleTap, this);
        this.removeEventListener("skillSelect", this.__onSkillSelect, this);
    };
    p.__onBattleTap = function (evt) {
        if (this.txt_own.text != "" && this.txt_enemy.text != ""
            && (this._ownSkobj["1"] || this._ownSkobj["2"] || this._ownSkobj["3"] || this._ownSkobj["4"])
            && (this._enemySkobj["1"] || (this._enemySkobj["2"]) || (this._enemySkobj["3"]) || (this._enemySkobj["4"]))) {
            this.dispatchEventWith("startBattle", true);
        }
    };
    p.__onSkillSelect = function (evt) {
        var cell = evt.data;
        switch (this._curSkill) {
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
    };
    p.__onOwnSkillTap = function (evt) {
        this._curSkill = evt.target;
        this.list_skill.visible = true;
    };
    p.__onEnemySkillTap = function (evt) {
        this._curSkill = evt.target;
        this.list_skill.visible = true;
    };
    p.__onOwnTxtChange = function (evt) {
        var num = parseInt(this.txt_own.text);
        if (this.txt_own.text == "") {
            num = 0;
        }
        else if (num > 649) {
            num = 649;
            this.txt_own.text = "649";
        }
        this._ownSkobj["id"] = num;
        this.image_own_monster.source = num + "_png";
    };
    p.__onEnemyTxtChange = function (evt) {
        var num = parseInt(this.txt_enemy.text);
        if (this.txt_enemy.text == "") {
            num = 0;
        }
        else if (num > 649) {
            num = 649;
            this.txt_enemy.text = "649";
        }
        this._enemySkobj["id"] = num;
        this.image_enemy_monster.source = num + "_png";
    };
    d(p, "ownSkobj"
        ,function () {
            return this._ownSkobj;
        }
    );
    d(p, "enemySkobj"
        ,function () {
            return this._enemySkobj;
        }
    );
    p.dispose = function () {
        this.removeEvent();
    };
    return GameEditorScene;
})(eui.Component);
egret.registerClass(GameEditorScene,'GameEditorScene');
//# sourceMappingURL=GameEditorScene.js.map