// var audio_=document.getElementById("audio");
window.createjs = createjs;
var vw = window.innerWidth||document.body.clientWidth;
var vh = window.innerHeight||document.body.clientHeight;
document.body.width = vw;
document.body.height = vh;
var time=null;//延迟函数
var vue = new Vue({  
	el: 'main',
	data: {
		"vw": vw, //屏幕宽
		"vh": vh, //屏幕高
		"mySwiper": null,
		"music_flag": true, //音乐开关标识
		"if_wx": true, //是否是微信打开
		"arrow_right": false, //是否显示右箭头
		"arrow_left": false, //是否显示左箭头
		"doorbell": null,
		"music": null,
		"p2": null,
		"p3": null,
		"p4": null,
		"p5": null,
		"p6": null,
		"p7": null,
		"p8": null,
		"p9": null,
		"p10": null,
		"p10_voice": null,
		"p10_pause": null,
		"p10_change": null,
		"p10_quick": null,
		"p11_mama": null,
		"p11_doctor": null,
		"p12_jiashiqi": null,
		"p12_tianqi": null,
		"p12_tonghua": null,
		"p12_kongtiao": null,
		"p12_music": null,
		"p12_naozhong": null,
		"p13": null,
		"p14": null,
		"p15": null,
		"p16": null,
		"p17": null,
		//所有音频实例
		"page1": {
			progress: 0, //加载进度
			progress_num_show:false,//进度数字显示
		},
		"page2": {
			start: false, //开始执行第一个动画
			start_2: false, //执行第二个动画
			start_3: false, //执行第三个动画
			show_iphone: false, //出现手机
			show_text: false, //出现文字
		},
		"page3": {
			start: false, //开始执行第一个动画
			show_wifi_text: false, //显示wifi说明
			show_call: false, //出现呼叫按钮
		},
		"page4": {
			start: false, //开始
			text: false, //出现对话气泡和旁白
			show_bg2: false, //出现开门场景
			show_scenes: false, //出现4个场景
			show_scene_index: 0, //当前显示的场景下标
			show_explain: false, //出现了解更多
			scene1_enlarge: false, //开始放大第一个场景
			show_product: false, //出现产品
			show_button: false, //出现按钮
		},
		"page5": {
			start: false, //开始
			show_text: false, //出现文字
			show_button: false, //出现按钮
			show_bg2: false, //出现有颜色的背景
			show_product: false, //出现产品
		},
		"page6": {
			start: false, //开始
			show_text: false, //出现文字
			show_button: false, //出现按钮
		},
		"page7": {
			start: false, //开始
			show_text: false, //出现文字
			show_bubble: false, //出现产品
			show_hand: false //小手
		},
		"page8": {
			start: false, //开始
			active_index: 2, //点击的场景下标
			scene1: {
				show_bubble: false, //出现气泡
				button_show_cctv5: false, //是否按了中央五套按钮
				show_cctv5: false, //出现cctv5
				active_index: 0, //按了哪个按钮
				icon_active_index: 0, //电视机播放状态
				show_sound: false, //出现音响闪烁动画
				if_click_button: true, //是否可以点击按钮
				// clickflag:false,
			},
			scene2: {
				show_tv_index: 0, //出现给妈妈视频还是看医生的电视机下标
				show_bubble: false, //出现气泡
				show_text: true, //出现文字
				show_sound: false, //出现音响闪烁动画
				active_index: 0, //按了哪个按钮
				// clickflag:false,
			},
			scene3: {
				show_bubble: false, //出现气泡
				button_show_jiashiqi: false, //是否按了加湿器按钮
				show_jiashiqi: false, //打开了加湿器
				button_show_kongtiao: false, //是否按了空调按钮
				show_kongtiao: './images/page8/scene3/kongtiao.png', //打开了空调
				active_index: 0, //按了哪个按钮
				icon_active_index: 0, //电视机播放画面下标
				show_sound: false, //出现音响闪烁动画
				// clickflag:false,
			},
		},
		"page9": {
			start: false, //开始
			btn: false //按钮
		},
		"page10": {
			start: false, //开始
		},
		"page11": {
			start: false, //开始
			product: false //产品
		},
		"page12": {
			start: false, //开始
			product: false //产品
		},
		"page13": {
			start: false, //开始
			product: false //产品
		},
		"page14": {
			start: false, //开始
			logo: false, //logo
			btn: false, //按钮
			share:false,
		},
	},
	created: function() {
		var that = this;
		//首屏图片加载完再显示进度
		var bg_white=new Image();
		var bg=new Image();
		bg_white.src="./images/page1/bg_white.png";
		bg.src="./images/page1/bg.png";
		bg_white.onload=(e)=>{
			bg.onload=(e)=>{
				//初始化数据
				if(this.isWeiXin()) {
					document.addEventListener('WeixinJSBridgeReady', function() {
						init.call(that); //初始化音乐列表
						that.music_flag = true; //初始化音乐是否开启
					});
				} else {
					that.music_flag = false; //初始化音乐是否开启
					init.call(that); //初始化音乐列表
				}
				this.page1.progress_num_show=true;
			}
		}
	},
	mounted: function() {
		var that = this;
		var sound_time=null;//旁白延迟函数，解决切换到下一页的时候还没读，导致无法暂停的问题
		this.mySwiper = new Swiper('.swiper-container', {
			// autoplay: true,//可选选项，自动滑动
			// direction : 'vertical',//垂直滑动
			// initialSlide :3,//默认第几页
			freeModeMomentumBounce: false, //无惯性回弹
			allowTouchMove: false, //禁止滑动切换
			on: {
				slideChangeTransitionEnd: function() {
					var page = that["page" + (this.activeIndex + 1)];
					page.start = true;
					that.stopMusic();
					switch(this.activeIndex) {
						case 0:

							break;
						case 1:
							setTimeout(() => {
								page.start_2 = true;
								setTimeout(() => {
									page.start_3=true;
									page.show_iphone = true;
									that.p2 = new createjs.Sound.play("p2", { volume: 1 }); //点击体验智慧生活
									setTimeout(() => {
										page.show_text = true;
									}, 1000)
								}, 1500)
							}, 5000)
							break;
						case 2:
							time=setTimeout(() => {
								page.show_wifi_text = true;
								that.p3 =createjs.Sound.play("p3", { volume: 1 }); //家里wifi信号差
								time=setTimeout(() => {
									page.show_call = true;
								}, 2000)
							}, 1000)
							break;
						case 3:
							createjs.Sound.play("doorbell", { volume: 1 }); //敲门声
							time=setTimeout(() => {
								page.text = true; //开始出现气泡和旁白
								that.p4 =createjs.Sound.play("p4", { volume: 1 }); //您好，我是中国电信。。。
								setTimeout(() => {
									//播放完旁白
									page.show_bg2 = true;
									setTimeout(() => {
										//开完门
										page.show_scenes = true; //显示4个场景
										that.p5 =createjs.Sound.play("p5", { volume: 1 }); //升级智能组网
										time = setInterval(() => {
											if(page.show_scene_index < 5) {
												page.show_scene_index++;
											} else {
												clearInterval(time);
												setTimeout(() => {
													page.scene1_enlarge = true; //开始放大第一个场景
													setTimeout(() => {
														page.show_product = true;
														setTimeout(() => {
															page.show_button = true;
															that.arrow_right = true; //右箭头出现
														}, 1000)
													}, 1500)
												}, 1000)
											}
										}, 1000)
									}, 2000)
								}, 3500)
							}, 2000)
							break;
						case 4:
							that.arrow_right = false; //右箭头消失
							time=setTimeout(() => {
								page.show_text = true; //出现文字
								that.p6 =createjs.Sound.play("p6", { volume: 1 }); //视频内容太分散
								setTimeout(() => {
									page.show_button = true; //出现按钮
								}, 1200)
							}, 1000)
							break;
						case 5:
							that.arrow_right = false; //右箭头消失
							time=setTimeout(() => {
								page.show_text = true; //出现文字
								that.p8 =createjs.Sound.play("p8", { volume: 1 }); //设备太多，遥控器找不到
								setTimeout(() => {
									page.show_button = true; //出现按钮
								}, 200)
							}, 1000)
							break;
						case 6:
							clearTimeout(time);//清除上个页面的旁白延迟函数
							that.page8.scene1.if_click_button=true;
							that.arrow_right = false; //右箭头消失
							that.arrow_left = false; //左箭头消失
							time=setTimeout(() => {
								that.p9 =createjs.Sound.play("p9", { volume: 1 });
								page.show_text = true;
								setTimeout(() => {
									page.show_bubble = true;
									setTimeout(() => {
										page.show_hand = true
									}, 1000)
								}, 3000)
							}, 1000)
							break;
						case 7:
							clearTimeout(time);//清除上个页面的旁白延迟函数
							// that.page8["scene"+that.page8.active_index].clickflag=true;
							// if(that.page8.scene1.clickflag && that.page8.scene2.clickflag && that.page8.scene3.clickflag){
								that.arrow_right = true; //右箭头展开
								that.arrow_left = true; //左箭头关闭
							// }else{
							// 	that.arrow_left = true; //左箭头展开
							// 	that.arrow_right = false; //右箭头关闭
							// }
							time=setTimeout(() => {
								that.p10 =createjs.Sound.play("p10", { volume: 1 });
								page.show_text = true;
							}, 1000)
							break;

						case 8:
							clearTimeout(time);//清除上个页面的旁白延迟函数
							that.arrow_left = false; //左箭头关闭
							that.arrow_right = false; //右箭头关闭
							time=setTimeout(() => {
								page.start = true; //文字出现
								that.p13 =createjs.Sound.play("p13", { volume: 1 });
								setTimeout(() => {
									page.btn = true;
								}, 2000)
							}, 1000)
							break;
						case 9:
							clearTimeout(time);//清除上个页面的旁白延迟函数
							time=setTimeout(() => {
								page.start = true;
								that.p14 =createjs.Sound.play("p14", { volume: 1 });
								setTimeout(() => {
									that.arrow_right = true; //右箭头打开
								})
							}, 1000)
							break;
						case 10:
							clearTimeout(time);//清除上个页面的旁白延迟函数
							time=setTimeout(() => {
								page.start = true;
								that.p15 =createjs.Sound.play("p15", { volume: 1 });
								setTimeout(() => {
									page.product = true
								}, 900)
							}, 1000)
							break;
						case 11:
							clearTimeout(time);//清除上个页面的旁白延迟函数
							setTimeout(() => {
								page.start = true;
								that.p16 =createjs.Sound.play("p16", { volume: 1 });
								setTimeout(() => {
									page.product = true
								}, 900)
							}, 1000)
							break;
						case 12:
							setTimeout(() => {
								page.start = true;
								that.p17 =createjs.Sound.play("p17", { volume: 1 });
								setTimeout(() => {
									page.product = true
								}, 900)
							}, 1000)
							break;
						case 13:
							that.arrow_right = false; //右箭头关闭
							setTimeout(() => {
								page.start = true;
								that.p18 =createjs.Sound.play("p18", { volume: 1 });
								setTimeout(() => {
									page.start = false;
									page.logo = true;
									setTimeout(() => {
										page.btn = true;
									}, 1000)
								}, 4000)
							}, 1000)
							break;
					}
				},
			},
		})
	},
	methods: {
		//判断是否是微信浏览器的函数
		isWeiXin() {
			//window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
			var ua = window.navigator.userAgent.toLowerCase();
			//通过正则表达式匹配ua中是否含有MicroMessenger字符串
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				this.if_wx = true;
				return true;
			} else {
				this.if_wx = false;
				return false;
			}
		},
		stopMusic() {
			this.doorbell ? this.doorbell.stop() : '';
			this.p2 ? this.p2.stop() : '';
			this.p3 ? this.p3.stop() : '';
			this.p4 ? this.p4.stop() : '';
			this.p5 ? this.p5.stop() : '';
			this.p6 ? this.p6.stop() : '';
			this.p7 ? this.p7.stop() : '';
			this.p8 ? this.p8.stop() : '';
			this.p9 ? this.p9.stop() : '';
			this.p10 ? this.p10.stop() : '';
			this.p13 ? this.p13.stop() : '';
			this.p14 ? this.p14.stop() : '';
			this.p15 ? this.p15.stop() : '';
			this.p16 ? this.p16.stop() : '';
			this.p17 ? this.p17.stop() : '';
			this.p18 ? this.p18.stop() : '';
			this.music ? this.music.stop() : '';
			this.p10_voice ? this.p10_voice.stop() : '';
			this.p10_pause ? this.p10_pause.stop() : '';
			this.p10_change ? this.p10_change.stop() : '';
			this.p10_quick ? this.p10_quick.stop() : '';
			this.p11_mama ? this.p11_mama.stop() : '';
			this.p11_doctor ? this.p11_doctor.stop() : '';
			this.p12_jiashiqi ? this.p12_jiashiqi.stop() : '';
			this.p12_tianqi ? this.p12_tianqi.stop() : '';
			this.p12_tonghua ? this.p12_tonghua.stop() : '';
			this.p12_kongtiao ? this.p12_kongtiao.stop() : '';
			this.p12_music ? this.p12_music.stop() : '';
			this.p12_naozhong ? this.p12_naozhong.stop() : '';
		},
		//切换下一页
		slideNext() {
			this.mySwiper.slideNext();
		},
		//切换下一页
		slidePrev() {
			this.mySwiper.slidePrev();
		},
		show_page5_bg2() {
			this.stopMusic();
			this["page5"].show_bg2 = true; //出现第二个背景
			setTimeout(() => {
				this.p7 =createjs.Sound.play("p7", { volume: 1 });
				this["page5"].show_product = true; //出现产品
				setTimeout(() => {
					this.arrow_right = true; //右箭头出现
				}, 2000)

			}, 1000)
		},
		page_8(type) {
			//第八页所有场景
			var scene1 = this.page8.scene1;
			var scene2 = this.page8.scene2;
			var scene3 = this.page8.scene3;
			if(!scene1.if_click_button) return; //按钮锁定就退出
			this.stopMusic();
			var that=this;
			if(type == "button_volume") {
				if(scene1.active_index == 1) {
					scene1.icon_active_index = 0; //初始化播放状态
				}
				scene1.active_index = 1; //改变按钮状态
				scene1.if_click_button = false; //锁定按钮
				time=setTimeout(()=>{
					that.p10_voice=createjs.Sound.play("xiaoyi", { volume: 1 });
					scene1.show_bubble = true; //出现气泡
					scene1.show_sound = true; //音响闪烁(会延迟1秒)
					time=setTimeout(() => {
						scene1.show_sound = false; //停止闪烁
						that.p10_voice=createjs.Sound.play("p10_voice", { volume: 1 }); //音量大一些
						scene1.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene1.icon_active_index = 1; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_pause") {
				if(scene1.active_index == 2) {
					scene1.icon_active_index = 0; //初始化播放状态
				}
				scene1.if_click_button = false; //锁定按钮
				scene1.active_index = 2; //改变按钮状态
				time=setTimeout(()=>{
					that.p10_pause=createjs.Sound.play("xiaoyi", { volume: 1 }); //暂停
					scene1.show_bubble = true; //出现气泡
					scene1.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p10_pause=createjs.Sound.play("p10_pause", { volume: 1 }); //暂停
						scene1.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene1.show_sound = false; //停止闪烁
							scene1.icon_active_index = 2; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_cctv5") {
				if(scene1.show_cctv5) {
					scene1.show_cctv5 = false; //初始化播放状态
				}
				scene1.active_index = 4;
				scene1.if_click_button = false; //锁定按钮
				time=setTimeout(()=>{
					scene1.show_bubble = true; //出现气泡
					that.p10_change=createjs.Sound.play("xiaoyi", { volume: 1 }); //换中央五套
					scene1.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p10_change=createjs.Sound.play("p10_change", { volume: 1 }); //换中央五套
						scene1.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene1.show_sound = false; //停止闪烁
							scene1.icon_active_index = 0; //初始化播放状态图标
							scene1.show_cctv5 = true; //切换中央五套
							scene1.active_index = 4; //初始化播放按钮状态--音量，暂停，快进
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_pseed") {
				if(scene1.active_index == 3) {
					scene1.icon_active_index = 0; //初始化播放状态
				}
				scene1.if_click_button = false; //锁定按钮
				scene1.active_index = 3; //初始化按钮状态
				time=setTimeout(()=>{
					scene1.show_bubble = true; //出现气泡
					that.p10_quick=createjs.Sound.play("xiaoyi", { volume: 1 }); //换中央五套
					scene1.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p10_quick=createjs.Sound.play("p10_quick", { volume: 1 }); //换中央五套
						scene1.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene1.show_sound = false; //停止闪烁
							scene1.icon_active_index = 3; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_mama") {
				//第二个场景开始
				if(scene2.active_index == 1) {
					scene2.show_tv_index = 0; //初始化妈妈视频场景
				}
				scene1.if_click_button = false; //锁定按钮
				scene2.active_index = 1;
				time=setTimeout(()=>{
					scene2.show_bubble = true; //出现气泡
					that.p11_mama=createjs.Sound.play("xiaoyi", { volume: 1 }); //打电话给妈妈
					scene2.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p11_mama=createjs.Sound.play("p11_mama", { volume: 1 }); //打电话给妈妈
						scene2.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene2.show_sound = false; //停止闪烁
							scene2.show_tv_index = 1; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_yisheng") {
				if(scene2.active_index == 2) {
					scene2.show_tv_index = 0; //初始化医生场景
				}
				scene1.if_click_button = false; //锁定按钮
				scene2.active_index = 2;//改变按钮状态
				time=setTimeout(()=>{
					scene2.show_bubble = true; //出现气泡
					that.p11_doctor=createjs.Sound.play("xiaoyi", { volume: 1 }); //我想看医生
					scene2.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p11_doctor=createjs.Sound.play("p11_doctor", { volume: 1 }); //我想看医生
						scene2.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene2.show_sound = false; //停止闪烁
							scene2.show_tv_index = 2; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_jiashiqi") {
				//第三个场景开始
				if(scene3.show_jiashiqi) {
					scene3.show_jiashiqi = false; //关闭加湿器
				}
				scene1.if_click_button = false; //锁定按钮
				scene3.active_index = 5; //改变按钮状态
				time=setTimeout(()=>{
					scene3.show_bubble = true; //出现气泡
					that.p12_jiashiqi=createjs.Sound.play("xiaoyi", { volume: 1 }); //加湿器
					scene3.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p12_jiashiqi=createjs.Sound.play("p12_jiashiqi", { volume: 1 }); //加湿器
						scene3.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene3.show_sound = false; //停止闪烁
							scene3.show_jiashiqi = true; //开启加湿器
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_tianqi") {
				if(scene3.active_index == 1) {
					scene3.icon_active_index = 0; //初始化天气场景
				}
				scene1.if_click_button = false; //锁定按钮
				scene3.active_index = 1;//改变按钮状态
				time=setTimeout(()=>{
					scene3.show_bubble = true; //出现气泡
					that.p12_tianqi=createjs.Sound.play("xiaoyi", { volume: 1 }); //天气
					scene3.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p12_tianqi=createjs.Sound.play("p12_tianqi", { volume: 1 }); //天气
						scene3.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene3.show_sound = false; //停止闪烁
							scene3.icon_active_index = 1; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_tonghua") {
				if(scene3.active_index == 2) {
					scene3.icon_active_index = 0; //初始化童话场景
				}
				scene1.if_click_button = false; //锁定按钮
				scene3.active_index = 2;//改变按钮状态
				time=setTimeout(()=>{
					scene3.show_bubble = true; //出现气泡
					that.p12_tonghua=createjs.Sound.play("xiaoyi", { volume: 1 }); 
					scene3.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p12_tonghua=createjs.Sound.play("p12_tonghua", { volume: 1 }); 
						scene3.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene3.show_sound = false; //停止闪烁
							scene3.icon_active_index = 2; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_kongtiao") {
				if(scene3.show_kongtiao=='./images/page8/scene3/kongtiao_active.png') {
					scene3.show_kongtiao = './images/page8/scene3/kongtiao.png'||false; //初始化空调
				}
				scene1.if_click_button = false; //锁定按钮
				scene3.active_index = 6; //改变按钮状态
				time=setTimeout(()=>{
					scene3.show_bubble = true; //出现气泡
					that.p12_kongtiao=createjs.Sound.play("xiaoyi", { volume: 1 });
					scene3.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p12_kongtiao=createjs.Sound.play("p12_kongtiao", { volume: 1 });
						scene3.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene3.show_sound = false; //停止闪烁
							scene3.show_kongtiao = "./images/page8/scene3/kongtiao_active.png"; //开空调
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_music") {
				if(scene3.active_index == 3) {
					scene3.icon_active_index = 0; //初始化播放音乐场景
				}
				scene1.if_click_button = false; //锁定按钮
				scene3.active_index = 3;//改变按钮状态
				time=setTimeout(()=>{
					scene3.show_bubble = true; //出现气泡
					that.p12_music=createjs.Sound.play("xiaoyi", { volume: 1 });
					scene3.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p12_music=createjs.Sound.play("p12_music", { volume: 1 });
						scene3.show_bubble = false; //气泡消失
						setTimeout(() => {
							that.music=createjs.Sound.play("music", { volume: 1 });
							scene3.show_sound = false; //停止闪烁
							scene3.icon_active_index = 3; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			} else if(type == "button_naozhong") {
				if(scene3.active_index == 4) {
					scene3.icon_active_index = 0; //初始化闹钟场景
				}
				scene1.if_click_button = false; //锁定按钮
				scene3.active_index = 4;//改变按钮状态
				time=setTimeout(()=>{
					scene3.show_bubble = true; //出现气泡
					that.p12_naozhong=createjs.Sound.play("xiaoyi", { volume: 1 });
					scene3.show_sound = true; //音响闪烁
					time=setTimeout(() => {
						that.p12_naozhong=createjs.Sound.play("p12_naozhong", { volume: 1 });
						scene3.show_bubble = false; //气泡消失
						setTimeout(() => {
							scene3.show_sound = false; //停止闪烁
							scene3.icon_active_index = 4; //改变播放状态
							scene1.if_click_button = true; //解锁按钮
						}, 2000)
					}, 2500)
				},1000)
			}
		},
		review() {
			window.location.href = "index.html";
		},
		amazing() {
			// location.href = "http://www.189.cn/";
			// 下载app
			var u = navigator.userAgent;
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if(isiOS){
				location.href="https://itunes.apple.com/cn/app/tian-yi-gao-qing-dian-shi/id1092084634?mt=8";
			}else{
				location.href="http://cdndms.ott4china.com/data/publish/YuemeClient.apk";
			}

		},
		share(){
			this.page14.share=true
		},
		hide(){
			this.page14.share=false
		}
	},
	watch: {
		"music_flag": function(val, oldval) {
			//开启音乐
			if(val) {
				createjs.Sound.muted = false;
			} else {
				createjs.Sound.muted = true;
			}
		},
	}
});
// alert(localStorage.getItem('name'));

function init() {
	var that = this;
	function handleComplete() {
		console.log("完成");
		createjs.Sound.play("bgm", { volume: 0.2, loop: 1000 }); //播放背景音乐
		setTimeout(() => {
			that.slideNext()
		}, 1000)
	}
	//预加载资源
	var queue = new createjs.LoadQueue();
	queue.setMaxConnections(5);
	queue.installPlugin(createjs.Sound);
	queue.on("complete", handleComplete);
	queue.on("progress", progress);
	queue.loadManifest([
		{ id: "bgm", src: "./music/bgm1.mp3" },
		{ src: "./images/page1/bg_white.png" },
		{ src: "./images/page1/bg.png" },
		{ src: "./images/page2/img.png" },
		{ src: "./images/page3/bg_white.jpg" },
		{ src: "./images/page4/bg.jpg" },
		{ src: "./images/page4/bg_scenes.jpg" },
		{ src: "./images/page4/scenes1.jpg" },
		{ src: "./images/page4/scenes2.jpg" },
		{ src: "./images/page4/scenes3.jpg" },
		{ src: "./images/page4/scenes4.jpg" },
		{ src: "./images/page4/scenes5.jpg" },
		{ src: "./images/page5/bg_white.jpg" },
		{ src: "./images/page6/bg_white.jpg" },
		{ src: "./images/page2/bg0.png" },
		{ src: "./images/page2/bg7.jpg" },
		{ src: "./images/page2/prospect_1.png" },
		{ src: "./images/page2/prospect_2.png" },
		{ src: "./images/page2/prospect_3.png" },
		{ src: "./images/page2/prospect_4.png" },
		{ src: "./images/page2/iphone.png" },
		{ src: "./images/page2/text.png" },
		{ src: "./images/page3/wifi_text.png" },
		{ src: "./images/page3/call.png" },
		{ src: "./images/page4/text.png" },
		{ src: "./images/page4/bg2.jpg" },
		{ src: "./images/page4/product.png" },
		{ src: "./images/page4/button.png" },
		{ src: "./images/page4/explain.png" },
		{ src: "./images/page5/text.png" },
		{ src: "./images/page5/button.png" },
		{ src: "./images/page5/bg2.jpg" },
		{ src: "./images/page5/product.png" },
		{ src: "./images/page6/text.png" },
		{ src: "./images/page6/button.png" },
		{ src: "./images/page7/text.png" },
		{ src: "./images/page7/bubble1.png" },
		{ src: "./images/page7/bubble2.png" },
		{ src: "./images/page7/bubble3.png" },
		{ src: "./images/page7/hand.png" },
		{ src: "./images/page8/scene1/bubble.png" },
		{ src: "./images/page8/scene1/tv.png" },
		{ src: "./images/page8/scene1/cctv5.png" },
		{ src: "./images/page8/scene1/volume.png" },
		{ src: "./images/page8/scene1/pause.png" },
		{ src: "./images/page8/scene1/speed.png" },
		{ src: "./images/page8/scene2/bg1.jpg" },
		{ src: "./images/page8/scene2/bg2.jpg" },
		{ src: "./images/page8/scene2/text.png" },
		{ src: "./images/page8/scene2/bubble.png" },
		{ src: "./images/page8/scene3/music_icon.png" },
		{ src: "./images/page8/scene3/bubble.png" },
		{ src: "./images/page8/scene3/kongtiao_active.png" },
		{ src: "./images/page8/scene3/tv.png" },
		{ src: "./images/page8/scene3/tv_tianqi.png" },
		{ src: "./images/page8/scene3/tv_tonghua.png" },
		{ src: "./images/page8/scene3/tv_music.png" },
		{ src: "./images/page8/scene3/tv_naozhong.png" },
		{ src: "./images/page12/1.jpg" },
		{ src: "./images/page12/5.jpg" },
		{ src: "./images/page13/1.jpg" },
		{ src: "./images/page13/4.jpg" },
		{ src: "./images/page13/9.jpg" },
		{ src: "./images/page14/2.jpg" },
		{ src: "./images/music_icon.png" },
		{ src: "./images/page1/music_help.png" },
		{ src: "./images/arrow_right.png" },
		{ src: "./images/arrow_left.png" },
		{ src: "./images/page7/bg.jpg" },
		{ src: "./images/page8/scene1/bg.jpg" },
		{ src: "./images/page8/scene1/button1.png" },
		{ src: "./images/page8/scene1/button2.png" },
		{ src: "./images/page8/scene1/button3.png" },
		{ src: "./images/page8/scene1/button4.png" },
		{ src: "./images/page8/scene1/button1_active.png" },
		{ src: "./images/page8/scene1/button2_active.png" },
		{ src: "./images/page8/scene1/button3_active.png" },
		{ src: "./images/page8/scene1/button4_active.png" },
		{ src: "./images/page8/scene2/bg.jpg" },
		{ src: "./images/page8/scene1/sound.png" },
		{ src: "./images/page8/scene2/button_mama.png" },
		{ src: "./images/page8/scene2/button_yisheng.png" },
		{ src: "./images/page8/scene2/button_mama_active.png" },
		{ src: "./images/page8/scene2/button_yisheng_active.png" },
		{ src: "./images/page8/scene3/bg.jpg" },
		{ src: "./images/page8/scene3/jiashiqi.png" },
		{ src: "./images/page8/scene3/jiashiqi_active.png" },
		{ src: "./images/page8/scene3/button_jiashiqi.png" },
		{ src: "./images/page8/scene3/button_tianqi.png" },
		{ src: "./images/page8/scene3/button_tonghua.png" },
		{ src: "./images/page8/scene3/button_kongtiao.png" },
		{ src: "./images/page8/scene3/button_music.png" },
		{ src: "./images/page8/scene3/button_naozhong.png" },
		{ src: "./images/page8/scene3/button_jiashiqi_active.png" },
		{ src: "./images/page8/scene3/button_tianqi_active.png" },
		{ src: "./images/page8/scene3/button_tonghua_active.png" },
		{ src: "./images/page8/scene3/button_kongtiao_active.png" },
		{ src: "./images/page8/scene3/button_music_active.png" },
		{ src: "./images/page8/scene3/button_naozhong_active.png" },
		{ src: "./images/page12/2.png" },
		{ src: "./images/page12/3.png" },
		{ src: "./images/page12/4.png" },
		{ src: "./images/page12/6.png" },
		{ src: "./images/page13/2.png" },
		{ src: "./images/page13/3.png" },
		{ src: "./images/page13/7.png" },
		{ src: "./images/page13/8.png" },
		{ src: "./images/page13/5.png" },
		{ src: "./images/page13/6.png" },
		{ src: "./images/page13/12.png" },
		{ src: "./images/page13/11.png" },
		{ src: "./images/page13/10.png" },
		{ src: "./images/page13/13.png" },
		{ src: "./images/page14/1.png" },
		{ src: "./images/page14/3.png" },
		{ src: "./images/page14/4.png" },
		{ src: "./images/page14/5.png" },
		{ src: "./images/page14/6.png" },
		{ id: "music", src: "./music/music.mp3" },
		{ id: "doorbell", src: "./music/doorbell.mp3" },
		{ id: "p2", src: "./music/p2.mp3" },
		{ id: "p3", src: "./music/p3.mp3" },
		{ id: "p4", src: "./music/p4.mp3" },
		{ id: "p5", src: "./music/p5.mp3" },
		{ id: "p6", src: "./music/p6.mp3" },
		{ id: "p7", src: "./music/p7.mp3" },
		{ id: "p8", src: "./music/p8.mp3" },
		{ id: "p9", src: "./music/p9.mp3" },
		{ id: "xiaoyi", src: "./music/p10/xiaoyi.mp3" },
		{ id: "p10_voice", src: "./music/p10/p10_voice.mp3" },
		{ id: "p10_pause", src: "./music/p10/p10_pause.mp3" },
		{ id: "p10_change", src: "./music/p10/p10_change.mp3" },
		{ id: "p10_quick", src: "./music/p10/p10_quick.mp3" },
		{ id: "p11_mama", src: "./music/p11/p11_mama.mp3" },
		{ id: "p11_doctor", src: "./music/p11/p11_doctor.mp3" },
		{ id: "p12_jiashiqi", src: "./music/p12/p12_jiashiqi.mp3" },
		{ id: "p12_tianqi", src: "./music/p12/p12_weather.mp3" },
		{ id: "p12_tonghua", src: "./music/p12/p12_story.mp3" },
		{ id: "p12_kongtiao", src: "./music/p12/p12_kongtiao.mp3" },
		{ id: "p12_music", src: "./music/p12/p12_music.mp3" },
		{ id: "p12_naozhong", src: "./music/p12/p12_qichuang.mp3" },
		{ id: "p13", src: "./music/p13.mp3" },
		{ id: "p14", src: "./music/p14.mp3" },
		{ id: "p15", src: "./music/p15.mp3" },
		{ id: "p16", src: "./music/p16.mp3" },
		{ id: "p17", src: "./music/p17.mp3" },
		{ id: "p18", src: "./music/p18.mp3" },
	]);

	//监听加载进度
	function progress(e) {
		that.page1.progress = (queue.progress * 100 | 0);
	}
}

document.body.addEventListener("touchmove", (e) => {
	e.stopPropagation(); //停止冒泡
	e.preventDefault(); //禁止默认行为
})
// document.body.addEventListener("touchstart", (e) => {
// 	e.stopPropagation(); //停止冒泡
// 	e.preventDefault(); //禁止默认行为
// })
// document.body.addEventListener("click", (e) => {
// 	e.stopPropagation(); //停止冒泡
// 	e.preventDefault(); //禁止默认行为
// })

// function audioPlay(audio){
// 	this.audio=audio;
// 	this.audio.setAttribute("loop","true");
// 	this.audio.muted=true;//先关闭声音
// 	this.audio.play();
// 	this.audioConfig={
// 		"1-1":[2000,2013],//名称：开始时间，结束时间
// 		"2-1":[1000,1010],
// 		"3-1":[1350,1360],
// 		"4-1":[3,10],
// 		"5-1":[2,6],
// 	};
// 	this.sectionName='';//当前的音乐段名称
// 	setInterval(()=>{
// 		if(this.sectionName&&this.audio.currentTime>this.audioConfig[this.sectionName][1]){
// 			this.audio.muted=true;//关闭声音
// 			this.sectionName='';
// 		}
// 	},500)
// }
// audioPlay.prototype.play=function(sectionName){
// 	this.sectionName=sectionName;
// 	this.audio.currentTime=this.audioConfig[this.sectionName][0];
// 	setTimeout(()=>{
// 		this.audio.muted=false;//开启声音
// 	},10)
// }
// window.audio=new audioPlay(audio);
// audio.play("3-1");