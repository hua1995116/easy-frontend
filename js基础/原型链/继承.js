function Animal(props) {
    this.name = props.name || 'animal'
}

Animal.prototype.say = function() {
    console.log(this.name + ' is saying')
}

function Dog(props) {
    Animal.call(this,props)
    // this.name = 'dog'
}

// 原型继承

// 1. 创建空函数作架桥函数，将其封装成inherits函数
function inherits(Child, Parent) {
    const F = function () {}
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.prototype.uber = Parent.prototype
}

inherits(Dog,Animal)

// 2. 利用create方法
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
Dog.prototype = Object.create(Animal.prototype)

// 3. 利用__proto__属性
Dog.prototype.__proto__ = Animal.prototype

// 4. 利用setPrototypeOf方法
// 设置一个指定的对象的原型 (即, 内部[[Prototype]]属性）到另一个对象或 null。
Object.setPrototypeOf(Dog.prototype, Animal.prototype)

// 测试

let dog = new Dog({name:'Animals'})

dog.say()

