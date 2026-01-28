const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loadingIndicator = document.getElementById('loading');
const apiKeyModal = document.getElementById('api-key-modal');
const apiKeyInput = document.getElementById('api-key-input');
const saveKeyBtn = document.getElementById('save-key-btn');

let GOOGLE_API_KEY = ``;

// 요청 제한 관리를 위한 변수들
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2초 (무료 플랜: 분당 15회 = 4초마다 1회, 여유있게 2초로 설정)
let isRequesting = false; // 현재 요청 중인지 확인

// 1. API 키 저장 기능
saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    GOOGLE_API_KEY = key;
    apiKeyModal.style.display = 'none';
  } else {
    alert('유효한 API 키를 입력해주세요.');
  }
});

// 2. 메시지 전송 기능
async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  // 이미 요청 중이면 무시
  if (isRequesting) {
    appendMessage('bot', '이전 요청을 처리하는 중입니다. 잠시만 기다려주세요.');
    return;
  }

  // 마지막 요청으로부터 경과 시간 확인
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = Math.ceil((MIN_REQUEST_INTERVAL - timeSinceLastRequest) / 1000);
    appendMessage('bot', `너무 빠르게 요청하셨습니다. ${waitTime}초 후에 다시 시도해주세요.`);
    return;
  }

  // 1) 사용자 메시지 표시
  appendMessage('user', message);
  userInput.value = ''; // 입력창 초기화

  // 2) 로딩 인디케이터 표시
  showloading(true);
  isRequesting = true;
  lastRequestTime = now;

  try {
    // 3) Gemini API 호출
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: message
          }]
        }]
      })
    });

    const data = await response.json();

    // 429 에러 처리
    if (response.status === 429) {
      appendMessage('bot', '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요. (약 1분 대기)');
      return;
    }

    // 4) 봇 응답 표시
    if (data.candidates && data.candidates[0].content) {
      const botResponse = data.candidates[0].content.parts[0].text;
      appendMessage('bot', botResponse);
    } else {
      appendMessage('bot', '죄송합니다. 응답을 받을 수 없습니다.');
      console.log(`Error : `, data);
    }
  } catch (error) {
    console.log('Fetch error : ', error);
    appendMessage('bot', '네트워크 오류가 발생했습니다.');
  } finally {
    // 5) 로딩 인디케이터 숨기기
    showloading(false);
    isRequesting = false;
  }
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(`message`, sender);
  messageDiv.classList.add(sender === `user` ? `user-message` : `bot-message`);

  let formattedText = message.replace(/\n/g, '<br>'); // 줄바꿈 처리
  messageDiv.innerHTML = formattedText;

  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight; // 스크롤 최하단으로 이동
}

// 3. 로딩 인디케이터 표시/숨기기 기능
function showloading(isLoading) {
  if (isLoading) {
    loadingIndicator.style.display = `block`;
    sendBtn.disabled = true; // 전송 버튼 비활성화
    chatHistory.scrollTop = chatHistory.scrollHeight;
  } else {
    loadingIndicator.style.display = `none`;
    sendBtn.disabled = false; // 전송 버튼 활성화
  }
}

// 4. 이벤트 리스너 설정
sendBtn.addEventListener('click', sendMessage);

// 엔터키 입력시 전송
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});