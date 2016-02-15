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
    
    public constructor(ttype:number, trow:number, tcol:number) {
        super();
        this.type = ttype;
        this.col = tcol;
        this.row = trow;
        var bp: egret.Bitmap = new egret.Bitmap(RES.getRes("icon_" + this.type+"_png"));
        this.addChild(bp)
        bp.width = bp.height = 40;
        bp.touchEnabled = true;
        this.touchChildren = this.touchEnabled = true;
    }
}
