const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    var that = this

    const resolve = (value) => {
      if (that.state === PENDING) {
        that.state = FULFILLED;
        that.value = value;
        that.onFulfilledCallbacks.forEach(callback => {
          callback(that.value);
        });
      } 
    };

    const reject = (reason) => {
      if (that.state === PENDING) {
        that.state = REJECTED;
        that.reason = reason;
        that.onRejectedCallbacks.forEach((callback) => {
          callback(that.reason);
        });
      }
    };

    try {
      fn(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    let promise2;

    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    let that = this

    if (this.state === FULFILLED) {
      return (promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }));
    }

    if (this.state === REJECTED) {
      return (promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }));
    }

    if (this.state === PENDING) {
      return (promise2 = new MyPromise((resolve, reject) => {
        that.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              let x = onFulfilled(value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        that.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              let x = onRejected(reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }));
    }
  }
}

/*
promise: then返回的promise
x: onfulfilled return 的值
resolve: then 返回的promise 的resolve
reject: then 返回的promise 的 reject
*/

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    // 防止循环引用
    return reject(
      new TypeError("the promise and the return value are the same")
    );
  }
  if (x && typeof x === "object" || typeof x === "function") {
    let used;
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (value) => {
            if (used) return;
            used = true;
            resolvePromise(promise, value, resolve, reject);
          },
          (reason) => {
            if (used) return;
            used = true;
            reject(reason);
          }
        );
      } else {
        // x 非promise，且没有原生的then方法
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
};

module.exports = MyPromise


// 1. 循环引用？
// 2. 返回一个对象，里面有then方法