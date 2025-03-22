// Product data
const products = [
    {
        id: 1,
        name: 'Красный виноград',
        price: 500,
        image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d'
    },
    {
        id: 2,
        name: 'Зеленый виноград',
        price: 450,
        image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d'
    },
    {
        id: 3,
        name: 'Черный виноград',
        price: 550,
        image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d'
    }
];

// Shopping cart
let cart = [];

// DOM Elements
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total span');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutButton = document.querySelector('.checkout-button');
const contactForm = document.getElementById('contactForm');

// Cart functionality
function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total} ₽`;
}

function renderCartItems() {
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.price} ₽/кг</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
        updateCartCount();
        updateCartTotal();
        renderCartItems();
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartCount();
        updateCartTotal();
        renderCartItems();
        
        // Show notification
        showNotification('Товар добавлен в корзину');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = parseInt(button.dataset.id);
        addToCart(productId);
    });
});

checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Корзина пуста');
        return;
    }
    showNotification('Заказ оформлен!');
    cart = [];
    updateCartCount();
    updateCartTotal();
    renderCartItems();
    cartModal.style.display = 'none';
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showNotification('Сообщение отправлено!');
    contactForm.reset();
});

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #eee;
    }
    
    .cart-item-details {
        margin-left: 1rem;
        flex-grow: 1;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-controls button {
        background-color: #e74c3c;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 0.2rem 0.5rem;
        cursor: pointer;
    }
    
    .quantity-controls span {
        min-width: 2rem;
        text-align: center;
    }
`;
document.head.appendChild(style); 