var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.init = function () {
        this._tubes = [];
        this._isfly = false;
        this.touchChildren = this.touchEnabled = true;
        this._speed = GameConst.INIT_SPEED;
        this.mask = new egret.Rectangle(0, 0, 288, 384);
        this._bglayer = new egret.Sprite();
        this._tubeLayer = new egret.Sprite();
        this._birdLayer = new egret.Sprite();
        this._groundLayer = new egret.Sprite();
        this._uiLayer = new egret.Sprite();
        this._startLayer = new egret.Sprite();
        this.addChild(this._bglayer);
        this.addChild(this._tubeLayer);
        this.addChild(this._birdLayer);
        this.addChild(this._groundLayer);
        this.addChild(this._uiLayer);
        this.addChild(this._startLayer);
        this._bg = new egret.Bitmap(RES.getRes("bg_png"));
        this._bglayer.addChild(this._bg);
        this._ground1 = new egret.Bitmap(RES.getRes("ground_png"));
        this._groundLayer.addChild(this._ground1);
        this._ground2 = new egret.Bitmap(RES.getRes("ground_png"));
        this._groundLayer.addChild(this._ground2);
        this._birdSp = new egret.Sprite();
        this._birdLayer.addChild(this._birdSp);
        var mcFactory = new egret.MovieClipDataFactory(RES.getRes("bird_json"), RES.getRes("bird_png"));
        this._bird = new egret.MovieClip(mcFactory.generateMovieClipData("bird"));
        this._birdSp.addChild(this._bird);
        var offsetX = Math.floor(GameConst.BIRD_WIDTH / 2);
        var offsetY = Math.floor(GameConst.BIRD_HEIGHT / 2);
        this._bird.anchorOffsetX = offsetX;
        this._bird.anchorOffsetY = offsetY;
        this._bird.x = offsetX;
        this._bird.y = offsetY;
        this._scoreLabel = new egret.BitmapText();
        this._scoreLabel.font = RES.getRes("score1_fnt");
        this._uiLayer.addChild(this._scoreLabel);
        this._lightImg = new egret.Bitmap(RES.getRes("white_png"));
        this._lightImg.width = GameConst.BG_WIDTH;
        this._lightImg.height = GameConst.BG_HEIGHT;
        this._uiLayer.addChild(this._lightImg);
        this._lightImg.alpha = 0;
        this._startTitle = new egret.Bitmap(RES.getRes("text_ready_png"));
        this._startLayer.addChild(this._startTitle);
        this._startTitle.x = 30;
        this._startTitle.y = 50;
        this._startipImg = new egret.Bitmap(RES.getRes("tutorial_png"));
        this._startLayer.addChild(this._startipImg);
        this._startipImg.x = 70;
        this._startipImg.y = 120;
        this._resultView = new ResultView();
        this._uiLayer.addChild(this._resultView);
        this.resetGame();
    };
    p.resetGame = function () {
        this._resultView.visible = false;
        this._scoreLabel.visible = false;
        this._startLayer.visible = true;
        this._ground1.x = 0;
        this._ground1.y = GameConst.GROUND_Y;
        this._ground2.x = GameConst.BG_WIDTH;
        this._ground2.y = GameConst.GROUND_Y;
        this._birdSp.x = GameConst.BIRD_START_X;
        this._birdSp.y = GameConst.BIRD_START_Y;
        this._bird.play(-1);
        this._bird.rotation = 0;
        while (this._tubes.length > 0) {
            var tube = this._tubes.pop();
            this._tubeLayer.removeChild(tube);
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStartTap, this);
    };
    p.__onStartTap = function (evt) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onStartTap, this);
        this.birdFly();
        this.startGame();
    };
    p.startGame = function () {
        this._bird.stop();
        this._score = 0;
        this._scoreLabel.text = this._score + "";
        this._scoreLabel.x = this._scoreLabel.y = 5;
        this._scoreLabel.visible = true;
        this._startLayer.visible = false;
        this._cupTube = this._cdownTube = null;
        this.createTubes();
        this.addEvent();
    };
    p.createTubes = function () {
        this._cupTube = new egret.Bitmap(RES.getRes("tube1_png"));
        this._tubeLayer.addChild(this._cupTube);
        this._cupTube.y = Math.floor(-GameConst.TUBE_MIN_Y - Math.random() * (GameConst.TUBE_MAX_Y - GameConst.TUBE_MIN_Y));
        this._cdownTube = new egret.Bitmap(RES.getRes("tube2_png"));
        this._tubeLayer.addChild(this._cdownTube);
        this._cdownTube.y = this._cupTube.y + 430;
        this._cupTube.x = this._cdownTube.x = GameConst.START_X;
        this._tubes.push(this._cupTube);
        this._tubes.push(this._cdownTube);
    };
    p.addEvent = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.__onEnterframe, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onTouchTap, this);
    };
    p.removeEvent = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.__onEnterframe, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__onTouchTap, this);
    };
    p.__onTouchTap = function (evt) {
        this.birdFly();
    };
    p.birdFly = function () {
        SoundManager.getInstance().playSound("sfx_wing_mp3");
        this._speed = GameConst.INIT_SPEED;
        this._bird.gotoAndPlay(1, -1);
        this._isfly = true;
        var tw = egret.Tween.get(this._birdSp);
        var twy = this._birdSp.y - GameConst.FLY_MAX;
        if (twy < 0) {
            twy = 0;
        }
        tw.to({ y: twy }, 300, egret.Ease.backOut)
            .call(function () {
            this._isfly = false;
            this._bird.stop();
        }, this);
        egret.Tween.get(this._bird).to({ rotation: -20 }, 300);
    };
    p.__onEnterframe = function (evt) {
        for (var i = 0; i < this._tubes.length; i++) {
            this._tubes[i].x -= 2;
            if (this._tubes[i].x < -GameConst.TUBE_WIDTH) {
                this._tubeLayer.removeChild(this._tubes[i]);
                this._tubes.splice(i, 1);
            }
        }
        this._ground1.x -= 2;
        this._ground2.x -= 2;
        if (this._ground1.x <= -GameConst.BG_WIDTH) {
            this._ground1.x = GameConst.BG_WIDTH;
        }
        if (this._ground2.x <= -GameConst.BG_WIDTH) {
            this._ground2.x = GameConst.BG_WIDTH;
        }
        //不在飞行 往下掉
        if (!this._isfly) {
            this._speed += GameConst.GRAVITY;
            this._birdSp.y += this._speed * 0.5;
            if (this._bird.rotation < GameConst.MAX_ANGLE) {
                this._bird.rotation += 3;
            }
            if (this._birdSp.y >= (GameConst.GROUND_Y - GameConst.BIRD_HEIGHT)) {
                SoundManager.getInstance().playSound("sfx_hit_mp3");
                this.gameOver();
            }
        }
        this.checkCollision();
    };
    p.checkCollision = function () {
        if (this._cupTube.x <= this._birdSp.x + GameConst.BIRD_WIDTH && this._cupTube.x + GameConst.TUBE_WIDTH >= this._birdSp.x) {
            //在碰撞范围内 检测碰撞
            if (this._cupTube.y + GameConst.TUBE_HEIGHT >= this._birdSp.y) {
                //上水管碰撞了
                SoundManager.getInstance().playSound("sfx_hit_mp3");
                this.gameOver();
                return;
            }
            if (this._cdownTube.y <= this._birdSp.y + GameConst.BIRD_HEIGHT) {
                //下水管碰撞了
                SoundManager.getInstance().playSound("sfx_hit_mp3");
                this.gameOver();
                return;
            }
        }
        else if (this._cupTube.x + GameConst.TUBE_WIDTH < this._birdSp.x) {
            //水管离开小鸟 创建下一个水管
            SoundManager.getInstance().playSound("sfx_point_mp3");
            this._cupTube = this._cdownTube = null;
            this._score++;
            this._scoreLabel.text = this._score + "";
            this.createTubes();
        }
        else {
        }
    };
    p.gameOver = function () {
        this.removeEvent();
        egret.Tween.get(this._lightImg)
            .to({ alpha: 1 }, 200)
            .to({ alpha: 0 }, 200)
            .call(function () {
            var birdY = this._birdSp.y;
            var twtime = (GameConst.GROUND_Y - birdY) * 3;
            if (GameConst.GROUND_Y - birdY - GameConst.BIRD_HEIGHT > 0) {
                SoundManager.getInstance().playSound("sfx_die_mp3");
                var angle = (1 - (GameConst.GROUND_Y - birdY - GameConst.BIRD_HEIGHT) / GameConst.GROUND_Y) * 90;
                egret.Tween.get(this._bird)
                    .to({ rotation: angle }, twtime);
                egret.Tween.get(this._birdSp)
                    .to({ y: GameConst.GROUND_Y - GameConst.BIRD_HEIGHT }, twtime)
                    .call(function () {
                    this.showResult();
                }, this);
            }
            else {
                this.showResult();
            }
        }, this);
    };
    p.showResult = function () {
        SoundManager.getInstance().playSound("sfx_swooshing_mp3");
        this._resultView.y = -126;
        this._resultView.visible = true;
        this._resultView.showScore(this._score);
        egret.Tween.get(this._resultView).to({ y: 0 }, 300, egret.Ease.backOut);
        this._resultView.addEventListener(GameEvent.GAME_START, this.__onStartGame, this);
    };
    p.__onStartGame = function () {
        this._resultView.removeEventListener(GameEvent.GAME_START, this.__onStartGame, this);
        egret.setTimeout(this.resetGame, this, 100);
    };
    return GameScene;
}(egret.Sprite));
egret.registerClass(GameScene,'GameScene');
//# sourceMappingURL=GameScene.js.map