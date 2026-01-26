// 로컬스토리지에 데이터를 저장하는 예제
if(typeof Storage !== 'undefined') {
  localStorage.setItem('title','위대한개츠비');
}

const users = [
  {id: 1, name: 'lim'},
  {id: 2, name: 'lee'}
]
localStorage.setItem(`users`,JSON.stringify(users))

console.log(users)
console.log(JSON.stringify(users))

// 다시 받아오는 부분
if(typeof Storage !== `undefined`) {
  console.log(localStorage.getItem(`title`))  // key를 통해 value를 확인함
  console.log(localStorage.getItem(`users`))
  // 당연히 `user` key를 불러오더라도
  // 결과값 : [{"id":1,"name":"lim"},{"id":2,"name":"lee"}] 이기는함. 하지만 얘는 기본적으로 string이기 때문에 users[0].id와 같은 연산이 불가능.
  console.log(JSON.parse(localStorage.getItem(`users`)))
}

let users2 =JSON.parse(localStorage.getItem(`users`))
let lim = users2[0].name  // 추가 연산을 한 사례
console.log(lim)

// 지울때 쓰는 메서드는 removeItem(키)
localStorage.removeItem(`title`)
// 이상의 코드까지 가면 localstorage에는 user만 남게 됨.