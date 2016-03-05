/**
 *
 * @author
 *
 */
var BattleSkillButton = (function (_super) {
    __extends(BattleSkillButton, _super);
    function BattleSkillButton() {
        _super.call(this);
    }
    var d = __define,c=BattleSkillButton,p=c.prototype;
    d(p, "normal"
        ,function () {
            if (this.normalDisplay) {
                return this.normalDisplay.source;
            }
            else {
                return this._normal;
            }
        }
        ,function (value) {
            this._normal = value;
            if (this.normalDisplay) {
                this.normalDisplay.source = value;
            }
        }
    );
    d(p, "down"
        ,function () {
            if (this.downDisplay) {
                return this.downDisplay.source;
            }
            else {
                return this._down;
            }
        }
        ,function (value) {
            this._down = value;
            if (this.downDisplay) {
                this.downDisplay.source = value;
            }
        }
    );
    p.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.normalDisplay && this._normal != undefined) {
            this.normalDisplay.source = this._normal;
        }
        if (instance == this.downDisplay && this._down != undefined) {
            this.downDisplay.source = this._down;
        }
    };
    return BattleSkillButton;
})(eui.Button);
egret.registerClass(BattleSkillButton,'BattleSkillButton');
//# sourceMappingURL=BattleSkillButton.js.map