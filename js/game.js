//系统配置
var DATA = DATA || [];
var ANIMALS = ANIMALS || [];
var FROM = null;
var TO = null;
var NOTOUCH = false;

//系统资源
var res = {
	sx_0 : "res/0.png",
	sx_1 : "res/1.png",
	sx_2 : "res/2.png",
	sx_3 : "res/3.png",
	sx_4 : "res/4.png",
	sx_5 : "res/5.png",
	sx_6 : "res/6.png",
	sx_7 : "res/7.png",
	sx_8 : "res/8.png",
	sx_9 : "res/9.png",
	sx_10 : "res/10.png",
	sx_11 : "res/11.png",
	bg : "res/bg.png",
	menubg : "res/menubg.png",
	start_n_png : "res/start_n.png",
	start_s_png : "res/start_s.png",
	restart_n_png : "res/restart_n.png",
	restart_s_png : "res/restart_s.png",
	end_n_png : "res/end_n.png",
	end_s_png : "res/end_s.png",
	success_n_png : "res/success_n.png",
	success_s_png : "res/success_s.png",
	about_n_png : "res/about_n.png",
	about_s_png : "res/about_s.png",
	back_n: "res/back_n.png",
	back_s: "res/back_s.png"
};

var g_resources = [];
for (var i in res) {
	g_resources.push(res[i]);
}


var AboutLayer = cc.Layer.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function () {
	    var msg = "游戏说明:\n";
		msg += "请按照从左到右，从上到下的顺序排列十二生肖。\n";
		msg += "相冲的生肖(背景颜色相同)不能相邻，否则游戏结束。\n\n";
		msg += "程序：三杯不醉。\n";
		msg += "Email:it3cup@foxmail.com\n";
		
        var about = new cc.LabelTTF(msg);
		about.setFontSize(20);
        about.attr({
            x: 480 / 2,
            y: 650,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(about);
		
		var backSprite = new cc.MenuItemSprite(
					new cc.Sprite(res.back_n),
					new cc.Sprite(res.back_s),
					this.onBackCallback, this);
		var backMenu = new cc.Menu(backSprite);
		backMenu.setPosition(cc.p(240, 120));
		this.addChild(backMenu);

        return true;
    },
    onBackCallback:function (pSender) {
	    cc.director.runScene(new MenuScene());
    }
});

//程序结束层
var GameOverLayer = cc.LayerColor.extend({
		// constructor
		ctor : function () {
			this._super();
			this.init();
		},
		init : function () {
			this._super(cc.color(0, 0, 0, 180));
			var winsize = cc.director.getWinSize();

			cc.MenuItemFont.setFontSize(30);
			var menuItemRestart = new cc.MenuItemSprite(
					new cc.Sprite(res.restart_n_png),
					new cc.Sprite(res.restart_s_png),
					this.onRestart, this);
			var menu = new cc.Menu(menuItemRestart);
			menu.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 50));
			this.addChild(menu);
			
			var backSprite = new cc.MenuItemSprite(
					new cc.Sprite(res.back_n),
					new cc.Sprite(res.back_s),
					this.onBack, this);
					
			var backMenu = new cc.Menu(backSprite);
			backMenu.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 50));
			this.addChild(backMenu);
			
			//var endSprite = new cc.MenuItemSprite(
			//		new cc.Sprite(res.end_n_png),
			//		new cc.Sprite(res.end_s_png),
			//		this.onEnd, this);


			//var endMenu = new cc.Menu(endSprite);
			//endMenu.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 50));
			//this.addChild(endMenu)
		},
		onBack:function (pSender) {
		    cc.director.resume();
			cc.director.runScene(new MenuScene());
		},
		onEnd : function () {
			cc.director.end();
		},
		onRestart : function (sender) {
			cc.director.resume();
			cc.director.runScene(new PlayScene());
		}
	});

//程序成功层
var GameSuccessLayer = cc.LayerColor.extend({
		// constructor
		ctor : function () {
			this._super();
			this.init();
		},
		init : function () {
			this._super(cc.color(0, 0, 0, 180));
			var winsize = cc.director.getWinSize();
			cc.MenuItemFont.setFontSize(30);
			var sprite = new cc.MenuItemSprite(
					new cc.Sprite(res.success_n_png),
					new cc.Sprite(res.success_s_png),
					this.onSuccess, this);
			var menu = new cc.Menu(sprite);
			menu.setPosition(cc.p(winsize.width / 2, winsize.height / 2));
			this.addChild(menu);
		},
		onSuccess : function () {
			cc.director.resume();
			cc.director.runScene(new MenuScene());
		}
	});

//菜单层
var MenuLayer = cc.Layer.extend({
		sprite : null,
		ctor : function () {
			this._super();
			var winsize = cc.director.getWinSize();
			var centerpos = cc.p(winsize.width / 2, winsize.height / 2);
			var spritebg = new cc.Sprite(res.menubg);
			spritebg.setPosition(centerpos);
			this.addChild(spritebg);

			cc.MenuItemFont.setFontSize(60);

			var menuItemPlay = new cc.MenuItemSprite(
					new cc.Sprite(res.start_n_png),
					new cc.Sprite(res.start_s_png), 
					this.onPlay, this);
			var aboutSprite = new cc.MenuItemSprite(
					new cc.Sprite(res.about_n_png), 
					new cc.Sprite(res.about_s_png),
					this.onAbout, this);

			var endSprite = new cc.MenuItemSprite(
					new cc.Sprite(res.end_n_png),
					new cc.Sprite(res.end_s_png),
					this.onEnd, this);

			var menu = new cc.Menu(menuItemPlay);
			menu.setPosition(cc.p(winsize.width / 2, winsize.height / 2 + 50));
			this.addChild(menu);
			
			var aboutMenu = new cc.Menu(aboutSprite);
			aboutMenu.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 50));
			this.addChild(aboutMenu);
			

			//var endMenu = new cc.Menu(endSprite);
			//endMenu.setPosition(cc.p(winsize.width / 2, winsize.height / 2 - 50));
			//this.addChild(endMenu)
		},
		onAbout:function (pSender) {
			var scene = new cc.Scene();
			scene.addChild(new AboutLayer());
			cc.director.runScene(scene);
		},
		onPlay : function () {
			cc.director.runScene(new PlayScene());
		},
		onEnd : function () {
			cc.director.end();
		}
	});

//背景层
var BackgroundLayer = cc.Layer.extend({
		ctor : function () {
			this._super();
			this.init();
		},

		init : function () {
			this._super();
			var winsize = cc.director.getWinSize();

			// create the background image and position it at the center of screen
			var centerPos = cc.p(winsize.width / 2, winsize.height / 2);
			var spriteBG = new cc.Sprite(res.bg);
			spriteBG.setPosition(centerPos);
			this.addChild(spriteBG);
		}
	});

//游戏层
var PlayLayer = cc.Layer.extend({
		//sxdata:[],
		//sxFrom:null,
		//sxList:[],
		sxleft : function (index) {
			return (index % 3) === 0 || (index - 1) < 0 ? -1 : index - 1;
		},
		sxright : function (index) {
			return ((index + 1) % 3) === 0 || index + 1 > 11 ? -1 : index + 1;
		},
		sxtop : function (index) {
			return index + 3 > 11 ? -1 : index + 3;
		},
		sxbuttom : function (index) {
			return index - 3 < 0 ? -1 : index - 3;
		},
		shuffle : function (sxdata) {
			for (var i = 0; i < sxdata.length; i++) {
				var r = parseInt(Math.random() * sxdata.length);
				var tmp = sxdata[i];
				sxdata[i] = sxdata[r];
				sxdata[r] = tmp;
			}
			return sxdata;
		},
		getChong : function (sxdata, index) { // 获得相冲INDEX
			var l = this.sxleft(index);
			var r = this.sxright(index);
			var t = this.sxtop(index);
			var b = this.sxbuttom(index);
			if ((l > 0) && Math.abs(sxdata[l] - sxdata[index]) === 6) {
				return [index, l];
			}
			if ((r > 0) && Math.abs(sxdata[r] - sxdata[index]) === 6) {
				return [index, r];
			}
			if ((t > 0) && Math.abs(sxdata[t] - sxdata[index]) === 6) {
				return [index, t];
			}
			if ((b > 0) && Math.abs(sxdata[b] - sxdata[index]) === 6) {
				return [index, b];
			}
			return null;
		},
		isChong : function (sxdata) { // 是否相冲
			for (var i = 0; i < sxdata.length; i++) {
				var r = this.getChong(sxdata, i);
				if (r !== null) {
					return r;
				}
			}
			return null;
		},
		isSuccess : function (data) {
			var successList = [9, 10, 11, 6, 7, 8, 3, 4, 5, 0, 1, 2];
			//cc.log(data);
			//cc.log(successList);
			for (var i = 0; i < successList.length; i++) {
				if (successList[i] !== data[i]) {
					return false;
				}
			}
			return true;
		},
		ctor : function () {
			this._super();
			NOTOUCH = false;
			DATA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
			ANIMALS = [];
			FROM = null;
			while (true) {
				DATA = this.shuffle(DATA);
				if (this.isChong(DATA) === null && !this.isSuccess(DATA)) {
					break;
				}
			}
			//DATA = [9,10,11,6,7,8,3,4,5,0,1,2];
			for (var i = 0; i < DATA.length; i++) {
				var sprite = new cc.Sprite("res/" + DATA[i] + ".png");
				sprite.sxValue = DATA[i];
				ANIMALS.push(sprite);
				// cc.log("W+++++++++++++++++++++++++++++"+ANIMALS.length);
			}
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 3; j++) {
					var x = j * 160 + 80;
					var y = i * 200 + 100;
					//cc.log("----------------"+(i*3+j));
					this.addChild(ANIMALS[i * 3 + j]);
					ANIMALS[i * 3 + j].attr({
						"x" : x,
						"y" : y
					});
				}
			}

			cc.eventManager.addListener({
				event : cc.EventListener.TOUCH_ONE_BY_ONE,
				swallowTouches : true,
				onTouchBegan : this.onTouchBegan
			}, this);
		},
		onTouchBegan : function (touch, event) {
			if (NOTOUCH === true) {
				return;
			}
			NOTOUCH = true;
			var target = event.getCurrentTarget();
			var pos = touch.getLocation();

			var x = parseInt(pos.x / 160);
			var y = parseInt(pos.y / 200);
			var index = (y * 3 + x);

			cc.log("from : " + FROM + "index: " + index);

			if (FROM === null) {
				FROM = index;
				ANIMALS[FROM].setOpacity(160);
				//ANIMALS[FROM].setPositionY(ANIMALS[FROM].getPositionY()+10);
				NOTOUCH = false;
			} else {

				var distance = Math.abs(FROM - index);
				// NOT NEIGHBOR
				if (distance != 1 && distance != 3 && distance != 0) {
					NOTOUCH = false;
					return;
				}
				ANIMALS[FROM].setOpacity(255);
				//ANIMALS[FROM].setPositionY(ANIMALS[FROM].getPositionY()-10);
				//for (var i = 0; i < ANIMALS.length; i++) {
				//	ANIMALS[i].attr({
				//		opacity : 1000
				//	});
				//}

				if (distance === 0) {
					FROM = null;
					NOTOUCH = false;
					return;
				}

				var temp = ANIMALS[FROM];
				ANIMALS[FROM] = ANIMALS[index];
				ANIMALS[index] = temp;

				temp = DATA[FROM];
				DATA[FROM] = DATA[index];
				DATA[index] = temp;

				var actionA = cc.moveTo(0.3, ANIMALS[index].getPosition());
				var actionB = cc.moveTo(0.3, ANIMALS[FROM].getPosition());

				var seq = cc.Sequence.create(actionB, cc.CallFunc.create(function () {
							var r = target.isChong(DATA);
							//相冲
							if (r !== null) {
							    ANIMALS[r[0]].setOpacity(100);
								ANIMALS[r[1]].setOpacity(100);
								cc.director.pause();
								DATA = null;
								ANIMALS = null;
								FROM = null;
								target.addChild(new GameOverLayer());
								NOTOUCH = true;
								return;
							}

							// 成功
							if (target.isSuccess(DATA)) {
								cc.director.pause();
								DATA = null;
								ANIMALS = null;
								FROM = null;
								target.addChild(new GameSuccessLayer());
								NOTOUCH = true;
								return;
							}
							NOTOUCH = false;
						}, this));

				ANIMALS[FROM].runAction(actionA);
				ANIMALS[index].runAction(seq);
				FROM = null;
			}
		}
	});

//菜单场景
var MenuScene = cc.Scene.extend({
		onEnter : function () {
			this._super();
			var layer = new MenuLayer();
			this.addChild(layer);

		}
	});

//游戏场景
var PlayScene = cc.Scene.extend({
		onEnter : function () {
			this._super();
			this.addChild(new BackgroundLayer());
			this.addChild(new PlayLayer());
		}
	});

//开始函数
cc.game.onStart = function () {
	cc.view.adjustViewPort(!0);
	cc.view.setDesignResolutionSize(480, 800, cc.ResolutionPolicy.EXACT_FIT);
	cc.view.resizeWithBrowserSize(!0);
	cc.LoaderScene.preload(g_resources, function () {
		cc.director.runScene(new MenuScene())
	}, this)
};