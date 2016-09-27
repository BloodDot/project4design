/**
 * Created by mebius on 14-7-22.
 */
class EventManage extends egret.EventDispatcher {
    //添加事件侦听
    public addEvent(): void {
        //判断是否是移动设备 //egret.Browser.getInstance().isMobile )
        if (egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE) {
            var self = this;
            document.addEventListener("keydown", function (evt: KeyboardEvent) {
                switch (evt.keyCode) {
                    case 38:
                        self.doMove(0); //shang
                        break;
                    case 39:
                        self.doMove(1); //you
                        break;
                    case 40:
                        self.doMove(2); //xia
                        break;
                    case 37:
                        self.doMove(3); //zuo
                        break;
                }
            });
        }

        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandle, this);
    }

    //鼠标按下
    private mouseDownHandle(event: egret.TouchEvent): void {
        console.log("touchdown");
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
        this.downPoint = new egret.Point(event.stageX, event.stageY);
    }

    //鼠标移动
    private stage_mouseMoveHandler(event: egret.TouchEvent): void {
        if (!this.movePoint) {
            this.movePoint = new egret.Point();
        }
        this.movePoint.x = event.stageX;
        this.movePoint.y = event.stageY;
        if (this.needMove)
            return;
        this.needMove = true;
    }

    //鼠标抬起
    public stage_mouseUpHandler(event: egret.Event): void {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,
            this.stage_mouseMoveHandler,
            this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END,
            this.stage_mouseUpHandler,
            this);
        egret.MainContext.instance.stage.addEventListener(egret.Event.LEAVE_STAGE,
            this.stage_mouseUpHandler,
            this);
        if (this.needMove) {
            this.updateWhenMouseUp();
            this.needMove = false;
        }
    }
    private needMove: boolean;
    private downPoint: egret.Point;
    private movePoint: egret.Point;
    /**
     * 移动设备上，判断移动方向
     */
    private updateWhenMouseUp(): void {
        var p: egret.Point = this.movePoint;
        var offSetX: number = p.x - this.downPoint.x;
        var offSetY: number = p.y - this.downPoint.y;

        if (offSetY < 0 && Math.abs(offSetY) > Math.abs(offSetX)) {
            this.doMove(0);
        }
        else if (offSetX > 0 && offSetX > Math.abs(offSetY)) {
            this.doMove(1);
        }
        else if (offSetY > 0 && offSetY > Math.abs(offSetX)) {
            this.doMove(2);
        }
        else if (offSetX < 0 && Math.abs(offSetX) > Math.abs(offSetY)) {
            this.doMove(3);
        }
    }

    //移动盒子
    private doMove(direction: number): void {
        //    console.log( "案件编码" );
        if (GameManager.getInstance().isRunning) {
            GameManager.getInstance().isRunning = false;
            switch (direction) {
                case 0:
                    GameManager.getInstance().shang();
                    break;
                case 1:
                    GameManager.getInstance().you();
                    break;
                case 2:
                    GameManager.getInstance().xia();
                    break;
                case 3:
                    GameManager.getInstance().zuo();
                    break;
            }
            var evt: egret.Event = new egret.Event("keyDowns");
            this.dispatchEvent(evt);
        }

    }
}