# [React] 배열에 항목 추가하기

우선, input 두 개와 button 하나로 이루어진 CreateUser.js 라는 컴포넌트를 src 디렉터리에 만들어봅시다. 

#### CreateUser.js

```React
import React from 'react';
function CreateUser({ username, email, onChange, onCreate }){
    return(
    	<div>
        	<input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
}

export default CreateUser;
```

이번 컴포넌트에선 상태관리를 CreateUser 에서 하지 않고 부모 컴포넌트인 App 에서 하게 하고, input 의 값 및 이벤트로 등록할 함수들을 props 로 넘겨받아서 사용해준다.

이 컴포넌트를 App 에서 UserList 위에 렌더링한다. 

#### App.js

```React
import React, { useRef } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App(){
    const users = [
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
    ];
    const nextId = useRef(4);
    const onCreate = () => {
        // 나중에 구현 할 배열에 항목 추가하는 로직
        // ...
        nextId.current += 1;
    };
    return(
    	<>
        	<CreateUser />
        	<UserList users={users} />
        </>
    );
}

export default App;
```

<img src="https://i.imgur.com/vF7iAbP.png" alt="img" style="zoom:80%;" />

CreateUser 컴포넌트에서 필요한 props 를 App 에서 준비한다. 

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
    const users = [
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
    ];
    const nextId = useRef(4);
    const onCreate = () => {
        // 나중에 구현 할 배열에 항목 추가하는 로직
        // ...
        setInputs({
            username: ''.
            email: ''
        });
        nextId.current += 1;
    };
    return(
    	<>
        	<CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
        	<UserList users={users} />
        </>
    );
}

export default App;
```

input 에 값을 입력하고, 등록 버튼을 눌렀을 때 input 값들이 잘 초기화되는지 확인해본다. 

그 다음에는, user 도 `useState` 를 사용하여 컴포넌트의 상태로서 관리해준다.

#### App.js

```React
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

function App() {
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
    const onCreate = () => {
        // 나중에 구현 할 배열에 항목 추가하는 로직
        // ...
        
        setInputs({
            username: '',
            email: ''
        });
        nextId.current += 1;
    };
    return(
    	<>
        	<CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
        	<UserList users={users} />
        </>
    );
}

export default App;
```

배열에 변화를 줄 차례이다. 배열에 변화를 줄 때에는 객체와 마찬가지로, 불변성을 지켜주어야 한다. 그렇기 때문에, 배열의 `push` , `splice` , `sort` 등의 함수를 사용하면 안된다. 만약에 사용해야 한다면 기존의 배열을 한번 복사하고 나서 사용해야 한다. 

불변성을 지키면서 배열에 새 항목을 추가하는 방법은 두가지가 있다.

첫번째는 <a style="text-decoration: none;" href="https://learnjs.vlpt.us/useful/07-spread-and-rest.html#spread">spread연산자</a>를 사용하는 것이다. 

#### App.js

```React
import React, { useRef, useState } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';

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
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    };
    setUsers([...users, user]);

    setInputs({
      username: '',
      email: ''
    });
    nextId.current += 1;
  };
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} />
    </>
  );
}

export default App;
```

새 항목이 잘 등록되었는지 확인한다. 

<img src="https://i.imgur.com/IvCJudR.png" alt="img" style="zoom:80%;" />

두번째 방법으로는 `concat` 함수를 사용하는 것이다. `concat` 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 배열을 만들어준다. 

```react
import React, { useRef, useState } from 'react';
import UserList from './UserList'

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
  const onCreate = () => {
      const user = {
          id: nextId.current,
          username,
          email
      };
      setUsers(users.concat(user));
      setInputs({
          username: '',
          email: ''
      });
      nextId.current += 1;
  };
    return(
        <>
        <CreateUser
            username={username}
            email={email}
            onChange={onChange}
            onCreate={onCreate}
            />
        <UserList users={users} />
        </>
    );
}

export default App;
```

배열에 새 항목을 추가할 때에는 이렇게 spread 연산자를 사용하거나, `concat	` 함수를 사용하면 된다. 