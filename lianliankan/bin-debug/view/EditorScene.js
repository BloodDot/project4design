/**
 *
 * @author
 *
 */
var EditorScene = (function (_super) {
    __extends(EditorScene, _super);
    function EditorScene() {
        _super.call(this);
        this.skinName = EditorSceneSkin;
    }
    var d = __define,c=EditorScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    p.init = function () {
        this._tileVect = [];
        this._type = -1;
        var i, j = GameData.getInstance().col;
        var m, n = GameData.getInstance().row;
        var tile;
        for (i = 0; i < j; i++) {
            for (m = 0; m < n; m++) {
                tile = new Tile(0, m, i);
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onTileTap, this);
                this.group_tile.addChild(tile);
                tile.x = GameData.getInstance().tileWidth * m;
                tile.y = GameData.getInstance().tileHeight * i;
                this._tileVect.push(tile);
            }
        }
        this.icon_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.icon_9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onIconTap, this);
        this.btn_mode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onModeTap, this);
        this.btn_save.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onSaveTap, this);
        this.btn_clear.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onClearTap, this);
        this.btn_read.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onReadTap, this);
    };
    p.__onModeTap = function (evt) {
        if (this.group_icon.visible) {
            this.group_icon.visible = false;
            this._type = -1;
        }
        else {
            this.group_icon.visible = true;
            this._type = 1;
        }
        this.clearTiles();
        //        var file:FileReader = new FileReade
        //        var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
        //        for(;oPop.document.readyState != "complete";) {
        //            if(oPop.document.readyState == "complete") break;
        //        }
        //        oPop.document.execCommand("SaveAs");
        //        oPop.close();
        window['DownloadText']("aaa.txt", "aaa");
    };
    p.__onSaveTap = function (evt) {
    };
    p.__onClearTap = function (evt) {
        this.clearTiles();
    };
    p.clearTiles = function () {
        var i, j = this._tileVect.length;
        for (i = 0; i < j; i++) {
            this._tileVect[i].type = 0;
        }
    };
    p.__onReadTap = function (evt) {
    };
    p.__onTileTap = function (evt) {
        var tile = evt.currentTarget;
        tile.type = tile.type == this._type ? 0 : this._type;
    };
    p.__onIconTap = function (evt) {
        switch (evt.target) {
            case this.icon_1:
                this._type = 1;
                break;
            case this.icon_2:
                this._type = 2;
                break;
            case this.icon_3:
                this._type = 3;
                break;
            case this.icon_4:
                this._type = 4;
                break;
            case this.icon_5:
                this._type = 5;
                break;
            case this.icon_6:
                this._type = 6;
                break;
            case this.icon_7:
                this._type = 7;
                break;
            case this.icon_8:
                this._type = 8;
                break;
            case this.icon_9:
                this._type = 9;
                break;
        }
    };
    return EditorScene;
})(eui.Component);
egret.registerClass(EditorScene,'EditorScene');
//# sourceMappingURL=EditorScene.js.map