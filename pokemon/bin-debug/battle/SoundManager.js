/**
 *
 * @author
 *
 */
var SoundManager = (function () {
    function SoundManager() {
    }
    var d = __define,c=SoundManager,p=c.prototype;
    SoundManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance;
    };
    p.playOpenSound = function () {
        this._openSound = RES.getRes("win_mp3");
        this._bgChannel = this._openSound.play();
    };
    p.stopOpenSound = function () {
        this._bgChannel.stop();
    };
    p.playBattleSound = function () {
        this._battleSound = RES.getRes("battle_mp3");
        this._bgChannel = this._battleSound.play();
    };
    p.stopBattleSound = function () {
        this._bgChannel.stop();
    };
    p.playWinSound = function () {
        this._winSound = RES.getRes("win_mp3");
        this._bgChannel = this._winSound.play();
    };
    p.stopWinSound = function () {
        this._bgChannel.stop();
    };
    return SoundManager;
})();
egret.registerClass(SoundManager,'SoundManager');
//# sourceMappingURL=SoundManager.js.map