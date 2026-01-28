/* =========================================
   1. 전역 변수 및 요소 선택
   ========================================= */
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const mainContainer = document.getElementById('main-container'); // HTML ID 확인 필수!

const bearContainer = document.getElementById('bear-container');
const pupils = document.querySelectorAll('.eye-pupil');
const passwordInputs = document.querySelectorAll('.password-input');

/* =========================================
   2. 🐻 곰돌이 인터랙션 로직
   ========================================= */

// 👀 마우스 추적 (눈 굴리기)
document.addEventListener('mousemove', (e) => {
    if (bearContainer.classList.contains('shy')) return; // 부끄러울 땐 눈 고정

    pupils.forEach((pupil) => {
        const rect = pupil.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = Math.min(
            10, 
            Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 5
        );

        const offsetX = Math.cos(angle) * distance;
        const offsetY = Math.sin(angle) * distance;
        pupil.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// 🙈 비밀번호 입력 시 눈 가리기 (Shy Mode)
passwordInputs.forEach(input => {
    input.addEventListener('focus', () => {
        bearContainer.classList.add('shy');
        pupils.forEach(p => p.style.transform = 'translate(0, 0)');
    });
    input.addEventListener('blur', () => {
        bearContainer.classList.remove('shy');
    });
});

// 👋 패널 이동 및 환영 인사 (Welcoming Mode)
signUpButton.addEventListener('click', () => {
    mainContainer.classList.add("right-panel-active");
    bearContainer.classList.add('welcoming');
});

signInButton.addEventListener('click', () => {
    mainContainer.classList.remove("right-panel-active");
    bearContainer.classList.remove('welcoming');
});

/* =========================================
   3. 🛠️ 유틸리티 함수 (토스트, 로딩, 비번토글)
   ========================================= */

// 🍞 토스트 알림 표시
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    const icon = type === 'success' 
        ? '<i class="fa-solid fa-circle-check" style="color:#2ecc71"></i>' 
        : '<i class="fa-solid fa-circle-exclamation" style="color:#e74c3c"></i>';

    toast.className = `toast ${type}`;
    toast.innerHTML = `${icon} <span>${message}</span>`;
    
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ⏳ 버튼 로딩 상태 전환
function setLoading(btn, isLoading) {
    if (isLoading) {
        btn.dataset.originalText = btn.innerText;
        btn.innerText = '처리 중...';
        btn.disabled = true;
    } else {
        btn.innerText = btn.dataset.originalText;
        btn.disabled = false;
    }
}

// 👁️ 비밀번호 보기/숨기기 토글
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        if (input.type === 'password') {
            input.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        }
    });
});

/* =========================================
   4. 📝 폼 제출 및 기능 로직 (Fake Server)
   ========================================= */

// 회원가입 처리
document.getElementById('signUpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    setLoading(btn, true);

    setTimeout(() => {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPass').value;

        // LocalStorage 저장
        const user = { name, email, password };
        localStorage.setItem(email, JSON.stringify(user));

        setLoading(btn, false);
        showToast(`환영합니다, ${name}님! 가입 성공! 🎉`, 'success');
        
        e.target.reset();
        // 로그인 화면으로 복귀
        mainContainer.classList.remove("right-panel-active");
        bearContainer.classList.remove('welcoming');
    }, 1500);
});

// 로그인 처리
document.getElementById('signInForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    setLoading(btn, true);

    setTimeout(() => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPass').value;
        const storedUser = localStorage.getItem(email);

        setLoading(btn, false);

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (password === userData.password) {
                showToast(`${userData.name}님, 로그인 성공! 😎`, 'success');
            } else {
                showToast('비밀번호가 틀렸습니다. ❌', 'error');
            }
        } else {
            showToast('존재하지 않는 계정입니다. 🤷‍♂️', 'error');
        }
    }, 1500);
});