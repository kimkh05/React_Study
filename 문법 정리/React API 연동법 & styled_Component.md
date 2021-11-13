# React API 연동법

axios 사용

```js
axios({
    method,
    url: BASE_URL + url,
    headers,
    data,
  })
    .then((res) => { // 데이터가 맞다면 실행
      return res.data;
    })
    .catch((err) => { // 오류가 있으면 오류 실행
      throw err;
    });
```





#  React 컴포넌트 꾸미기

css 사용해도 되지만 style component를 많이 사용한다.

하는 방법

1. React 파일을 만든다.
2. src 파일을 연 후 components라는 파일을 만들어준다.
3. 아무 이름의 폴더를 components 파일 안에 생성시킨다,
4.  style.js를 생성한다.

style component 사용 방법

```React
import styled from "styled-components"
export const exampleTag = style.div`
	css 문법을 사용함.
`;
```

```React
import * as S from './style';
const Test = () => {
    return(
    	<>
        	<exampleTag>
        		// code 작성
        	</exampleTag>
        </>
    )
}

export default Test;
```

