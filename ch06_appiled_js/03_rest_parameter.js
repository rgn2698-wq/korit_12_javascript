function sum(x1, x2) {
  let y = x1 +x2;
  return y;
}

console.log(sum(5,7));

function sum(x1, x2, x3, x4) {
  let y = x1 +x2 + x3 +x4
  return y;
}

console.log(sum(5,7,1,3));
/*
  *일반적인 함수 정의는 매개변수를 몇개 선언할지 미리 지정하게 됨. 2개 지정하면 무조건 arugment가 두개 필요하고 4개 지정하면 4개의 argument가 필요함.
  즉 정해진 arugment를 충족하는 선에서 개발자가 머리써서 몇번 호출할지를 고민해야 됨. 범위를 벗어나게 되면 계산 자체가 불가능할 수도 있음

  -> 이상의 문제를 해결하기 위한것이 Rest parameter의 개념.
  전달될지 모르는 경우에 사용.
*/

function sum3(...args) {  // 매배견수를 이렇게 설정하면, 함수 호출시 매개변수 개수에 상관없이 할당이 가능하고, 이렇게 지정된 값은 '배열'로 지정됨.
  let total =0;
  for (let x of args) {
    total += x;
  }
  return total;
}

console.log(sum3(1,2,3,4,5,6,7,8,9,10));
console.log(sum3(1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10));
console.log(sum3(1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10,1,2,3,4,5,6,7,8,9,10));

