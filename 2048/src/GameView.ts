class GameView extends egret.Sprite {
    private _bgView:egret.Sprite;
    public playView:egret.Sprite;
    private _overView:egret.Sprite;

	public constructor() {
		super();
        this._bgView = new egret.Sprite();
        this.playView = new egret.Sprite();
        this._overView = new egret.Sprite();

        this.addChild(this._bgView);
        this.addChild(this.playView);
        this.addChild(this._overView);
        this._overView.visible = false;

        this.playView.y = 105;
	}

	//创建全局静态界面
    public createStaticView(): void {
        this.createTitleBitmap();
        this.createRectBackground();
        this.createGameOverLayout();
        this.createScoreText();
    }

    //创建标题界面
    private createTitleBitmap(): void {
        var titleBitmap: egret.Bitmap = new egret.Bitmap(RES.getRes("menu"));
        titleBitmap.width = egret.MainContext.instance.stage.stageWidth;
        this._bgView.addChild(titleBitmap);
    }

    //创建盒子背景
    private createRectBackground(): void {
        var scale: egret.Rectangle = new egret.Rectangle(16, 13, 69, 70);
        var bg: egret.Bitmap = new egret.Bitmap(RES.getRes("background"));
        bg.width = egret.MainContext.instance.stage.stageWidth;
        bg.height = egret.MainContext.instance.stage.stageWidth;
        bg.scale9Grid = scale;
        bg.y = 105
        this._bgView.addChild(bg);

        for (var i: number = 0; i < 4; i++) {
            for (var t: number = 0; t < 4; t++) {
                var bit: egret.Bitmap = new egret.Bitmap(RES.getRes("backtile"));
                bit.x = 10 + (10 + bit.width) * t;
                bit.y = 105 + 10 + (10 + bit.height) * i;
                this._bgView.addChild(bit);
            }
        }
    }

    private createGameOverLayout() {
        var img: egret.Bitmap = new egret.Bitmap(RES.getRes("frontground"));
        img.width = egret.MainContext.instance.stage.stageWidth;
        img.height = egret.MainContext.instance.stage.stageHeight;
        this._overView.addChild(img);

        var btn: egret.Sprite = new egret.Sprite();

        var btnimg: egret.Bitmap = new egret.Bitmap(RES.getRes("continueButton_over"));
        btn.addChild(btnimg);

        btn.x = (img.width - btnimg.width) / 2;
        btn.y = (img.height - btnimg.height) / 2;

        btn.width = btnimg.width;
        btn.width = btnimg.height;

        btn.touchEnabled = true;

        this._overView.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
    }

    //显示游戏结束画面
    public showGameOverLayout() {
        this._overView.visible = true;
    }

    //
    private onRestart() {
        GameManager.getInstance().restart();
        this._overView.visible = false;

        var evt: egret.Event = new egret.Event("gameRestart");
        this.dispatchEvent(evt);
    }

    //文书文本
    private txt: egret.TextField;
    private createScoreText(): void {
        this.txt = new egret.TextField();
        this.txt.x = 400;
        this.txt.y = 30;
        this._bgView.addChild(this.txt);
        this.updateScore();
    }

    //更新分数
    public updateScore() {
        this.txt.text = String(GameManager.getInstance().score);
    }
}