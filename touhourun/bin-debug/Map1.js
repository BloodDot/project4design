var Map1 = (function (_super) {
    __extends(Map1, _super);
    function Map1(tworld) {
        _super.call(this);
        this._world = tworld;
        this._url = "resource/assets/map1.tmx";
        this._urlloader = new egret.URLLoader();
        this._urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //load complete
        this._urlloader.addEventListener(egret.Event.COMPLETE, this.__onLoadComplete, this);
        this._urlloader.load(new egret.URLRequest(this._url));
    }
    var d = __define,c=Map1,p=c.prototype;
    p.__onLoadComplete = function (evt) {
        var data = egret.XML.parse(evt.target.data);
        this._tmxTileMap = new tiled.TMXTilemap(96000, 2000, data, this._url);
        this._tmxTileMap.render();
        this.addChild(this._tmxTileMap);
        this.dispatchEventWith("mapInited", true);
        //创建plane
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        this._world.addBody(planeBody);
        var factor = 50;
        egret.Ticker.getInstance().register(function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            this._world.step(dt / 1000);
        }, this);
        this._layer1 = this._tmxTileMap.getChildByName("layer1");
        for (var i = 0; i < this._layer1.layerData.length; i++) {
            for (var m = 0; m < this._layer1.layerData[i].length; m++) {
                var tile = this._layer1.layerData[i][m];
                if (tile) {
                    var tmxproperty = tile.getPropertyByName("type");
                    if (tmxproperty.value == "wall") {
                        //添加方形刚体
                        var boxShape = new p2.Box({ width: 24, height: 24 });
                        var boxBody = new p2.Body({ mass: 1, position: [tile.tileX * 24, tile.tileY * 24], angularVelocity: 1 });
                        boxBody.addShape(boxShape);
                        this._world.addBody(boxBody);
                    }
                }
            }
        }
    };
    p.getTileByPos = function (tx, ty) {
        var layer = this._tmxTileMap.getChildByName("layer1");
        return layer.getTile(tx, ty);
    };
    return Map1;
}(egret.Sprite));
egret.registerClass(Map1,'Map1');
//# sourceMappingURL=Map1.js.map