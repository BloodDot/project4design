/**
 *
 * @author
 *
 */
var SkillEditorScene = (function (_super) {
    __extends(SkillEditorScene, _super);
    function SkillEditorScene() {
        _super.call(this);
        this.skinName = SkillEditorSceneSkin;
    }
    var d = __define,c=SkillEditorScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._mc = new ZMovieClip();
        this.addChild(this._mc);
        this._mc.x = 100;
        this._mc.y = 100;
        this.addEvent();
    };
    p.addEvent = function () {
        this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onPlayTap, this);
        this.btn_stop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStopTap, this);
    };
    p.removeEvent = function () {
        this.btn_play.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onPlayTap, this);
        this.btn_stop.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStopTap, this);
    };
    p.__onPlayTap = function (evt) {
        if (this.txt_input_skill.text != "") {
            var name = this.txt_input_skill.text;
            this._mc.loadByUrl(name + "_json", name + "_png", name);
        }
        this._mc.play(-1);
    };
    p.__onStopTap = function (evt) {
        this._mc.stop();
    };
    p.dispose = function () {
        this.removeEvent();
    };
    return SkillEditorScene;
})(eui.Component);
egret.registerClass(SkillEditorScene,'SkillEditorScene');
//# sourceMappingURL=SkillEditorScene.js.map