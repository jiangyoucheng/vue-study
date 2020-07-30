# TypeScript

## 1、简介

TypeScript是JavaScript的类型超集，它可以编译成纯JavaScript。编译出来的JavaScript可以运行在任何浏览器上。TypeScript主要提供了类型系统和对ES6的支持，它由Microsoft开发，代码开源在GitHub上。

## 2、基础

### 2.1 原始数据类型

原始数据类型包括：Boolean、Number、String、Null、Undefined、Symbol。

* **布尔值**

  使用`boolean`定义布尔值类型

  ``````typescript
  let isDone: boolean = false;
  ``````

* **数值**

  使用`number`定义数值类型

  ``````typescript
  let count: number = 6;
  ``````

* **字符串**

  使用`string`定义字符串类型

  ``````typescript
  let msg: string = "hello TypeScript";
  ``````

* **空值**

  JS没有空值（Void）的概念，在TypeScript中可以用`void`表示没有任何返回值的函数。

  ``````typescript
  function alertName(): void {
      alert("My name is Tom");
  }
  ``````

* **Null和Undefined**

  在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型。

  ``````typescript
  let u: undefined = undefined;
  let n: null = null;
  ``````

  与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量。而 `void` 类型的变量不能赋值给 `number` 类型的变量。

  ``````typescript
  let num: number = undefined;  // 不会报错
  
  let u: undefined;
  let num2: number = u;  // 不会报错
  
  let v: void;
  let num3: number = v;  // Type 'void' is not assignable to type 'number'.
  ``````

### 2.2 任意值

* 任意值（any）用来表示允许赋值为任意类型。

``````typescript
let num: any = "seven";
num = 7;
``````

* 在任意值上访问任何属性和方法都是允许的。

  ``````typescript
  let anyThing: any = "hello";
  console.log(anyThing.name);
  anyThing.setName("Tom");
  ``````

* 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

  ``````typescript
  let something;  // 等价于 let something: any
  something = "seven";
  something = 7;
  something.name;
  something.setName("Tom");
  ``````

### 2.3 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

``````typescript
let num = "seven"; // 在给num赋值为"seven"时会为它推断出一个类型string,等价于 let num: string = "seven"
num = 7;  // Type 'number' is not assignable to type 'string'.
``````

### 2.4 联合类型

联合类型表示取值可以为多种类型中的一种。

``````typescript
let num: number | string;
num = "seven";  // ok
num = 7;  // ok
``````

当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

``````typescript
function getLength(something: string | number): number {
    return something.length;
}

// Property 'length' does not exist on type 'string | number'.
``````

### 2.5 对象的类型--接口

``````typescript
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: "Tom",
    age: 25
}

let bob: Person = {
    name: "Bob"  // Property 'age' is missing in type '{ name: string; }'.
}

let jim: person = {
    name: "Jim",
    age: 22,
    gender: "male"  // Object literal may only specify known properties, and 'gender' does not exist in type 'Person'.
}
``````

定义的变量比接口少了或多了一些属性是不允许的。

* **可选属性**

  在属性名后面加上”?“表示可选属性。可选属性的含义是该属性可以不存在。

  ``````typescript
  interface Person {
      name: string;
      age?: number;
  }
  
  let tom: Person = {
      name: "Tom",
      age: 25
  }
  
  let bob: Person = {
      name: "Bob"  
  }
  ``````

* **任意属性**

  使用`[propName: type]`定义任意属性。

  ``````typescript
  let interface Person {
      name: string;
      age?: number;
      [propName: string]: any;
  }
  
  let tom: Person = {
      name: "Tom",
      gender: "male"
  }
  ``````

  **一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

  ``````typescript
  interface Person {
      name: string;
      age?: number;
      [propName: string]: string;
  }
  
  let tom:Person = {
      name: "Tom",
      age: 25,
      gender: "male"
  }
  
  // Type 'number' is not assignable to type 'string'.
  ``````

* **只读属性**

  在属性名前加`readonly`来定义只读属性。

  ``````typescript
  interface Person {
      readonly id: number;
      name: string;
      age: number;
  }
  
  let tom: Person = {
      id: 9527,
      name: "Tom",
      age: 25
  }
  
  tom.id = 9526;  // Cannot assign to 'id' because it is a constant or a read-only property.
  ``````

### 2.6 数组的类型

* 使用**类型+方括号**来表示数组

  ``````typescript
  let arr: number<> = [1,2,3];
  
  let arr2: number<> = [1,"2",3];  //  Type 'string' is not assignable to type 'number'.
  ``````

* 使用数组泛型来表示数组

  ``````typescript
  let arr: Array<number> = [1,2,3];
  ``````

### 2.7 函数的类型

* **函数声明**

  一个函数有输入和输出，要在TypeScript中对其进行约束，需要把输入和输出都考虑到。

  ``````typescript
  function sum(x: number, y: number): number {
      return x + y;
  }
  
  sum(1,2,3);  // Supplied parameters do not match any signature of call target.
  sum(1);  // Supplied parameters do not match any signature of call target.
  sum(1,2);  // 3
  ``````

* **函数表达式**

  函数表达式需要对等号左右两边都做约束。

  ``````typescript
  let sum: (x: number, y: number) => number = function(x: number, y: number): number {
      return x + y;
  }
  ``````

  在TypeScript的类型定义中，=>用来表示函数的定义，左边式输入类型，需要用括号括起来，右边是输出类型。

* **可选参数**

  在参数名后面加”?“来表示可选参数。

  **可选参数必须接在必须参数后面**

  ``````typescript
  function buildName(firstName: string, lastName?: string): string {
      if (lastName) {
          return firstName + " " + lastName;
      } else {
          return firstName;
      }
  }
  ``````

* **参数默认值**

  TypeScript会将添加了默认值的参数识别为可选参数，但此时就不受”可选参数必须在必须参数后面“的限制了。

  ``````typescript
  function buildName(firstName: string, lastName: string = "Tom"): string {
      return firstName + " " + lastName;
  }
  ``````

* **剩余参数**

  在ES6中，使用`...rest`的方式来或取函数中的剩余参数。

  事实上，`...rest`是一个数组，所以我们可以用数组的类型来定义它。

  ``````typescript
  function push(array: any[], ...items: any[]): any[] {
      items.forEach(item => {
          array.push(item);
      });
  }
  ``````

* **重载**

  重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

  ``````typescript
  function reverse(x: number): number;
  function reverse(y: string): string;
  function reverse(x: number | string): number | string {
      if (typeof x === 'number') {
          return Number(x.toString().split('').reverse().join(''));
      } else if (typeof x === 'string') {
          return x.split('').reverse().join('');
      }
  }
  ``````

### 2.8 类型断言

类型断言可以用来手动指定一个值的类型，通常类型断言会将一种更范的类型断言为更具体的类型。

语法：`值 as 类型`。

``````typescript
const someValue: any = "this is a string";
const strLength = (someValue as string).length;
``````

**类型断言不是类型转换，它并不会真的影响到变量的类型**

### 2.9 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

* **声明语句**

  假如我们想使用第三方库jQuery，一种常见的方式是在html中通过script标签引入jQuery，然后就可以使用全局变量$或jQuery了。

  但是在ts中，编译器并不知道$或者jQuery是什么东西，这时我们需要使用`declare var`来定义它的类型。

  ``````typescript
  declare var jQuery: (selector: string) => any;
  
  jQuery("#foo");
  ``````

  `declare var`并没有真的定义一个变量，只是定义了全局变量jQuery的类型，仅仅会用于编译时的检查，在编译结果中会被删除。

* **声明文件**

  通常我们会把声明语句放到一个单独的文件中，这就是声明文件。声明文件必须以 `.d.ts` 为后缀。

### 2.10 内置对象

JavaScript中有很多内置对象，它们可以直接在TypeScript中当作定义好了的类型。

内置对象是指根据标准在全局作用域上存在的对象。

* **ESMAScript的内置对象**

  `Boolean`、`Error`、`Date`、`RegExp`等

* **DOM和BOM的内置对象**

  `Document`、`HTMLElement`、`Event`、`NodeList`等

## 3、进阶

### 3.1 类型别名

用来给类型起一个新的名字

``````typescript
type Name = string;
type NameResolver = () => string;
type NameResolver = Name | NameResolver;
function getName(n: Name | NameResolver): Name {
    if (typeof n === "string") {
        return n;
    } else {
        return n();
    }
}
``````

### 3.2 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

``````typescript
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById("hello"), "scroll");  // ok
handleEvent(document.getElementById("world"), "dbclick");  // 报错，event不能为"dbclick"
``````

**类型别名和字符串字面量类型都是使用`type`进行定义的。**

### 3.3 元组

数组合并了相同类型的对象，而元组（tuple）合并了不同类型的对象。

``````typescript
let tom: [string, number] = ["Tom", 25];
``````

### 3.4 枚举

枚举类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。枚举使用`enum`关键字来定义。

枚举成员会被赋值为从0开始递增的数字，同时也会对枚举值到枚举名进行反向映射。

``````typescript
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

Days["Sun"] === 0;
Days["Mon"] === 1;
Days["Tue"] === 2;
Days["Wed"] === 3;
Days["Thu"] === 4;
Days["Fri"] === 5;
Days["Sat"] === 6;
Days[0] === "Sun";
Days[1] === "Mon";
Days[2] === "Tue";
Days[3] === "Wed";
Days[4] === "Thu";
Days[5] === "Fri";
Days[6] === "Sat";
``````

### 3.5 类

* **类的概念**

  * **类（Class）**：定义了一件事物的抽象特点，包含它的属性和方法。
  * **对象（Object）**：类的实例，通过`new`生成。
  * **面向对象（OOP）**：封装、继承、多态。
  * **封装（Encapsulation）**：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据。
  * **继承（Inheritance）**：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性。
  * **多态（Polymorphism）**：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如Cat和Dog都继承自Animal，但是分别实现了自己的eat方法。此时针对某一个实例，我们无需了解它是Cat还是Dog，就可以直接调用eat方法，程序会自动判断出来应该如何执行eat。
  * **存取器（getter & setter）**：用以改变属性的读取和赋值行为。
  * **修饰器（Modifiers）**：修饰器是一些关键字，用于限定成员或类型的性质。如`public`表示公有属性或方法。
  * **抽象类（Abstract Class）**：抽象类是供其它类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现。
  * **接口（Interfaces）**：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现。一个类只能继承自另一个类，但是可以实现多个接口。

* **ES6中类的用法**

  * **定义**

    使用`class`定义类，使用`constructor`定义构造函数。

    使用`new`生成新实例的时候，会自动调用构造函数。

    ``````javascript
    class Animal {
        constructor(name) {
            this.name = name;
        }
        sayHi() {
            console.log(`My name is ${this.name}`);
        }
    }
    
    let tom = new Animal("Tom");
    tom.sayHi();  // My name is Tom
    ``````

  * **类的继承**

    使用`extends`关键字实现继承，子类使用`super`关键字来调用父类的构造函数和方法。

    ``````javascript
    class Cat extends Animal {
        constructor(name) {
            super(name); // 调用父类的constructor(name)
            console.log(this.name);
        }
        sayHi() {
            console.log("Meow");
            super.sayHi();  // 调用父类的sayHi()
        }
    }
    
    let tom = new Cat("Tom");  // Tom
    tom.sayHi();  // Meow  // My name is Tom
    ``````

  * **存取器**

    使用getter和setter可以改变属性的赋值和读取行为。

    ``````js
    class Animal {
        constructor(name) {
            this.name = name;
        }
        get name() {
            return "Jack";
        }
        set name(value) {
            console.log("setter:" + value);
        }
    }
    
    let a = new Animal("Kitty"); // setter:Kitty
    a.name = "Tom"; // setter:Tom
    console.log(a.name); // Jack
    ``````

  * **静态方法**

    使用`static`修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用。

* **ES7中类的用法**

  * **实例属性**

    ES6中实例的属性只能通过构造函数中的this.xxx来定义，ES7提案中可以直接在类里面定义。

    ``````javascript
    class Animal {
        name = "Jack";
        constructor() {
            
        }
    }
    
    let a = new Animal();
    console.log(a.name); // Jack
    ``````

  * **静态属性**

    可以使用`static`来定义一个静态属性。

    ``````javascript
    class Animal {
        static num = 42;
    }
    
    console.log(Animal.num); // 42
    ``````

* **TypeScript中类的用法**

  * **public、private和protected**

    **public**：修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有属性和方法都是public的。

    **private**：修饰的属性或方法是私有的，不能再声明它的类的外部访问。

    **protected**：修饰的属性或方法是受保护的，它和private类型，区别是它在子类中也是允许被访问的。

    ``````typescript
    class Animal {
      public name;
      public constructor(name) {
        this.name = name;
      }
    }
    
    let a = new Animal('Jack');
    console.log(a.name); // Jack
    a.name = 'Tom';
    console.log(a.name); // Tom
    ``````

  * **参数属性**

    修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

    ``````typescript
    class Animal {
        // public name: string;
        constructor(public name) {
            // this.name = name;
        }
    }
    ``````

  * **readonly**

    只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

    如果readonly和其他修饰符同时存在的话，需要写在其后面。

    ``````typescript
    class Animal {
        public constructor(public readonly name) {
            
        }
    }
    
    let a = new Animal("Tom");
    console.log(a.name); // Tom
    a.name = "Jack"; // Cannot assign to 'name' because it is a read-only property.
    ``````

  * **抽象类**

    `abstract`用于定义抽象类和其中的抽象方法。

### 3.6 泛型

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

``````typescript
// 不使用泛型：没有准确定义返回值的类型
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i ++) {
        result[i] = value;
    }
    return result;
}

// 使用泛型
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i ++) {
        result[i] = value;
    }
    return result;
}

// 我们在函数名后添加<T>，其中T用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了
``````

* **泛型约束**

  在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法。

  `````typescript
  function loggingIdentity<T>(arg: T): T {
      console.log(arg.length);
      return arg;
  }
  
  // Property 'length' does not exist on type 'T'.
  `````

  我们可以对泛型进行约束，只允许这个函数传入那些包含length属性的变量，这就是泛型约束。

  ``````typescript
  interface Lengthwise {
      length: number;
  }
  
  function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
  }**
  ``````

  

  