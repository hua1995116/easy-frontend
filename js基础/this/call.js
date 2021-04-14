function getGlobalObject() {
    return this;
}

Function.prototype.myCall = function (thisArg) {
    if (typeof this !== 'function') {
        throw new TypeError(this + ' is not a function');
    }

    if (typeof thisArg === 'undefined' || thisArg === null) {
        thisArg = getGlobalObject();
    }

    thisArg = new Object(thisArg);
    var __fn = Symbol()
    thisArg[__fn] = this;
    var args = [...arguments].slice(1)
    var result = thisArg[__fn](...args);
    delete thisArg[__fn];
    return result;
};

// 测试
const obj = { name: 'xiaoli' }

function foo(a, b) {
    console.log(this.name, a + b)
}

foo.myCall(obj, 1, 2)