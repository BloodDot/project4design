/**
 *
 * @author
 *
 */
var GameSkillList = (function (_super) {
    __extends(GameSkillList, _super);
    function GameSkillList() {
        _super.call(this);
    }
    var d = __define,c=GameSkillList,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var arr = SkillTable.getInstance().vect;
        var layout = new eui.VerticalLayout();
        layout.gap = 6;
        this._skillList = new eui.List();
        this._skillList.useVirtualLayout = true;
        this._skillList.layout = layout;
        this._skillList.itemRenderer = GameSkillItem;
        this._skillList.dataProvider = new eui.ArrayCollection(arr);
        this._skillList.selectedIndex = 1; //设置默认选中项
        this.scroller_skill.viewport = this._skillList;
    };
    return GameSkillList;
})(eui.Component);
egret.registerClass(GameSkillList,'GameSkillList');
//# sourceMappingURL=GameSkillList.js.map