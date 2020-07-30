// 类型注解
let str: string;
str = 'hello world';
// str = 1; // 报错

// 类型推论：如果没有指定类型，那么ts会推论出一个类型
let val = true; // 编译器会将val的类型指定为boolean
// val = 1; // 报错

// 类型数组
let arr: string[];
arr = ['1', '2'];
// arr = [1, 2]; // 报错

// 任意类型any
let varAny: any;
varAny = '123';
varAny = 123;

// any类型也可以用于数组
let arrAny: any[];
arrAny = [1, '1', true];

// 类型断言
const someValue: any = 'this is a string';
// const strLength = someValue.length;
const strLength = (someValue as string).length;

// 联合类型：希望某个变量或参数的类型是多种类型其中之一
let union: string | number;
union = '1';
union = 1;
// union = true; // 报错

// 函数中的类型约束
function sum(x: number, y: number): number {
    return x + y;
}

// void类型，常用于没有返回值的函数
function warn(): void {
    // do something
}

// 可选参数：参数名后面加上问号，必须在必填参数后面
function greeting(person: string, msg?: string): string {
    return 'hello, ' + person + ', ' + msg;
}

greeting('Tom', 'welcome'); // hello, Tom, welcome
greeting('Tom'); // hello, Tom, 

// 默认值
function greeting2(person: string, msg = 'how are you'): string {
    return 'hello, ' + person + ', ' + msg;
}

greeting2('Tom', 'welcome'); // hello, Tom, welcome
greeting2('Tom'); // hello, Tom, how are you

// 函数重载
function watch(cb1: () => void): void;
function watch(cb1: () => void, cb2: () => void): void;
function watch(cb1: () => void, cb2?: () => void): void {
    if (cb1 && cb2) {
        // do something
    } else {
        // do something
    }
}

// 接口
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
};

// 可选属性
interface Person2 {
    name: string;
    age: number;
    gender?: string;
}

let jack: Person2 = {
    name: 'Jack',
    age: 18,
    gender: 'male',
};

let marry: Person2 = {
    name: 'Marry',
    age: 19,
};

// 任意属性: 确定属性和可选属性的类型必须是任意属性的类型的子集
interface Person3 {
    name: string;
    age: number;
    [propName: string]: any;
}

let jerry: Person3 = {
    name: 'Jerry',
    age: 23,
    gender: 'male',
};
