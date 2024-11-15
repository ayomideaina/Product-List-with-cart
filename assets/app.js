const cart = {};
const cartItemsContainer = document.getElementById("cartItems");
const totalAmountContainer = document.getElementById("totalAmount");

function addToCart(itemName, itemPrice) {
  if (
    event.target.classList.contains("minus") ||
    event.target.classList.contains("plus")
  ) {
    return;
  }
  if (cart[itemName]) {
    cart[itemName].quantity++;
  } else {
    cart[itemName] = { price: itemPrice, quantity: 1 };
  }
  updateCart();
  updateButtonText(itemName);
}

function updateButtonText(itemName) {
  const button = document.getElementById(
    `addToCart-${itemName.replace(/\s+/g, "-")}`
  );
  if (cart[itemName]) {
    button.innerHTML = `
        <div class="quantity">
            <span class="minus" onclick="decreaseQuantity('${itemName}')">-</span>
            ${cart[itemName].quantity}
            <span class="plus" onclick="increaseQuantity('${itemName}')">+</span>
        </div>
        `;
  } else {
    button.innerHTML = `
            <img class="cartimage" src="assets/images/add-to-cart.png" alt="Add to Cart Icon">
            Add to Cart
        `;
  }
}

function increaseQuantity(itemName) {
  if (cart[itemName]) {
    cart[itemName].quantity++;
    updateCart();
    updateButtonText(itemName);
  }
}

function decreaseQuantity(itemName) {
  if (cart[itemName] && cart[itemName].quantity > 1) {
    cart[itemName].quantity--;
  } else {
    cart[itemName].quantity--;
    removeFromCart(itemName);
  }
  updateCart();
  updateButtonText(itemName);
}

function removeFromCart(itemName) {
  if (cart[itemName]) {
    delete cart[itemName];
    updateCart();
    updateButtonText(itemName);
  }
}

function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  Object.keys(cart).forEach((itemName) => {
    const item = cart[itemName];
    total += item.price * item.quantity;

    const listItem = document.createElement("li");
    listItem.className = "cart-item";
    listItem.innerHTML = `
            <span>${itemName} - $${item.price} x ${item.quantity}</span>
            <div class="quantity-controls">
                <button onclick="decreaseQuantity('${itemName}')">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity('${itemName}')">+</button>
                <button onclick="removeFromCart('${itemName}')" class="remove-btn">Remove</button>
            </div>
        `;
    cartItemsContainer.appendChild(listItem);
  });

  totalAmountContainer.textContent = total.toFixed(2);
}

function confirmOrder() {
  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty!");
  } else {
    showModal();
  }
}

function showModal() {
  document.getElementById("confirmationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("confirmationModal").style.display = "none";
}

function startNewOrder() {
  Object.keys(cart).forEach((itemName) => delete cart[itemName]);
  updateCart();
  document.querySelectorAll(".addtocart").forEach((button) => {
    button.innerHTML = `
            <img class="cartimage" src="assets/images/add-to-cart.png" alt="Add to Cart Icon">
            Add to Cart
        `;
  });
  closeModal();
}
