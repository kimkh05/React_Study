# [React] JSX 문법 정리

1.  Fragment

   `JSX`는 형제 노드를 가질 수 없기 때문에 부모 요소로 감싸져야만 한다. `<fragment>`를 사용하면 무분별한 div의 남용을 막을 수 있다. 하지만 되도록이면 `header`, `ul`과 같은 의미있는 태그를 쓰도록 합시다. 

   `<>` / `</>`로 사용해도 괜찮다. 

   ```React
   import React, {Component, Fragment} from "react";
   class App extends Component {
       render(){
           return(
    			<Fragment>
               	<h1>Hello</h1>
                   <h2>React!</h2>
               </Fragment>
           );
       }
   }
   ```

2.  Js 표현식

   자바스크립트 변수 혹은 표현식을 쓰려면 `{ }`로 감싸주어야 한다. 

   ```React
   class App extends Component{
       render(){
           const name = "Som";
           return(
           	<fragment>
               	<h1>Hello</h1>
                   <h2>{name}!</h2>
               </fragment>
           );
       }
   }
   ```

3.  조건식

   1 - ternary operator

   ​	`JSX` 에서 if 문은 사용 불가하다.

   ​	`{ }` 안에서 ternary operator 를 사용하거나 `JSX`  밖에서 if 문을 사용하면 된다. 

   ```React
   class App extends Component {
       render() {
           const condition = true;
           return(
           	<fragment>
               	<h1>condition 이</h1>
                   <h2>{condition ? 'true' : 'false'}</h2>
               </fragment>
           );
       }
   }
   ```

   2 - &&

   간단히 말해서 굳이 else 쪽은 쓰지 않아도 될 때 쓰면 된다. 

   ```React
   <h1>condition 이 true 일 때만 보이게 해야지</h1>
   <h2>{condition && 'true'}</h2>
   ```

4.  className

   리액트, 아니 엄밀히 말하면 자바스크립트에는 이미 `class` 가 존재한다.

   따라서 `JSX` 에서는 `className` 으로 설정해줘야 한다.

   콘솔창을 확인해보면 `html` 단에서는 `class` 로 나와있는 것을 확인할 수 있다. 

   ```react
   class App extends Component {
       render( ) {
           return(
           <div className = "greetings">
           	<h1>Hello</h1>
               <h2>React!</h2>
           </div>
           );
       }
   }
   ```

   ```html
   <div class = "greetings">
       <h1>Hello</h1>
       <h2>React!</h2>
   </div>
   ```

5.  태그 닫기

   닫지 않는 태그는 Virtual DOM 에서 트리 형태의 구조를 만들지 못한다.

   `JSX` 에서는 항상 태그를 닫아주도록 하자.

   ```html
   <form>
     이름: <input type="text" name="full__name" />
     <br />
     이러면 오류나요: <input type="text" name="error">
   </form>
   ```

6.  주석

   단축기를 사용하는 사람이 많이 없지만 사용하는 사람들도 많다. 왜냐하면 알아보기 옆에 주석을 보면서 어느 부분인지 잘 알 수 있기 때문이다. `self - closed` 태그에서는 일반 주석문도 사용이 가능하다. 

   ```javascript
   return (
     <div className="greetings">
       {/* 아것이 JSX 주석입니다 */}
       <h1>이름:</h1>
       <input type="text" name="full__name" 
       // self-closed 태그에서는 일반 자스 주석문 사용 가능
       /* 당연히 이것도 가능 */
       />
     </div>
   );
   ```

출처 : https://velog.io/@somprk/JSX-%EB%AC%B8%EB%B2%95-%EC%A0%95%EB%A6%AC

