/**
 *
 * @author 
 *
 */
class GameSkillList extends eui.Component {
    private scroller_skill: eui.Scroller;
    private _skillList: eui.List;
    
	public constructor() {
        super();
	}
	
	public childrenCreated():void{
        super.childrenCreated();
        
        
        var arr: Array<SkillCell> = SkillTable.getInstance().vect;
        var layout: eui.VerticalLayout = new eui.VerticalLayout();
        layout.gap = 6;
        this._skillList = new eui.List();
        this._skillList.useVirtualLayout = true;
        this._skillList.layout = layout;
        this._skillList.itemRenderer = GameSkillItem;
        this._skillList.dataProvider = new eui.ArrayCollection(arr);
        this._skillList.selectedIndex = 1;//设置默认选中项
        
        this.scroller_skill.viewport = this._skillList;
	}
}
