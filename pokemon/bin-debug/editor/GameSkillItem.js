/**
 *
 * @author
 *
 */
var GameSkillItem = (function (_super) {
    __extends(GameSkillItem, _super);
    function GameSkillItem() {
        _super.call(this);
        this.skinName = GameSkillItemSkin;
    }
    var d = __define,c=GameSkillItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._created = true;
        this.updateInfo();
        this.addEvent();
    };
    p.addEvent = function () {
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__confirmTap, this);
    };
    p.removeEvent = function () {
        this.btn_confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__confirmTap, this);
    };
    p.__confirmTap = function (evt) {
        this.dispatchEventWith("skillSelect", true, this.data);
    };
    p.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.updateInfo();
    };
    p.updateInfo = function () {
        if (this.data && this._created) {
            var cell = this.data;
            this.txt_id.text = "" + cell.id;
            this.txt_name.text = cell.name;
            this.txt_damage.text = "伤害值:" + cell.damage;
            this.txt_type.text = this.getTypeName(cell.type);
            this.txt_series.text = this.getSeriesName(cell.series);
        }
    };
    p.getTypeName = function (ttype) {
        var str = "";
        switch (ttype) {
            case 1:
                str = "远程直接攻击";
                break;
            case 2:
                str = "近战跑过去攻击";
                break;
            case 3:
                str = "抛东西攻击";
                break;
            case 4:
                str = "自身加状态";
                break;
        }
        return str;
    };
    p.getSeriesName = function (tseries) {
        var str = "";
        switch (tseries) {
            case 0:
                str = "普通";
                break;
            case 1:
                str = "格斗";
                break;
            case 2:
                str = "飞行";
                break;
            case 3:
                str = "毒";
                break;
            case 4:
                str = "地面";
                break;
            case 5:
                str = "岩石";
                break;
            case 6:
                str = "虫";
                break;
            case 7:
                str = "鬼";
                break;
            case 8:
                str = "钢";
                break;
            case 9:
                str = "火";
                break;
            case 10:
                str = "水";
                break;
            case 11:
                str = "草";
                break;
            case 12:
                str = "电";
                break;
            case 13:
                str = "超能";
                break;
            case 14:
                str = "冰";
                break;
            case 15:
                str = "龙";
                break;
            case 16:
                str = "暗";
                break;
        }
        return str;
    };
    return GameSkillItem;
})(eui.ItemRenderer);
egret.registerClass(GameSkillItem,'GameSkillItem');
//# sourceMappingURL=GameSkillItem.js.map