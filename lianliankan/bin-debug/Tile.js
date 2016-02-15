/**
 *
 * @author
 *
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(ttype, trow, tcol) {
        _super.call(this);
        this.type = ttype;
        this.col = tcol;
        this.row = trow;
        var bp = new egret.Bitmap(RES.getRes("icon_" + this.type + "_png"));
        this.addChild(bp);
        bp.width = bp.height = 40;
        bp.touchEnabled = true;
        this.touchChildren = this.touchEnabled = true;
    }
    var d = __define,c=Tile,p=c.prototype;
    return Tile;
})(egret.Sprite);
egret.registerClass(Tile,'Tile');
//# sourceMappingURL=Tile.js.map