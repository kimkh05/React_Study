# React useContext, useReducer

1. ## useContext

   이 hook 을 사용하면 함수형 컴포넌트에서 Context 를 보다 더 쉽게 사용할 수 있다. 

   ```React
   import React, { createContext, useContext } from 'react';
   const ThemeContext = createContext('black');
   const ContextSample = () => {
       const theme = useContext(ThemeContext);
       const style = {
           width: '24px'
           height: '24px'
           background: theme
       };
       return <div style={style} />;
   };
   export default ContextSample;
   ```

   ```js
   import React from 'react';
   import ContextSample from './ContextSample';
   
   const App = () => {
       return <ContextSample />;
   };
   export default App;
   ```

   실행 결과

   ![img](https://i.imgur.com/5UGqVnm.png)

   2. ## useReducer

      useState 보다 컴포넌트에서 더 다양한 상황에 따라 다양한 상태를 다른 값으로 업데이트해주고 싶을 때 사용하는 Hook.

      리듀서는 현생 상태와, 업데이트를 위해 필요한 정보를 담은 액션(action) 값을 전달 받아 새로운 상태를 반환하는 함수이다. 리듀서 함수에서 새로운 상태를 만들 때는 꼭 불변성을 지켜주어야 한다. 

      ```js
      function reducer(state, action) {
          return{ ... };
          // 불변성을 지키면서 업데이트한 새로운 상태를 반환함.
      }
      ```

      액션값은 주로 다음과 같은 형태로 이루어져 있다. 

      ```js
      {
      type:'INCREMENT',
      // 다른 값들이 필요하다면, 추가적으로 들어간다. 
      }
      ```

      Redux 에서는 액션 객체에는 어떤 액션인지 알려주는 type 필드가 꼭 있어야 하지만, useReducer 에서 사용하는 액션 객체는 꼭 type 를 지니고 있을 필요가 없다. 심지어, 객체가 아니라 문자열이나 숫자여도 상관없다. 

      ### 2.1 카운터 구현하기

      ```React
      import React, { useReducer } from 'react';
      function reducer(state, action) {
          // action.type 에 따라 다른 작업을 수행한다. 
          switch(action.type) {
              case 'INCREMENT' :
                  return { value: state.value + 1};
              case 'DECREMENT' :
                  return { value: state.value - 1};
              default:
                  // 아무것도 해당되지 않을 때 기존 상태 반환한다. 
                  return state;
          }
      }
      const Counter = () => {
          const [state, dispatch] = useReducer(reducer, { value: 0 });
          return(
          	<div>
              	<p>
                  	현재 카운터 값은 <b>{state.value}</b> 입니다.
                  </p>
                  <button onClick={()=> dispatch({type: 'INCREMENT' })}>+1</button>
                  <button onClick={()=> dispatch({type: 'DECREMENT' })}>-1</button>
              </div>
          );
      };
      export default Counter;
      ```

      useReducer 의 첫번째 파라미터는 리듀서 함수, 그리고 두번째 파라미터는 해당 리듀서의 기본 값을 넣어준다. 이 Hook 을 사용 했을 때에는 state 값과 dispatch 함수를 받아오게 된다. 여기서 state는 현재 가르키고 있는 상태이고, dispatch 는 액션을 발생시키는 함수이다. dispatch(action) 와 같은 형태로, 함수 안에서 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출되는 구조이다. 

      useReducer 을 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 점이다. 

      ```js
      import React from 'react';
      import Counter from './Counter';
      
      const App = () => {
          return <Counter />;
      };
      export default App;
      ```

      ### 4.2 인풋 상태 관리하기

      useReducer 를 사용하여 Info 컴포넌트에서 인풋 상태를 관리해보겠습니다.

      기존에는 인풋이 여러 개여서 useState 를 여러번 사용했는데요, useReducer 를 사용한다면 우리가 기존에 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name 을 참고하여 setState 를 해준 것과 유사한 방식으로 작업을 처리 할 수 있습니다. 

      ```React
      import React, { useReducer } from 'react';
      function reducer(state, action) {
          return{
              ...state,
              [action.name]:action.value
          };
      }
      const Info = () => {
          const [state, dispatch] = useReducer(reducer, {
              name: '',
              nickname: ''
          });
          const { name, nickname } = state;
          const onChange = e => {
              dispatch(e.target);
          };
          return(
          	<div>
              	<div>
                  	<input name="name" value={name} onChange={onChange} />
                      <input name="nickname" value={nickname} onChange={onChange} />
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
              </div>
          );
      };
      export default Info;
      ```

      useReducer 에서 액션은 그 어떤 값이 되어도 된다. 그래서 이번에 우리는 이벤트 객체를 지니고 있는 e.target 값 자체를 액션 값으로 사용하였다. 

      이런 식으로 인풋을 관리하면, 아무리 인풋의 개수가 많아져도 코드를 짧고 깔끔하게 유지할 수 있다. 

      ```js
      import React from 'react';
      import Info from './Info';
      const App = () => {
          return <Info />;
      };
      export default App;
      ```

      

