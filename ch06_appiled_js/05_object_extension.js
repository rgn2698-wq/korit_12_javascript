let fName = 'jone'
let lName = 'Doe'
// 변수의 선언과 값 대입이 반 필수

let person = {
  firstName : fName,
  lastName : lName
}

console.log(fName)
console.log(person.firstName)
// console.log(person('firstName'))// key가 string 이라는것을 알수있는 예시.

/**
 * Object 상에서는 변수에 할당된 값을 key로 치환해서 사용하는 것은 불가능함.
 * 
 * 하지만 object literal syntax extension을 사용하면 오브젝트의 키로 변수에 할당된 문제열 값을 사용할수 있음. 대괄호 사용
 * 
 * 
*/

let type = 'student'
let score = {
  [type]: 'Jane',
  score:95,
}

console.log(score.score)
console.log(score)
console.log(score.student)
/**
 * object의 key를 동적으로 생성 가능할 수 있다는 점 : input태그를 통해서 객체의 key를 생성할수 있음.
 * 
 */