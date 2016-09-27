class GameManager {
    public _rects: Array<Grid> = [];  //所有的盒子
    public _data: Array<any> = [];   //所有的数据
    public _nousedata: Array<any> = [];  //位数用的数据
    public isRunning: boolean = true;   //是否运行中

    public score: number = 0;   //分数

    private static _instance: GameManager;

    public static getInstance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager();
        }

        return this._instance;
    }

    //创建所有的方块
    public createAllRect(): void {
        for (var i: number = 0; i < 16; i++) {
            var rect: Grid = new Grid();
            this._rects[i] = rect;
            this._data[i] = 0;
            this._nousedata[i] = i;
        }
    }

    //找一个未使用的方块
    public selectGrid(): Grid {
        for (var i: number = 0; i < 16; i++) {
            if (this._rects[i].isUsed == false) {
                return this._rects[i];
            }
        }
        return null;
    }

    //重新开始游戏
    public restart() {
        this.score = 0;
        this.isRunning = true;
        for (var i: number = 0; i < 16; i++) {
            this._data[i] = 0;
            this._rects[i].restart();
        }
        this.restartAllRect();
    }

    //添加一个新的方块
    public addGridToDatas(rect: Grid) {
        var index: number = GameUtil.getIndexByLineRow(rect.row, rect.column);
        this._data[index] = rect;
        this.restartAllRect();
    }

    //选择一个新的方块
    public selectNewPos(): egret.Point {
        var index: number = this._nousedata[Math.floor(this._nousedata.length * Math.random())];
        return GameUtil.getPosByIndex(index);
    }

    //重置所有方块
    public restartAllRect() {
        this._nousedata = [];
        for (var i: number = 1; i < 16; i++) {
            if (this._data[i] == 0) {
                this._nousedata.push(i);
            }
        }
    }

    //上
    public shang() {
        var ar: Array<any> = this.selectArr(0);
        //    console.log(ar);
        for (var i: number = 0; i < 4; i++) {
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    }

    //下
    public xia() {
        var ar: Array<any> = this.selectArr(0);
        for (var i: number = 0; i < 4; i++) {
            ar[i] = ar[i].reverse();
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    }

    //左侧
    public zuo() {
        var ar: Array<any> = this.selectArr(1);
        for (var i: number = 0; i < 4; i++) {
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    }

    //右侧
    public you() {
        var ar: Array<any> = this.selectArr(1);
        for (var i: number = 0; i < 4; i++) {
            ar[i] = ar[i].reverse();
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    }

    //判断游戏是否结束
    public isGameOver(): boolean {
        var rel: boolean = true;

        var ar: Array<any> = this.selectArr(0);
        for (var i: number = 0; i < ar.length; i++) {
            for (var t: number = 0; t < 3; t++) {
                if (this._data[ar[i][t]].num == this._data[ar[i][t + 1]].num) {
                    rel = false;
                }
            }
        }
        ar = this.selectArr(1);
        for (var i: number = 0; i < ar.length; i++) {
            for (var t: number = 0; t < 3; t++) {
                if (this._data[ar[i][t]].num == this._data[ar[i][t + 1]].num) {
                    rel = false;
                }
            }
        }
        return rel;
    }

    //移动方块,val是一个1维数组
    private moveArr(val: Array<number>) {
        var karr: Array<any> = [];

        for (var i: number = 0; i < val.length; i++) {
            if (this._data[val[i]] != 0) {
                karr.push(this._data[val[i]]);
            }
        }

        for (var t: number = 0; t < 4; t++) {
            if (karr[t]) {
                this._data[val[t]] = karr[t];
                var pos: egret.Point = GameUtil.getPosByIndex(val[t]);
                this._data[val[t]].row = pos.x;
                this._data[val[t]].column = pos.y;
            }
            else {
                this._data[val[t]] = 0;
            }
        }

        /*
        var len:number = val.length -1;
        for( var startindex:number=0;startindex<len;startindex++)
        {
            for( var i:number=0;i<len;i++)
            {
                if( this._data[val[i]] == 0 && this._data[val[i+1]] != 0 )
                {
                    this._data[val[i]] = this._data[val[i+1]];
                    var pos:egret.Point = GameUtil.getPosByIndex( val[i] );
                    this._data[val[i]].line = pos.x;
                    this._data[val[i]].row = pos.y;
                    this._data[val[i+1]] = 0;
                }
            }
        }*/
    }

    //0纵向,1横向,返回二维数组
    private selectArr(dir: number): Array<any> {
        var arr: Array<any> = [];
        for (var i: number = 0; i < 4; i++) {
            var ar: Array<any> = [];
            for (var t: number = 0; t < 4; t++) {
                if (dir == 0) {
                    ar.push(GameUtil.getIndexByLineRow(t, i));
                } else {
                    ar.push(GameUtil.getIndexByLineRow(i, t));
                }
            }
            arr.push(ar);
        }
        return arr;
    }

    //合并
    private unite(val: Array<any>) {
        var len: number = val.length - 1;
        for (var i: number = 0; i < len; i++) {
            if (this._data[val[i]].num == this._data[val[i + 1]].num && this._data[val[i + 1]]) {
                this._data[val[i]].num *= 2;
                this._data[val[i]].nextIsAnm = true;
                this._data[val[i + 1]].nextIsRemove = true;
                this._data[val[i + 1]] = 0;

                this.score += this._data[val[i]].num;
                i++;
            }
        }
    }

    public isHaveMoveRect: boolean = false;
    //播放所有方块的动画
    private playAllRect(): void {
        var rel: boolean = false;
        for (var i: number = 0; i < 16; i++) {
            //this._rects[i].playAnimation();
            rel = this._rects[i].playAnimation();
            if (rel == true) {
                this.isHaveMoveRect = true;
            }
        }
    }
    //
}