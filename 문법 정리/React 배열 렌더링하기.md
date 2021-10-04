# React 배열 렌더링하기

```js
const users = [
    {
        id : 1,
        username : 'velopert',
        email : 'public.velopert@gmail.com'
    },
    {
        id : 2,
        username : 'tester',
        email : 'tester@example.com'
    },
    {
        id : 3,
        username : 'liz',
        email : 'liz@example.com'
    }
];
```

만약에 이 내용을 컴포넌트로 렌더링한다면 어떻게 해야 할까요?

일단, 가장 기본적인 방법으론 비효율적이지만, 그냥 그대로 코드를 작성하는 것 입니다. 

src 디렉터리에 UserList.js 컴포넌트를 다음과 같이 만들어보세요.

### UserList.js

```React
import React from 'react';
function UserList() {
    const users = [
        {
            id : 1,
            username : 'velopert',
            email : 'public.velopert@gmail.com'
        },
        {
            id : 2,
            username : 'tester',
            email : 'tester@example.com'
        },
        {
            id : 3,
            username : 'liz',
            email : 'liz@example.com'
        }
    ];
    return(
    	<div>
        	<div>
            	<b>{users[0].username}</b> <span>({users[0].email})</span>
            </div>
            <div>
            	<b>{users[1].username}</b> <span>({users[1].email})</span>
            </div>
            <div>
            	<b>{users[2].username}</b> <span>({users[2].email})</span>
            </div>
        </div>
    );
}
export default UserList;
```

그런데, 재사용되는 코드를 일일히 넣는 것이 별로 좋지 않으니, 컴포넌트를 재사용할 수 있도록 새로 만든다.

참고로, 하나의 파일에 여러개의 컴포넌트를 선언해도 괜찮다.

### UserList.js

```React
import React from 'react';
function User({ user }) {
    return (
    	<div>
        	<b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}

function UserList() {
    const users = [
        {
            id : 1,
            username : 'velopert',
            email : 'public.velopert@gmail.com'
        },
        {
            id : 2,
            username : 'tester',
            email : 'tester@example.com'
        },
        {
            id : 3,
            username : 'liz',
            email : 'liz@example.com'
        }
    ];
    return(
    	<div>
        	<User user={users[0]} />
            <User user={users[1]} />
            <User user={users[2]} />
        </div>
    );
}
export default UserList;
```

<img src="https://i.imgur.com/DtbthZm.png" alt="img" style="zoom:80%;" />

배열이 고정적이라면 상관없겠지만, 배열의 인덱스를 하나하나 조회해가면서 렌더링하는 방법은 동적인 배열을 렌더링하지 못한다. 

동적인 배열을 렌더링 할때에는 js 배열의 내장함수 `map()` 을 사용한다.

`map()` 함수는 배열안에 있는 각 원소를 변환하여 새로운 배열을 만든다. React에서 동적인 배열을 렌더링해야 할 때는 함수를 사용하여 일반 데이터배열을 React Element로 이루어진 배열로 변환해주면 된다. 