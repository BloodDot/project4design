class Map1 extends egret.Sprite {
    private _urlloader: egret.URLLoader;
	private _url:string;
    private _tmxTileMap:tiled.TMXTilemap;
    private _layer1:tiled.TMXLayer;
    private _world:p2.World;

    public constructor(tworld:p2.World) {
        super();
        this._world = tworld;
        this._url = "resource/assets/map1.tmx";
        this._urlloader = new egret.URLLoader();
        this._urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        this._urlloader.addEventListener(egret.Event.COMPLETE, this.__onLoadComplete, this);
        this._urlloader.load(new egret.URLRequest(this._url));
    }

	private __onLoadComplete(evt:egret.Event):void{
		var data: any = egret.XML.parse(evt.target.data);
		this._tmxTileMap = new tiled.TMXTilemap(96000, 2000, data, this._url);
		this._tmxTileMap.render();
		this.addChild(this._tmxTileMap);

        this.dispatchEventWith("mapInited", true);

        //创建plane
        var planeShape: p2.Plane = new p2.Plane();
        var planeBody: p2.Body = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        this._world.addBody(planeBody);

		var factor: number = 50;
        egret.Ticker.getInstance().register(function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            this._world.step(dt / 1000);
        }, this);


        this._layer1 = this._tmxTileMap.getChildByName("layer1") as tiled.TMXLayer;
        for (var i = 0; i < this._layer1.layerData.length; i++) {
            for (var m = 0; m < this._layer1.layerData[i].length; m++) {
                var tile: tiled.TMXTile = this._layer1.layerData[i][m];
                if(tile){
                    var tmxproperty: tiled.TMXProperty = tile.getPropertyByName("type");
                    if (tmxproperty.value == "wall") {
                        //添加方形刚体
                        var boxShape: p2.Shape = new p2.Box({width:24, height:24});
                        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [tile.tileX * 24, tile.tileY * 24], angularVelocity: 1 });
                        boxBody.addShape(boxShape);
                        this._world.addBody(boxBody);
                    }
                }
            }
        }
	}

    public getTileByPos(tx:number, ty:number):tiled.TMXTile{
        var layer:tiled.TMXLayer = this._tmxTileMap.getChildByName("layer1") as tiled.TMXLayer;
		return layer.getTile(tx,ty);
    }
}