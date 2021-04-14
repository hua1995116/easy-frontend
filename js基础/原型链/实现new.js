const assert = require('assert')

// js实现一个new
// 1. arguments 类数组
// 2. 构造函数返回引用类型则直接返回，否则则返回定义的新对象
function New(fn) {
    const obj = Object.create(fn.prototype)
    const a = fn.apply(obj, Array.prototype.slice.call(arguments, 1))
    if (a instanceof Object) {
        return a
    }
    return obj
}

// 测试

function Student(name) {
    this.name = name || '小明';

    return {
        a: 1
    }
}

function Student1(name) {
    this.name = name || '小明';

    return null
}

function Student2(name) {
    this.name = name || '小明';

    return undefined
}

function Student3(name) {
    this.name = name || '小明';

    return ['eee']
}

function Student4(name) {
    this.name = name || '小明';

    return 1
}

function Student5(name) {
    this.name = name || '小明';

    return 'heihei'
}

function Student6(name) {
    this.name = name || '小明';
}

var a = New(Student, '111');

var b = new Student('111');



assert.strictEqual(JSON.stringify(a), JSON.stringify(b));


var a1 = New(Student1, '111')

var b1 = new Student1('111');

assert.strictEqual(JSON.stringify(a1), JSON.stringify(b1));

var a2 = New(Student2, '111')

var b2 = new Student2('111');

assert.strictEqual(JSON.stringify(a2), JSON.stringify(b2));

var a3 = New(Student3, '111')

var b3 = new Student3('111');

assert.strictEqual(JSON.stringify(a3), JSON.stringify(b3));

var a4 = New(Student4, '111');

var b4 = new Student4('111');

assert.strictEqual(JSON.stringify(a4), JSON.stringify(b4));

var a5 = New(Student5, '111');

var b5 = new Student5('111');

assert.strictEqual(JSON.stringify(a5), JSON.stringify(b5));

var a6 = New(Student6, '111');

var b6 = new Student6('111');

assert.strictEqual(JSON.stringify(a6), JSON.stringify(b6));
