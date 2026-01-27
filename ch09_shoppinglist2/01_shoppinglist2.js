const itemInput = document.getElementById('item-input');
const priceInput = document.getElementById(`price-input`);
const addBtn = document.getElementById(`add-btn`);
const shoppingList = document.getElementById(`shopping-list`);

const shoppingItems = JSON.parse(localStorage.getItem(`shopping-items`))||[];

function renderShoppingList() {
  shoppingList.innerHTML = ``;

  shoppingItems.forEach((item,index) => {
    const li = document.createElement(`li`);
    li.className = `shopping-item`;
    if(item.completed) {
      li.classList.add(`completed`);
    }
    const checkbox = document.createElement(`input`);
    checkbox.type = `checkbox`;
    checkbox.checked = item.completed;

    const itemTextspan = document.createElement(`span`);
    itemTextspan.className = `item-text`;
    itemTextspan.textContent = item.text;

    const priceSpan = document.createElement(`span`);
    priceSpan.className = `price`;
    // 가격을 모르면 입력 안할수도 있게끔.
    priceSpan.textContent = item.price ? `${item.price}` : ``;

    const deleteBtn = document.createElement(`button`);
    deleteBtn.className = `delete-btn`;
    deleteBtn.innerHTML = `삭제`;

    li.append(checkbox);
    li.append(itemTextspan);
    li.append(priceSpan);
    li.append(deleteBtn);

    shoppingList.appendChild(li);

    checkbox.addEventListener(`click`,() => {
      shoppingItems[index].completed = checkbox.checked;
      li.classList.toggle(`completed`,checkbox.checked);
      saveShoppingItems();
    });

    deleteBtn.addEventListener(`click`,() => {
      shoppingItems.splice(index,1);
      renderShoppingList();
      saveShoppingItems();
    });
  });
}

function saveShoppingItems() {
  localStorage.setItem(`shopping-items`,JSON.stringify(shoppingItems));
}

function addShoppingItem() {
  const itemText = itemInput.value.trim();
  const itemPrice = priceInput.value.trim();

  if(itemText === ``) {
    alert(`구매할 물품을 적어주세요.`);
    return;
  }

  const newShoppingItem = {
    text: itemText,
    price: itemPrice,
    completed: false
  };

  shoppingItems.push(newShoppingItem);
  itemInput.value = ``;
  priceInput.value = ``;

  renderShoppingList();
  saveShoppingItems()
}

// addBtn.addEventListener(`click`,addShoppingItem);
// 안에 addShoppingItem 함수의 재사용이 없다면
addBtn.addEventListener(`click`,() => {
  addShoppingItem();
});

window.onload = renderShoppingList