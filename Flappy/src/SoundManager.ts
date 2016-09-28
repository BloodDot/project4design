class SoundManager {
	private _sounds: {};

	private static _instance: SoundManager;

	public static getInstance(): SoundManager {
		if (!this._instance) {
			this._instance = new SoundManager();
		}

		return this._instance;
	}

	public constructor() {
		this._sounds = {};
	}

	public playSound(value: string): void {
        if (this._sounds[value]) {
            this._sounds[value].play(0, 1);
        } else {
            var sound: egret.Sound = RES.getRes(value);
            if (sound) {
                sound.play(0, 1);
                this._sounds[value] = sound;
            }
        }
    }
}