/**
 *
 * @author 
 *
 */
class BattleSkillButton extends eui.Button {
    public normalDisplay: eui.Image;
    public downDisplay: eui.Image;

    private _normal: any;
    private _down: any;
    
    private _cell: SkillCell;
    public constructor() {
        super();
    }

    public set normal(value: any) {
        this._normal = value;
        if(this.normalDisplay) {
            this.normalDisplay.source = value;
        }
    }

    public get normal(): any {
        if(this.normalDisplay) {
            return this.normalDisplay.source;
        } else {
            return this._normal;
        }
    }

    public set down(value: any) {
        this._down = value;
        if(this.downDisplay) {
            this.downDisplay.source = value;
        }
    }

    public get down(): any {
        if(this.downDisplay) {
            return this.downDisplay.source;
        } else {
            return this._down;
        }
    }

    public partAdded(partName: string,instance: any): void {
        super.partAdded(partName,instance);
        if(instance == this.normalDisplay && this._normal != undefined) {
            this.normalDisplay.source = this._normal;
        }
        if(instance == this.downDisplay && this._down != undefined) {
            this.downDisplay.source = this._down;
        }
    }
    
    public set cell(value:SkillCell){
        if(value == this._cell){
            return;
        }
        this._cell = value;
        this.normalDisplay.source = this._cell.series + "D_png";
        this.downDisplay.source = this._cell.series + "H_png";
        this.label = this.cell.name;
    }
    
    public get cell():SkillCell{
        return this._cell;
    }
}
