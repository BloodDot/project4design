/**
 *
 * @author
 *
 */
var AnimeManager = (function () {
    function AnimeManager() {
    }
    var d = __define,c=AnimeManager,p=c.prototype;
    AnimeManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new AnimeManager();
        }
        return this._instance;
    };
    p.playAtk = function (taft, tbft, tcell, tfunc, targs, tisown, tparent) {
        this._aft = taft;
        this._bft = tbft;
        this._cell = tcell;
        this._func = tfunc;
        this._args = targs;
        this._isown = tisown;
        this._ox = this._aft.x;
        this._oy = this._aft.y;
        this._parent = tparent;
        var tw = egret.Tween.get(this._aft);
        tw.to({ scaleX: 2.5, scaleY: 2.5 }, 100)
            .to({ scaleX: 2, scaleY: 2 }, 100)
            .call(this.startPlay, this);
    };
    p.startPlay = function () {
        //1远程直接特效 2近战过去特效 3抛东西再特效 4自身
        switch (this._cell.type) {
            case 1:
                this.playMc(this._bft);
                break;
            case 4:
                this.playMc(this._aft);
                break;
            case 2:
                this.ftCome();
                break;
            case 3:
                this.flyBall();
                break;
        }
    };
    p.ftCome = function () {
        var tw = egret.Tween.get(this._aft);
        var twx = this._bft.x;
        var twy = this._bft.y;
        tw.to({ x: twx, y: twy }, 300)
            .call(this.playMc, this, [this._aft, this.ftBack.bind(this)]);
    };
    p.ftBack = function () {
        var tw = egret.Tween.get(this._aft);
        tw.to({ x: this._ox, y: this._oy }, 300)
            .call(function () {
            this._func(this._args);
        }, this);
    };
    p.flyBall = function () {
        var ball = new eui.Image(this.getBallresBySeries(this._cell.series));
        this._parent.addChild(ball);
        ball.x = this._aft.x;
        ball.y = this._aft.y;
        var tw = egret.Tween.get(ball);
        tw.to({ x: this._bft.x + this._bft.width / 2, y: this._bft.y + this._bft.height / 2 }, 300)
            .call(this.playMc, this, [this._bft, null, ball]);
    };
    p.playMc = function (tft, tback, timg) {
        if (timg) {
            this._parent.removeChild(timg);
        }
        var mc = new ZMovieClip();
        mc.loadByLocal(RES.getRes(this._cell.resId + "_json"), RES.getRes(this._cell.resId + "_png"), this._cell.resId);
        mc.x = tft.x - mc.width / 2 + this._aft.width / 2 * this._aft.scaleX;
        mc.y = tft.y - mc.height / 2 + this._aft.height / 2 * this._aft.scaleY;
        mc["back"] = tback;
        this._parent.addChild(mc);
        mc.addEventListener(egret.Event.COMPLETE, this.__onMcComplete, this);
        mc.play();
    };
    p.__onMcComplete = function (evt) {
        var mc = evt.target;
        this._parent.removeChild(mc);
        mc.removeEventListener(egret.Event.COMPLETE, this.__onMcComplete, this);
        if (mc["back"]) {
            mc["back"]();
        }
        else {
            this._func(this._args);
        }
    };
    p.getBallresBySeries = function (tseries) {
        var str = "ft_effect_light_png";
        //0普通 1格斗 2飞行 3毒 4地面 5岩石 6虫 7鬼 8钢 9火 10水 11草 12电 13超能 14冰 15龙 16暗
        switch (tseries) {
            case 3:
            case 7:
            case 16:
                str = "ft_effect_dark_png";
                break;
            case 9:
                str = "ft_effect_fire_png";
                break;
            case 10:
            case 14:
                str = "ft_effect_water_png";
                break;
            case 11:
            case 6:
                str = "ft_effect_wood_png";
                break;
        }
        return str;
    };
    return AnimeManager;
})();
egret.registerClass(AnimeManager,'AnimeManager');
//# sourceMappingURL=AnimeManager.js.map