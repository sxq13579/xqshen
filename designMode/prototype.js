var Plane = function () {
    this.blood = 100;
    this.attackLevel = 1;
    this.defenseLevel = 1;
};

var plane = new Plane();
plane.blood = 500;
plane.attackLevel = 10;
plane.defenseLevel = 7;

var clonePlane = Object.create( plane );
// 输出: Object {blood: 500, attackLevel: 10, defenseLevel: 7}
console.log(clonePlane);

// 不支持Object.create方法的浏览器
Object.create = Object.create || function (obj) {
    var F = function() {};
    F.prototype = obj;
    return new F();
}

function Person(name) {
    this.name = name;
};

Person.prototype.getName = function() {
    return this.name;
};

var objectFactory = function () {
    var obj = new Object(),
        Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;
}


// var a = new Person('sven')
var a = new objectFactory(Person, 'sven');

console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === Person.prototype);

var MyClass = function() {
    this.name = 'sven';
    return {
        name: 'anne'
    }
};

var obj = new MyClass();
alert(obj.name);
