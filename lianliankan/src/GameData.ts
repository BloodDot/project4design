/**
 *
 * @author 
 *
 */
class GameData {
    public mapData: Array<Array<number>>;
    public linkList: Array<Line>;
    /** 列X */
    public col: number;
    /** 行Y */
    public row: number;

    public constructor() {
        this.col = 10;
        this.row = 10;

        this.mapData = [
            [1,0,0,0,3,9,4,4,0,8],
            [6,8,0,9,0,9,4,2,5,7],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [6,8,0,9,0,9,4,2,5,7],
            [0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,3,9,4,4,0,8]
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

    private static _instance: GameData;

    public static getInstance(): GameData {
        if(this._instance == null) {
            this._instance = new GameData();
        }

        return this._instance;
    }
}
