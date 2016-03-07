/**
 *
 * @author 
 *
 */
class AnimeManager {
    private static _instance: AnimeManager;
    
    public static getInstance():AnimeManager{
        if(!this._instance){
            this._instance = new AnimeManager();
        }
        
        return this._instance;
    }
    
    private _aft: eui.Image;
    private _bft: eui.Image;
    private _cell: SkillCell;
    private _func: Function;
    private _args: any;
    private _isown: boolean;
    private _ox: number;
    private _oy: number;
    private _parent: any;
	public constructor() {
	}
	
    public playAtk(taft: eui.Image,tbft: eui.Image,tcell: SkillCell,tfunc:Function,targs:any,tisown:boolean,tparent:any){
        this._aft = taft;
        this._bft = tbft;
        this._cell = tcell;
        this._func = tfunc;
        this._args = targs;
        this._isown = tisown;
        this._ox = this._aft.x;
        this._oy = this._aft.y;
        this._parent = tparent;
        
        var tw: egret.Tween = egret.Tween.get(this._aft);
        tw.to({ scaleX: 2.5,scaleY: 2.5 },100)
            .to({ scaleX: 2,scaleY: 2 },100)
            .call(this.startPlay,this);
    }
    
    private startPlay(){
        //1远程直接特效 2近战过去特效 3抛东西再特效 4自身
        switch(this._cell.type) {
            case 1:
                this.playMc(this._bft);
                break;
            case 4:
                this.playMc(this._aft);
                break;
            case 2:
                this.ftCome();
                break;
            case 3:
                this.flyBall();
                break;
        }
    }
    
    private ftCome(){
        var tw: egret.Tween = egret.Tween.get(this._aft);
        var twx: number = this._bft.x;
        var twy: number = this._bft.y;
        tw.to({ x: twx,y: twy },300)
            .call(this.playMc,this,[this._aft,this.ftBack.bind(this)]);
    }
    
    private ftBack():void{
        var tw: egret.Tween = egret.Tween.get(this._aft);
        tw.to({ x: this._ox,y: this._oy },300)
            .call(function() {
                this._func(this._args);
            },this);
    }
    
    private flyBall():void{
        var ball: eui.Image = new eui.Image(this.getBallresBySeries(this._cell.series));
        this._parent.addChild(ball);
        ball.x = this._aft.x;
        ball.y = this._aft.y;
        var tw: egret.Tween = egret.Tween.get(ball);
        tw.to({ x: this._bft.x + this._bft.width / 2,y: this._bft.y + this._bft.height / 2 },300)
            .call(this.playMc,this,[this._bft,null,ball]);
    }
    
    private playMc(tft:eui.Image,tback?:Function,timg?:eui.Image){
        if(timg){
            this._parent.removeChild(timg);
        }
        
        var mc: ZMovieClip = new ZMovieClip();
        mc.loadByLocal(RES.getRes(this._cell.resId + "_json"),RES.getRes(this._cell.resId + "_png"),this._cell.resId);
        mc.x = tft.x - mc.width / 2 + this._aft.width / 2 * this._aft.scaleX;
        mc.y = tft.y - mc.height / 2 + this._aft.height / 2 * this._aft.scaleY;
        mc["back"] = tback;
        this._parent.addChild(mc);
        mc.addEventListener(egret.Event.COMPLETE,this.__onMcComplete,this);
        mc.play();
    }
    
    private __onMcComplete(evt:egret.Event):void{
        var mc: ZMovieClip = evt.target;
        this._parent.removeChild(mc);
        mc.removeEventListener(egret.Event.COMPLETE,this.__onMcComplete,this);

        if(mc["back"]){
            mc["back"]();
        }else{
            this._func(this._args);
        }
    }
    
    public getBallresBySeries(tseries:number):string{
        var str: string = "ft_effect_light_png";
        //0普通 1格斗 2飞行 3毒 4地面 5岩石 6虫 7鬼 8钢 9火 10水 11草 12电 13超能 14冰 15龙 16暗
        switch(tseries){
            case 3:
            case 7:
            case 16:
                str = "ft_effect_dark_png";
                break;
            case 9:
                str = "ft_effect_fire_png";
                break;
            case 10:
            case 14:
                str = "ft_effect_water_png";
                break;
            case 11:
            case 6:
                str = "ft_effect_wood_png";
                break;
        }
        
        return str;
    }
}
