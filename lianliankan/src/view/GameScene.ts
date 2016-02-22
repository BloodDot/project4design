/**
 *
 * @author 
 *
 */
class GameScene extends egret.Sprite {
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
                tile = new Tile(GameData.getInstance().mapData[i][m],m,i);
                tile.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onTileTap,this);
                this.addChild(tile);
                tile.x = GameData.getInstance().tileWidth * m;
                tile.y = GameData.getInstance().tileHeight * i;
            }
        }
    }

    private __onTileTap(evt: egret.TouchEvent): void {
        var tile:Tile = evt.currentTarget;
        if(this.mapData[tile.row][tile.col] == 0){
            return;
        }
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

                var sp:egret.Shape;
                if(hline) {
                    console.log("---------横向消除");
                    this.removeTile(this.drawLines([hline]), this._atile, this._btile);
                    this._atile = this._btile = null;
                } else if(vline) {
                    console.log("---------竖向消除");
                    this.removeTile(this.drawLines([vline]),this._atile,this._btile);
                    this._atile = this._btile = null;
                } else if(onelist.length > 0) {
                    console.log("---------单转角消除");
                    this.removeTile(this.drawLines(onelist),this._atile,this._btile);
                    this._atile = this._btile = null;
                } else if(twolist.length > 0) {
                    console.log("---------双转角消除");
                    this.removeTile(this.drawLines(twolist),this._atile,this._btile);
                    this._atile = this._btile = null;
                } else {
                    console.log("---------选择的两个消除不了");
                    this._atile = this._btile = null;
                }
            } else {
                console.log("---------选择的两个消除不了");
                this._atile = this._btile = null;
            }
            
            if(sp){
                this.addChild(sp);
            }
        }
    }

    private horizon(a: egret.Point,b: egret.Point): Line {
        if(a.x == b.x && a.y == b.y) {
            return null;  //如果点击的是同一个图案，直接返回false;
        } else if(a.y != b.y) {
            return null;    //不在同一个水平线上
        }
        var x_start: number = a.x < b.x ? a.x : b.x;        //获取a,b中较小的y值
        var x_end: number = a.x < b.x ? b.x : a.x;          //获取a,b中较大的值
        //遍历a,b之间是否通路，如果一个不是就返回false;
        for(var i: number = x_start + 1;i < x_end;i++) {
            if(this.mapData[a.y][i] != 0) {
                return null;
            }
        }

        return new Line(new egret.Point(a.x,a.y),new egret.Point(b.x,b.y),1);
    }

    private vertical(a: egret.Point,b: egret.Point): Line {
        if(a.x == b.x && a.y == b.y) {
            return null;
        } else if(a.x != b.x) {
            return null; //不在同一个垂直线上
        }
        var y_start: number = a.y < b.y ? a.y : b.y;
        var y_end: number = a.y < b.y ? b.y : a.y;
        for(var i: number = y_start + 1;i < y_end;i++) {
            if(this.mapData[i][a.x] != 0) {
                return null;
            }
        }

        return new Line(new egret.Point(a.x,a.y),new egret.Point(b.x,b.y),0);
    }

    private oneCorner(a: egret.Point,b: egret.Point): Array<Line> {
        var c: egret.Point = new egret.Point(b.x,a.y);
        var d: egret.Point = new egret.Point(a.x,b.y);
        var larr: Array<Line>;
        var achline: Line = this.horizon(b,c);
        var acvline: Line = this.vertical(a,c);
        
        var bchline:Line = this.horizon(b,c);
        var bcvline:Line = this.vertical(b,c);
        
        //判断C点是否有元素                
        if(this.mapData[c.y][c.x] == 0 && achline && bcvline) {
            larr = [achline,bcvline];
        } else if(this.mapData[c.y][c.x] == 0 && bchline && acvline){
            larr = [bchline,acvline];
        } else {
            larr = [];
        }

        var adhline: Line = this.horizon(a,d);
        var advline: Line = this.vertical(a,d);
        
        var bdhline:Line = this.horizon(b,d);
        var bdvline:Line = this.vertical(b,d);
        //判断D点是否有元素
        if(this.mapData[d.y][d.x] == 0 && adhline && bdvline) {
            larr = [adhline,bdvline];
        } else if(this.mapData[d.y][d.x] == 0 && bdhline && advline){
            larr = [bdhline,advline];
        } else {
            larr = [];
        }

        return larr;
    }

    private scan(a: egret.Point,b: egret.Point): Array<Line> {
        this.linkList = [];
        var line: Line;
        //检测a点,b点的左侧是否能够垂直直连
        for(var i: number = a.x;i >= 0;i--) {
            line = this.vertical(new egret.Point(i,a.x),new egret.Point(i,b.y));
            if(this.mapData[a.y][i] == 0 && this.mapData[b.y][i] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的右侧是否能够垂直直连
        for(i = a.x;i < this.col;i++) {
            line = this.vertical(new egret.Point(i,a.y),new egret.Point(i,b.y));
            if(this.mapData[a.y][i] == 0 && this.mapData[b.y][i] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的上侧是否能够水平直连
        for(var j: number = a.y;j >= 0;j--) {
            line = this.horizon(new egret.Point(a.x,j),new egret.Point(b.x,j));
            if(this.mapData[j][a.x] == 0 && this.mapData[j][b.x] == 0 && line) {
                this.linkList.push(line);
            }
        }
        //检测a点,b点的下侧是否能够水平直连
        for(j = a.y;j < this.row;j++) {
            line = this.horizon(new egret.Point(a.x,j),new egret.Point(b.x,j));
            if(this.mapData[j][a.x] == 0 && this.mapData[j][b.x] == 0 && line) {
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
                vline = this.vertical(tmpLine.a,a);

                if(hline && vline) {
                    return [hline,tmpLine,vline];
                }
            } else if(tmpLine.direct == 0) {
                hline = this.horizon(a,tmpLine.a);
                vline = this.horizon(tmpLine.b,b);

                if(hline && vline) {
                    return [hline,tmpLine,vline];
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
    
    private drawLines(tarr:Array<Line>):egret.Shape{
        var i,j=tarr.length;
        var bp: egret.Shape = new egret.Shape();
        bp.graphics.lineStyle(5,GameData.getInstance().lineColor);
        bp.graphics.moveTo(this.getWidthByPos(tarr[0].a.x),this.getHeightByPos(tarr[0].a.y));
        for(i=0;i<j;i++){
            bp.graphics.lineTo(this.getWidthByPos(tarr[i].a.x),this.getHeightByPos(tarr[i].a.y));
            bp.graphics.lineTo(this.getWidthByPos(tarr[i].b.x),this.getHeightByPos(tarr[i].b.y));
        }
        bp.graphics.endFill();

        return bp;
    }
    
    private removeTile(tsp:egret.Shape, tile1:Tile, tile2:Tile):void{
        this.addChild(tsp);
        this.twRemoveObj(this._atile);
        this.twRemoveObj(this._btile);
        this.twRemoveObj(tsp);
        GameData.getInstance().mapData[this._atile.row][this._atile.col] = 0;
        GameData.getInstance().mapData[this._btile.row][this._btile.col] = 0;
    }
    
    private twRemoveObj(tile:Object):void{
        var tw:egret.Tween = egret.Tween.get(tile);
        tw.to({alpha:0}, 500).call(function(){
            this.removeChild(tile);
        }.bind(this));
    }
    
    private getWidthByPos(tnum:number):number{
        return tnum * GameData.getInstance().tileWidth + GameData.getInstance().tileWidth/2;
    }
    
    private getHeightByPos(tnum: number): number {
        return tnum * GameData.getInstance().tileHeight + GameData.getInstance().tileHeight / 2;
    }
    
    private get mapData(): Array<Array<number>>{
        return GameData.getInstance().mapData;
    }
}