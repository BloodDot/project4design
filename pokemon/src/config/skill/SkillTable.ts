/**
 *
 * @author 
 *
 */
class SkillTable {
    private static _instance: SkillTable;
    private _vect: Array<SkillCell>;
    public constructor() {
    }

    public static getInstance(): SkillTable {
        if(this._instance == undefined) {
            this._instance = new SkillTable();
        }

        return this._instance;
    }

    public analysis(tarr: Array<any>): void {
        this._vect = tarr;
    }

    public getCellById(tid: number): SkillCell {
        var i: number,j: number = this._vect.length;
        for(i = 0;i < j;i++) {
            if(this._vect[i].id == tid) {
                return this._vect[i];
            }
        }
    }
}
