/**
 *
 * @author 
 *
 */
class Tile extends egret.Sprite {
    public type: number;
    /** 行Y */
    public row: number;
    /** 列X */
    public col: number;
    
    public constructor(ttype: number,tcol: number, trow:number) {
        super();
        this.type = ttype;
        this.col = tcol;
        this.row = trow;
        var bp: egret.Bitmap = new egret.Bitmap(RES.getRes("icon_" + this.type+"_png"));
        this.addChild(bp)
        bp.width = GameData.getInstance().tileWidth;
        bp.height = GameData.getInstance().tileHeight;
        bp.touchEnabled = true;
        this.touchChildren = this.touchEnabled = true;
    }
}
