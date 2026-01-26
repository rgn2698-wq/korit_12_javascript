let arr1 = [4,5,6]
let arr2 = [1,2,3]
let arr3 = [...arr2, ...arr1]
console.log(arr3) // 결과값 : [ 1, 2, 3, 4, 5, 6 ]
/*
배열, 문자열과 같이 iteration(반복가능자료)형 형태의 데이터를 element 하나하나로 분해해서 사용이 가능
arr1 ,2 는 자료형이 배열 -> ...arr1 / ...arr2 는 자료형이 배열이 아님
4,5,6 이라는 각각의 element와 1,2,3 이라는 각각의 element임. 즉 자료형을 착각하기가 쉬움.

아까 ...args라고 했을때 spread 연산자가 도입되어있음.
*/


let cd = 'CD'
let alphabets = ['A', 'B', ...cd] // 스프레드 연산자의 작성 순서도 중요
console.log(alphabets)
/**
 * 그럼 alphabets 내부의 element를 소문자로 바꾸고 싶다면 뱌누로 들어가서 .toLowerCase()를 적용.
 * 
 */

for (let i = 0; i < alphabets.length; i++) {
  console.log(alphabets[i].toLowerCase())
}
// 어떤 for문을 쓸것인가 in / of
console.log('향상된 for-of문 사용')
for (let alphabets of alphabets) {
  console.log(alphabets.toLowerCase())
}