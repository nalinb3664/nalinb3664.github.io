// Sample products
const products = [
  { id: 1, name: "T-Shirt", category: "clothes", price: 499, image: "https://via.placeholder.com/150?text=T-Shirt" },
  { id: 2, name: "Laptop", category: "electronics", price: 59999, image: "https://via.placeholder.com/150?text=Laptop" },
  { id: 3, name: "Novel", category: "books", price: 299, image: "https://via.placeholder.com/150?text=Novel" },
  { id: 4, name: "Headphones", category: "electronics", price: 1999, image: "https://via.placeholder.com/150?text=Headphones" },
];

const productGrid = document.getElementById("productGrid");
const categoryFilter = document.getElementById("categoryFilter");
const searchBar = document.getElementById("searchBar");
const cartModal = document.getElementById("cartModal");
const closeBtn = document.querySelector(".close");
const viewCartBtn = document.getElementById("viewCartBtn");
const cartItemsList = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const themeToggle = document.getElementById("themeToggle");
const emailInput = document.getElementById("emailInput");
const subscribeBtn = document.getElementById("subscribeBtn");
const emailMsg = document.getElementById("emailMsg");

let cart = [];

// Render products
function renderProducts(filter = "all", search = "") {
  productGrid.innerHTML = "";
  let filtered = products.filter(p =>
    (filter === "all" || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

// Update Cart
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ₹${item.price}`;
    li.innerHTML += ` <button onclick="removeFromCart(${index})">❌</button>`;
    cartItemsList.appendChild(li);
  });
  cartTotalEl.textContent = total;
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Modal open/close
viewCartBtn.onclick = () => (cartModal.style.display = "block");
closeBtn.onclick = () => (cartModal.style.display = "none");
window.onclick = e => { if (e.target === cartModal) cartModal.style.display = "none"; };

// Filters
categoryFilter.onchange = e => renderProducts(e.target.value, searchBar.value);
searchBar.oninput = e => renderProducts(categoryFilter.value, e.target.value);

// Theme Toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
};

// Email Subscription
subscribeBtn.onclick = () => {
  const email = emailInput.value.trim();
  if (email && email.includes("@")) {
    emailMsg.textContent = "✅ Subscribed successfully!";
    emailMsg.style.color = "lightgreen";
    emailInput.value = "";
  } else {
    emailMsg.textContent = "❌ Please enter a valid email.";
    emailMsg.style.color = "red";
  }
};

// Initial render
renderProducts();
