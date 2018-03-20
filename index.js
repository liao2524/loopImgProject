$(document).ready(function() {
	
	createIndexData();
	console.log(loopEntrylist);
	addTag(loopEntrylist);
	roll();
});



var categoryArrs = ['商业','游戏','设计','城市','智能','娱乐'];

var descArrays = [
"两大浏览器将停止自动播放视频，这对广告行业有什么影响？",
"这套可移动的模块化单元房，可作图书馆也可作住宅",
"日本小镇特产走出大山，靠的是一座废料搭起来的酿酒厂",
"沃尔玛引入扫描货架机器人，速度比人类快三倍",
"美图投资的 Faceu 完成新一轮融资，也说要做社交",
"「这世界」130 年了，千克的定义要变了"
];

var rollImgArrays = [
"http://img.qdaily.com/article/banner/20180313215322iDSEY6M3hB1pT0co.jpg?ima…!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1",
"http://img.qdaily.com/article/banner/201803130838222V3NDQjTehAcau9p.jpg?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1",	
"http://img.qdaily.com/article/banner/20180313161217Q3hG2OreRDsmgUtS.jpg?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1",	
"http://img.qdaily.com/article/article_show/20180307164359xKJ74Mt8zBs0AFrp.jpg?imageMogr2/auto-orient/thumbnail/!1200x380r/gravity/Center/crop/1200x380/quality/85/format/jpg/ignore-error/1",	
"http://img.qdaily.com/article/banner/20180314144226EMPCIULdw2NYrkJH.jpg?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/quality/85/format/jpg/ignore-error/1"];

function LoopEntry(){

}

LoopEntry.prototype = {
	imgUrl:"",
	category:"",
	desc:""
};

var loopEntrylist = new Array();
function addTag(loopEntrylist) {
	for (var i = 0; i < loopEntrylist.length; i++) {
		var rolldata = loopEntrylist[i];
		addRollData(rolldata);
	}
}
function createIndexData(){
	for(var i=0; i<5; i++){
		var loopEntry = new LoopEntry();
		loopEntry.category = categoryArrs[i];
		loopEntry.desc = descArrays[i];
		loopEntry.imgUrl = rollImgArrays[i];

		loopEntrylist.push(loopEntry);
	}
}

function addRollData(rolldata) {
    var $rollDiv = $('.roll-list');
    var rollSide = '<div class="roll-slide">'+
    					'<img src="'+ rolldata.imgUrl +'" alt="（暂时没有）图片描述">'+
                    	' <div class="roll-text">'+
                    		'<span>'+rolldata.category+'</span>'+
                                '<h3>'+
                                    '<span>'+rolldata.desc+'</span>'+
                                '</h3>'+
                        '</div>'+
                    '</div>';
    $rollDiv.append(rollSide);
}


//轮播图相关运动
function roll() {                               
    var liIndex = 0;
    var clone = $(".roll-slide").first().clone();//克隆第一张图片
    $(".roll-list").append(clone);//复制到列表最后
    var size = 6;  //多少个li
    //指示原点光标
    for (var j = 0; j < size-1; j++) {
        $(".roll-content .num").append("<li></li>");
    }

    $(".roll-content .num li").first().addClass("active");
 
    /*自动轮播*/

    var t = setInterval(function () { liIndex++; move();},2000);

    /*鼠标悬停事件*/

    $(".roll-content").hover(function () {
        clearInterval(t);//鼠标悬停时清除定时器
    }, function () {
        t = setInterval(function () { liIndex++; move(); }, 2000); //鼠标移出时清除定时器
    });


    /*鼠标滑入原点光标事件*/

    $(".roll-content .num li").hover(function () {

        var index = $(this).index();//获取当前索引值
        liIndex = index;
        $(".roll-list").stop().animate({ left: -index * 755 }, 500);
        $(this).addClass("active").siblings().removeClass("active");
    });



    /*向左按钮*/
    $(".roll-content .btn-l").click(function () {
        prevItem();
    });

    
    /*向右按钮*/
    $(".roll-content .btn-r").click(function () {
        nextItem();
    });
    function prevItem() {
        liIndex--;
        move();
    }
    function nextItem() {
        liIndex++;
        move();
    }

    /*移动事件*/
    function move() {
        if (liIndex == size) {  
            $(".roll-list").css({ left: 0 });
            liIndex = 1;
        }
        if (liIndex == -1) {
             $(".roll-list").css({ left : -(size - 1) * 755 });
            liIndex = size - 2;
        }
        $(".roll-list").stop().animate({ left: -liIndex * 755 }, 500);

        if (liIndex == size - 1) {
            $(".roll-content .num li").eq(0).addClass("active").siblings().removeClass("active");
        } else {
            $(".roll-content .num li").eq(liIndex).addClass("active").siblings().removeClass("active");
        }
    }

    //鼠标摁下移动操作
    var moveX = 0;
    var downX = 0;
    $('.roll-list').mousedown(function(e){
        var leftX = parseInt($(".roll-list").css("left"));
        downX = e.pageX;

        // downX = e.offsetX;
        moveX = downX;
        $('.roll-list').bind('mousemove', function(e) {
            // moveX = e.offsetX;
            moveX = e.pageX;
            var endX = moveX-downX+leftX;
            // alert(endX);
            $(".roll-list").css("left",endX);   
        });
    return false;
    });
    $('.roll-list').mouseup(function() {
        var distanceX = moveX-downX;
        if(distanceX>=-100&&distanceX<=-20){
            move();
        }
        if (distanceX>20&&distanceX<=100) {
            move();
        }
        if (distanceX>100) {
            prevItem(); 
        }
        if (distanceX<-100) {
            nextItem(); 
        }
        $('.roll-list').unbind('mousemove');
    });
    $('.roll-list').mouseover(function() {
        move();
        $('.roll-list').unbind('mousemove');
    });
}