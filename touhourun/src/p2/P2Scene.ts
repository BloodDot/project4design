class P2Scene extends egret.Sprite {
	private _isDebug = true;

	public constructor() {
		super();

		var factor: number = 50;

        //创建world
        var world: p2.World = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;

        //创建plane
        var planeShape: p2.Plane = new p2.Plane();
        var planeBody: p2.Body = new p2.Body();
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
                var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
                var l = world.bodies.length;
                for (var i: number = 0; i < l; i++) {
                    var boxBody: p2.Body = world.bodies[i];
                    var box: egret.DisplayObject = boxBody.displays[0];
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

        function onTouch(e: egret.TouchEvent): void {
            var positionX: number = Math.floor(e.stageX / factor);
            var positionY: number = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);
			addOneBox(positionX, positionY);
        }
		function addOneBox(positionX, positionY) {
			if (Math.random() > 0.5) {
                //添加方形刚体
                var boxShape: p2.Shape = new p2.Box({width:2, height:1});
                var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
                boxBody.addShape(boxShape);
                world.addBody(boxBody);

                var display: egret.DisplayObject = self.createBitmapByName("rect_png");
                display.width = (<p2.Box>boxShape).width * factor;
                display.height = (<p2.Box>boxShape).height * factor;
            }
            else {
                //添加圆形刚体
                var boxShape: p2.Shape = new p2.Circle({radius:1});
                var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
                boxBody.addShape(boxShape);
                world.addBody(boxBody);

                var display: egret.DisplayObject = self.createBitmapByName("circle_png");
                display.width = (<p2.Circle>boxShape).radius * 2 * factor;
                display.height = (<p2.Circle>boxShape).radius * 2 * factor;
            }

            if (!this._isDebug) {
                display.anchorOffsetX = display.width / 2
				display.anchorOffsetY = display.height / 2;
                boxBody.displays = [display];
                self.addChild(display);
            }
		}
		for (var i = 0; i < 8; i++) {
			addOneBox(2 * i + 2, 2 * i + 5);
		}

		var bitmapFont: egret.BitmapFont = RES.getRes("font_fnt");

		var bitmapText: egret.BitmapText = new egret.BitmapText();

		bitmapText.text = "Click!"

		bitmapText.font = bitmapFont;
		bitmapText.anchorOffsetX = bitmapText.width / 2;
		bitmapText.anchorOffsetY = bitmapText.height / 2;
		bitmapText.x = egret.MainContext.instance.stage.stageWidth / 2;
		bitmapText.y = egret.MainContext.instance.stage.stageHeight / 2;
		this.addChild(bitmapText);
		bitmapText.touchEnabled = true;
		bitmapText.addEventListener(egret.TouchEvent.TOUCH_TAP, (event: egret.TouchEvent) => {
			this.removeChild(bitmapText);
		}, this);

    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap(RES.getRes(name));
        return result;
    }
}