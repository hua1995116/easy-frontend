// 最基础版deepClone，用递归解决多层深度的问题
// 只考虑了最普通的Object和Array
// 有循环引用的问题，递归会进入死循环导致栈溢出
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
    arr:['1','2'],
    x:undefined,
    y:null,
    z:Symbol()
}

var obj2 = deepClone(obj1)
// obj2 {
//       name: '小楠',
//       child: { name: '华华', age: '3', say: {} },
//       arr: [ '1', '2' ],
//       x: undefined,
//       y: null,
//       z: Symbol()
//      }


// 解决循环引用版deepClone
// 用一个map来存储当前对象和拷贝对象的对应关系
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

// console.log(copyTarget)
