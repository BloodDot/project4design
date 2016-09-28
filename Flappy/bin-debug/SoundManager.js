var SoundManager = (function () {
    function SoundManager() {
        this._sounds = {};
    }
    var d = __define,c=SoundManager,p=c.prototype;
    SoundManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance;
    };
    p.playSound = function (value) {
        if (this._sounds[value]) {
            this._sounds[value].play(0, 1);
        }
        else {
            var sound = RES.getRes(value);
            if (sound) {
                sound.play(0, 1);
                this._sounds[value] = sound;
            }
        }
    };
    return SoundManager;
}());
egret.registerClass(SoundManager,'SoundManager');
//# sourceMappingURL=SoundManager.js.map