/**
 *
 * @author
 *
 */
var GameData = (function () {
    function GameData() {
        this.tileWidth = 40;
        this.tileHeight = 40;
        this.lineColor = 0xff0000;
        this.col = 16;
        this.row = 12;
        // x y
        this.mapData = [
            [1, 0, 0, 0, 3, 9, 4, 4, 0, 8],
            [6, 8, 0, 9, 0, 9, 4, 2, 5, 7],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [6, 8, 0, 9, 0, 9, 4, 2, 5, 7],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 3, 9, 4, 4, 0, 8]
        ];
        //        
        //        var i,j = 10;
        //        var m,n = 10;
        //        for(i = 0;i < j;i++) {
        //            this.mapData[i] = 
        //            for(m = 0;m < n;m++) {
        //                
        //            }
        //        }
    }
    var d = __define,c=GameData,p=c.prototype;
    GameData.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameData();
        }
        return this._instance;
    };
    return GameData;
})();
egret.registerClass(GameData,'GameData');
//# sourceMappingURL=GameData.js.map