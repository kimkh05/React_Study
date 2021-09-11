# React를 위한 ES6 문법 정리

변수 선언 시 축약 코딩

```JavaScript
// 이전 버전
let x;
let y = 0;
let x = 1;

// ES6
let x, y = 0, x = 1;
```

복수의 변수를 선언할 때 일일이 선언 키웓,(let, const)를 입력하지 않아도 위와 같이 축약하여 선언할 수 있습니다. 

<hr>

 Destructuring assignment(구조 분해 할당)

```js
// 이전 버전
let array = [1,2,3];
let x = array[0];
let y = array[1];
let z = array[2];

// ES6 배열 구조 분해
let array = [1,2,3];
let [x, y, z] = array;
console.log(x, y, z); // 출력 결과 :  1 2 3

// 이전 버전
let object = {name : 'KyeongHo', job : 'coding', age : 17};
let name = object.name;
let job = object.job;
let age = object.age;

// ES6 객체 구조 분해
let {name,job, age} = {name : 'KyeongHo', job : 'coding', age : 17};
console.log(name, job, age); // Kyeong coding 17

```

ES6에서는 배열과 객체를 대상으로하여 복수의 변수를 다룰 때 효과적인 데이터 바인딩 기능을 제공해줍니다. 구조분해할당이란 배열이나 객체의 속성을 해체하여 거기에 있는 속성들을 개별적인 변수에 담을 수 있는 선언방식입니다. 해당 언어의 기능은 Perl과 Python에서도 지원하는 기능입니다. 

범위를 벗어나거나 할댕당되지 않은 나머지 값이 있다면 자동적으로 Undifined가 선언됩니다. 별도의 변수의 값을 저장하여, 복잡한 절차 없이 간단하게 두 변수의 데이터를 교환할 수도 있습니다. 

```Js
// t번 만큼 배열 내의 랜덤한 인덱스를 셔플
while (t) {
    let i = Math.floor(Math.random() * t--);
    [newArr[t],newArr[i]] = [newArr[i],newArr[t]]
  }
  return newArr;
}


// 반환값 무시 예제
let array = [1,2,3,4,5]
let [odd1,,odd2,,odd3] = array; 
console.log(odd1,odd2,odd3) // 1 3 5
```

자세한 사항은 MDN 구조 분해 할당 파트를 참고하여 주세요.

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

<hr>

### Arrow Function

function 키워드를 통하여 함수를 선언했던 이전과는 달리 화살표(=>)를 이용해서 함수를 더욱 간단하게 선언하고 실행할 수 있게 되었습니다. C#에서도 있었던 문법입니다. 함수를 더욱 간편하게 선언하고 실행할 수 있지만, 모든 경우에서 이를 활용할 수 있는 것은 아닙니다.

```javascript
//기본 문법

() => { ... } // 매개변수가 없는 경우
x => { ... } // 매개변수가 1개인 경우, 소괄호 생략 가능
(x,y) => { ... } // 매개변수가 2개 이상인 경우, 소괄호 생략 불가
x,y => { ... } // SyntaxError: Unexpected token '=>'


//함수 몸체 지정 방법

x => { return x*y } // single-line block
x => x*y // 만일 한 줄이라면 이와 같이 중괄호 생략 가능
// 중괄호 생략 시 암묵적으로 return함.

() => { return { user : object.name }; }
() => ({ user : object.name })
// 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다. 
```

그러나 화살표 함수를 사용할 때에 피해야 할 경우가 있습니다. 화살표함수 안에서 this를 활용할 경우, 해당 this는 그 값을 기존의 일반 함수 안에서 동적으로 받던 경우와는 달리 **자신이 정의된 상위 스코프의 this**를 정적으로 가르킵니다. 이를 'Lexical this'라고 합니다.

이런 Lexical this상황에서는 인위적으로 call, apply, bind를 이용하여 this의 값을 한정할 수 없습니다. 따라서, 화살표함수 안에서의 this는 위의 함수형 메소드를 통하여 그 값을 원하는대로 정의할 수 없습니다.

```javascript
function Prefixer(prefix) {
  this.prefix = prefix;
}

console.log(this); // 일반적인 상황에서는 grobal을 받아온다.
Prefixer.prototype.sayHello = function (array) {
	return array.map(x => `${this.prefix} ${x}`);
};

let pre = new Prefixer('Hi');
console.log(pre.prefixArray(['Lee', 'Kim']));
//from PoiemaWeb 
```

그렇다면 어떨 때에 화살표함수를 쓰고 어떨 때에 쓰지 말아야할까요?

간단한 callback을 작성하실 때에 화살표함수를 사용하시면 높은 가독성의 코드를 짜실 수 있습니다. 또한 즉시 실행 함수를 작성할 때에도 화살표함수를 짜실 수 있겠네요.

반대로, this를 상당히 많이 활용하는 상속활용상황, 클래스 정의나 프로토타입 등에서는 이를 조심해서 활용해야할 것입니다. 또한 lexical this 상황에서는 call, apply, bind와 같이 this의 값을 조정할 수 있는 함수형 메소드의 활용이 불가하니 이 점을 참고하시길 바랍니다.

------

### Classes

Java와 같은 다른 객체지향에도 있던 클래스 선언이 Javascript에서도 추가되었습니다. 이로써 프로토타입 기반 언어인 자바스크립트에서도 (형식적으로나마) Class를 선언하고 활용할 수 있게 되었습니다.

Class 패턴 생성을 통해 더 쉽고 단순하고 편하게 객체지향 프로그래밍을 할 수 있습니다.

```javascript
// ES6 Class
Class Person{
	constructor(name, age, job){
    	this.name = name;
      	this.age = age;
      	this.job = job;
    }
  
  	introduce(){
    	return `My name is ${this.name} and, i'm ${this.age} years old.`
    }
}

***

// ES5 Pseudo-Classical inheritance code

function Person(name, age, job){
	this.name = name;
  	this.age = age;
  	this.job = job;
}


Person.prototype.introduce(){
	return `My name is `+ this.name + `, and, i'm ` + this.age + ` years old.`
}
```

------

### Spread Operator & Rest Parameters

Spread operator와 Rest parameters는 `...`을 통해 사용할 수 있습니다. 둘의 기능은 비슷하지만 반환되는 형태가 다르다고 생각하시면 될 것 같습니다. 둘 모두 자신이 가지고 있는 엘리멘트를 인덱스 별로 쪼개어 요소별로 나열하여 사용할 수 있습니다.

Spread operator는 대상 배열의 요소, 또는 스트링처럼 반복이 가능한 (즉, 인덱스가 있는)요소들을 개별적인 요소들로 다시 반환합니다. 아래는 Spread operator을 활용한 기본적인 사용법입니다.

```javascript
let sample_array = [1,2,3,4,5,6]
let sample_string = 'spread it!'

console.log(sample_array) // [1,2,3,4,5,6]
console.log(...sample_array) // 1 2 3 4 5 6
console.log(sample_string) // spread it!
console.log(...sample_string) // s p r e a d   i t !

//배열 뿐만 아니라 객체에도 사용이 가능하다.

let obj1 = {last_name : 'kim', first_name : 'brian'}
let obj2 = {hobby : 'puzzle', office_number : 501}
let obj3 = {...obj1, ...obj2}
console.log(obj3) // 어떻게 나올까요?
```

Rest parameters 또한 마찬가지로 `...` 통해 사용이 가능하지만, Spread 연산자가 배열이나 스트링의 구조를 파괴(?)해서 개별인자로 내보내는 것과는 달리 Rest parameters는 다수의 요소들을 배열로 묶어줍니다. 파라미터라는 말, 어디서 많이 들어보시지 않으셨나요? Rest parameters는 다수의 파라미터를 함수 안에 넣을 때 이들을 배열의 형태로 활용하고 싶을 때 유용합니다.

```javascript
function console_by_rest_parameters(...element) {
	console.log(element)
}

console_by_rest_parameters(1,2,3,4,5) // [1,2,3,4,5]
console_by_rest_parameters(`Kim`,`Aiden`,`red`) // [`Kim`,`Aiden`,`red`]
```

그러면 이 둘은 언제 사용할까요?

- Spread 연산자는 하나의 입력값으로 받을 때에 유용합니다. 예를 들어서 Math 메소드 같은 경우는 최소값과 최대값을 구하는 메소드를 쓸 때 spread 연산자를 쓰면 반복문을 쓰지 않고도 모든 배열에 연산을 적용한 값을 받을 수 있겠지요. 또한 어떤 배열 안에 다른 배열의 요소들을 특정 인덱스에 집어넣을 때에 유용합니다. spread가 인덱스를 동반한 구조체인 배열과 스트링을 구조분해하여 값을 쓸 수 있다는 것이 핵심입니다.
- rest parameters는 반대로 다수의 값들을 배열로 묶어냅니다. 파라미터라는 이름에서도 보듯 함수 내에 정의해서 다수의 값을 배열화해서 정리하거나, 혹은 함수형 메소드인 map, filter 등을 같이 사용할 때에 유용합니다.

------

### let / const

ES6 이전에 변수 선언에 사용된 `var` 이외에도 `let`과 `const`가 추가되었습니다. 이전 버전에서의 var의 가장 큰 단점은 변수의 재선언이 가능했다는 점인데요. `let`/`const`는 이러한 문제점을 방지할 수 있습니다. 즉, 이 둘은 변수의 재선언이 불가능합니다. 특히나 상수를 의미하는 const로 선언된 변수는 재할당도 불가능하기에 이를 참고하셔야 합니다.

```javascript
var test1 = [1,2,3,4,5]; // undefined === pass
var test1 = [6,7,8,9,0]; // undefined === pass

let test2 = [1,2,3,4,5]; // undefined === pass
let test2 = [6,7,8,9,0]; // SyntaxError!
test2 = 'foo' // 가능

const test3 = 3; // undefined === pass
const test3 = 13; // SyntaxError!
test3 = 'bar' // 불가능

/*
현재 버전의 크롬 개발자도구 콘솔 상에서는 let의 변수 재선언이 적용됩니다.
하지만 eslint 를 적용한 vscode 에서는 기본적으로 이를 에러라고 인식하고 잡아냅니다. 

그게 아니더라도, 다른 목적을 위한 변수 재선언 사용은 좋지 않은 코딩 스타일 중 하나입니다.
*/
```

또한 `var`와 `let`/`const`는 변수의 적용 범위(scope)도 다릅니다. `var`는 함수 범위의 스코프를 가지고, `let`과 `const`는 블록 단위의 스코프를 가집니다. 따라서 `let`/`const`로 선언된 변수는 같은 함수 안에 있더라도, 블록(중괄호)의 범위의 따라서 값을 참조하지 못할 수도 있습니다.

```javascript
// case1 - var
var foo = "This is String.";
if(typeof foo === 'string'){
	var result = true;
} else {
  var result = false;
}
console.log(result);    // result : true


//case2 - let/const
var foo = "This is String.";
if(typeof foo === 'string'){
	const result = true;
} else {
  const result = false;
}

console.log(result);    // result : result is not defined
```

------

### Property Initializer Shorthand

ES6에서는 객체 활용에서도 편의성이 확장되었습니다. 이 중 살펴볼 것은 객체 선언시 축약기법입니다.

- 객체 선언시, 키와 값이 서로 같다면은 생략이 가능해졌습니다.

```javascript
//before ES6
function creat_staff(name, age) = {
  return {
    name : name,
    age : age
  }
}

//ES6
function creat_staff(name, age) = {
  return {
    name,
    age
  }
}
```

- 이제 객체 안에서 메소드를 정의할 시에, 함수 생성 키워드인 `function`을 적어주지 않아도 됩니다.

```javascript
//before ES6
var person = {
    name: "Nicholas",
    sayName: function() {
        console.log(this.name);
    }
};

//ES6
var person = {
    name: "Nicholas",
    sayName() {
        console.log(this.name);
    }
};
```

------

### default parameter

이전에는 함수의 파라미터를 받을 때에 별도로 할당하지 않은 경우 그 파라미터의 기본값은 `undefined`였습니다. 따라서 함수의 매개변수에 기본값을 넣어주고 싶다면 아래와 같이 함수의 내부에서 따로 코드를 작성하여 관리를 해야했습니다.

```javascript
function multiple_numbers(num1, num2){
  if(num1 === undefined || num1 < 1) {
    num1 = 1;
  }
  if(num2 === undefined || num2 < 1) {
    num2 = 1;
  }
  
  // 위의 conditions가 없을 때 파라미터를 넣지 않으면
  // 파라미터가 undefined가 된 상태이기에
  // 아래의 결과값이 NaN으로 반환됨.
  
  result = num1 * num2;
  return result;
};

multiple_numbers(4) // NaN
```

이제 ES6에서 추가된 Default parameter 기능으로 매개변수를 정의할 때 기본값을 지정해줄 수 있습니다. 이런 과정을 통해 함수 몸통 내부에서 따로 기본값 설정을 위한 코드를 작성할 필요가 없어졌습니다.

```javascript
function multiple_numbers(num1 = 1, num2 = 1){

  result = num1 * num2;
  return result;
};

multiple_numbers(4) // 4
```

Default parameter를 설정할 때에 구조분해할당을 적용할 수도 있습니다.

```javascript
function f([x, y] = [1, 2], {z: z} = {z: 3}) {
  return x + y + z;
}

f(); // 6

//출처 : MDN 
```

------

### template literals

ES6에서 도입된 template literals라는 문자열 표기법은 백틱(backtick)을 활용하여 더욱 활용성이 높은 문자열 활용을 가능하게 합니다.

```javascript
const template = `'작은따옴표(single quotes)'와 "큰따옴표(double quotes)" 혼용가능`;

console.log(template);
```

문자열 내부에 변수의 값을 문자열로 넣을 수 있는 간편한 기능인 String Interpolation도 추가되었다. 이로써 이전의 + 연산자를 이용한 문자열 입력 대신 직관적이며 간편한 방법으로 문자열 내부에 변수의 값을 입력할 수 있게 되었다.

```javascript
let first = `John`
let last = `Piper`

//before ES6
console.log(`My name is ` + first + ' ' + last + '.');

//String Interpolation
console.log(`My name is ${first} ${last}.`)


//String Interpolation은 ${변수명} 식으로 활용한다.
//String Interpolation의 표현식 안에 변수명이 들어가면 변수의 값이 문자열로 강제 형변환한다.
//String Interpolation의 표현식 안에서 간단한 연산도 가능하다.

let num =4
console.log (`4*2 = ${num*2}`);

// 4*2 = 8
```

------

### for...of loop

'`for ... of` loop'는 객체의 반복을 위해 사용하던 `for...in`loop와 유사합니다. `for...of`는 [반복가능한 객체](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)를 대상으로 각 개별 속성값에 대한 반복문을 수행합니다.

```javascript
// 배열에 대한 반복문
let iterable = [10, 20, 30];

for (let value of iterable) {
  console.log(value);
}
// 10
// 20
// 30


//제너레이터에 대한 반복문
function* fibonacci_generator(){
	let [prev_value, curr_value] = [1,1];
  while(true){
  	[prev_value, curr_value] = [curr_value, prev_value + curr_value];
    yield curr_value;
  }
}

for (let n of fibonacci_generator()) {
  console.log(n);
  // 1000에서 수열을 자름
  if (n >= 1000) {
    break;
  }
}
```



이 정리 사이트 출처 : https://velog.io/@two_jay/Javascript-ES6-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC