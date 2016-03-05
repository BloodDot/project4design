/**
 *
 * @author 
 *
 */
class SkillCell {
    public id: number;
    public name: string;
    public resId: number;
    public damage: number;
    /** 1远程直接特效 2近战过去特效 3抛东西再特效 4自身 */
    public type: number;
    /** 0普通 1格斗 2飞行 3毒 4地面 5岩石 6虫 7鬼 8钢 9火 10水 11草 12电 13超能 14冰 15龙 16暗 */
    public series: number;

    public constructor() {
    }
}
