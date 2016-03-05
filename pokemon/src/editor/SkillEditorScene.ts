/**
 *
 * @author 
 *
 */
class SkillEditorScene extends eui.Component{
    private btn_play: eui.Button;
    private btn_stop: eui.Button;
    private txt_input_skill: eui.TextInput;
    
    private _mc: ZMovieClip;
    
	public constructor() {
        super();
        this.skinName = SkillEditorSceneSkin;
	}
	
    public childrenCreated():void{
        super.childrenCreated();
        
        this._mc = new ZMovieClip();
        this.addChild(this._mc);
        this._mc.x = 100;
        this._mc.y = 100;
        this.addEvent();
	}
	
	private addEvent():void{
        this.btn_play.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onPlayTap,this);
        this.btn_stop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.__onStopTap,this);
	}
	
	private removeEvent():void{
        this.btn_play.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onPlayTap,this);
        this.btn_stop.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.__onStopTap,this);
	}
	
    private __onPlayTap(evt: egret.TouchEvent): void {
        if(this.txt_input_skill.text != ""){
            var name: string = this.txt_input_skill.text;
            this._mc.loadByUrl(name+"_json",name+"_png",name);
        }
        
        this._mc.play(-1);
	}
	
	private __onStopTap(evt:egret.TouchEvent):void{
        this._mc.stop();
	}
	
	public dispose():void{
        this.removeEvent();
	}
}
