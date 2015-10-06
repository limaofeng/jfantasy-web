$(document).ready(function() {
	$(window).resize(function() {
		resizeContainer();
	});
	window.setInterval(function() {
		resizeIframe();
	}, 500);
	//上栏收缩
	$("#north-seperate .icon-h").click(function() {
		var northStatus = $(this).data("northStatus");
		if (!northStatus) {
			$(this).addClass("icon-bottom");
			northHeight = $("#north").height();
			$("#north").height(0);
			$("#north").hide();
		} else {
			$(this).removeClass("icon-bottom");
			$("#north").height(northHeight);
			$("#north").show();
		}
		$(this).data("northStatus",!northStatus);
		resizeContainer();
	});
	// 左栏收缩
	$("#east-seperate .icon-v").click(function() {
		var eastStatus = $(this).data("eastStatus");
		if (!eastStatus) {
			$(this).addClass("icon-right");
			eastWidth = $("#east").width();
			$("#east").css("width", "0px");
			$("#east").hide();
		} else {
			$(this).removeClass("icon-right");
			$("#east").width(eastWidth);
			$("#east").show();
		}
		$(this).data("eastStatus",!eastStatus);
		resizeContainer();
	});
	// 全屏控制
	$("#full_screen_btn").click(function() {
		var fullScreenStatus = $(this).data("fullScreenStatus")==null?true:$(this).data("fullScreenStatus");
		if (fullScreenStatus === true) {
			$(this).attr('title', '退出全屏');
			if(!$("#east-seperate .icon-v").data("eastStatus")){
				$("#east-seperate .icon-v").click();
			}
			if(!$("#north-seperate .icon-h").data("northStatus")){
				$("#north-seperate .icon-h").click();
			}
		} else {
			$(this).attr('title', '全屏');
			if($("#east-seperate .icon-v").data("eastStatus")){
				$("#east-seperate .icon-v").click();
			}
			if($("#north-seperate .icon-h").data("northStatus")){
				$("#north-seperate .icon-h").click();
			}
		}
		$(this).data("fullScreenStatus",!fullScreenStatus);
	});
	$("#btn_tabs_prev").click(function() {
		var index = $("#menubar_tabs").find(".currenttab").parent().index();
		if(index==0){
			$.msgbox( {
				msg : "已经是第一页了",
				icon : "warning"
			});
		}else{
			$($("#menubar_tabs").children("h3").get(index-1)).find("a").click();
		}
	});
	$("#btn_tabs_next").click(function() {
		var index = $("#menubar_tabs").find(".currenttab").parent().index();
		var length = $("#menubar_tabs").children("h3").length;
		if(index==(length-1)){
			$.msgbox( {
				msg : "已经是最后一页了",
				icon : "warning"
			});
		}else{
			$($("#menubar_tabs").children("h3").get(index+1)).find("a").click();
		}
	});
	
	var urlFilter = function(url) {
		return Fantasy.urlFilter(url);
	};
	
	//菜单栏管理器
	var viewIframe = $('#westIframe').view().on("remove",function(data){
		layoutManager.remove(data.id);
	}).on("add",function(data){
		this.target.attr('id',"mainIframe_"+data.id);
		this.target.attr('name',"mainIframe_"+data.id);
		this.target.attr('src',urlFilter(data.value));
        add_loader();
		this.target.load(function(){
			var _window = this.contentWindow;
			//更新window
			window.layoutManager.updateWindow(data.id,_window);
			//为子窗口添加origin属性,该属性有重载问题,如果来源页面重载之后不能获取最新的window对象,所以如如果不确定来源是否会刷新请使用layoutManager.getWindow方法
			_window.layoutManager = Fantasy.copy({origin:data.origin},window.layoutManager);
			//修改添加方法
			_window.layoutManager.addWindow = (function(_addWindow){
				return function(){
					if (arguments.length == 3) {
						_addWindow.apply(window, Array.prototype.concat.apply(Array.prototype.slice.call(arguments),[ _window ]));
					} else {
						_addWindow.apply(window, arguments);
					}
				};
			})(_window.layoutManager.addWindow);
			//修改关闭方法
			_window.layoutManager.close = (function(_close){
				return function(){
					if(arguments.length == 0){
						_close.apply(window,[data.id]);
					}else{
						_close.apply(window,arguments);
					}
				};
			})(_window.layoutManager.close);
			//修改显示方法
			_window.layoutManager.show = (function(_show){
				return function(){
					if(arguments.length == 0){
						_show.apply(window,[data.id]);
					}else{
						_show.apply(window,arguments);
					}
				};
			})(_window.layoutManager.show);
            remove_loader();
		});
		this.show = function(){
			$("#west iframe",document).hide();
			$("#mainIframe_"+data.id).show();
			/*
			if(url){
				document.getElementById(iframeId).src = url;
			}*/
		};
	});
	//选项卡
	window._tabs_view = $('#menubar_tabs').view().on("remove",function(data){
		var odata = viewIframe.find("id",data.id);
		viewIframe.remove(odata.getIndex());
	}).on('add',function(data){
		var zhis = this;
		this.target.children("a").attr('id',"tab_"+data.id).data("_view_element",zhis);
		var iframe = viewIframe.add(data);
		this.target.children("a").click(function(){//菜单栏
			zhis.show();
			return false;
		});
		this.target.find('.b_gray').click(function(event){//菜单栏关闭
			zhis.close();
			if (event && event.stopPropagation) {
				event.stopPropagation();
			} else {
				window.event.cancelBubble = true;
			}
		});
		if(data.close == false){
			this.target.find('.b_gray').remove();
			this.target.find('a').html(data.text+'&nbsp;&nbsp;&nbsp;').addClass("index-nav");
		}
		this.show = function(type){
//			if($('#tab_'+data.id).hasClass('currenttab'))
//				return;
			$('#menubar_tabs').find('.currenttab').removeClass("currenttab");
			zhis.target.children("a").addClass("currenttab");
			//重置上栏
			var ischange = false;
			if(type!='top'){
				if(!data.topData){
					var _top = _nav_top_view.find('id',data.id);
					ischange = _top && _top.show('tab');
				}else{
					ischange = _nav_top_view.find('id',data.topData.id).show('tab');
				}
			}
			//重置左栏
			if((type!='left'&&ischange)||type=='top'){
				if(!data.topData){
					$('#east').view().setJSON(data.children);
				}else{
					$('#east').view().setJSON(data.topData.children);
				}
			}
			//重置iframe
			iframe.show();
			//选中左栏
			$("#east").find(".select").removeClass("select");
			$("#menu_"+data.id).addClass("select");
		};
		this.close = function(){
			// 判断要关闭的tab是否是当前tab
			var close_tab = _tabs_view.find("id",data.id);
			var tab = close_tab.target;
			if (tab.find('a').hasClass("currenttab")) {
				var p = tab.next();
				if (!p || p.length == 0) {
					p = tab.prev(); // 存在后一个
				}
				if (p && p.length != 0) {
					$(p).find("a").click();
				}
			}
			_tabs_view.remove(close_tab.getIndex());
		};
	});

	var getFirstMenu = function(data){
		if(!!data.children){
			return getFirstMenu(data.children[0]);
		}
		return data;
	};

	//导航栏
	var _nav_top_view = $("#nav_top").view().on('add',function(data){//主菜单
		var zhis = this;
		this.target.children("a").attr("id","menu_"+data.id);
		this.target.children("a").attr('href',urlFilter(data.value)).click(function() {//添加二级菜单
			zhis.show();
			return false;
		});
		this.show = function(type){
			var _data = data;
			if(!_data.value)//如果未配置，选择第一个菜单
				_data = getFirstMenu(data);
			if(_data.value.startsWith("script:")){
				_data = eval("(data."+data.value.replace("script:")+")");
			}
			var nochange = $('#menu_'+data.id).hasClass('select') && $('#menu_'+data.id).hasClass('cur');
			if(nochange)
				return false;
			$("#nav_top").find("a").removeClass("select").removeClass("cur");
			zhis.target.find("a").addClass("select").addClass("cur");
			if(type!='tab' && !!data.value){
				var tab = $('#menubar_tabs').view().find('id',_data.id);
				if(!tab){
					tab = $('#menubar_tabs').view().add(_data);
				}
				tab.show('top');
			}else{
				$('#east').view().setJSON(data.children);
			}
			return true;
		};
		if(data.id==0){
			this.target.children("a").addClass("nav_home");
		}
	});
	//左栏菜单
	var _east_view = $('#east').view().on('add',function(data){
		this.target.find("h2>a").attr("id","menu_"+data.id);
		var template = this.target.children(".children-menu").find('.children-template').html();
		this.target.children(".children-menu").find('.children-template').html(template.replace(/\[([\S\s]+)\]/g,"\{$1\}"));
		//二级菜单的折叠效果
		this.target.find("h2").toggle(function() {
			$(this).next("ul").hide();
			$(this).children("a").css("background-position", "15px -33px");
		}, function() {
			$(this).next("ul").show();
			$(this).children("a").css("background-position", "15px 6px");
		});
		//三级菜单
		this.target.children(".children-menu").view({templateClass:'children-template'}).on("add",function(data){//添加三级菜单
			var zhis = this;
			this.target.children("a").attr("id","menu_"+data.id);
			this.target.children("a").attr('href',urlFilter(data.value)).unbind('click').click(function() {
				zhis.show();
				return false;
			});
			this.show = function(isShowTab){
				if(zhis.target.find("a").hasClass("select"))
					return;
				$("#east").find("ul").children("li").children("a").removeClass("select");
				$("#menu_"+data.id).addClass("select");
				var tab = $('#menubar_tabs').view().find('id',data.id);
				(!tab?$('#menubar_tabs').view().add(data):tab).show('left');
			};
		}).setJSON(data.children);
	});
	window._globalMenus = {};
	//数据过滤
	var datafilter = function(menus,topData){
		menus.each(function(){
			if(topData){
				this.topData = topData;
				if(!!this.children){
				datafilter(this.children,topData);
				}
			}else{
				if(!!this.children){
					datafilter(this.children,this);
				}
			}
			_globalMenus[this.id] = this;
		});
		return menus;
	};
	//加载菜单
	$("#nav_top").view().setJSON(datafilter(menu));
	
	resizeContainer();
	//显示首页
	$('#menu_'+defaultShowMenuId).click();
});

window.layoutManager = (function(){
	
	var _windows = {};
	
	return {
		
		showHome : function() {
			$('.nav_home').click();
		},
		
		getWindow : function(id){
			return _windows[id];
		},
		
		updateWindow :function(id,win){
			_windows[id] = win;
		},
		
		addWindow : function(id,title,url,win){
			var data,tbl,currenttab = $('.currenttab',$("#menubar_tabs"));
			if($.isPlainObject(id)){
				data = id;
			}else{
				if(currenttab.length>0){
					tbl = currenttab.data('_view_element');
				}
				data = {id:id,text:title,url:url,origin:win};
				data.topData = tbl.getData().topData;
			}
			var _tab = _tabs_view.find('id',data.id);
			if(!_tab){
				_tab = _tabs_view.add(data);
			}
			_tab.show();
		},
		
		close : function(tabId){
			if(tabId){
				$('#tab_'+tabId).find('.b_gray').click();
			}else{
				var iframe = $("#west").find("iframe:visible");
				$('.currenttab',$('#menubar_tabs')).find('.b_gray').click();
			}
		},
		
		show : function(id){
			$('#tab_'+id).click();
		},
		
		remove : function(id){
			delete _windows[id];
		},
		
		getMenu : function(id){
			return _globalMenus[id];
		},

		on: function(event,callback){
			console.log(event);
			callback();
		}
		
	};
})();


function resizeIframe() {
	var allIframes = document.getElementsByTagName('iframe');
	for ( var i = 0; i < allIframes.length; i++) {
		var iframe = allIframes[i];
		if ($(iframe).css('display') == 'inline') {
			var height = $(iframe).contents().find("body").height();
			if (height < 900) {
				$("#east").height(900);
				$("#east-seperate").height(900);
			} else {
				$("#east").height(height + 120);
				$("#east-seperate").height(height + 120);
			}
			$(iframe).css('height',document.documentElement.clientHeight - ($('#north').innerHeight() + $('#north-seperate').innerHeight() + $('#menubar').innerHeight() + 7));
		}
	}
}

function resizeContainer() {
	var wheight = $(window).height();
	var northH = $("#north").height();
	// 最后的6是分割线的高度
	var h = wheight - northH - 6;
	$("#east").height(h);
	$("#west").height(h);
	var menuBarH = $("#menubar").height();
	$("#east-seperate").height(h);
	var wwidth = $(window).width();
	var eastW = parseInt($("#east").css("width").replace("px", ""));//$("#east").width();
	// 最后的5是分割线的高度
	var w;
	// IE6乃万恶之源
	if ($.browser.msie && parseInt($.browser.version) <= 6) {
		w = wwidth - eastW - 16;
	} else {
		w = wwidth - eastW - 6 - 1;//TODO 少1px firefox 有问题
	}
	$("#west").width(w);
}