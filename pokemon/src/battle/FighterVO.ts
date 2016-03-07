/**
 *
 * @author 
 *
 */
class FighterVO {
    //1是自己 2是敌人
    public side: number;
    
    public hp: number;
	public constructor() {
        this.hp = FightConst.MAX_HP;
	}
}
