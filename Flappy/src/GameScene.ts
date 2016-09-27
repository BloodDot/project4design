class GameScene extends egret.Sprite {
	private _bg: egret.Bitmap;
	private _ground:egret.Bitmap;

	private _bird: egret.MovieClip;
	private _birdSp: egret.Sprite;

	private _tubes: egret.Bitmap[];

	private _cupTube: egret.Bitmap;
	private _cdownTube: egret.Bitmap;

	private _isfly: boolean;

	private _speed: number;

	private _bglayer: egret.Sprite;
	private _tubeLayer: egret.Sprite;
	private _birdLayer: egret.Sprite;
	private _groundLayer:egret.Sprite;

	public constructor() {
		super();
		this.init();
		this.addEvent();
	}

	private init(): void {
		this._tubes = [];
		this._isfly = false;
		this.touchChildren = this.touchEnabled = true;
		this._speed = GameConst.INIT_SPEED;

		this.mask = new egret.Rectangle(0, 0, 288, 384);

		this._bglayer = new egret.Sprite();
		this._tubeLayer = new egret.Sprite();
		this._birdLayer = new egret.Sprite();
		this._groundLayer = new egret.Sprite();
		this.addChild(this._bglayer);
		this.addChild(this._tubeLayer);
		this.addChild(this._birdLayer);
		this.addChild(this._groundLayer);

		this._bg = new egret.Bitmap(RES.getRes("bg_png"));
		this._bglayer.addChild(this._bg);

		this._ground = new egret.Bitmap(RES.getRes("ground_png"));
		this._groundLayer.addChild(this._ground);
		this._ground.y = 350;

		this._birdSp = new egret.Sprite();
		this._birdLayer.addChild(this._birdSp);
		this._birdSp.x = 50;
		this._birdSp.y = 150;

		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("bird_json"), RES.getRes("bird_png"));
		this._bird = new egret.MovieClip(mcFactory.generateMovieClipData("bird"));
		this._birdSp.addChild(this._bird);
		var offsetX: number = Math.floor(GameConst.BIRD_WIDTH / 2);
		var offsetY: number = Math.floor(GameConst.BIRD_HEIGHT / 2);
		this._bird.anchorOffsetX = offsetX;
		this._bird.anchorOffsetY = offsetY;
		this._bird.x = offsetX;
		this._bird.y = offsetY;

		this.createTubes();
	}

	private createTubes(): void {
		this._cupTube = new egret.Bitmap(RES.getRes("tube1_png"));
		this._tubeLayer.addChild(this._cupTube);
		// this._cupTube.y = Math.floor(-150 - Math.random() * 100);
		this._cupTube.y = -150;

		this._cdownTube = new egret.Bitmap(RES.getRes("tube2_png"));
		this._tubeLayer.addChild(this._cdownTube);
		this._cdownTube.y = this._cupTube.y + 430;

		this._cupTube.x = this._cdownTube.x = GameConst.START_X;

		this._tubes.push(this._cupTube);
		this._tubes.push(this._cdownTube);
	}

	private addEvent(): void {
		this.addEventListener(egret.Event.ENTER_FRAME, this.__onEnterframe, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onTouchTap, this);
	}

	private removeEvent(): void {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.__onEnterframe, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onTouchTap, this);
	}

	private __onTouchTap(evt: egret.TouchEvent): void {
		this._speed = GameConst.INIT_SPEED;
		this._bird.gotoAndPlay(1, -1);

		this._isfly = true;
		var tw: egret.Tween = egret.Tween.get(this._birdSp);
		var twy: number = this._birdSp.y - GameConst.FLY_MAX;
		tw.to({ y: twy}, 300, egret.Ease.backOut)
			.call(function () {
				this._isfly = false;
				this._bird.stop();
			}, this);

		egret.Tween.get(this._bird).to({rotation:-20}, 300);
	}

	private __onEnterframe(evt: egret.Event): void {
		for (var i = 0; i < this._tubes.length; i++) {
			this._tubes[i].x -= 2;
			if (this._tubes[i].x < -GameConst.TUBE_WIDTH) {
				this._tubeLayer.removeChild(this._tubes[i]);
				this._tubes.splice(i, 1);
			}
		}

		//不在飞行 往下掉
		if (!this._isfly) {
			this._speed += GameConst.GRAVITY;
			this._birdSp.y += this._speed * 0.5;

			if (this._bird.rotation < GameConst.MAX_ANGLE) {
				this._bird.rotation += 3;
			}
		}

		this.checkCollision();
	}

	private checkCollision(): void {
		if (this._cupTube.x <= this._birdSp.x + GameConst.BIRD_WIDTH && this._cupTube.x + GameConst.TUBE_WIDTH >= this._birdSp.x) {
			//在碰撞范围内 检测碰撞
			if (this._cupTube.y + GameConst.TUBE_HEIGHT >= this._birdSp.y) {
				//上水管碰撞了
				this.gameOver();
				return;
			}

			if (this._cdownTube.y <= this._birdSp.y + GameConst.BIRD_HEIGHT) {
				//下水管碰撞了
				this.gameOver();
				return;
			}

		} else if (this._cupTube.x + GameConst.TUBE_WIDTH < this._birdSp.x) {
			//水管离开小鸟 创建下一个水管
			this._cupTube = this._cdownTube = null;

			this.createTubes();
		} else {
			//水管还未到小鸟范围内 等待

		}
	}

	private gameOver(): void {
		this.removeEvent();


	}
}