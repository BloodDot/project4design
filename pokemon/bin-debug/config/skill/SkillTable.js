/**
 *
 * @author
 *
 */
var SkillTable = (function () {
    function SkillTable() {
    }
    var d = __define,c=SkillTable,p=c.prototype;
    SkillTable.getInstance = function () {
        if (this._instance == undefined) {
            this._instance = new SkillTable();
        }
        return this._instance;
    };
    p.analysis = function (tarr) {
        this._vect = tarr;
    };
    p.getCellById = function (tid) {
        var i, j = this._vect.length;
        for (i = 0; i < j; i++) {
            if (this._vect[i].id == tid) {
                return this._vect[i];
            }
        }
    };
    return SkillTable;
})();
egret.registerClass(SkillTable,'SkillTable');
//# sourceMappingURL=SkillTable.js.map