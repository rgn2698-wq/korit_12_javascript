const startBtn = document.querySelector(".start_btn");
const modalBtn = document.querySelector(".modal_btn");
const closeBtn = document.querySelector(".close_btn");
const shareBtn = document.querySelector(".share_btn");
const resultSection = document.querySelector(".result");
const loadingSection = document.querySelector(".result_loading");
const modalSection = document.querySelector("#modal");
const inputs = document.querySelector(".inputs");

const fieldInput = document.querySelector("#field_value");
const timeInput = document.querySelector("#time_value");
const fieldResult = document.querySelector(".field_result");
const timeResult = document.querySelector(".time_result");


function calculate() {
    const field = fieldInput.value;
    const time = Number(timeInput.value);


    if(field === "") {
        alert("어떤 분야의 전문가가 되고 싶으신가요?");
        fieldInput.focus();
        return;
    } 
    if(time <= 0 || time > 24) {
        alert("훈련 시간은 1시간 이상 24시간 이하로 입력해 주세요.");
        timeInput.focus();
        return;
    }

    const days = Math.ceil(10000 / time);


    loadingSection.style.display = "block";
    resultSection.style.display = "none";


    setTimeout(function() {
        loadingSection.style.display = "none";
        resultSection.style.display = "flex";
        

        fieldResult.innerText = field;
        timeResult.innerText = days;
    }, 1500);
}


function openModal() {
    modalSection.style.display = "flex";
}

function closeModal() {
    modalSection.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modalSection) {
        closeModal();
    }
}


function copyUrl() {
    const url = window.location.href;
    

    navigator.clipboard.writeText(url).then(() => {
        alert("URL이 복사되었습니다.");
    }).catch(err => {
        alert("URL 복사에 실패했습니다.");
    });
}


startBtn.addEventListener("click", calculate);
modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
shareBtn.addEventListener("click", copyUrl);