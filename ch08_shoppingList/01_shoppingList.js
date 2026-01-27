// 1. 요소 가져오기
const itemInput = document.getElementById("item-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.getElementById("add-btn");
const shoppingList = document.getElementById("shopping-list");
const totalPriceSpan = document.getElementById("total-price");

// 2. 추가 버튼 클릭 이벤트
addBtn.addEventListener("click", addItem);

// 3. 아이템 추가 함수
function addItem() {
    const itemValue = itemInput.value;
    const priceValue = Number(priceInput.value); // 
    if (itemValue === "" || priceValue <= 0) {
        alert("상품명과 가격을 올바르게 입력해 주세요!");
        return;
    }

    // 4. 리스트 아이템(li) 만들기
    const li = document.createElement("li");
    li.className = "list-item";

    li.innerHTML = `
        <span class="item-name">${itemValue}</span>
        <div>
            <span class="item-price">${priceValue.toLocaleString()}원</span>
            <button class="delete-btn">X</button>
        </div>
    `;

    // 5. 삭제 기능 추가
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function() {
        li.remove();
        updateTotal();
    });

    // 6. 리스트에 추가
    shoppingList.appendChild(li);

    // 7. 입력창 초기화
    itemInput.value = "";
    priceInput.value = "";
    itemInput.focus();

    // 8. 총 합계 업데이트
    updateTotal();
}

// 9. 총 합계 계산 함수
function updateTotal() {
    const prices = document.querySelectorAll(".item-price");
    let total = 0;

    prices.forEach(function(priceSpan) {
        const text = priceSpan.innerText.replace("원", "").replace(/,/g, "");
        total += Number(text);
    });
    totalPriceSpan.innerText = total.toLocaleString();
}