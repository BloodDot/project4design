class GameEvent extends egret.Event{
	public static GAME_START:string = "GAME_START";

	public constructor(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
		super(type, bubbles, cancelable, data);
	}
}