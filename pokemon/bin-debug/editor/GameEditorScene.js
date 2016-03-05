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
        this.addEvent();
    };
    p.addEvent = function () {
        this.txt_own.addEventListener(egret.TextEvent.CHANGE, this.__onOwnTxtChange, this);
        this.txt_enemy.addEventListener(egret.TextEvent.CHANGE, this.__onEnemyTxtChange, this);
    };
    p.removeEvent = function () {
        this.txt_own.removeEventListener(egret.TextEvent.CHANGE, this.__onOwnTxtChange, this);
        this.txt_enemy.removeEventListener(egret.TextEvent.CHANGE, this.__onEnemyTxtChange, this);
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
        this.image_enemy_monster.source = num + "_png";
    };
    p.dispose = function () {
        this.removeEvent();
    };
    return GameEditorScene;
})(eui.Component);
egret.registerClass(GameEditorScene,'GameEditorScene');
//# sourceMappingURL=GameEditorScene.js.map