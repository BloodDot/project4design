var ZMovieClip = (function (_super) {
    __extends(ZMovieClip, _super);
    function ZMovieClip() {
        _super.call(this);
        this._isDisposed = false;
        this._zplayTimes = 0;
    }
    var d = __define,c=ZMovieClip,p=c.prototype;
    p.loadByUrl = function (tconfig, tsource, tmcName) {
        var self = this;
        self._configName = tconfig;
        self._sourceName = tsource;
        self._mcName = tmcName;
        var localConfig = RES.getRes(tconfig);
        var localSource = RES.getRes(tsource);
        if (localConfig && localSource) {
            this.loadByLocal(localConfig, localSource, tmcName);
        }
        else if (RES.hasRes(tconfig) && RES.hasRes(tsource)) {
            RES.getResAsync(tconfig, self.onConfigComplete, self);
            RES.getResAsync(tsource, self.onSourceComplete, self);
        }
        else {
            RES.getResByUrl(tconfig, self.onConfigComplete, self);
            RES.getResByUrl(tsource, self.onSourceComplete, self);
        }
    };
    p.loadByLocal = function (tconfig, tsource, tmcName) {
        this._mcName = tmcName;
        this.onConfigComplete(tconfig);
        this.onSourceComplete(tsource);
    };
    p.onConfigComplete = function (tdata) {
        this._configData = tdata;
        if (this._sourceData != undefined) {
            this.createMc();
        }
    };
    p.onSourceComplete = function (tdata) {
        this._sourceData = tdata;
        if (this._configData != undefined) {
            this.createMc();
        }
    };
    p.createMc = function () {
        var mcFactory = new egret.MovieClipDataFactory(this._configData, this._sourceData);
        this.movieClipData = mcFactory.generateMovieClipData(this._mcName);
        if (this._zframeRate != undefined) {
            this.frameRate = this._zframeRate;
        }
        if (this._zplayTimes != 0) {
            this.play(this._zplayTimes);
        }
    };
    p.play = function (tplaytimes) {
        if (tplaytimes === void 0) { tplaytimes = 0; }
        this._zplayTimes = tplaytimes;
        if (this.movieClipData) {
            _super.prototype.play.call(this, this._zplayTimes);
        }
    };
    d(p, "zframeRate",undefined
        ,function (value) {
            this._zframeRate = value;
            if (this.movieClipData) {
                this.frameRate = this._zframeRate;
            }
        }
    );
    p.clearData = function () {
        this._configData = undefined;
        this._sourceData = undefined;
    };
    d(p, "mcName"
        ,function () {
            return this._mcName;
        }
    );
    p.dispose = function (tdistx) {
        if (tdistx === void 0) { tdistx = true; }
        var self = this;
        self._isDisposed = true;
        self.stop();
        self._configData = null;
        self._sourceData = null;
        if (tdistx) {
            RES.destroyRes(self._configName);
            RES.destroyRes(self._sourceName);
        }
    };
    return ZMovieClip;
}(egret.MovieClip));
egret.registerClass(ZMovieClip,'ZMovieClip');
//# sourceMappingURL=ZMovieClip.js.map