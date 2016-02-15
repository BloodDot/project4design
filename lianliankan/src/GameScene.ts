/**
 *
 * @author 
 *
 */
class GameScene extends egret.Sprite {
    public mapData: Array<Array<number>>;
    public linkList: Array<Line>;
    public row: number; //行
    public col: number; //列

    private _atile: Tile;
    private _btile: Tile;

    public constructor() {
        super();
        this.initData();
        this.init();
    }

    private init(): void {
        var i,j = GameData.getInstance().col;
        var m,n = GameData.getInstance().row;
        var tile: Tile;
        for(i = 0;i < j;i++) {
            for(m = 0;m < n;m++) {
                tile = new Tile(GameData.getInstance().mapData[i][m],i,m);
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onTileTap,this);
                this.addChild(tile);
                tile.x = 40 * i;
                tile.y = 40 * m;
            }
        }
    }

    private __onTileTap(evt: egret.TouchEvent): void {
        if(this._atile == null) {
            this._atile = evt.currentTarget;
        } else if(this._btile == null) {
            this._btile = evt.currentTarget;
        }

        if(this._atile != null && this._btile != null) {
            if(this._atile.type == this._btile.type) {
                var hline = this.horizon(new egret.Point(this._atile.col,this._atile.row),new egret.Point(this._btile.col,this._btile.row));
                var vline = this.vertical(new egret.Point(this._atile.col,this._atile.row),new egret.Point(this._btile.col,this._btile.row));
                var onelist = this.oneCorner(new egret.Point(this._atile.col,this._atile.row),new egret.Point(this._btile.col,this._btile.row));
                var twolist = this.twoCorner(new egret.Point(this._atile.col,this._atile.row),new egret.Point(this._btile.col,this._btile.row));

                if(hline) {
                    console.log("---------横向消除");
                    this._atile = this._btile = null;
                } else if(vline) {
                    console.log("---------竖向消除");
                    this._atile = this._btile = null;
                } else if(onelist.length > 0) {
                    console.log("---------单转角消除");
                    this._atile = this._btile = null;
                } else if(twolist.length > 0) {
                    console.log("---------双转角消除");
                    this._atile = this._btile = null;
                } else {
                    console.log("---------选择的两个消除不了");
                    this._atile = this._btile = null;
                }
            } else {
                console.log("---------选择的两个消除不了");
                this._atile = this._btile = null;
            }
        }
    }

    private horizon(a: egret.Point,b: egret.Point): Line {
        if(a.x == b.x && a.y == b.y) {
            return null;  //如果点击的是同一个图案，直接返回false;
        } else if(a.x != b.x) {
            return null;    //不在同一个水平线上
        }
        var x_start: number = a.y < b.y ? a.y : b.y;        //获取a,b中较小的y值
        var x_end: number = a.y < b.y ? b.y : a.y;          //获取a,b中较大的值
        //遍历a,b之间是否通路，如果一个不是就返回false;
        for(var i: number = x_start + 1;i < x_end;i++) {
            if(this.mapData[a.x][i] != 0) {
                return null;
            }
        }

        return new Line(new egret.Point(a.x,a.y),new egret.Point(b.x,b.y),1);
    }

    private vertical(a: egret.Point,b: egret.Point): Line {
        if(a.x == b.x && a.y == b.y) {
            return null;
        } else if(a.y != b.y) {
            return null; //不在同一个垂直线上
        }
        var y_start: number = a.x < b.x ? a.x : b.x;
        var y_end: number = a.x < b.x ? b.x : a.x;
        for(var i: number = y_start + 1;i < y_end;i++) {
            if(this.mapData[i][a.y] != 0) {
                return null;
            }
        }

        return new Line(new egret.Point(a.x,a.y),new egret.Point(b.x,b.y),0);
    }

    private oneCorner(a: egret.Point,b: egret.Point): Array<Line> {
        var c: egret.Point = new egret.Point(b.x,a.y);
        var d: egret.Point = new egret.Point(a.x,b.y);
        var chline: Line = this.horizon(b,c);
        var cvline: Line = this.vertical(a,c);
        //判断C点是否有元素                
        if(this.mapData[c.x][c.y] == 0 && chline && cvline) {
            return [chline,cvline];
        } else {
            return [];
        }

        var dhline: Line = this.horizon(a,d);
        var dvline: Line = this.vertical(b,d);
        //判断D点是否有元素
        if(this.mapData[d.x][d.y] != 0 && dhline && dvline) {
            return [dhline,dvline];
        } else {
            return [];
        }

        return [];
    }

    private scan(a: egret.Point,b: egret.Point): Array<Line> {
        this.linkList = [];
        var line: Line;
        //检测a点,b点的左侧是否能够垂直直连
        for(var i: number = a.y;i >= 0;i--) {
            line = this.vertical(new egret.Point(a.x,i),new egret.Point(b.x,i));
            if(this.mapData[a.x][i] == 0 && this.mapData[b.x][i] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的右侧是否能够垂直直连
        for(i = a.y;i < this.col;i++) {
            line = this.vertical(new egret.Point(a.x,i),new egret.Point(b.x,i));
            if(this.mapData[a.x][i] == 0 && this.mapData[b.x][i] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的上侧是否能够水平直连
        for(var j: number = a.x;j >= 0;j--) {
            line = this.horizon(new egret.Point(j,a.y),new egret.Point(j,b.y));
            if(this.mapData[j][a.y] == 0 && this.mapData[j][b.y] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的下侧是否能够水平直连
        for(j = a.x;j < this.row;j++) {
            line = this.horizon(new egret.Point(j,a.y),new egret.Point(j,b.y));
            if(this.mapData[j][a.y] == 0 && this.mapData[j][b.y] == 0 && line) {
                this.linkList.push(line);
            }
        }

        return this.linkList;
    }


    private twoCorner(a: egret.Point,b: egret.Point): Array<Line> {
        var ll: Array<Line> = this.scan(a,b);
        if(ll.length == 0) {
            return [];
        }
        var hline: Line,vline: Line;
        for(var i: number = 0;i < ll.length;i++) {
            var tmpLine: Line = ll[i];
            if(tmpLine.direct == 1) {
                hline = this.vertical(b,tmpLine.b);
                vline = this.vertical(a,tmpLine.a);

                if(hline && vline) {
                    return [hline,vline];
                }
            } else if(tmpLine.direct == 0) {
                hline = this.horizon(a,tmpLine.a);
                vline = this.horizon(b,tmpLine.b);

                if(hline && vline) {
                    return [hline,vline];
                }
            }
        }
        return [];
    }

    private initData(): void {
        this.mapData = GameData.getInstance().mapData;
        this.col = GameData.getInstance().col;
        this.row = GameData.getInstance().row;
    }
}