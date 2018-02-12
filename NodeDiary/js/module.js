var data = {
    '2.2.1': '优先从缓存加载',
    '2.2.2': {
        'name': '路径分析和文件定位',
        'type': [
            '核心模块，如Uhttp、fs、path等',
            '.或..开始的相对路径文件模块',
            '以/开始的绝对路径文件模块',
            '非路径形式的文件模块，如自定义的connect模块']
}


var mult = (function() {
    var cache = {};
    var calculate = function () {
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return a;
    };
    return function () {
        var args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    }
})();

var report = function(src) {
    var img = new Image();
    img.src = src;
};
report('http://xxx.com/getUserInfo');

var extent = function() {
    var value = 0;
    return {
        call: function() {
            value++;
            console.log(value);
        }
    };
}
var extent = extent();
extent.call(); //1
extent.call(); //2
extent.call(); //3


var getScript = getSingle(function() {
    return document.createElement('script');
});

var script1 = getScript();
var script2 = getScript();
alert(script1 === script2);

// 实现AOP
Function.prorotype.before = function(beforefn) {
    var __self = this;
    return function() {
        beforefn.apply(this, arguments);
        return __self.apply(this, arguments);
    }
};

Function.prorotype.after = function(afterfn) {
    var __self = this;
    return function() {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

var func = function() {
    console.log(2);
};
func = func.before(function() {
    console.log(1);
}).after(function() {
    console.log(3);
});
func();

// 计算花费了多少钱
var cost = (function() {
    var args = [];
    return function() {
        if(arguments.length === 0) {
            var money = 0;
            for(var i = 0, l = args.length; i < l; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();

// 通用一点的花费钱数
// 遍历每月每天的开销并求出它们的总和
var currying = function(fn) {
    var args = [];

    return function() {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
};

var cost = (function() {
    var money = 0;

    return function() {
        for(var i = 0,l = arguments.length; i < l; i++) {
            monry += arguments[i];
        }
        return money;
    }
})();

var cost = currying(cost);

Function.prorotype.uncurrying = function() {
    var self = this;
    return function () {
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    };
};

var push = Array.prorotype.push.uncurrying();
(function() {
    push(arguments, 4);
    console.log(arguments);
})(1, 2, 3)

// 函数节流的代码实现
var throttle = function(fn, interval) {
    var __self = fn,
        timer,
        firstTime = true;
    return function () {
        var args = arguments,
        __me = this;

        if (firstTime) {
            __self.apply(__me, args);
            return firstTime = false;
        }

        if(timer) {
            return false;
        }

        timer = setTimeout(function () {
            clearTimeout(timer);
            timer = null;
            __self.apply(__me, args);
        }, interval || 500);
    };
};

window.onresize = throttle(function() {
    console.log(1);
}, 500);

// 分时函数
var timeChunk = function(ary, fun, count) {
    var obj,
        t;
    var len = ary.length;
    var start = function() {
        for(var i = 0; i < Math.min(count || 1, ary.length); i++) {
            var obj = ary.shift();
            fn(obj);
        }
    };

    return function() {
        t = setInterval(function() {
            if(ary.length === 0) {
                return clearInterval(t);
            }
            start();
        }, 200);
    };
};

var addEvent = function(elem, type, handler) {
    if(window.addEventListener) {
        return elem.addEventListener(type, handler, false);
    }
    if(window.attachEvent) {
        return elem.attachEvent('on' + type, handler);
    }
}