// 可继续遍历的类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

// 不可继续遍历的类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneReg(target) {

}

function cloneSymbol(target) {

}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) { // 非箭头函数
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else { // 箭头函数
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function deepClone(target,map = new Map()) {
    if(target instanceof Object){
        // 初始化
        const type = getType(target)
        let cloneTarget
        if(deepTag.includes(type)) {
            cloneTarget = getInit(target)
        } else {
            return cloneOtherType(target,type)
        }

        // 防止循环引用
        if(map.get(target)){
            return map.get(target)
        }
        map.set(target,cloneTarget)

        // 克隆set
        if(type === setTag) {
            target.forEach(value => {
                cloneTarget.add(deepClone(value,map))
            })
            return cloneTarget
        }

        // 克隆map
        if(type === mapTag) {
            target.forEach((value,key) => {
                cloneTarget.set(key,deepClone(value,map))
            })
            return cloneTarget
        }

        // 克隆对象和数组        
        for(const key in target) {
            cloneTarget[key] = deepClone(target[key],map)
        }

        return cloneTarget

    } else {
        return target
    }
}