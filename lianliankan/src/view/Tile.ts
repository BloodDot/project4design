/**
 *
 * @author 
 *
 */
class Tile extends egret.Sprite {
    private _type: number;
    /** 行Y */
    public row: number;
    /** 列X */
    public col: number;
    
    private _bp:egret.Bitmap;
    
    public constructor(ttype: number,tcol: number, trow:number, emptyVisible:boolean=false) {
        super();
        this._type = ttype;
        this.col = tcol;
        this.row = trow;
        if(emptyVisible || this._type != 0){
            this._bp = new egret.Bitmap(RES.getRes("icon_" + this.type + "_png"));
            this.addChild(this._bp)
            this._bp.width = GameData.getInstance().tileWidth;
            this._bp.height = GameData.getInstance().tileHeight;
            this._bp.touchEnabled = true;
        }
        this.touchChildren = this.touchEnabled = true;
    }
    
    public get type():number{
        return this._type;
    }
    
    public set type(value:number){
        this._type = value;
        
        this._bp.texture = RES.getRes("icon_" + this.type + "_png");
    }
}
