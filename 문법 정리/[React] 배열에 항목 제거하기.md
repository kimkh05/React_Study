# [React] 배열에 항목 제거하기

우선, UserList 에서 각 컴포넌트를 보여줄 때, 삭제 버튼을 렌더링해준다.

#### UserList.js

```React
import React from 'react';

function User({ user, onRemove }) {
    return(
    	<div>
        	<b>{user.username}</b> <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}

function UserList({ users, onRemove }) {
    return(
    	<div>
        	{users.map(user => (
            	<User user={user} key={user.id} onRemove={onRemove} />
            ))}
        </div>
    );
}

export default UserList;
```

<img src="https://i.imgur.com/FmnSHXf.png" alt="img" style="zoom: 80%;" />

User 컴포넌트의 삭제 버튼이 클릭 될 때는 `user.id` 값을 앞으로 props 로 받아올 `onRemove` 함수의 파라미터로 넣어서 호출ㄷ해주어야 합니다.

여기서 onRemove "id 가 __인 객체를 삭제해라." 라는 역할을 가지고 있습니다.

이 onRemove 함수는 UserList 에서도 전달 받을 것이며, 이를 그래도 User 컴포넌트에게 전달해줄것입니다.

이제, onRemoe 함수를 구현해보겠습니다. 배열에 있는 항목을 제거할 때에는, 추가할 때와 마찬가지로 불변성을 지켜가면서 업데이트를 해주어야 한다. 

불변성을 지키면서 특정 원소를 배열에서 제거하기 위해서는 `filter` 배열 내장 함수를 사용하는 것이 가장 편합니다. 이 함수는 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만들어준다. 

App 컴포넌트에서 `onRemove` 를 다음과 같이 구현후, UserList 에게 전달한다.

#### App.js

```React
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App(){
    const [inputs, setInputs] = useState({
        username: '',
        email: ''
    });
    const { username, email } = inputs;
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com'
        },
        {
            id: 2,
            username: 'tester',
            email: 'tester@example.com'
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@example.com'
        }
    ]);
    const nextId = useRef(4);
    
}
```

