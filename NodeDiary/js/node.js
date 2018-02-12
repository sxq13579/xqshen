// Javascript的一个典型弱点就是位运算。
// 前提：
// GYP项目生成工具。
// V8引擎C++库。
// libuv库。
// Node内部库。
// 其他库。

// JavaScript可信么快主要扮演的职责有两类：一类作为C/C++内建模块的封装层和桥接层，供文件模块调用；一类是纯粹的功能模块，它不需要跟底层打交道，但是又十分重要。

fs.open = function(path, falgs, mode, callback) {
    binding.open(pathModule._makeLong(path),
        stringToFlags(flags),
        mode,
        callback);
};
// fs.open()的作用是根据指定路径和参数去打开一个文件，从而得到一个文件描述符，这是后续所有I/O操作的初始操作。
// 从前面的代码中可以看到，JavaScript层面的代码通过调用C++核心模块进行下层的操作。

// 非I/O的异步API：setTimeout()、setInterval()、setImmediate()、process.nextTick()
process.nextTick = function(callback) {
    if (process._exiting) return;

    if (tickDepth >= process.maxTickDepth)
        maxTickWarn();
    var tock = { callback: callback };
    if (process.domain) tock.domain = process.domain;
    nextTickQueue.push(tock);
    if (nextTickQueue.length) {
        process._needTickCallback();
    }
};

// process.nextTick()属于idle观察者，setImmediate()属于check观察者。
// 在每一轮循环检查中，idle观察者先于I/O观察者，I/O观察者先于check观察者。

// 高阶函数在Javascript中比比皆是，其中ECMAScript5中提供的一些数组方法(
//     forEach()、map()、reduce()、reduceRight()、filter()、every()、some())十分典型。

var toString = Object.prototype.toString;

var isString = function(obj) {
    return toString.call(obj) == '[object String]';
};
var isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
}
var after = function(times, callback) {
    var count = 0,
        results = {};
    return function(key, value) {
        results[key] = value;
        count++;
        if (count === times) {
            callback(results);
        }
    };
};

var done = after(times, render);

var emmitter = new events.Emmitter();
var done = after(times, render);

emmitter.on('done', done);
emmitter.on('done', other);

fs.readFile(template_path, 'utf-8', function(err, template) {
    emmitter.emit('done', 'template', template);
});
db.query(sql, function(err, data) {
    emitter.emit('done', 'data', data);
});
l10n.get(function(err, resource) {
    emitter.emit('done', 'resource', resource);
});

// EventProxy的异常处理
exports.getContent = function(callback) {
    var ep = new EventProxy();
    ep.all('tpl', 'data', function(tpl, data) {
        callback(null, {
            template: tpl,
            data: data
        });
    });
    ep.bind('error', function(err) {
        ep.Unbind();
        callback(err);
    });
    fs.readFile('template.tpl', 'utf-8', function(err, content) {
        if (err) {
            return ep.emit('error', err);
        }
        ep.emit('tpl', content);
    });
    db.get('some sql', function(err, result) {
        if (err) {
            return ep.emit('error', err);
        }
        ep.emit('data', result);
    });
};

exports.getContent = function(callback) {
    var ep = new EventProxy();
    ep.all('tpl', 'data', function(tpl, data) {
        callback(null, {
            template: tpl,
            data: data
        });
    });
    ep.fail(callback);

    fs.readFile('template.tpl', 'utf-8', ep.done('tpl'));
    db.get('some sql', ep.done('data'));
}

// Promise/Defferred模式是一种先执行异步调用，延迟传递处理的方式
// Promise/A 提议对单个异步操作做出了这样的抽象定义，具体如下所示
// 1、Promise操作只会处于3种状态的一种：未完成态、完成态和失败态
// 2、Promise的状态只会出现从未完成态向完成态或失败态转化，不能逆反。完成态和失败态不能互相转化。
// 3、Promise的状态一旦转化，将不能被更改。

var Promise = function() {
    EventEmitter.call(this);
};
Util.inherts(Promise, EventEmitter);

Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    if (typeof fulfilledHandler === 'function') {
        this.once('success', fulfilledHandler);
    };
    if (typeof errorHandler === 'function') {
        this.once('errpr', errorHandler);
    };
    if (typeof progressHandler === 'function') {
        this.on('progress', progressHandler);
    }
    return this;
}

res.setEncoding('utf8');
res.on('data', function(chunk) {
    console.log('BODY:' + chunk);
});
res.on('end', function() {
    //Done
});
res.on('error', function(err) {
    //Error
});
res.then(function() {
    //Done
}, function(err) {
    //Error
}, function(chunk) {
    console.log('BODY:' + chunk);
});

var primidify = function(res) {
    var deferred = new Deferred();
    var result = '';
    res.on('data', function(chunk) {
        result += chunk;
        deferred.progress(chunk);
    });
    res.on('end', function() {
        deferred.reject(err);
    });
    return deferred.promise;
}

// Q模块是Promise/A规范的一个实现，可以通过npm install q进行安装使用
defer.prototype.makeNodeResolver = function() {
    var self = this;
    return function(error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    }
}
var readFile = function(file, encoding) {
    var deferred = 0. defer();
    fs.readFile(file, encoding, deferred.makeNodeResolver());
    return deferred.promise;
};
readFile('foo.txt', 'utf-8').then(function(data) {
    // Success case
}, function(err) {
    //Failed case
});

Deferred.prototype.all = function(promises) {
    var count = promises.length;
    var that = this;
    var results = [];
    promises.forEach(function(promise, i) {
        promise.then(function(data) {
            count--;
            results[i] = data;
            if (count === 0) {
                that.resolve(results);
            }
        }, function(err) {
            that.reject(err);
        });
    })
    return this.promise;
}

var emitter = new event.Emitter();
emitter.on('step1', function() {
    obj.api1(function(value1) {
        emitter.emit('step2', value1);
    });
});
emitter.on('step2', function(value1) {
    obj.api2(value1, function(value2) {
        emitter.emit('step3', value2);
    });
});
emitter.on('step3', function(value2) {
    obj.api3(value2, function(value3) {
        emitter.emit('step4', value3);
    });
});
emitter.on('step4', function(value3) {
    obj.api4(value3, function(value4) {
        callback(value4);
    });
});
emitter.emit('step1');

promise()
    .then(obj.api1)
    .then(obj.api2)
    .then(obj.api3)
    .then(obj.api4)
    .then(function(value4) {
        //Do something with value4
    }, function(error) {
        // Handler any error from step1 through step4
    })
    .done();

var Defferred = function() {
    this.promise = new Promise();
};
// 完成态
Deferred.prorotype.resolve = function(obj) {
    var promise = this.promise;
    var handler;
    while ((handler = promise.queue.shift())) {
        if (handler && handler.fulfilled) {
            var ret = handler.fulfilled(obj);
            if (ret && ret.isPromise) {
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
};
Deferred.prototype.reject = function(err) {
    var promise = this.promise;
    var handler;
    while ((handler = promise.queue.shift())) {
        if (handler && handler.error) {
            var ret = handler.error(err);
            if (ret && ret.promise) {
                ret.queue = promise.queue;
                this.promise = ret;
                return;
            }
        }
    }
};
// 生成回调函数
Deferred.prorotype.callback = function() {
    var that = this;
    return function(err, file) {
        if (err) {
            return that.reject(err);
        }
        that.resolve(file);
    };
};
var Promise = function() {
    this.queue = [];
    this.isPromise = true;
};
Promise.prototype.then = function(fulfilledHandler, errorHandler, progressHandler) {
    var handler = {};
    if (typeof fulfilledHandler === 'function') {
        handler.fuifilled = fuifilledHandler;
    }
    if (typeof errorHandler === 'function') {
        handler.error = errorHandler;
    }
    this.queue.push(handler);
    return this;
};
var readFile1 = function(file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
};
var readFile2 = function(file, encoding) {
    var deferred = new Deferred();
    fs.readFile(file, encoding, deferred.callback());
    return deferred.promise;
};
readFile('file.txt', 'utf8').then(function(file1) {
    return readFile2(file1.trim(), 'utf8');
}).then(function(file2) {
    console.log(file2);
});



// 将API Promise化
// smooth(fs.readFile);
var smooth = function(method) {
    return function() {
        var deferred = new Deferred();
        var args = Array.prototype.slice.call(arguments, 1);
        args.push(deferred.callback());
        method.apply(null, args);
        return deferred.promise;
    };
};
//