function getType(target) {
    return Object.prototype.toString.call(target)
}

function deepClone(target) {
    if(target instanceof Object){
        let cloneTarget = Array.isArray(target) ? [] : {}
        for(const key in target) {
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}

var obj1 = {
    name:'小楠',
    child: {
        name:'华华',
        age:'3',
        say:() => {console.log('爱小楠')}
    },
    x:undefined,
    y:null,
    z:Symbol()
}

var obj2 = deepClone(obj1)


function deepClone1(target,map = new Map()) {
    if(target instanceof Object){
        let cloneTarget = Array.isArray(target) ? [] : {}
        // 检查map中是否有克隆过的对象
        if(map.get(target)){
            return map.get(target)
        }
        map.set(target,cloneTarget)
        for(const key in target) {
            cloneTarget[key] = deepClone1(target[key],map)
        }
        return cloneTarget
    } else {
        return target
    }
}

// 循环引用
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
}

target.foo = target

var copyTarget = deepClone1(target)

console.log(copyTarget)
