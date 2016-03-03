/**
 *
 * @author 
 *
 */
class BattleScene extends eui.Component{
    private bar_enemy_hp: eui.ProgressBar;
    private label_enemy_lv: eui.Label;
    private label_enemy_name: eui.Label;
    private label_own_lv: eui.Label;
    private label_own_name: eui.Label;
    private label_own_cur_hp: eui.Label;
    private label_own_max_hp: eui.Label;
    private img_enemy_monster: eui.Image;
    private img_own_monster: eui.Image;
    private btn_skill1: eui.Image;
    private btn_skill3: eui.Image;
    private btn_skill2: eui.Image;
    private btn_skill4: eui.Image;
        
	public constructor() {
        super();
        this.skinName = BattleSceneSkin;
	}
}
