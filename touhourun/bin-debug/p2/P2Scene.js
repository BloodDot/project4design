var P2Scene = (function (_super) {
    __extends(P2Scene, _super);
    function P2Scene() {
        var _this = this;
        _super.call(this);
        this._isDebug = true;
        var factor = 50;
        //创建world
        var world = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
        //创建plane
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        world.addBody(planeBody);
        egret.Ticker.getInstance().register(function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            world.step(dt / 1000);
            if (!this._isDebug) {
                var stageHeight = egret.MainContext.instance.stage.stageHeight;
                var l = world.bodies.length;
                for (var i = 0; i < l; i++) {
                    var boxBody = world.bodies[i];
                    var box = boxBody.displays[0];
                    if (box) {
                        box.x = boxBody.position[0] * factor;
                        box.y = stageHeight - boxBody.position[1] * factor;
                        box.rotation = 360 - boxBody.angle * 180 / Math.PI;
                        if (boxBody.sleepState == p2.Body.SLEEPING) {
                            box.alpha = 0.5;
                        }
                        else {
                            box.alpha = 1;
                        }
                    }
                }
            }
        }, this);
        //鼠标点击添加刚体
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouch, this);
        var self = this;
        function onTouch(e) {
            var positionX = Math.floor(e.stageX / factor);
            var positionY = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);
            addOneBox(positionX, positionY);
        }
        function addOneBox(positionX, positionY) {
            if (Math.random() > 0.5) {
                //添加方形刚体
                var boxShape = new p2.Box({ width: 2, height: 1 });
                var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
                boxBody.addShape(boxShape);
                world.addBody(boxBody);
                var display = self.createBitmapByName("rect_png");
                display.width = boxShape.width * factor;
                display.height = boxShape.height * factor;
            }
            else {
                //添加圆形刚体
                var boxShape = new p2.Circle({ radius: 1 });
                var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
                boxBody.addShape(boxShape);
                world.addBody(boxBody);
                var display = self.createBitmapByName("circle_png");
                display.width = boxShape.radius * 2 * factor;
                display.height = boxShape.radius * 2 * factor;
            }
            if (!this._isDebug) {
                display.anchorOffsetX = display.width / 2;
                display.anchorOffsetY = display.height / 2;
                boxBody.displays = [display];
                self.addChild(display);
            }
        }
        for (var i = 0; i < 8; i++) {
            addOneBox(2 * i + 2, 2 * i + 5);
        }
        var bitmapFont = RES.getRes("font_fnt");
        var bitmapText = new egret.BitmapText();
        bitmapText.text = "Click!";
        bitmapText.font = bitmapFont;
        bitmapText.anchorOffsetX = bitmapText.width / 2;
        bitmapText.anchorOffsetY = bitmapText.height / 2;
        bitmapText.x = egret.MainContext.instance.stage.stageWidth / 2;
        bitmapText.y = egret.MainContext.instance.stage.stageHeight / 2;
        this.addChild(bitmapText);
        bitmapText.touchEnabled = true;
        bitmapText.addEventListener(egret.TouchEvent.TOUCH_TAP, function (event) {
            _this.removeChild(bitmapText);
        }, this);
    }
    var d = __define,c=P2Scene,p=c.prototype;
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap(RES.getRes(name));
        return result;
    };
    return P2Scene;
}(egret.Sprite));
egret.registerClass(P2Scene,'P2Scene');
//# sourceMappingURL=P2Scene.js.map