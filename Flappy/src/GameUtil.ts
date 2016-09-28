class GameUtil {
	public constructor() {
	}

	public static removeFromParent(obj: egret.DisplayObject): void {
		if (obj && obj.parent) {
			obj.parent.removeChild(obj);
		}
	}
}