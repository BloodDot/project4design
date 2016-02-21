/**
 *
 * @author
 *
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(ttype, tcol, trow) {
        _super.call(this);
        this.type = ttype;
        this.col = tcol;
        this.row = trow;
        var bp = new egret.Bitmap(RES.getRes("icon_" + this.type + "_png"));
        this.addChild(bp);
        bp.width = GameData.getInstance().tileWidth;
        bp.height = GameData.getInstance().tileHeight;
        bp.touchEnabled = true;
        this.touchChildren = this.touchEnabled = true;
    }
    var d = __define,c=Tile,p=c.prototype;
    return Tile;
})(egret.Sprite);
egret.registerClass(Tile,'Tile');
//# sourceMappingURL=Tile.js.map