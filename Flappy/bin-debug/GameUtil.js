var GameUtil = (function () {
    function GameUtil() {
    }
    var d = __define,c=GameUtil,p=c.prototype;
    GameUtil.removeFromParent = function (obj) {
        if (obj && obj.parent) {
            obj.parent.removeChild(obj);
        }
    };
    return GameUtil;
}());
egret.registerClass(GameUtil,'GameUtil');
//# sourceMappingURL=GameUtil.js.map