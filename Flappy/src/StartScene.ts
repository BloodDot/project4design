class StartScene extends egret.Sprite {
	private _bg: egret.Bitmap;
	private _title:egret.Bitmap;
	private _start: egret.Bitmap;
	private _bird: egret.MovieClip;
	private _ground1: egret.Bitmap;

	public constructor() {
		super();
		this.init();
		this.addEvent();
	}

	private init(): void {
		this.mask = new egret.Rectangle(0, 0, 288, 384);

		this._bg = new egret.Bitmap(RES.getRes("bg_png"));
		this.addChild(this._bg);

		this._title = new egret.Bitmap(RES.getRes("title_png"));
		this.addChild(this._title);
		this._title.x = 35;
		this._title.y = 80;

		this._ground1 = new egret.Bitmap(RES.getRes("ground_png"));
		this.addChild(this._ground1);
		this._ground1.y = GameConst.GROUND_Y;

		this._start = new egret.Bitmap(RES.getRes("button_play_png"));
		this.addChild(this._start);
		this._start.x = 66;
		this._start.y = 200;
		this._start.touchEnabled = true;

		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(RES.getRes("bird_json"), RES.getRes("bird_png"));
		this._bird = new egret.MovieClip(mcFactory.generateMovieClipData("bird"));
		this.addChild(this._bird);
		this._bird.play(-1);
		this._bird.x = 105;
		this._bird.y = 150;
	}

	private addEvent(): void {
		this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStart, this);
	}

	private removeEvent(): void {
		this._start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStart, this);
	}

	private __onStart(evt: egret.TouchEvent): void {
		this.dispatchEventWith(GameEvent.GAME_START);
	}

	public dispose(): void {
		this.removeEvent();
		this._bird.stop();
	}
}