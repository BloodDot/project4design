var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable, data) {
        _super.call(this, type, bubbles, cancelable, data);
    }
    var d = __define,c=GameEvent,p=c.prototype;
    GameEvent.GAME_START = "GAME_START";
    return GameEvent;
}(egret.Event));
egret.registerClass(GameEvent,'GameEvent');
//# sourceMappingURL=GameEvent.js.map