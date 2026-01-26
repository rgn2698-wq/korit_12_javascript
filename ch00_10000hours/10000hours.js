const fieldInput = document.getElementById('field-input');
const timeInput = document.getElementById('time-input');
const calcBtn = document.getElementById('calc-btn');
const loadingSection = document.getElementById('loading');
const resultSection = document.getElementById('result');
const resultField = document.getElementById('result-field');
const resultDays = document.getElementById('result-days');

// 2. 계산 함수
function calculate() {
    const field = fieldInput.value;
    const time = parseInt(timeInput.value);

    // 유효성 검사
    if(field === "") {
        alert("입력 되지 않았습니다.");
        fieldInput.focus();
        return;
    }
    if(isNaN(time) || time <= 0 || time > 24) {
        alert("시간이 제대로 입력되지않았습니다.");
        timeInput.focus();
        return;
    }

    // 1만 시간 계산 로직
    const days = Math.ceil(10000 / time);

    // 3. 연출
    loadingSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    
    // 버튼 숨기기
    calcBtn.style.display = 'none'; 

    setTimeout(function() {
        loadingSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        resultField.innerText = field;
        resultDays.innerText = days;
    }, 1500);
}

// 4. 클릭 이벤트 연결
calcBtn.addEventListener('click', calculate);