const itemInput = document.getElementById('item-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.getElementById('add-btn');
const cartList = document.getElementById('cart-list');
const totalPriceSpan = document.getElementById('total-price');
const finalTotalSpan = document.getElementById('final-total');
const checkAll = document.getElementById('check-all');
const delCheckedBtn = document.getElementById('del-checked-btn');
const selectBar = document.getElementById('select-bar');
const emptyCartBox = document.getElementById('empty-cart');
const recommendBtn = document.getElementById('recommend-btn');

// 이벤트 연결
addBtn.addEventListener('click', addItem);
checkAll.addEventListener('change', toggleAll);
delCheckedBtn.addEventListener('click', deleteChecked);
recommendBtn.addEventListener('click', () => {
    alert("짜잔~ 사실 속으신 거에요!");
});

itemInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') priceInput.focus(); });
priceInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') addItem(); });

// 빈 상태인지 확인
checkEmpty(); 

function addItem() {
    const name = itemInput.value.trim();
    const price = Number(priceInput.value);

    if (name === '' || price <= 0) {
        alert("상품명과 가격을 확인해주세요!");
        return;
    }

    // 중복 체크
    const items = document.querySelectorAll('.cart-item');
    let isDuplicate = false;

    for (let item of items) {
        const nameSpan = item.querySelector('.item-name');
        if (nameSpan.innerText === name) {
            const quantityInput = item.querySelector('.item-quantity');
            let currentQty = Number(quantityInput.value);
            quantityInput.value = currentQty + 1;

            item.style.backgroundColor = "#e8f0fe";
            setTimeout(() => { item.style.backgroundColor = "white"; }, 500);

            isDuplicate = true;
            break; 
        }
    }

    // 새 상품 추가
    if (!isDuplicate) {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <input type="checkbox" class="item-checkbox" checked>
            <div class="item-info">
                <span class="rocket-badge">🚀 로켓배송</span>
                <span class="item-name">${name}</span>
                <div class="bottom-info" style="display:flex; align-items:center;">
                    <span class="item-price" data-price="${price}">${price.toLocaleString()}원</span>
                </div>
            </div>
            <div class="quantity-wrap">
                <span>수량</span>
                <input type="number" class="item-quantity" value="1" min="1">
            </div>
            <button class="delete-btn"><i class="fa-solid fa-xmark"></i></button>
        `;

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            updateTotal();
            checkEmpty();
        });

        li.querySelector('.item-checkbox').addEventListener('change', updateTotal);
        li.querySelector('.item-quantity').addEventListener('change', (e) => {
            if(e.target.value < 1) e.target.value = 1; 
            updateTotal();
        });

        cartList.appendChild(li);
    }

    itemInput.value = '';
    priceInput.value = '';
    itemInput.focus();
    
    updateTotal();
    checkEmpty();
}

// 빈 장바구니 상태 체크 함수
function checkEmpty() {
    const items = document.querySelectorAll('.cart-item');
    
    if (items.length === 0) {
        cartList.style.display = 'none';
        selectBar.style.display = 'none';
        emptyCartBox.style.display = 'block';
    } else {
        cartList.style.display = 'block';
        selectBar.style.display = 'flex';
        emptyCartBox.style.display = 'none';
    }
}

// 총 가격 계산 함수 
function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;

    // 1. 체크된 상품들의 가격 합치기
    items.forEach(item => {
        const checkbox = item.querySelector('.item-checkbox');
        
        if (checkbox.checked) {
            const price = Number(item.querySelector('.item-price').getAttribute('data-price'));
            const quantity = Number(item.querySelector('.item-quantity').value);
            
            total += (price * quantity);
        }
    });

    // 2. 화면에 [총 상품가격] 표시
    totalPriceSpan.innerText = total.toLocaleString();

    // 3. 배송비 계산 로직
    let shippingFee = 0;
    
    if (total > 0) {
        shippingFee = 1000000;
    } else {
        shippingFee = 0;
    }


    document.getElementById('shipping-fee').innerText = shippingFee.toLocaleString() + "원";

    // 5. 최종 결제 금액
    const finalPrice = total + shippingFee;
    finalTotalSpan.innerText = finalPrice.toLocaleString();
}

function toggleAll() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    checkboxes.forEach(box => {
        box.checked = checkAll.checked;
    });
    updateTotal();
}

function deleteChecked() {
    const items = document.querySelectorAll('.cart-item');
    items.forEach(item => {
        if (item.querySelector('.item-checkbox').checked) {
            item.remove();
        }
    });
    updateTotal();
    checkEmpty();
}