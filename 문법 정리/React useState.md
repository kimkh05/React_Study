# React Hooks 정복

Hooks : React V16.8 에 새로 도입된 기능, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 useState, 그리고 렌더링 직후 작업을 설헝하는 useEffect 등의 기능등을 제공하여 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 해줍니다. 

### 1. useState

가장 기본적인 Hook, 함수 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해준다. 만약에 함수형 컴포넌트에서 상태를 관리해야 되는 일이 발생한다면 이 Hook 을 사용하시면 됩니다. 

```React
import React, { useState } from 'react';

const Counter = () => {
    const [value, setValue] = useState(0);
    return (
    	<div>
        	<p>
            	현제 카운터 값은 <b>{value}</b> 입니다. 
            </p>
            <button onClick={() = > setValue(value + 1)}>+1</button>
            <button onClick={() = > setValue(value - 1)}>-1</button>
        </div>
    );
};
```

useState 를 사용할 땐 코드의 상단에서 import 구문을 통하여 불러오고, 다음과 같이 사용합니다. 

```Js
const [value, setValue] = useState[0];
```

이 문법은 배열 비구조화 할당 문법입니다. 밑에 코드는 비구조화 할당의 더 쉬운 예제입니다. 

```Js
const array = ['dog', 'cat', 'sheep'];
const [first, second] = array;
console.log(first, second); // 출력 : dog cat
```

useState Hook 을 이해 해보자면, 이 함수의 파라미터에는 상태의 기본값을 넣어줍니다. 우리는 현재 0을 넣어주었는데, 결국 카운터의 기본값을 0으로 설정하겠다는 의미이다. 이 함수가 호출되고 나면 배열을 반환한다. 그 배열의 첫번째 원소는 상태 값이고,  두번째 원소는 상태를 설정하는 함수이다. 이 함수에 파라미터를 넣어서 호출하게 되면 전달받은 파라미터로 값이 바뀌게 되고 컴포넌트는 정상적으로 리렌더링 됩니다. 

```React
import React from 'react'
import Counter from './Counter';
const App = () => {
    return <Counter />;
};
export default App;
```

![img](https://i.imgur.com/YQDbZiJ.png)

### 1.1 useState 를 여러번 사용하기

하나의 useState 함수는 하나의 상태 값만 관리를 할 수 있기 때문에 만약에 컴포넌트에서 관리해야 할 상태가 여러 개면 useState를 여러 번 사용하시면 됩니다. 

```React
import React, { useState } from 'react';
const Info = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    
    const onChangeName = e => {
        setName(e.target.value);
    };
    const onChangeNickname = e => {
        setNickname(e.target.value);
    };
    
    return(
    	<div>
        	<div>
            	<input value={name} onChange={onChangeName} />
                <input value={nickname} onChange={onChangeNickname} />
            </div>
        </div>
        <div>
        	<div>
            	<b>이름:</b> {name}
            </div>
            <div>
            	<b>닉네임: </b>
                {nickname}
            </div>
        </div>
    );
};
export default Info;
```

밑에 있는 컴포넌트에서 위 컴포넌트를 렌더링하면

```React
import React from 'react';
import Info from './Info';

const App = () => {
    return <Info />
};

export default App;
```

![img](https://i.imgur.com/w4VAmif.png)

관리할 상태가 여러개인 경우에도 useState 를 편하게 관리할 수 있다. 