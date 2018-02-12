[
    {
        name: 'assert-断言',
        property: '稳定的',
        explain: 'assert模块提供了断言测试的函数，用于测试不变式'
    },
    {
        name: 'assert(value[,message])',
        property: '稳定的',
        explain: 'assert.ok()的别名'
    },
    {
        name: 'assert.deepEqual(actual, expected[,message])',
        property: '稳定的',
        explain: '测试actual参数与expected参数是否深度相等。原始值使用相等运算符（==）比较。<br>' +
        '只测试可枚举的自身属性，不测试对象的原型、连接符或不可枚举的属性。例如，下面的例子不会跑出AssertionError，' +
        '因为RegExp对象的属性不是可枚举的：<pre>// 不会抛出AssertionError<br> assert.deepEqual(/a/gi, new Date());</pre>' +
        'Map和Set包含的子项也会被测试。如果两个值不想等，则抛出一个带有message属性的AssertionError，其中message属性的值等于传入的message参数的值。如果message参数为undefined，则赋予默认的错误信息。'
    },
    {
        name: 'assert.deepStrictEqual(actual, expected[,message])',
        property: '稳定的',
        explain: '与assert.deepEqual()大致相同，但有如下区别：<br>1、原始值使用全等运算符(===)比较。Set的值与Map的值使用SameValueZero比较。<br>' +
        '2、对象的原型也使用全等运算符比较。<br>3、对象的类型标签要求相同。<br>4、比较[对象包装器][]时，其对象和里面的值要求相同。'
    },
    {
        name: 'assert.doesNotThrow(block[,error][,message])',
        property: '稳定的',
        explain: '断言block函数不会抛出错误。当assert.doesNotThrow()被调用时，它会立即调用block函数。如果抛出错误且错误类型与error参数指定的相同，则抛出AssertionError。如果错误类型不想听，或error参数为undefined，则抛出错误。'
    },
    {
        name: 'assertequal(actual, wxpected[,message])',
        property: '稳定的',
        explain: '使用相等运算符(==)测试actual参数与expected参数是否相等。'
    },
    {
        name: 'assert.fail(message)/assert.fail(actual, expected[,message[,operator[,stackStartFunction]]])',
        property: '稳定的',
        explain: '抛出AssertionError。如果message参数为空，则错误信息为actual参数 + operator参数 + expected参数。' +
        '如果只提供了actual参数与expected参数，则operator参数默认为"!="。如果提供了message参数，则它会作为错误信息，' +
        '其他参数会报错在错误对象的属性中。如果提供了stackStartFunction参数，则该函数上的帧都会从栈信息中移除。'
    },
    {
        name: 'assert.ifError(value)',
        property: '稳定的',
        explain: '如果value为真，则抛出value。可用于测试回调函数的error参数。'
    },
    {
        name: 'assert.notDeepEqual(actual, expected[,message])',
        property: '稳定的',
        explain: '测试actual参数与expected参数是否不相等。与assert.deepEqual()相反。'
    },
    {
        name: 'assert.notDeepStrictEqual(actual, exprcted[,message])',
        property: '稳定的',
        explain: '测试actual参数与expected参数是否不深度全等。与assert.deepStrictEqual()相反。'
    },
    {
        name: 'assert.notEqual(actual, expected[,message])',
        property: '稳定的',
        explain: '使用不等运算符(!=)测试actual参数与expected参数是否不相等。'
    },
    {
        name: 'assert.notStrictEqual(actual, expected[,message])',
        property: '稳定的',
        explain: '使用不全等运算符(!==)测试actual参数与wxpected参数是否不全等'
    },
    {
        name: 'assert.ok(value[,message])',
        property: '稳定的',
        explain: '测试value是否为真值。相当于assert.equal(!!value, true, message)。' +
        '如果value不为真值，则抛出一个带有message属性的AssertionError，其中message属性的值等于传入的message参数的值。如果message参数为undefined，则赋予默认的错误信息。'
    }
]