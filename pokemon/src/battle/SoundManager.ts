/**
 *
 * @author 
 *
 */
class SoundManager {
    private _openSound: egret.Sound;
    private _battleSound: egret.Sound;
    private _winSound: egret.Sound;
    
    private _bgChannel: egret.SoundChannel;
    
	public constructor() {
	}
	
    public static _instance: SoundManager;
    
    public static getInstance():SoundManager{
        if(!this._instance){
            this._instance = new SoundManager();
        }
        
        return this._instance;
    }
    
    public playOpenSound():void{
        this._openSound = RES.getRes("open_mp3");
        this._bgChannel = this._openSound.play();
    }
    
    public stopOpenSound():void{
        this._bgChannel.stop();
    }
    
    public playBattleSound():void{
        this._battleSound = RES.getRes("battle_mp3");
        this._bgChannel = this._battleSound.play();
    }
    
    public stopBattleSound():void{
        this._bgChannel.stop();
    }
    
    public playWinSound():void{
        this._winSound = RES.getRes("win_mp3");
        this._bgChannel = this._winSound.play();
    }
    
    public stopWinSound():void{
        this._bgChannel.stop();
    }
}
