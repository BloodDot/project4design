var Marisa = (function (_super) {
    __extends(Marisa, _super);
    function Marisa() {
        _super.call(this);
        this._mc = new ZMovieClip();
        this._mc.loadByLocal(RES.getRes("marisa_left_json"), RES.getRes("marisa_left_png"), "marisa_left");
        this.addChild(this._mc);
        this._mc.play(-1);
        this._mc.scaleX = this._mc.scaleY = 2;
        this.state = 0;
    }
    var d = __define,c=Marisa,p=c.prototype;
    return Marisa;
}(egret.Sprite));
egret.registerClass(Marisa,'Marisa');
//# sourceMappingURL=Marisa.js.map