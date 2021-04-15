const assert = require('assert')

// bind 方法创建一个新的函数，在bind()被调用时，这个新函数的this被指定为bind()的第一个参数，其余参数将作为新函数的参数，供调用时使用

// 简易版，未考虑new实例化返回值改变this指向
Function.prototype.myBind = function (thisArg) {
    if (typeof this !== 'function') {
        throw new TypeError(this + ' is not a function');
    }

    var self = this
    var args = [...arguments].slice(1)
    return function () {
        var finalArgs = [...args, ...arguments]
        return self.apply(thisArg, finalArgs)
    }
}

// 测试
const obj1 = { name: 'xiaoli' }

function foo1(a, b) {
    console.log(this.name, a + b)
}

var fn1 = foo1.myBind(obj1, 1)
var res1 = fn1(2)

var fn2 = foo1.bind(obj1, 1);
var res2 = fn2(2)

assert.strictEqual(JSON.stringify(res1), JSON.stringify(res2));

// 考虑new实例化返回值改变this指向版
Function.prototype.bindFn = function (thisArg) {
    if (typeof this !== 'function') {
        throw new TypeError(this + ' must be a function');
    }

    var self = this;
    var args = [...arguments].slice(1)
    var bound = function () {
        var finalArgs = [...args, ...arguments]

        if (new.target !== undefined) { //说明是用new来调用的
            var result = self.apply(this, finalArgs);
            if (result instanceof Object) {
                return result;
            }
            return this;
        }
        else {
            return self.apply(thisArg, finalArgs);
        }
    };
    if(self.prototype) {
        bound.prototype = Object.create(self.prototype);
        bound.prototype.constructor = self;
    }
    return bound;
}

// 测试
const obj2 = { name: 'xiaoli' }

function foo2(a, b) {
    this.name = b
    console.log(this.name, a + b)
    return 1;
}

foo2.prototype.foo = function () {
    console.log(this.name)
}

var fn3 = foo2.bindFn(obj2, 1)
var result = new fn3(2)

var fn4 = foo2.bind(obj2, 1)
var result1 = new fn4(2);

assert.strictEqual(JSON.stringify(result), JSON.stringify(result1));
assert.strictEqual(JSON.stringify(result.foo), JSON.stringify(result1.foo));