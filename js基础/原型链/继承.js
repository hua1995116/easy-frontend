function Animal() {
    this.name = 'animal'
}

Animal.prototype.say = function() {
    console.log(this.name + ' is saying')
}

function Dog() {
    Animal.call(this)
    this.name = 'dog'
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
Dog.prototype = Object.create(Animal.prototype)

// 3. 利用__proto__属性
Dog.prototype.__proto__ = Animal.prototype

// 4. 利用setPrototypeOf方法
Object.setPrototypeOf(Dog.prototype, Animal.prototype)

// 测试

let dog = new Dog()

dog.say()


