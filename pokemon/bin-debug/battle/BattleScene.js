/**
 *
 * @author
 *
 */
var BattleScene = (function (_super) {
    __extends(BattleScene, _super);
    function BattleScene() {
        _super.call(this);
        this.skinName = BattleSceneSkin;
    }
    var d = __define,c=BattleScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._isCreated = true;
        this.group_desc.visible = false;
        this.group_operate.visible = true;
        this.updateInfo();
        this.addEvent();
    };
    p.addEvent = function () {
        this.btn_skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
        this.btn_skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
        this.btn_skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
        this.btn_skill4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
    };
    p.removeEvent = function () {
        this.btn_skill1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
        this.btn_skill2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
        this.btn_skill3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
        this.btn_skill4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSkillTap, this);
    };
    p.__onSkillTap = function (evt) {
        var cell = evt.target.cell;
        this.skillStart(this._ownFtvo, this._enemyFtvo, cell);
    };
    d(p, "ownObj",undefined
        ,function (value) {
            this._ownObj = value;
            this.updateInfo();
        }
    );
    d(p, "enemyObj",undefined
        ,function (value) {
            this._enemyObj = value;
            this.updateInfo();
        }
    );
    p.updateInfo = function () {
        if (this._ownObj && this._enemyObj && this._isCreated) {
            this._ownFtvo = new FighterVO();
            this._ownFtvo.side = 1;
            this._enemyFtvo = new FighterVO();
            this._enemyFtvo.side = 2;
            this.label_own_cur_hp.text = this.label_own_max_hp.text = "" + FightConst.MAX_HP;
            if (this._ownObj["1"]) {
                this.btn_skill1.cell = this._ownObj["1"];
            }
            else {
                this.btn_skill1.visible = false;
            }
            if (this._ownObj["2"]) {
                this.btn_skill2.cell = this._ownObj["2"];
            }
            else {
                this.btn_skill2.visible = false;
            }
            if (this._ownObj["3"]) {
                this.btn_skill3.cell = this._ownObj["3"];
            }
            else {
                this.btn_skill3.visible = false;
            }
            if (this._ownObj["4"]) {
                this.btn_skill4.cell = this._ownObj["4"];
            }
            else {
                this.btn_skill4.visible = false;
            }
            this.img_own_monster.source = this._ownObj["id"] + "_back_png";
            this.img_enemy_monster.source = this._enemyObj["id"] + "_front_png";
            this._isOwnRound = true;
            SoundManager.getInstance().playBattleSound();
        }
    };
    p.skillStart = function (taft, tbft, tcell) {
        var aimg = this.getFtByVO(taft);
        var bimg = this.getFtByVO(tbft);
        this.group_desc.visible = true;
        this.group_operate.visible = false;
        var content = "";
        if (this._isOwnRound) {
            content = "我方使用" + tcell.name + "对敌方造成" + tcell.damage + "伤害";
            this._enemyFtvo.hp -= tcell.damage;
        }
        else {
            content = "敌方使用" + tcell.name + "对我方造成" + tcell.damage + "伤害";
            this._ownFtvo.hp -= tcell.damage;
        }
        this.label_desc.text = content;
        AnimeManager.getInstance().playAtk(aimg, bimg, tcell, this.updateBar.bind(this), tcell, this._isOwnRound, this);
    };
    p.updateBar = function (tcell) {
        if (this._isOwnRound) {
            this.bar_enemy_hp.value = 100 * this._enemyFtvo.hp / FightConst.MAX_HP;
        }
        else {
            this.bar_own_hp.value = 100 * this._ownFtvo.hp / FightConst.MAX_HP;
            this.label_own_cur_hp.text = "" + this._ownFtvo.hp;
        }
        egret.setTimeout(this.skillEnd, this, 500);
    };
    p.skillEnd = function () {
        if (this._ownFtvo.hp <= 0) {
            this.dispatchEventWith("lose", true);
            return;
        }
        else if (this._enemyFtvo.hp <= 0) {
            this.dispatchEventWith("win", true);
            return;
        }
        this.label_desc.text = "";
        this._isOwnRound = !this._isOwnRound;
        if (!this._isOwnRound) {
            this.skillStart(this._enemyFtvo, this._ownFtvo, this.getRandomEnmeySkill());
        }
        else {
            this.group_desc.visible = false;
            this.group_operate.visible = true;
        }
    };
    p.getFtByVO = function (tftvo) {
        if (tftvo.side == 1) {
            return this.img_own_monster;
        }
        else {
            return this.img_enemy_monster;
        }
    };
    p.getRandomEnmeySkill = function () {
        var arr = [];
        if (this._enemyObj["1"]) {
            arr.push(this._enemyObj["1"]);
        }
        if (this._enemyObj["2"]) {
            arr.push(this._enemyObj["2"]);
        }
        if (this._enemyObj["3"]) {
            arr.push(this._enemyObj["3"]);
        }
        if (this._enemyObj["4"]) {
            arr.push(this._enemyObj["4"]);
        }
        var index = Math.round((Math.random() * (arr.length - 1)));
        return arr[index];
    };
    return BattleScene;
})(eui.Component);
egret.registerClass(BattleScene,'BattleScene');
//# sourceMappingURL=BattleScene.js.map