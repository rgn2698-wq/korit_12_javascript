const itemInput = document.getElementById('item-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.getElementById('add-btn');
const tableBody = document.getElementById('shopping-list-body');
const totalPriceSpan = document.getElementById('total-price');
const clearBtn = document.getElementById('clear-btn'); // 버튼 가져오기

itemInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') priceInput.focus(); });
priceInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') addItem(); });
addBtn.addEventListener('click', addItem);

// ✨ 전체 삭제 기능 추가 ✨
clearBtn.addEventListener('click', () => {
    // 리스트가 비어있으면 굳이 물어볼 필요 없지!
    if (tableBody.children.length === 0) {
        alert("삭제할 보급품이 없습니다. 텅 비었어요! 🌑");
        return;
    }

    // 진짜 지울 건지 물어보기 (안전장치)
    if (confirm("정말 모든 보급품 리스트를 블랙홀로 보내버릴까요? 🌪️")) {
        tableBody.innerHTML = ''; // 테이블 내용 싹 지우기
        updateTotal(); // 가격 0으로 초기화
    }
});

function addItem() {
    const itemName = itemInput.value.trim();
    const itemPrice = Number(priceInput.value);

    if (itemName === '' || itemPrice <= 0) {
        alert('올바른 정보를 입력해주세요.');
        return;
    }

    const rows = tableBody.querySelectorAll('tr');
    let isDuplicate = false;

    for (let row of rows) {
        const nameCell = row.querySelector('.name-cell');
        
        if (nameCell.innerText === itemName) {
            const priceCell = row.querySelector('.price-cell');
            const currentPrice = Number(priceCell.innerText.replace(/[^0-9]/g, ''));
            const newPrice = currentPrice + itemPrice;
            
            priceCell.innerText = newPrice.toLocaleString();
            
            row.style.backgroundColor = "rgba(255, 215, 0, 0.2)";
            setTimeout(() => { row.style.backgroundColor = "transparent"; }, 500);
            
            isDuplicate = true;
            break; 
        }
    }

    if (!isDuplicate) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="name-cell">${itemName}</td>
            <td class="price-cell">${itemPrice.toLocaleString()}</td>
            <td>
                <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        `;

        tr.querySelector('.delete-btn').addEventListener('click', () => {
            tr.remove();
            updateTotal();
        });

        tableBody.appendChild(tr);
        tr.scrollIntoView({ behavior: 'smooth' });
    }
    
    itemInput.value = '';
    priceInput.value = '';
    itemInput.focus();
    updateTotal();
}

function updateTotal() {
    const prices = document.querySelectorAll('.price-cell');
    let total = 0;

    prices.forEach(p => {
        const value = Number(p.innerText.replace(/[^0-9]/g, ''));
        total += value;
    });

    totalPriceSpan.innerText = total.toLocaleString();
}