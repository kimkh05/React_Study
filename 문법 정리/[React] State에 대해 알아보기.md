# React State 사용

단순히 컴포넌트에서 데이터를 받아 올 경우 props를 이용했다면, 우린 State는 함수 내부에서 선언하는 ㄴ변수처럼 해당 값을 우리가 원하는 대로 변경하여 사용하는 것이 가능해진다. 

<hr>

### 기존 코드 복습하기

성과 이름을 보내서 화면에 특정 사용자 이름이 들어올 경우 Hello, 뒤에 특성 사용자의 이름을 넣어서 보여주었다. 

```React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class HelloWorld extends React.Component {
    render(){
        return <h1>Hello, {obj.lastname}{obj.name}</h1>;
    }
}
ReactDOM.render(
	<HelloWorld name = "JiNa" lastName = "Kim" />,
    document.getElementById('root')
);
```

이처럼 props를 이용하면 함수의 매개변수처럼 데이터 전달을 할 수 있었다. 하지만 우리가 늘 필요한 코드는 고정적인 값이 아니라 계속해서 변하는 데이터일 수도 있다. 이럴 경우에 이용해야 하는 것은 Props가 아닌 State이다. 



**State 초기 값 설정하기**

State는 컴포넌트 내 초기값 설정이 가능하다. 

컴포넌트에서 State 초기값을 설정하기 위해서는 `constructor()`  이용한다. 

`constructor()` 는 해당 컴포넌트가 실행되면 가장 먼저 호출이 된다.

```React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            user : 'visitor'
        }
    }
    render(){
        return <h1>Hello {this.state.user}!</h1>;
    }
}
ReactDOM.render(
	<Counter/>,
    document.getElementById('root')
);
```

**Super(props)의 필요성**

constructor 내부 코드 중 props 변수를 받아 super(props)를 선언해주는 걸 볼 수 있다. 

class 내 super라는 메서드는 기존의 정의된 class의 값을 가져와 해당 class에서도 사용할 수 있게 해주는 method이다.

컴포넌트 실행 시 this.props 생성자가 필수로 필요하기 때문에 constructor를 이용할 경우에는 반드시 super메서드를 이용해 props 생성자를 호출해주자. 

이 해당 코드는 반드시 입력해줘야 오류 없이 컴포넌트가 실행된다.

**render() 내 state 호출 방법**

설정한 초기 값을 render()에서 호출할 때는 {} 중괄호 안에 넣어줘서 사용할 수 있다. 

위 코드 중 {this.state.user}라는 형식으로 만들어준 초기 값을 가져왔다.



해당 코드를 실행 시 화면 내 Hello Visitor! 가 뜨는 것을 확인 할 수 있다. 



**State Uptate 해보기**

초기값으로 만들어진 State 값은 setState()라는 컴포넌트를 이용하면 업데이트가 가능하다. react 내에서는 해당 코드가 실행되어 State값이 변경되면 컴포넌트를 리 랜더링 시킨다.

 우리는 버튼을 하나 추가해서 이름을 setState()를 이용해서 이름을 바꿔줘 보도록 한다. 

```React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Counter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
         	user: 'visitor'
        }
    }
    render(){
        return <div>
        	<h1>Hello, {this.state.user}!</h1>
            <button onClick={()=> this.setState({user:"KyeongHoKim"})}>I know your Name! </button>
        	</div>;
    }
}
ReactDom.render(
	<Counter/>, 
    document.getElementById('root')
);
```

해당 코드 실행 화면이다. 

![img](https://blog.kakaocdn.net/dn/XEq4I/btqUwxj97b8/3t3w0ciQo6t06vCAoY8IXK/img.gif)

이 정리 사이트 출처 : https://ordinary-code.tistory.com/36?category=957304