var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        _super.call(this);
        this.init();
        this.addEvent();
    }
    var d = __define,c=StartScene,p=c.prototype;
    p.init = function () {
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
        var mcFactory = new egret.MovieClipDataFactory(RES.getRes("bird_json"), RES.getRes("bird_png"));
        this._bird = new egret.MovieClip(mcFactory.generateMovieClipData("bird"));
        this.addChild(this._bird);
        this._bird.play(-1);
        this._bird.x = 105;
        this._bird.y = 150;
    };
    p.addEvent = function () {
        this._start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStart, this);
    };
    p.removeEvent = function () {
        this._start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStart, this);
    };
    p.__onStart = function (evt) {
        this.dispatchEventWith(GameEvent.GAME_START);
    };
    p.dispose = function () {
        this.removeEvent();
        this._bird.stop();
    };
    return StartScene;
}(egret.Sprite));
egret.registerClass(StartScene,'StartScene');
//# sourceMappingURL=StartScene.js.map