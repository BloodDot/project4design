class ZMovieClip extends egret.MovieClip {
    private _configData: any;
    private _sourceData: any;
    private _mcName: string;
    private _zplayTimes: number;

    private _configName: string;
    private _sourceName: string;

    private _isDisposed: Boolean;    //是否释放了资源

    protected _zframeRate: number;

    public data: any;

    public constructor() {
        super();
        this._isDisposed = false;
        this._zplayTimes = 0;
    }

    public loadByUrl(tconfig: string, tsource: string, tmcName: string) {
        var self = this;
        self._configName = tconfig;
        self._sourceName = tsource;
        self._mcName = tmcName;

        var localConfig: any = RES.getRes(tconfig);
        var localSource: any = RES.getRes(tsource);
        if (localConfig && localSource) {
            this.loadByLocal(localConfig, localSource, tmcName);
        } else if (RES.hasRes(tconfig) && RES.hasRes(tsource)) {
            RES.getResAsync(tconfig, self.onConfigComplete, self);
            RES.getResAsync(tsource, self.onSourceComplete, self);
        } else {
            RES.getResByUrl(tconfig, self.onConfigComplete, self);
            RES.getResByUrl(tsource, self.onSourceComplete, self);
        }
    }

    public loadByLocal(tconfig: any, tsource: any, tmcName: string) {
        this._mcName = tmcName;
        this.onConfigComplete(tconfig);
        this.onSourceComplete(tsource);
    }

    private onConfigComplete(tdata: any) {
        this._configData = tdata;
        if (this._sourceData != undefined) {
            this.createMc();
        }
    }

    private onSourceComplete(tdata) {
        this._sourceData = tdata;
        if (this._configData != undefined) {
            this.createMc();
        }
    }

    private createMc() {
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(this._configData, this._sourceData);
        this.movieClipData = mcFactory.generateMovieClipData(this._mcName);
        if (this._zframeRate != undefined) {
            this.frameRate = this._zframeRate;
        }
        if (this._zplayTimes != 0) {
            this.play(this._zplayTimes);
        }
    }

    public play(tplaytimes: number = 0) {
        this._zplayTimes = tplaytimes;
        if (this.movieClipData) {
            super.play(this._zplayTimes);
        }
    }

    public set zframeRate(value: number) {
        this._zframeRate = value;
        if (this.movieClipData) {
            this.frameRate = this._zframeRate;
        }
    }

    public clearData() {
        this._configData = undefined;
        this._sourceData = undefined;
    }

    public get mcName(): string {
        return this._mcName;
    }

    public dispose(tdistx: boolean = true) {
        var self = this;
        self._isDisposed = true;
        self.stop();
        self._configData = null;
        self._sourceData = null;
        if (tdistx) {
            RES.destroyRes(self._configName);
            RES.destroyRes(self._sourceName);
        }
    }
} 