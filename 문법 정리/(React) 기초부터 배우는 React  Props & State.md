# (React) 기초부터 배우는 React : Props & State

<hr>

`Props`와 `State`는 리액트에서 데이터를 다룰 때 사용하는 개념이다. 

<hr>

### State

`State` 는 하나의 컴포넌트가 가질 수 있는 변경 가능한 데이터이다. 컴포넌트를 렌더링 할 때 새로운 데이터를 생성해야 한다던지, 아니면 기존의 데이터를 참고하여 새로운 데이터를 만들어야 할 때 사용할 수 있다. 

```React
import React, { component } from 'react';

class App extends Component {
    state = {
        hello: 'hello app js!'
    };
	render(){
        return <div className = "App">{this.state.hello}</div>
    }
}
export default App;
```

리턴 값 중 중괄호로 감싸진 `this.state.hello` 부분이 hello app.js!라는 문자열이 들어가 있는 `State` 변수가 되는 것이다. `State` 뿐만 아니라 JSX에 변수를 넣을 때에는 중괄호{ }에 담아야 한다는 사실을 꼭 기억해야 한다. 

```React
import React, { component } from 'react';

class App extends Component {
    state = {
        hello: 'hello app js!'
    };
	handleChange = () => {
        thos.setState({
            hello: 'bye app js!'
        });
    };
	render(){
        return(
        	<div className = "App">
            	<div>{this.state.hello}</div>
                <button onClick = {this.handleChange}>click me!</button>
            </div>
        );
    }
}
export default App;
```

브라우저에 click me!라는 버튼이 있고, 클릭하면 문자열인 hello app js!가 bye app js!라는 문자열로 바뀌게 된다. 그렇게 되면 JSX에서 hello를 보여주는 부분이 bye app js!로 보여주게 된다. 



HTML에서 버튼에 click이벤트를 줄때에는, onClick 이벤트를 추가해 함수를 전달하곤 했었는데, React에서도 기본적인 메소드 이름은 같다. ** 한가지 유의해야 할 점은, 앞으로 우리가 사용하게 될 이벤트들의 이름은 `camelCase`를 사용한다는 것이다. 



React에서 이벤트를 줄 때는 함수를 실행해서는 안된다. `this.handleChange( )`처럼 함수를 붙이면,  JSX가 HTML로 바뀌는 과정에서 함수가 실행되어 버리기 때문에 `this.handleChange` 로 함수를 호출하는 해야한다. 

<hr>

### Props

```React
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDOM.render(
	<App message = "Hello Message" />, 
    document.getElementById('root')
);
```

index.js 코드를 보면 message라는 변수를 App.js가 Props로 사용할 수 있게 전달해주고 있다. 상속을 시켜준 것이다. 이렇게 받은 message라는 문자열을 App.js에서는 이렇게 사용할 수 있다. 

```React
import React, { component } from 'react';

class App extends Component {
    state = {
        count:0, 
    },
    handleChange = ( ) => {
        this.setState({
            count: this.state.count + 1,
        });
    };
	render(){
        <div className = "App">
        	<div className = "props">
                {/*props가 들어가는 부분!*/}
            	<span>{this.props.message}</span>
            </div>
            <div className = "state">
            	{/*State가 들어가는 부분!*/}
                {this.state.count}
                <button onClick = {this.handleChange}>Click me!</button>
            </div>
        </div>
    }
}
export default App;
```

this.props.message, App.js 에서는 state를 사용하듯이 사용하면 된다. 다만, Props는 state처럼 변결할 수 없다는 점을 꼭 기억해야 한다. 하지만 Props를 절대로 변결할 수 없는 것은 아니다. App.js에 다른 컴포넌트를 상속시켜서 Props를 변경해볼 수 있다. 

```React
import React, { component } from 'react';
class App extends Component {
    state = {
        count: 0,
    },
    
    handleChange = ( ) => {
        this.setState({
            count:this.state.count + 1,
        });
    };
	render(){
        <div className = "App">
        	<div className = "props">
            	{/*props가 들어가는 부분!*/}
                <span>{this.props.message}</span>
            </div>
            <div className = "state">
            	{/*state가 들어가는 부분!*/}
                {this.state.count}
                <button onClick = {this.handleChange}>Click me!</button>
            </div>
            <h3>App Props</h3>
            <div className = "inside-app-props">
            	<insideApp
                    count={this.state.count}
                    handleChange={this.handleChange}
                />
            </div>
        </div>
    }
}
class InsideApp extends component {
    render(){
        return(
        	<div>
            	{this.props.count}
                <button onClick = {this.props.handleChange}>Click me!</button>
            </div>
        );
    }
}
export default App;
```

먼저 InsideApp이라는 컴포넌트를 하나 생성했다. 그리고 App.js에서 InsideApp를 컴포넌트를 받아오고, 그 때 App 컴포넌트의 state와 메소드인 count와 handleChange를 상속시켜 주었다. 크롬을 실행하면 다음과 같은 html이 보이게 된다. 

<img src = "https://media.vlpt.us/images/yunsungyang-omc/post/c470719a-f764-4966-8144-ef47b8f8fc1f/Screen%20Shot%202021-04-09%20at%201.17.13%20AM.jpg">

테스트를 해보면 두 개의 어떤 버튼을 클릭해도 State의 숫자와 AppProps의 숫자 모두 1씩 증가하게 된다. 



코드를 살펴보면, InsideApp 컴포넌트에 App 컴포넌트의 state인 count와 App 컴포넌트의 메소드인 handleChange를 상속시켜 주었다. 그렇기 때문에, 두 개의 버튼 중 어떤 버튼을 클릭하던지 App 컴포넌트의 state인 count가 증가하게 되어, Props인 count가 +1되는 것이다. 



Props를 직접적으로 변경이 불가능하지만 이런 식으로 상위 컴퍼넌트에서 state를 변경하는 메서드를 Props로 끌어옴으로써 간접적으로 변경이 가능하다. 



<hr>

### 요약

```NULL
## 요약

1. State는 현재 컴포넌트 내에서 변경이 가능하다. 
2. Props는 현재 컴포넌트 내에서 변경이 불가능하다. 
3, Props와 State 모두 하위 컴포넌트에 상속이 가능하다. 
```



출처 : https://velog.io/@yunsungyang-omc/React-%EA%B8%B0%EC%B4%88%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-React-Props-State