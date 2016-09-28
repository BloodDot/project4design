class ResultView extends egret.Sprite {
	private _title: egret.Bitmap;
	private _bg: egret.Bitmap;
	private _medal: egret.Bitmap;
	private _score: egret.BitmapText;
	private _startBtn: egret.Bitmap;

	public constructor() {
		super();
		this.init();
		this.addEvent();
	}

	private init(): void {
		this._title = new egret.Bitmap(RES.getRes("text_game_over_png"));
		this.addChild(this._title);
		this._title.x = 27;
		this._title.y = 50;

		this._bg = new egret.Bitmap(RES.getRes("score_panel_png"));
		this.addChild(this._bg);
		this._bg.x = 10;
		this._bg.y = 100;

		this._medal = new egret.Bitmap(RES.getRes("medals_0_png"));
		this.addChild(this._medal);
		this._medal.x = 42;
		this._medal.y = 145;

		this._score = new egret.BitmapText();
		this._score.font = RES.getRes("score2_fnt");
		this.addChild(this._score);
		this._score.text = "999";
		this._score.width = 70;
		this._score.textAlign = "center";
		this._score.x = 163;
		this._score.y = 140;

		this._startBtn = new egret.Bitmap(RES.getRes("button_play_png"));
		this.addChild(this._startBtn);
		this._startBtn.x = 66;
		this._startBtn.y = 230;
		this._startBtn.touchEnabled = true;
	}

	private addEvent():void{
		this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStartTap, this);
	}

	private removeEvent():void{
		this._startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStartTap, this);
	}

	private __onStartTap(evt:egret.TouchEvent):void{
		this.dispatchEventWith(GameEvent.GAME_START);
	}

	public showScore(value: number): void {
		this._score.text = value + "";
		if (value >= GameConst.MEDAL_SCORE_3) {
			this._medal.bitmapData = RES.getRes("medals_3_png");
		} else if (value >= GameConst.MEDAL_SCORE_2) {
			this._medal.bitmapData = RES.getRes("medals_2_png");
		} else if (value >= GameConst.MEDAL_SCORE_1) {
			this._medal.bitmapData = RES.getRes("medals_1_png");
		} else {
			this._medal.bitmapData = RES.getRes("medals_0_png");
		}
	}
}