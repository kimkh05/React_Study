# [React] useRef 로 특정 DOM 선택하기

Js를 사용할 때에는, 우리가 특정 DOM 을 선택해야 하는 상황에 `getElementById` , `querySelector` 같은 DOM Selector 함수를 사용해서 DOM 을 선택한다. 

React를 사용하는 프로젝트에서도 가끔식 DOM을 직접 선택해야 하는 상황이 발생할 때도 있다. 예를 들면 특정 엘리먼트의 크기를 가져와야 한다던지, 스크롤바 위치를 가져오거나 설정해야된다던지, 또는 포커스를 설정해줘야한다던지 등 정말 다양한 상황이 있다. 추가적으로 Video.js, JWPlayer와 같은 HTML5 Video 관련 라이브러리, 또는 D3, chart.js 같은 그래프 관련 라이브러리 등의 외부 라이브러리를 사용해야 할 때에도 특정 DOM 에 적용하기 때문에 DOM 을 선택해야 하는 상황이 발생할 수 있다. 

그 상황에 `ref` 를 사용한다.

함수형 컴포넌트에서 `ref` 를 사용할 때 `useRef` 라는 Hook 함수를 사용한다. 클래스형 컴포넌트에서는 콜백 함수를 사용하거나 `React.createRef` 라는 함수를 사용하는데, 이에 대해서는 나중에 클래스 컴포넌트를 배울 때 다뤄보도록 한다. (참고로, 클래스 컴포넌트를 나중에 다루는 이유는 별로 중요하지 않기 때문.)

```React
import React, { useState, useRef } from 'react';
function InputSample(){
    const [inputs, setInputs]=  useState({
        name:'',
        nickname:''
    });
    const nameInput = useRef();
    const { name, nickname } = inputs;
    // 비구조화 할당을 통해 값 추출
    const onChange = e => {
        const { value, name } = e.target; 
        // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value로 설정함. 
        });
    };
    const onReset = () => {
        setInputs({
            nmae: '',
            nickname: ''
        });
        nameINput.current.focus();
    };
    return(
    	<div>
        	<input
                name="name"
                placeholder="이름"
                onChange={onChange}
                value={name}
                ref={nameInput}
            />
            <input
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
                value={nickname}
            />
            <button onClick={onReset}>초기화</button>
            <div>
            	<b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    );
}
export default InputSample;
```

`useRef()` 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 `ref` 값으로 설정해주어야 한다. 그러면, Ref 객체의 `.current` 값은 우리가 원하는 DOM 을 가르키게 된다.

위 코드에서는 `onReset` 함수에서 input 에 포커스를 하는 `focus()` DOM API를 호출해주었다. 