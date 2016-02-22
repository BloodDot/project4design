/**
 *
 * @author
 *
 */
var Line = (function (_super) {
    __extends(Line, _super);
    function Line(a, b, direct) {
        this.a = a;
        this.b = b;
        this.direct = direct;
        _super.call(this);
    }
    var d = __define,c=Line,p=c.prototype;
    return Line;
})(egret.Sprite);
egret.registerClass(Line,'Line');
//# sourceMappingURL=Line.js.map