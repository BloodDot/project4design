class Marisa extends egret.Sprite {
	private _mc:ZMovieClip;

	/** 0跑 1跳 2下落*/
	public state:number;

	public constructor() {
		super();

		this._mc = new ZMovieClip();
		this._mc.loadByLocal(RES.getRes("marisa_left_json"),RES.getRes("marisa_left_png"),"marisa_left");
		this.addChild(this._mc);
		this._mc.play(-1);

		this._mc.scaleX = this._mc.scaleY = 2;
		this.state = 0;
	}
}