# React `useEffect`

`useEffect` :  React 컴포넌트가 렌더링 될 때 마다 특정 작업을 수행하도록 할 수 있는 Hook. 

클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방하다. 



```React
import React, { useState, useEffect } from 'react';
const Info = () => {
    const [name. setName] = useState('');
    const [nickname, setNickname] = useState('');
    useEffect(() => {
       console.log('렌더링이 완료되었습니다!');
       console.log({
           name,
           nickname
       });
    });
    const onChangeName = e => {
        setName(e.target.value);
    };
    const onChangeNickname = e => {
        setNickName(e.target.value);
    };
    return(
    	(...)
    );
};
export default Info;
```

![img](https://i.imgur.com/q9sshnK.png)

### 마운트 될 때만 실행하고 싶을 때

만약 useEffect 에서 설정한 함수가 컴포넌트가 화면에 가장 처음 렌더링 될 때만 실행되고 업데이트 할 경우에는 실행 할 필요가 없는 경우엔 함수의 두번째 파라미터로 비어있는 배열로 넣어주면 된다. 

```Js
useEffect(() => {
   console.log('마운트 될 때만 실행됩니다.');
}[]);
```

컴포넌트가 처음 나타날 때만 콘솔에 문구가 나타나고 그 이후에는 나타나지 않을 것이다. 

![img](https://i.imgur.com/DxcQXuX.png)

### 특정 값이 업데이트 될 때만 실행하고 싶을 때

useEffect 를 사용할 때 특정 값이 변경이 될 때만 호출하게 하고 싶을 경우도 있을 것입니다. 만약 클래스형 컴포넌트라면 다음과 같이 작성한다. 

```js
componentDidUpdate(prevProps, prevState) {
  if (prevProps.value !== this.props.value) {
    doSomething();  
  }
}
```

위 코드에서는 props 안에 들어있는 value 값이 바뀔 때에만 특정 작업을 수행하도록 했다. 만약 이러한 작업들을 useEffect 에서 해야한다면 어떻게 해야 할까요?

바로, useEffect 의 두번째 파라미터로 전달되는 배열 안에서 검사하고 싶은 값을 넣어주시면 된다. 

```js
useEffect(()=>{
    console.log(name);
}, [name]);
```

배열 안에는 useState를 통해 관리하고 있는 상태를 넣어줘도 되고, props로 전달받은 값을 넣어주어도 된다. 

![img](https://i.imgur.com/ozdTH2M.png)

### 뒷 정리하기

useEffect 는 기본적으로 렌더링 되고난 직후마다 실행되며, 두번째 파라미터 배열에 무엇을 넣느냐에 따라 실행되는 조건이 달라진다. 만약 컴포넌트가 언마운트되기 전이나, 업데이트 되기  직전에 어떠한 작업을 수행하고 싶다면 useEffect 에서 뒷정리(cleanup) 함수를 반환해주어야 한다. 

```js
useEffect(()=>{
    console.log('effect');
    console.log(name);
    return()=> {
        console.log('cleanup');
        console.log(name);
    };
});
```

```React
import React, { useState } from 'react';
import Info from './Info';
const App = () => {
    const [visible, setVisible] = useState(false);
    return(
		<div>
        	<button
                onClick = {()=>{
                    setVisible(!visible);
                }}
            >
            	{visible ? '숨기기':'보이기'}
            </button>
            <hr />
            {visible ? '숨기기' : '보이기'}
        </div>        
    );
};
export default App;
```

다 작성했으면 상단의 보이기 / 숨기기 버튼을 누른다. 

![img](https://i.imgur.com/FNtljyD.png)

컴포넌트가 나타날 때 콘솔에 effect 가 보이고, 사라질 때 cleanup 이 보여지게 됩니다. 

그 다음엔, 한번 인풋에 이름을 적어보고 콘솔에 어떤 결과가 나타나는지 확인해봅시다. 

![img](https://i.imgur.com/iVIkafI.png)

렌더링이 될 때마다 뒷정리 함수가 계속 보여지고 있는 것을 확인할 수 있다. 그리고. 뒷정리 함수가 호출 될 때에는 업테이트 되기 직전의 값을 보여주고 있다. 

만약, 오직 언마운트 될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두번째 파라미터에 비어있는 배열을 넣으시면 됩니다. 

```Js
useEffect(() => {
    console.log('effect');
    console.log(name);
    return () => {
        console.log('cleanup');
        console.log(name);
    };
}, []);
```

