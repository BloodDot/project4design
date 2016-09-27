//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        // RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        // RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadGroup("preload");
    }

    private gameView: GameView;      //游戏视图
    private res: egret.SpriteSheet;  //资源 纹理集
    private eventManage: EventManage;  //事件管理器
    private _time: egret.Timer;      //操作计时器
    //加载完成
    private onGroupComp() {

        //生成纹理集
        this.res = RES.getRes("res_json");
        //创建游戏静态界面
        this.gameView = new GameView();
        this.gameView.createStaticView();
        this.gameView.addEventListener("gameRestart", this.onRestart, this);
        this.addChild(this.gameView);
        //计时器
        this._time = new egret.Timer(110, 1);
        this._time.addEventListener(egret.TimerEvent.TIMER, this.onTimerComplete, this);
        //初始化游戏数据
        GameManager.getInstance().createAllRect();
        //创建两个新方块
        this.createNewRect();
        this.createNewRect();
        //添加事件管理
        this.eventManage = new EventManage();
        this.eventManage.addEvent();
        this.eventManage.addEventListener("keyDowns", this.keyDowns, this);
    }

    //创建一个新方块
    private createNewRect() {

        //寻找一个未使用的位置
        var pos = GameManager.getInstance().selectNewPos();
        //寻找一个新方块
        var rect = GameManager.getInstance().selectGrid();
        //更新盒子的状态
        rect.isUsed = true;
        rect.num = 2;
        rect.row = pos.x;
        rect.column = pos.y;
        var rectpost = GameUtil.getPosByRect(rect);
        rect.x = rectpost.x;
        rect.y = rectpost.y;
        GameManager.getInstance().addGridToDatas(rect);
        this.gameView.playView.addChild(rect);
    }

    //键盘按下，或者移动事件发生
    private keyDowns(): void {
        this.gameView.updateScore();
        //判断是否游戏结束
        if (GameManager.getInstance().isGameOver()) {
            console.log("游戏结束");//弹出结束面板
            this.gameView.showGameOverLayout();
        } else {
            this._time.start();
        }
    }

    //计时器完成
    private onTimerComplete(): void {
        GameManager.getInstance().isRunning = true;
        if (GameManager.getInstance()._nousedata.length != 0 && GameManager.getInstance().isHaveMoveRect == true) {
            GameManager.getInstance().isHaveMoveRect = false;
            this.createNewRect();
        }
    }

    //重新开始游戏
    private onRestart() {
        this.gameView.updateScore();
        this.createNewRect();
        this.createNewRect();
    }
}


