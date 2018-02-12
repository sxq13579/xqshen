// 发送socket消息
function sendKey(_key) {
    console.log(_key);
    if (localStorage.getItem("isConnect") == 0) {
        homed.layerMsg('与服务器连接未成功，请刷新页面重试');
    } else {
        pullAndPush.getDstUser(function() {
            var dstuserid = localStorage.getItem('dstuserid'),
                dstdeviceid = localStorage.getItem('dstdeviceid'),
                sessionid = new Date().getTime(),
                str = 'f02|{"actiontype":10103,"srcuserid":' + homed.getUserId() + ',"srcdeviceid":' + homed.getDeviceID() + ',"dstuserid":' + dstuserid + ',"dstdeviceid":' + dstdeviceid + ',"sessionid":"' + sessionid + '","keyvalue":' + _key + '}';
            socket.socketSend(str);
        });
    }
}
/**************************************按键页面*************************************/
//  相关按键的socekt消息
$(".clickkey").on("touchstart", function() {
    var keyNum = this.id;
    if (keyNum.indexOf('num') != -1) {
        // keyNum = Number(keyNum.split('_')[1]) + 7;
        keyNum = Number(keyNum.split('_')[1]) + 48;
    } else {
        keyNum = valueKey[keyNum];
    }
    if (!$(this).hasClass('hand')) {
        $(this).addClass('clicked');
    }
    sendKey(keyNum);
}).on('touchend', function() {
    $(this).removeClass('clicked');
});

// 打开和关闭数字键
$('#open-number').on('click', function() {
    var text = $(this).text();
    if (text === '挄') {
        $('#num-keyboard').show();
        $(this).text('憗');
    } else {
        $('#num-keyboard').hide();
        $(this).text('挄');
    }
    // $('#num-keyboard').toggle();
});
/**************************************选台页面*************************************/
// 直播推屏
var pushScreenLive = function(channelid) {
    console.log(channelid)
    pullAndPush.getDstUser(function() {
        var dstuserid = localStorage.getItem('dstuserid'),
            dstdeviceid = localStorage.getItem('dstdeviceid'),
            sessionid = new Date().getTime(),
            str = 'f02|{"actiontype":10102,"srcuserid":' + homed.getUserId() + ',"srcdeviceid":' + homed.getDeviceID() + ',"srchomeid":' + homed.getHomeId() +
            ',"dstuserid":' + dstuserid + ',"dstdeviceid":' + dstdeviceid + ',"dsthomeid":' + homed.getHomeId() + ',"sessionid":"' + sessionid + '","playmode":"http"' +
            ',"playstatus":1,"parameter":[{"channelid":' + channelid + '}] }';

        console.log('why should I bind a family!', dstuserid, dstdeviceid, sessionid, channelid);
        socket.socketSend(str);
    });
};
// 获取電視臺類型的id
// http://slave.homed.me/homed/programtype/get_list?accesstoken={}[&userid={}]&label={}[&depth={}][&vcontrol={}][postersize={}]
var getVideoId = function() {
    $.ajax({
        url: 'http://portalsuma.hrtn.net:8080/PortalServer-App/new/ptl_ipvp_live_live003',
        type: 'get',
        data: {
            ptype: 8,
            plocation: 430001,
            puser: 867905025114044,
            ptoken: 867905025114044
        },
        success: function(res) {
            let channelHtml = '<li><span class="selected">全部</span></li>'
            console.log(JSON.parse(res))
            let tmp = JSON.parse(res)
            for (let item of tmp.data.liveCategoryList) {
                console.log(item)
                channelHtml += `<li id="${item.categoryID}"><span>${item.categoryName}</span></li>`
            }
            $('#sel-tation').html(channelHtml)
            getStationList(0)
        }
    })
};
//获取相应电视台列表
var getStationList = function(number) {
    $.ajax({
        url: 'http://portalsuma.hrtn.net:8080/PortalServer-App/new/ptl_ipvp_live_live005',
        type: 'get',
        data: {
            ptype: 8,
            plocation: 430001,
            puser: 867905025114044,
            ptoken: 867905025114044,
            pversion: 1,
            pserverAddress: 1,
            pserialNumber: '',
            channelID: '',
            categoryID: number
        },
        success: function(res) {
            console.log(JSON.parse(res))
            let data = JSON.parse(res).data.channelInfos
            var listHtml = '';
            for (let item of data) {
                let image = ''
                console.log(item.imageUrl[0])
                for (let ele in item.imageUrl[0]) {
                    image = item.imageUrl[0][ele]
                }
                listHtml += `<li id="${item.channelID}"><img src="${image}"><span>${item.channelName}</span></li>`;
            }
            $('#station-list').html(listHtml);
        }
    })
};
//遥控器选台播放
$('#sel-tation').on('click', 'li', function() {
    $('#sel-tation span').removeClass('selected');
    $(this).find('span').addClass('selected');
    return getStationList(this.id);
});
/**************************************手势页面*************************************/
// 给页面可滚动元素加上标记
var overscroll = function(el) {
    el.addEventListener('touchstart', function() {
        var top = el.scrollTop,
            totalScroll = el.scrollHeight,
            currentScroll = top + el.offsetHeight;
        if (top === 0) {
            el.scrollTop = 1;
        } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1;
        }
    });
    el.addEventListener('touchmove', function(evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if (el.offsetHeight < el.scrollHeight)
            evt._isScroller = true;
    });
};
// 初始化手势页面的canvas
function initPaint(vessel, canvas) {
    var $direction = $('#' + vessel),
        $canvas = $("#" + canvas),
        canvasW = $direction.width(),
        canvasH = $direction.height(),
        canvasT = $direction.offset().top,
        headH = $('.header').height();

    // 动态设置canvas宽高
    $canvas.attr('width', canvasW).attr('height', canvasH);
    // 画布对象
    var _canvas = document.getElementById(canvas),
        context = _canvas.getContext("2d");
    var gradient = context.createRadialGradient(canvasW / 2, (canvasH + canvasT) / 2, 20, canvasW / 2, (canvasH + canvasT) / 2, 300);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, '#018de4');
    // 线条样式
    context.strokeStyle = gradient;
    context.lineWidth = 10;

    var array_paint = [],
        current_x = 0,
        current_y = 0,
        paint = function() {
            context.beginPath();
            context.moveTo(array_paint[0][0], array_paint[0][1]);
            if (array_paint.length == 1)
                return;
            else {
                var i = 1;
                for (i in array_paint) {
                    context.lineTo(array_paint[i][0], array_paint[i][1]);
                    context.moveTo(array_paint[i][0], array_paint[i][1]);
                }
            }
            context.closePath();
            context.stroke();
        };

    //判断鼠标是否按下
    var m_down = false,
        touchStartTime = 0, // 触摸开始时间
        clickTimeOut = null, // 单击延迟处理定时器
        wait = null;

    // 画布事件绑定
    $canvas.on('touchstart', function(event) {
        clearTimeout(wait);
        m_down = true;
        touchStartTime = new Date().getTime();
        current_x = event.originalEvent.changedTouches[0].clientX;
        current_y = event.originalEvent.changedTouches[0].clientY - canvasT;
        array_paint.push([current_x, current_y]);
        paint();
    }).on('touchend', function(event) {
        m_down = false;
        var len = array_paint.length;
        // 触摸结束，触点只有一个时
        if (len <= 1) {
            clickTimeOut = setTimeout(function() {
                console.log('click');
                sendKey(23);
            }, 500);
            array_paint = [];
            return context.clearRect(0, 0, canvasW, canvasH);
        }

        // x,y方向的偏移量
        var deviationX = 0,
            deviationY = 0,
            way = '',
            currWayX = 0; // 当前线路水平朝向(0:无,1:左,2:右)

        // 总偏移量
        var allDeviationX = array_paint[len - 1][0] - array_paint[0][0],
            allDeviationY = array_paint[len - 1][1] - array_paint[0][1],
            absDX = Math.abs(allDeviationX),
            absDY = Math.abs(allDeviationY);

        if (absDX < absDY && canvas == 'direction') {
            if (allDeviationY < 0) {
                console.log('top');
                // sendKey(19);
                sendKey(1);
            } else {
                console.log('bottom');
                // sendKey(20);
                sendKey(2);
            }
        } else if (absDX > absDY && canvas == 'direction') {
            if (allDeviationX < -20) {
                console.log('left');
                // sendKey(21);
                sendKey(3);
            } else if (allDeviationX > 20) {
                console.log('right');
                // sendKey(22);
                sendKey(4);
            }
        } else {
            if (allDeviationX < -20) {
                console.log('sub valume');
                sendKey(25);
            } else if (allDeviationX > 20) {
                console.log('add valume');
                sendKey(24);
            }
        }

        array_paint = [];
        wait = setTimeout(function() {
            context.clearRect(0, 0, canvasW, canvasH);
        }, 100);
    }).on('touchmove', function(event) {
        if (m_down) {
            current_x = event.originalEvent.changedTouches[0].clientX;
            current_y = event.originalEvent.changedTouches[0].clientY - canvasT;
            array_paint.push([current_x, current_y]);
            paint();
        }
    });
};

window.onload = function() {
    //初始化标题
    homed.initTitle({
        title: '遥控器'
    })
    $('#cover').hide();
    $('.content').css('visibility', 'visible')
    $('.animate').hide();
    // 獲取各個頻道類型的id
    getVideoId();
    if ($('.active').attr('id') == 'handshow') {
        // 初始化手势页面
        initPaint('canvas-one', 'direction');
        initPaint('canvas-two', 'volume');
    }
    // 设置可滚动模块
    overscroll(document.querySelector('#handshow'));
    //选择标签页
    $('#type').on('click', 'li', function() {
        var itemId = this.id;
        $('.active').removeClass('active');
        $(this).addClass('active');
        $('.' + itemId).siblings('.show-page').hide();
        $('.' + itemId).show();
        if (itemId == 'handshow') {
            initPaint('canvas-one', 'direction');
            initPaint('canvas-two', 'volume');
        }
    });
    // body上绑定touchmove，让其他所有touchmove事件冒泡到body上
    // 如果当前元素没设置可滚动标记阻止其行为
    $('.handshow').on('touchmove', function(evt) {
        if (!evt._isScroller) {
            evt.preventDefault();
        }
    });
    // 选择电视台
    $('#station-list').on('click', 'li', function() {
        pushScreenLive(this.id);
        // pushScreenBunch(this.id, (new Date()).getTime());
    });
};