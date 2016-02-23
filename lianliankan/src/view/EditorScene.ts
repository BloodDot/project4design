/**
 *
 * @author 
 *
 */
class EditorScene extends eui.Component{
    private btn_mode:eui.Button;
    private btn_save:eui.Button;
    private btn_clear:eui.Button;
    private btn_run:eui.Button;
    
    private group_tile:eui.Group;
    private group_icon:eui.Group;
    
    private icon_1:eui.Image;
    private icon_2: eui.Image;
    private icon_3: eui.Image;
    private icon_4: eui.Image;
    private icon_5: eui.Image;
    private icon_6: eui.Image;
    private icon_7: eui.Image;
    private icon_8: eui.Image;
    private icon_9: eui.Image;

    private _type:number;
    
    private _tileVect:Array<Tile>;
    
	public constructor() {
    	super();
    	this.skinName = EditorSceneSkin;
	}
	
	public childrenCreated():void{
	    super.childrenCreated();
	    this.init();
	}
	
    private init(): void {
        this._tileVect = [];
        this._type = 1;
        
        var i,j = GameData.getInstance().col;
        var m,n = GameData.getInstance().row;
        var tile: Tile;
        for(i = 0;i < j;i++) {
            for(m = 0;m < n;m++) {
                tile = new Tile(0,m,i,true);
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onTileTap,this);
                this.group_tile.addChild(tile);
                tile.x = GameData.getInstance().tileWidth * m;
                tile.y = GameData.getInstance().tileHeight * i;
                this._tileVect.push(tile);
            }
        }
        
        this.icon_1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_6.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_7.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_8.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        this.icon_9.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onIconTap,this);
        
        this.btn_mode.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onModeTap,this);
        this.btn_save.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSaveTap,this);
        this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onClearTap,this);
        this.btn_run.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onRunTap,this);
    }
    
    private __onModeTap(evt:egret.TouchEvent):void{
        if(this.group_icon.visible){
            this.group_icon.visible = false;
            this._type = -1;
        }else{
            this.group_icon.visible = true;
            this._type = 1;
        }
        
        this.clearTiles();
    }
    
    private __onSaveTap(evt:egret.TouchEvent):void{
        this.saveMapData();
        
        var obj:any = {};
        obj.mapData = GameData.getInstance().mapData;
        obj.col = GameData.getInstance().col;
        obj.row = GameData.getInstance().row;
        obj.tileWidth = GameData.getInstance().tileWidth;
        obj.tileHeight = GameData.getInstance().tileHeight;
        obj.lineColor = GameData.getInstance().lineColor;
        
        var edata = JSON.stringify(obj);
        
        var data: Blob = new Blob([edata], {type: "text/plain;charset=utf-8"});
        var filename: string = 'lianliankan.json';
        var disableAutoBOM = true;
        saveAs(data, filename, disableAutoBOM);
    }
    
    private saveMapData():void{
        var i,j = this._tileVect.length;
        for(i = 0;i < j;i++) {
            if(!GameData.getInstance().mapData[this._tileVect[i].row]) {
                GameData.getInstance().mapData[this._tileVect[i].row] = [];
            }
            GameData.getInstance().mapData[this._tileVect[i].row][this._tileVect[i].col] = this._tileVect[i].type;
        }
    }
    
    private __onClearTap(evt:egret.TouchEvent):void{
        this.clearTiles();
    }
    
    private clearTiles():void{
        var i,j = this._tileVect.length;
        for(i = 0;i < j;i++) {
            this._tileVect[i].type = 0;
        }
    }
    
    private __onRunTap(evt:egret.TouchEvent):void{
        this.saveMapData();
        this.dispatchEventWith("runGame");
    }
    
    private __onTileTap(evt:egret.TouchEvent):void{
        var tile:Tile = evt.currentTarget;
        tile.type = tile.type == this._type ? 0 : this._type;
    }
    
    private __onIconTap(evt:egret.TouchEvent):void{
        switch(evt.target){
            case this.icon_1:
                this._type = 1;
                break;
            case this.icon_2:
                this._type = 2;
                break;
            case this.icon_3:
                this._type = 3;
                break;
            case this.icon_4:
                this._type = 4;
                break;
            case this.icon_5:
                this._type = 5;
                break;
            case this.icon_6:
                this._type = 6;
                break;
            case this.icon_7:
                this._type = 7;
                break;
            case this.icon_8:
                this._type = 8;
                break;
            case this.icon_9:
                this._type = 9;
                break;
        }
    }
}
