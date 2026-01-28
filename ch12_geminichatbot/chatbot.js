const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loadingIndicator = document.getElementById('loading');
const apiKeyModal = document.getElementById('api-key-modal');
const apiKeyInput = document.getElementById('api-key-input');
const saveKeyBtn = document.getElementById('save-key-btn');

let GOOGLE_API_KEY = ``;

// 1. API 키 저장 기능
saveKeyBtn.addEventListener('click', () => {
  const key = apiKeyInput.value.trim();
  if (key) {
    GOOGLE_API_KEY = key;
    apiKeyModal.style.display = 'none'; // 모달이 닫힘.
  } else {
    alert('유효한 API 키를 입력해주세요.');
  }
});

// 2.메세지 전송 기능
async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  // 1) 사용자 메세지 표시
  appendMessage('user', message);
  userInput.value = ''; // 입력창 초기화

  // 2) 로딩 인디케이터 표시
  showloading(true);

  try {
    // 3) Gemini API 호출(fetchAPI 사용)
    const botResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{
            text: "당신은 10년 차 전문 심리 상담사입니다. 이름은 '닥터 힐링'입니다. 사용자의 고민을 경청하고, 공감하는 태도로 따뜻하게 위로하며 현실적인 조언을 해줍니다. 말투는 정중하고 부드러운 존댓말을 사용하세요."
          }]
        },
        contents: [{
          parts: [{
            text: message
          }]
        }]
      })
    });
    const data = await botResponse.json();

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
    appendMessage('bot', '네크워크 오류가 발생했습니다.');
    } finally {
    // 5) 로딩 인디케이터 숨기기
    showloading(false);
  }
}

function appendMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(`message`, sender);
  messageDiv.classList.add(sender===`user` ? `user-message` : `bot-message`);


  let formattedText = message.replace(/\n/g, '<br>'); // 줄바꿈 처리
  messageDiv.innerHTML = formattedText;

  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight; // 스크롤 최하단으로 이동

}

// 3.로딩 인디케이터 표시/숨기기 기능
function showloading(isLoading) {
  if (isLoading) {
  loadingIndicator.style.display = `block`;
  chatHistory.scrollTop = chatHistory.scrollHeight; // 스크롤 최하단으로 이동
  } else {
    loadingIndicator.style.display = `none`;
  }
}

// 4.이벤트 리스너 설정
sendBtn.addEventListener('click', sendMessage);

// 엔터키 입력시 전송
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
