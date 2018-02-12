// module.exports = {
//     fun2: function(res) {
//         console.log('我是fun2');
//         res.write('你好,我是fun2');
//     },
//     fun3: function(res) {
//         console.log('我是fun3');
//         res.write('你好,我是fun3');
//     }
// }

// function User(id, name, age) {
//     this.id = id;
//     this.name = name;
//     this.age = age;
//     this.enter = function () {
//         console.log(this.name + '进入图书馆！');
//     }
// }

// module.exports = User;


module.exports = {
    login: function(req, res) {
        res.write('我是login方法');
    },
    zhuce: function(req, res) {
        res.write('我是注册方法');
    }
}