function getGlobalObject() {
    return this;
}

Function.prototype.myApply = function (thisArg, argsArray) {
    if (typeof this !== 'function') {
        throw new TypeError(this + ' is not a function');
    }

    if (typeof argsArray === 'undefined' || argsArray === null) {
        argsArray = [];
    }

    if (argsArray !== new Object(argsArray)) {
        throw new TypeError('CreateListFromArrayLike called on non-object');
    }

    if (typeof thisArg === 'undefined' || thisArg === null) {
        thisArg = getGlobalObject();
    }

    thisArg = new Object(thisArg);
    var __fn = Symbol()
    thisArg[__fn] = this;
    var result = thisArg[__fn](...argsArray);
    delete thisArg[__fn];
    return result;
};

// 测试

const obj = { name: 'xiaoli' }

function foo(a, b) {
    console.log(this.name, a + b)
}

foo.myApply(obj, [1, 2])