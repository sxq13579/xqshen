var User = require('./other.js');
function Teacher (id, name, age) {
    User.apply(this, [id, name, age]); // Teacher 继承了 User
    this.teach = function(res) {
        res.write(this.name + '在讲课！');
    }
}

module.exports = Teacher;