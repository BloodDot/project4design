/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.initData();
        this.init();
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.init = function () {
        var i, j = GameData.getInstance().col;
        var m, n = GameData.getInstance().row;
        var tile;
        for (i = 0; i < j; i++) {
            for (m = 0; m < n; m++) {
                tile = new Tile(GameData.getInstance().mapData[i][m], m, i);
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__onTileTap, this);
                this.addChild(tile);
                tile.x = GameData.getInstance().tileWidth * m;
                tile.y = GameData.getInstance().tileHeight * i;
            }
        }
    };
    p.__onTileTap = function (evt) {
        var tile = evt.currentTarget;
        if (this.mapData[tile.row][tile.col] == 0) {
            return;
        }
        if (this._atile == null) {
            this._atile = evt.currentTarget;
        }
        else if (this._btile == null) {
            this._btile = evt.currentTarget;
        }
        if (this._atile != null && this._btile != null) {
            if (this._atile.type == this._btile.type) {
                var hline = this.horizon(new egret.Point(this._atile.col, this._atile.row), new egret.Point(this._btile.col, this._btile.row));
                var vline = this.vertical(new egret.Point(this._atile.col, this._atile.row), new egret.Point(this._btile.col, this._btile.row));
                var onelist = this.oneCorner(new egret.Point(this._atile.col, this._atile.row), new egret.Point(this._btile.col, this._btile.row));
                var twolist = this.twoCorner(new egret.Point(this._atile.col, this._atile.row), new egret.Point(this._btile.col, this._btile.row));
                var sp;
                if (hline) {
                    console.log("---------横向消除");
                    this.removeTile(this.drawLines([hline]), this._atile, this._btile);
                    this._atile = this._btile = null;
                }
                else if (vline) {
                    console.log("---------竖向消除");
                    this.removeTile(this.drawLines([vline]), this._atile, this._btile);
                    this._atile = this._btile = null;
                }
                else if (onelist.length > 0) {
                    console.log("---------单转角消除");
                    this.removeTile(this.drawLines(onelist), this._atile, this._btile);
                    this._atile = this._btile = null;
                }
                else if (twolist.length > 0) {
                    console.log("---------双转角消除");
                    this.removeTile(this.drawLines(twolist), this._atile, this._btile);
                    this._atile = this._btile = null;
                }
                else {
                    console.log("---------选择的两个消除不了");
                    this._atile = this._btile = null;
                }
            }
            else {
                console.log("---------选择的两个消除不了");
                this._atile = this._btile = null;
            }
            if (sp) {
                this.addChild(sp);
            }
        }
    };
    p.horizon = function (a, b) {
        if (a.x == b.x && a.y == b.y) {
            return null; //如果点击的是同一个图案，直接返回false;
        }
        else if (a.y != b.y) {
            return null; //不在同一个水平线上
        }
        var x_start = a.x < b.x ? a.x : b.x; //获取a,b中较小的y值
        var x_end = a.x < b.x ? b.x : a.x; //获取a,b中较大的值
        //遍历a,b之间是否通路，如果一个不是就返回false;
        for (var i = x_start + 1; i < x_end; i++) {
            if (this.mapData[a.y][i] != 0) {
                return null;
            }
        }
        return new Line(new egret.Point(a.x, a.y), new egret.Point(b.x, b.y), 1);
    };
    p.vertical = function (a, b) {
        if (a.x == b.x && a.y == b.y) {
            return null;
        }
        else if (a.x != b.x) {
            return null; //不在同一个垂直线上
        }
        var y_start = a.y < b.y ? a.y : b.y;
        var y_end = a.y < b.y ? b.y : a.y;
        for (var i = y_start + 1; i < y_end; i++) {
            if (this.mapData[i][a.x] != 0) {
                return null;
            }
        }
        return new Line(new egret.Point(a.x, a.y), new egret.Point(b.x, b.y), 0);
    };
    p.oneCorner = function (a, b) {
        var c = new egret.Point(b.x, a.y);
        var d = new egret.Point(a.x, b.y);
        var larr;
        var achline = this.horizon(b, c);
        var acvline = this.vertical(a, c);
        var bchline = this.horizon(b, c);
        var bcvline = this.vertical(b, c);
        //判断C点是否有元素                
        if (this.mapData[c.y][c.x] == 0 && achline && bcvline) {
            larr = [achline, bcvline];
        }
        else if (this.mapData[c.y][c.x] == 0 && bchline && acvline) {
            larr = [bchline, acvline];
        }
        else {
            larr = [];
        }
        var adhline = this.horizon(a, d);
        var advline = this.vertical(a, d);
        var bdhline = this.horizon(b, d);
        var bdvline = this.vertical(b, d);
        //判断D点是否有元素
        if (this.mapData[d.y][d.x] == 0 && adhline && bdvline) {
            larr = [adhline, bdvline];
        }
        else if (this.mapData[d.y][d.x] == 0 && bdhline && advline) {
            larr = [bdhline, advline];
        }
        else {
            larr = [];
        }
        return larr;
    };
    p.scan = function (a, b) {
        this.linkList = [];
        var line;
        //检测a点,b点的左侧是否能够垂直直连
        for (var i = a.x; i >= 0; i--) {
            line = this.vertical(new egret.Point(i, a.x), new egret.Point(i, b.y));
            if (this.mapData[a.y][i] == 0 && this.mapData[b.y][i] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的右侧是否能够垂直直连
        for (i = a.x; i < this.col; i++) {
            line = this.vertical(new egret.Point(i, a.y), new egret.Point(i, b.y));
            if (this.mapData[a.y][i] == 0 && this.mapData[b.y][i] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的上侧是否能够水平直连
        for (var j = a.y; j >= 0; j--) {
            line = this.horizon(new egret.Point(a.x, j), new egret.Point(b.x, j));
            if (this.mapData[j][a.x] == 0 && this.mapData[j][b.x] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的下侧是否能够水平直连
        for (j = a.y; j < this.row; j++) {
            line = this.horizon(new egret.Point(a.x, j), new egret.Point(b.x, j));
            if (this.mapData[j][a.x] == 0 && this.mapData[j][b.x] == 0 && line) {
                this.linkList.push(line);
            }
        }
        return this.linkList;
    };
    p.twoCorner = function (a, b) {
        var ll = this.scan(a, b);
        if (ll.length == 0) {
            return [];
        }
        var hline, vline;
        for (var i = 0; i < ll.length; i++) {
            var tmpLine = ll[i];
            if (tmpLine.direct == 1) {
                hline = this.vertical(b, tmpLine.b);
                vline = this.vertical(tmpLine.a, a);
                if (hline && vline) {
                    return [hline, tmpLine, vline];
                }
            }
            else if (tmpLine.direct == 0) {
                hline = this.horizon(a, tmpLine.a);
                vline = this.horizon(tmpLine.b, b);
                if (hline && vline) {
                    return [hline, tmpLine, vline];
                }
            }
        }
        return [];
    };
    p.initData = function () {
        this.mapData = GameData.getInstance().mapData;
        this.col = GameData.getInstance().col;
        this.row = GameData.getInstance().row;
    };
    p.drawLines = function (tarr) {
        var i, j = tarr.length;
        var bp = new egret.Shape();
        bp.graphics.lineStyle(5, GameData.getInstance().lineColor);
        bp.graphics.moveTo(this.getWidthByPos(tarr[0].a.x), this.getHeightByPos(tarr[0].a.y));
        for (i = 0; i < j; i++) {
            bp.graphics.lineTo(this.getWidthByPos(tarr[i].a.x), this.getHeightByPos(tarr[i].a.y));
            bp.graphics.lineTo(this.getWidthByPos(tarr[i].b.x), this.getHeightByPos(tarr[i].b.y));
        }
        bp.graphics.endFill();
        return bp;
    };
    p.removeTile = function (tsp, tile1, tile2) {
        this.addChild(tsp);
        this.twRemoveObj(this._atile);
        this.twRemoveObj(this._btile);
        this.twRemoveObj(tsp);
        GameData.getInstance().mapData[this._atile.row][this._atile.col] = 0;
        GameData.getInstance().mapData[this._btile.row][this._btile.col] = 0;
    };
    p.twRemoveObj = function (tile) {
        var tw = egret.Tween.get(tile);
        tw.to({ alpha: 0 }, 500).call(function () {
            this.removeChild(tile);
        }.bind(this));
    };
    p.getWidthByPos = function (tnum) {
        return tnum * GameData.getInstance().tileWidth + GameData.getInstance().tileWidth / 2;
    };
    p.getHeightByPos = function (tnum) {
        return tnum * GameData.getInstance().tileHeight + GameData.getInstance().tileHeight / 2;
    };
    d(p, "mapData"
        ,function () {
            return GameData.getInstance().mapData;
        }
    );
    return GameScene;
})(egret.Sprite);
egret.registerClass(GameScene,'GameScene');
