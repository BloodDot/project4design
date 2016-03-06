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
        this.updateInfo();
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
        }
    };
    return BattleScene;
})(eui.Component);
egret.registerClass(BattleScene,'BattleScene');
//# sourceMappingURL=BattleScene.js.map