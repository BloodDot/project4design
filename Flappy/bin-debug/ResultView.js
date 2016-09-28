var ResultView = (function (_super) {
    __extends(ResultView, _super);
    function ResultView() {
        _super.call(this);
        this.init();
        this.addEvent();
    }
    var d = __define,c=ResultView,p=c.prototype;
    p.init = function () {
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
    };
    p.addEvent = function () {
        this._startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStartTap, this);
    };
    p.removeEvent = function () {
        this._startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStartTap, this);
    };
    p.__onStartTap = function (evt) {
        this.dispatchEventWith(GameEvent.GAME_START);
    };
    p.showScore = function (value) {
        this._score.text = value + "";
        if (value >= GameConst.MEDAL_SCORE_3) {
            this._medal.bitmapData = RES.getRes("medals_3_png");
        }
        else if (value >= GameConst.MEDAL_SCORE_2) {
            this._medal.bitmapData = RES.getRes("medals_2_png");
        }
        else if (value >= GameConst.MEDAL_SCORE_1) {
            this._medal.bitmapData = RES.getRes("medals_1_png");
        }
        else {
            this._medal.bitmapData = RES.getRes("medals_0_png");
        }
    };
    return ResultView;
}(egret.Sprite));
egret.registerClass(ResultView,'ResultView');
//# sourceMappingURL=ResultView.js.map