function getPerson() {
  return{
    fName:'김',
    lName:'영',
    email:'kim0@test.com',
    city:'부산광역시'
  };
}

// 이상의 코드가있을때 email값과 city의 값을 출력

// 실행예
/**
 * 해당 지원자는 부산광역시에 살고 있으며 email은 kim0@test.com 입니다.
 */

// 객체의 추출하고자 하는 key와 동일한 변수를 선언. {}내부
const {email, city} = getPerson();  // 함수 호출결과가 object니까 변수에 대입.
console.log(`해당 지원자는 ${city}에 살고있으며 email은 ${email} 입니다`) // 객체명.key값을 통해서 해당 value를 호출

let kimEmail = getPerson().email; // 객체의
let kimCity = getPerson().city;
console.log(`해당 지원자는 ${kimCity}에 살고있으며 email은 ${kimEmail} 입니다`)

function displayFullName({fName,lName}) {
  console.log(`${fName} ${lName}`)
}

displayFullName(getPerson()) // 그러면 arugment로는 key로 fName / lName을 가지고 있는 애가 필수적으로 요구됨. - 호출시이ㅡ arugment와 정의 시의 매개변수의 차이점에 주목. -> React에서 허구한 날 쓰이기 때문에 꼭 알아둬야함.