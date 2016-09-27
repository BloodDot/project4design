class GameScene extends egret.Sprite {
	private _map: Map1;
	private _marisa: Marisa;

	private _gravity: number;
	private _speed: number;
	private _jumpMax:number;
	private _jumpNum:number;
	private _jumpSpeed:number;

	private _downTile: tiled.TMXTile;
	private _rightTile: tiled.TMXTile;

	private _world:p2.World;
	private _marisaBody:p2.Body;
	private _factor:number;

	public constructor() {
		super();

		this._world = new p2.World();
        this._world.sleepMode = p2.World.BODY_SLEEPING;

		this._map = new Map1(this._world);
		this.addChild(this._map);

		this._marisa = new Marisa();
		this.addChild(this._marisa);
		this._marisa.x = 300;
		this._marisa.y = 335;

		var boxShape: p2.Shape = new p2.Box({width:18, height:24});
		this._marisaBody = new p2.Body({ mass: 1, position: [this._marisa.x, this._marisa.y], angularVelocity: 1 });
		this._marisaBody.addShape(boxShape);
		this._world.addBody(this._marisaBody);
		this._world.gravity = [0,10];

		this._marisaBody.displays = [this._marisa];

		this._factor = 5;
		this._gravity = 5;
		this._speed = 5;
		this._jumpSpeed= 10;
		this._jumpMax = 80;
		this._jumpNum = 0;

		var bm:egret.Bitmap = new egret.Bitmap(RES.getRes("walk_down1_png"));
		this.addChild(bm);
		// bm.x = 200;
		// bm.y = 200;
		bm.touchEnabled = true;
		bm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onBmTap, this);
		
		this._map.addEventListener("mapInited", this.__onMapInited, this);
	}

	private addEvent(): void {
		this.addEventListener(egret.Event.ENTER_FRAME, this.__onEnterFrame, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSceneTap,this);
	}

	private removeEvent(): void {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.__onEnterFrame, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onSceneTap,this);
	}

	private __onSceneTap(evt:egret.TouchEvent):void{
		if(this._marisa.state == 0) {
			this._marisa.state = 1;
		}
	}

	private __onBmTap(evt:egret.TouchEvent):void{
		this._marisa.x = 300;
	}

	private __onMapInited(evt: egret.Event): void {
		this.addEvent();

		egret.Ticker.getInstance().register(function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            this._world.step(dt / 1000);

            if (!this._isDebug) {
                var stageHeight: number = egret.MainContext.instance.stage.stageHeight;
                if(this._marisaBody){
					var box: egret.DisplayObject = this._marisaBody.displays[0];
						if (box) {
							// box.x = this._marisaBody.position[0] * this._factor;
							// box.y = 480 - this._marisaBody.position[1] * this._factor;

							box.x = this._marisaBody.position[0];
							box.y = this._marisaBody.position[1];
						}

					// this._marisaBody.position = [this._marisa.x, this._marisa.y];
				}
            }
        }, this);

	}

	private __onEnterFrame(evt: egret.Event): void {
		// this.checkHorizon();
		// if(this._marisa.state == 0 || this._marisa.state == 2){
		// 	this.checkVertical();
		// }else{
		// if(this._jumpNum < this._jumpMax){
		// 	this._marisa.y -= this._jumpSpeed;
		// 	this._jumpNum += this._jumpSpeed;
		// }else{
		// 	this._jumpNum = 0;
		// 	this._marisa.state = 2;
		// }
		// }
		// this.x -= this._speed;

		// if(this._marisaBody){
		// 	var box: egret.DisplayObject = this._marisaBody.displays[0];
		// 		if (box) {
		// 			box.x = this._marisaBody.position[0];
		// 			box.y = this._marisaBody.position[1];
		// 		}

		// 	// this._marisaBody.position = [this._marisa.x, this._marisa.y];
		// }
	}

	private checkHorizon(): void {
		var nx: number = this._marisa.x + this._marisa.width + this._speed;
		if (this._rightTile && this._rightTile.x + this._rightTile.width >= nx) {
			this.calHorizonTile(this._rightTile);
		} else {
			this._rightTile = this._map.getTileByPos(nx, this._marisa.y);
			if (this._rightTile) {
				this.calHorizonTile(this._rightTile);
			} else {
				this._marisa.x += this._speed;
			}
		}
	}

	private calHorizonTile(tile: tiled.TMXTile): void {
		var isblock = tile.getPropertyByName("isblock");
		if (isblock && isblock.value == "true") {
			console.log("dead");
			this.removeEvent();
		} else {
			this._marisa.x += this._speed;
		}
	}

	private checkVertical(): void {
		var ny: number = this._marisa.y + this._marisa.height + this._gravity;
		if (this._downTile && this._downTile.y+this._downTile.height >= ny) {
			this.calVerticalTile(this._downTile);
		} else {
			this._downTile = this._map.getTileByPos(this._marisa.x, ny);
			if (this._downTile) {
				this.calVerticalTile(this._downTile);
			} else {
				this._marisa.y += this._gravity;
			}
		}
	}

	private calVerticalTile(tile: tiled.TMXTile): void {
		var isblock = tile.getPropertyByName("isblock");
		if (isblock && isblock.value == "true") {
			this._marisa.y = tile.tileY*tile.tileset.tileheight - this._marisa.height;
			this._marisa.state = 0;
		} else {
			this._marisa.y += this._gravity;
		}
	}
}