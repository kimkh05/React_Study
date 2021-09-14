# React Component Mapping

> ### 1.  JavaScript - Array.prototype.map

`map()` 메소드는 파라미터로 전달 된 함수를 통하여 배열 내의 각 요소를 프로세싱하여 그 결과로 새로운 배열을 생성합니다.

#### 문법

```Js
arr.map(callback, [thisArg])
```

#### 파라미터

callback 새로운 배열의 요소를 생성하는 함수로서, 다음 세 가지 인수를 가집니다. 

​	<strong>currentValue</strong>  현재 처리되고 있는 요소

​	<strong>index</strong> 현재 처리되고 있는 요소의 index 값

​	<strong>array</strong> 메소드가 불려진 배열

<strong>thisArg</strong> (***선택항목*** ) callback 함수 내부에서 사용 할 this값을 설정

### 예제

배열 `[1, 2, 3, 4, 5]` 의 각 요소를 제곱하여 새로운 배열을 생성하는 예제를 살펴봅시다. 

```Js
var numbers = [1, 2, 3, 4, 5];

var processed = numbers.map(function(num){
    return num * num;
});
```

##### 위 코드 실행 결과  : `[1, 4, 9, 16, 25]`

위에 있는 코드를 ES6 문법으로 작성하면 다음과 같습니다. 

```Js
let numbers = [1, 2, 3, 4, 5];
let result = numbers.map((num) => {return num * num});
```



<hr>

### Arrow Function?

​	이 코드에서 `사용된 ( ) = > { }` 은 ES6에 새로 도입된 arrow function 입니다. 

자세한 설명은 Mozilla 참고자료를 참조하세요. 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

<img src = "https://velopert.com/wp-content/uploads/2016/03/%EC%9D%B4%EB%AF%B8%EC%A7%80-5-1.png">

<hr>

> ### 2. 컴포넌트 mapping

이번엔 데이터 배열을 mapping 하여 컴포넌트 배열로 변환하는 과정을 살펴보도록 하겠습니다. 

React.js작업환경 설정되었다는 가정하에 진행하도록 하겠습니다. 

편의상 컴포넌트들을 App.js에 모두 작성하겠습니다. 

**src/components/App.js**

```React
import React from 'react';

class App extends React.Component {
    render( ){
        return(
        	<Contacts/>
        );
    }
}

class Contacts extends React.Component {
    render(){
        return(
        	<div>
            	<h1>Contacts</h1>
                <ul>
                	<li>Abet 010-0000-0001</li>
                    <li>Betty 010-0000-0002</li>
                    <li>Chalie 010-0000-0003</li>
                    <li>David 010-0000-0004</li>
                </ul>
            </div>
        );
    }
}

export default App;
```

전화번호부 기능을 하는 예제 컴포넌트입니다. 

19~22번줄, 비슷한 코드가 보일 것이다. 지금은 당장 큰 문제가 없지만, 저기에 나올 데이터가 유동적이라면? 그때그때 하드코딩하는것은 힘들것이다. 이 문제점을 React 스럽게 해결해보도록 합시다. 

<hr>

### 2.2 ContactInfo 컴포넌트 만들기

**ConstactInfo 클래스 생성 (Contacts 클래스 하단)**

```React
class ContactInfo extends React.Component {
    render(){
        return(
        	<li>{this.props.name} {this.props.phone}</li>
        );
    }
}
```

> 이름과 전화번호가 나타날 부분에 props를 사용하였습니다. 

**Contacts 컴포넌트 렌더링 부분 수정**

```React
	render(){
        return(
        	<div>
            	<h1>Contacts</h1>
                <ul>
                	<ContactInfo name = "Abet" phone = "010-0000-0001"/>
                    <ContactInfo name = "Betty" phone = "010-0000-0002"/>
                    <ContactInfo name = "Charlie" phone = "010-0000-0003"/>
                    <ContactInfo name = "David" phone = "010-0000-0004"/>
                </ul>
            </div>
        );
    }
```

> HTML 코드를 저희가 만든 컴포넌트 형태로 변환하여 작성하였습니다.
>
> 아직 크게 변해진 건 없습니다. 같은 코드를 반복하여 사용하는 건 마찬가지입니다. 

<hr>

### 2.3. mapping

데이터를 매핑해봅시다. 

**기본 state 추가 (Contact 클래스 내부)**

```React
constructor(props) {
    super(props);
    this.state = {
        contactData:[
            {name: "Abet", phone: "010-0000-0001"},
            {name: "Betty", phone: "010-0000-0002"},
            {name: "Charlie", phone: "010-0000-0003"},
            {name: "David", phone: "010-0000-0004"}
        ]
    };
}
```

> state 는 컴포넌트에서 유동적인 데이터를 다룰 때 사용됩니다. 이에 대한 지식이 부족하다면 <a href = "https://velopert.com/921">[React.JS]강좌 5편</a>을 참조하세요. 

**렌더링 부분 배열 mapping 으로 교체**

```React
    render(){
        return(
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (<ContactInfo name={contact.name}
                                            phone={contact.phone}
                                              key={i} 
                                 />);
                    })}
                </ul>
            </div>
        );
    }
```

> 9번 줄에서 key 가 사용되었는데요, 이는 child 컴포넌트에 identity ( 독자성 ) 을 부여해줍시다. 




<hr>

> ### 최종 코드

```React
import React from 'react';

class App extends React.Component {
    render(){

        return (
                <Contacts/>
        );
    }
}

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData: [
                {name: "Abet", phone: "010-0000-0001"},
                {name: "Betty", phone: "010-0000-0002"},
                {name: "Charlie", phone: "010-0000-0003"},
                {name: "David", phone: "010-0000-0004"}
            ]
        };
    }
    render(){
        return(
            <div>
                <h1>Contacts</h1>
                <ul>
                    {this.state.contactData.map((contact, i) => {
                        return (<ContactInfo name={contact.name}
                                            phone={contact.phone}
                                              key={i}/>);
                    })}
                </ul>
            </div>
        );
    }
}

class ContactInfo extends React.Component {
    render() {
        return(
            <li>{this.props.name} {this.props.phone}</li>
            );
    }
}

export default App;
```

> 출력물

<img src = "https://velopert.com/wp-content/uploads/2016/03/%EC%9D%B4%EB%AF%B8%EC%A7%80-8.png">

> ## 이 글 출처

https://velopert.com/957

