/**
 *
 * @author
 *
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(ttype, tcol, trow, emptyVisible) {
        if (emptyVisible === void 0) { emptyVisible = false; }
        _super.call(this);
        this._type = ttype;
        this.col = tcol;
        this.row = trow;
        if (emptyVisible || this._type != 0) {
            this._bp = new egret.Bitmap(RES.getRes("icon_" + this.type + "_png"));
            this.addChild(this._bp);
            this._bp.width = GameData.getInstance().tileWidth;
            this._bp.height = GameData.getInstance().tileHeight;
            this._bp.touchEnabled = true;
        }
        this.touchChildren = this.touchEnabled = true;
    }
    var d = __define,c=Tile,p=c.prototype;
    d(p, "type"
        ,function () {
            return this._type;
        }
        ,function (value) {
            this._type = value;
            this._bp.texture = RES.getRes("icon_" + this.type + "_png");
        }
    );
    return Tile;
})(egret.Sprite);
egret.registerClass(Tile,'Tile');
