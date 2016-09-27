var GameManager = (function () {
    function GameManager() {
        this._rects = []; //所有的盒子
        this._data = []; //所有的数据
        this._nousedata = []; //位数用的数据
        this.isRunning = true; //是否运行中
        this.score = 0; //分数
        this.isHaveMoveRect = false;
    }
    var d = __define,c=GameManager,p=c.prototype;
    GameManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    };
    //创建所有的方块
    p.createAllRect = function () {
        for (var i = 0; i < 16; i++) {
            var rect = new Grid();
            this._rects[i] = rect;
            this._data[i] = 0;
            this._nousedata[i] = i;
        }
    };
    //找一个未使用的方块
    p.selectGrid = function () {
        for (var i = 0; i < 16; i++) {
            if (this._rects[i].isUsed == false) {
                return this._rects[i];
            }
        }
        return null;
    };
    //重新开始游戏
    p.restart = function () {
        this.score = 0;
        this.isRunning = true;
        for (var i = 0; i < 16; i++) {
            this._data[i] = 0;
            this._rects[i].restart();
        }
        this.restartAllRect();
    };
    //添加一个新的方块
    p.addGridToDatas = function (rect) {
        var index = GameUtil.getIndexByLineRow(rect.row, rect.column);
        this._data[index] = rect;
        this.restartAllRect();
    };
    //选择一个新的方块
    p.selectNewPos = function () {
        var index = this._nousedata[Math.floor(this._nousedata.length * Math.random())];
        return GameUtil.getPosByIndex(index);
    };
    //重置所有方块
    p.restartAllRect = function () {
        this._nousedata = [];
        for (var i = 1; i < 16; i++) {
            if (this._data[i] == 0) {
                this._nousedata.push(i);
            }
        }
    };
    //上
    p.shang = function () {
        var ar = this.selectArr(0);
        //    console.log(ar);
        for (var i = 0; i < 4; i++) {
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    };
    //下
    p.xia = function () {
        var ar = this.selectArr(0);
        for (var i = 0; i < 4; i++) {
            ar[i] = ar[i].reverse();
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    };
    //左侧
    p.zuo = function () {
        var ar = this.selectArr(1);
        for (var i = 0; i < 4; i++) {
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    };
    //右侧
    p.you = function () {
        var ar = this.selectArr(1);
        for (var i = 0; i < 4; i++) {
            ar[i] = ar[i].reverse();
            this.moveArr(ar[i]);
            this.unite(ar[i]);
            this.moveArr(ar[i]);
        }
        this.restartAllRect();
        this.playAllRect();
    };
    //判断游戏是否结束
    p.isGameOver = function () {
        var rel = true;
        var ar = this.selectArr(0);
        for (var i = 0; i < ar.length; i++) {
            for (var t = 0; t < 3; t++) {
                if (this._data[ar[i][t]].num == this._data[ar[i][t + 1]].num) {
                    rel = false;
                }
            }
        }
        ar = this.selectArr(1);
        for (var i = 0; i < ar.length; i++) {
            for (var t = 0; t < 3; t++) {
                if (this._data[ar[i][t]].num == this._data[ar[i][t + 1]].num) {
                    rel = false;
                }
            }
        }
        return rel;
    };
    //移动方块,val是一个1维数组
    p.moveArr = function (val) {
        var karr = [];
        for (var i = 0; i < val.length; i++) {
            if (this._data[val[i]] != 0) {
                karr.push(this._data[val[i]]);
            }
        }
        for (var t = 0; t < 4; t++) {
            if (karr[t]) {
                this._data[val[t]] = karr[t];
                var pos = GameUtil.getPosByIndex(val[t]);
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
    };
    //0纵向,1横向,返回二维数组
    p.selectArr = function (dir) {
        var arr = [];
        for (var i = 0; i < 4; i++) {
            var ar = [];
            for (var t = 0; t < 4; t++) {
                if (dir == 0) {
                    ar.push(GameUtil.getIndexByLineRow(t, i));
                }
                else {
                    ar.push(GameUtil.getIndexByLineRow(i, t));
                }
            }
            arr.push(ar);
        }
        return arr;
    };
    //合并
    p.unite = function (val) {
        var len = val.length - 1;
        for (var i = 0; i < len; i++) {
            if (this._data[val[i]].num == this._data[val[i + 1]].num && this._data[val[i + 1]]) {
                this._data[val[i]].num *= 2;
                this._data[val[i]].nextIsAnm = true;
                this._data[val[i + 1]].nextIsRemove = true;
                this._data[val[i + 1]] = 0;
                this.score += this._data[val[i]].num;
                i++;
            }
        }
    };
    //播放所有方块的动画
    p.playAllRect = function () {
        var rel = false;
        for (var i = 0; i < 16; i++) {
            //this._rects[i].playAnimation();
            rel = this._rects[i].playAnimation();
            if (rel == true) {
                this.isHaveMoveRect = true;
            }
        }
    };
    return GameManager;
}());
egret.registerClass(GameManager,'GameManager');
//# sourceMappingURL=GameManage.js.map