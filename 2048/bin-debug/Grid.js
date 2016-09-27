var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        _super.call(this);
        this.isUsed = false; //是否使用
        this._num = 2; //数字
        this.row = 0; //行
        this.column = 0; //列
        this.nextIsRemove = false; //到达下一次位置后是否删除
        this.nextIsAnm = false; //到达下一次位置后是否播放动画特效
        this.anchorOffsetX = 50;
        this.anchorOffsetY = 50;
        this.addEventListener(egret.Event.ADDED, this.onAddChild, this);
    }
    var d = __define,c=Grid,p=c.prototype;
    //重置
    p.restart = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.isUsed = false;
        this.row = 0;
        this.column = 0;
        this.nextIsAnm = false;
        this.nextIsRemove = false;
    };
    //添加到显示列表
    p.onAddChild = function () {
        this.scaleX = 0;
        this.scaleY = 0;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    d(p, "num"
        //当期代表的数字
        ,function () {
            return this._num;
        }
        //
        ,function (value) {
            this._num = value;
            this.texture = RES.getRes("number" + this._num);
        }
    );
    //播放动画,返回布尔值表示当前是否有动画移动
    p.playAnimation = function () {
        var rel = false;
        if (this.isUsed) {
            var tw = egret.Tween.get(this);
            var pos = GameUtil.getPosByRect(this);
            if (this.x != pos.x || this.y != pos.y) {
                rel = true;
            }
            tw.to({ x: pos.x, y: pos.y }, 100);
            tw.call(this.animationOver, this);
        }
        return rel;
    };
    //动画结束后
    p.animationOver = function () {
        if (this.nextIsAnm) {
            var tw = egret.Tween.get(this);
            tw.to({ scaleX: 1.1, scaleY: 1.1 }, 100);
            tw.call(this.backScale);
        }
        if (this.nextIsRemove) {
            this.parent.removeChild(this);
            this.num = 2;
            this.row = 0;
            this.column = 0;
            this.isUsed = false;
            this.texture = null;
        }
        this.nextIsAnm = false;
        this.nextIsRemove = false;
    };
    //返回标准样式
    p.backScale = function () {
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    return Grid;
}(egret.Bitmap));
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map