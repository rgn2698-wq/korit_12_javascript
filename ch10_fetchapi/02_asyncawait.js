// 02_asyncawait.js

// fetch() / async의 코드상 비교관련
function myfunc() {
  fetch(`https://jsonplaceholder.typicode.com/posts/1`)
    .then((response) => response.json())
    .then((json) => {console.log(json);})
    };

myfunc();
// 이상의 예시는 Get요청을 해서 서버로부터 응답이 오면 콘솔에 찍는 함수

/**
 * 그런데 서버로 요청을 보내고 응답을 보낸 후에 응답받은 결과를 바탕으로 다시 서버로 요청을 보낸다고 가정했을때는
 */

function myfunc2() {
  fetch(`https://jsonplaceholder.typicode.com/posts/1`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
      method: "PUT",
      body: JSON.stringify({
        id : 1,
        title : '이제슬슬 무슨말인지 모르겠다',
        body : '내가 뭘하고 있는거지',
        userId : 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then((json) => {console.log(json);})
  })
};

myfunc2();
// 위의 예시는 Get요청을 해서 서버로부터 응답이 오면 콘솔에 찍고, 그 응답을 바탕으로 PUT요청을 다시 보내는 함수
// 그런데 이렇게 then()이 중첩되면 코드가 점점 복잡해지고 가독성이 떨어진다.
// 그래서 async/await 문법을 사용하면 더 깔끔하게 작성할 수 있다.

async function myfunc3() {
  const res1 = await fetch(`https://jsonplaceholder.typicode.com/posts/2`);
  const res1json = await res1.json();
  console.log(res1json);
  // 이상은 GET요청. async/await문법으로 작성한 것
  // async / await문법은 동기적으로 작성한 것처럼 보이지만 비동기적으로 작동한다.

  const res2 = await fetch(`https://jsonplaceholder.typicode.com/posts/2`, {
    method: "PUT",
    body: JSON.stringify({
      id: 2,
      title: '아 공부하기 싫다',
      body: '진짜 공부하기 싫다',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const res2json = await res2.json();
  console.log(res2json);
}

myfunc3();