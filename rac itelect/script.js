
const menuItems = [
    {
        id: 1,
        name: "Classic Burger",
        price: 8.99,
        description: "Juicy beef patty with lettuce, tomato, cheese, and our special sauce",
        category: "burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "Cheese Pizza",
        price: 12.99,
        description: "Traditional pizza with our signature tomato sauce and mozzarella cheese",
        category: "pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Sweet Spaghetti",
        price: 10.99,
        description: "Al dente spaghetti with rich meat sauce and parmesan cheese",
        category: "pasta",
        image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Chocolate Brownie",
        price: 5.99,
        description: "Warm chocolate brownie served with vanilla ice cream",
        category: "dessert",
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        name: "Iced Coffee",
        price: 3.99,
        description: "Cold brewed coffee served over ice with cream and sugar",
        category: "drink",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        name: "Double Cheeseburger",
        price: 10.99,
        description: "Two beef patties with double cheese, bacon, and all the fixings",
        category: "burger",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        name: "Pepperoni Pizza",
        price: 14.99,
        description: "Classic pizza topped with pepperoni slices and mozzarella cheese",
        category: "pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        name: "Pasta Carbonara",
        price: 11.99,
        description: "Pasta with creamy sauce and bacon",
        category: "pasta",
        image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 9,
        name: "Cheesecake",
        price: 6.99,
        description: "Creamy New York style cheesecake with berry compote",
        category: "dessert",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 10,
        name: "Strawberry Smoothie",
        price: 4.99,
        description: "Fresh strawberries blended with yogurt and honey",
        category: "drink",
        image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 11,
        name: "Veggie Burger",
        price: 9.99,
        description: "Plant-based patty with avocado, lettuce, and tomato",
        category: "burger",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 12,
        name: "Hawaiian Pizza",
        price: 13.99,
        description: "Pizza with pineapple and ham",
        category: "pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60"
    }
];


let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

const menuItemsContainer = document.getElementById('menu-items');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartIcon = document.getElementById('cart-icon');
const cartContainer = document.getElementById('cart-container');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');
const paymentSelect = document.getElementById('payment');
const cardDetails = document.getElementById('card-details');
const checkoutForm = document.getElementById('checkout-form');
const orderConfirmation = document.getElementById('order-confirmation');
const orderNumberElement = document.getElementById('order-number');
const continueShoppingBtn = document.getElementById('continue-shopping');
const overlay = document.getElementById('overlay');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems('all');
    displaySavedItems();
    updateCart();
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.getAttribute('data-category');
            displayMenuItems(category);
        });
    });
    
        hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some items before checkout.');
            return;
        }
        toggleCheckoutModal();
    });
    
    closeCheckoutBtn.addEventListener('click', toggleCheckoutModal);
    
    paymentSelect.addEventListener('change', () => {
        if (paymentSelect.value === 'card') {
            cardDetails.classList.add('active');
        } else {
            cardDetails.classList.remove('active');
        }
    });
    
    checkoutForm.addEventListener('submit', handleCheckout);
    
    continueShoppingBtn.addEventListener('click', () => {
        orderConfirmation.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', () => {
        if (cartContainer.classList.contains('active')) {
            toggleCart();
        }
        if (checkoutModal.classList.contains('active')) {
            toggleCheckoutModal();
        }
        if (orderConfirmation.classList.contains('active')) {
            orderConfirmation.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

function displayMenuItems(category) {
    menuItemsContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    filteredItems.forEach(item => {
        const isSaved = savedItems.some(savedItem => savedItem.id === item.id);
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}">
                <button class="save-item-btn ${isSaved ? 'saved' : ''}" data-id="${item.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3 class="menu-item-title">${item.name}</h3>
                    <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <span class="menu-item-category">${capitalizeFirstLetter(item.category)}</span>
                <p class="menu-item-description">${item.description}</p>
                <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
            </div>
        `;
        menuItemsContainer.appendChild(menuItemElement);
    });
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    document.querySelectorAll('.save-item-btn').forEach(button => {
        button.addEventListener('click', toggleSaveItem);
    });
}

function toggleSaveItem(e) {
    const itemId = parseInt(e.currentTarget.getAttribute('data-id'));
    const item = menuItems.find(item => item.id === itemId);
    const button = e.currentTarget;
    
    const savedIndex = savedItems.findIndex(savedItem => savedItem.id === itemId);
    
    if (savedIndex === -1) {
        savedItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category
        });
        button.classList.add('saved');
        showNotification(`${item.name} saved for later!`);
    } else {
        savedItems.splice(savedIndex, 1);
        button.classList.remove('saved');
        showNotification(`${item.name} removed from saved items`);
    }
    
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
}


function displaySavedItems() {
    const savedItemsSection = document.createElement('section');
    savedItemsSection.id = 'saved-items';
    savedItemsSection.className = 'menu';
    savedItemsSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Saved Items</h2>
            <div class="menu-items" id="saved-items-container">
                ${savedItems.length === 0 ? '<p class="no-items">No saved items yet</p>' : ''}
            </div>
        </div>
    `;
    
    document.querySelector('#menu').after(savedItemsSection);
    
    if (savedItems.length > 0) {
        const savedItemsContainer = document.getElementById('saved-items-container');
        savedItems.forEach(item => {
            const menuItemElement = document.createElement('div');
            menuItemElement.classList.add('menu-item');
            menuItemElement.innerHTML = `
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    <button class="save-item-btn saved" data-id="${item.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">$${item.price.toFixed(2)}</span>
                    </div>
                    <span class="menu-item-category">${capitalizeFirstLetter(item.category)}</span>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            `;
            savedItemsContainer.appendChild(menuItemElement);
        });
        
        document.querySelectorAll('#saved-items-container .add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
        
        document.querySelectorAll('#saved-items-container .save-item-btn').forEach(button => {
            button.addEventListener('click', toggleSaveItem);
        });
    }
}

function addToCart(e) {
    const itemId = parseInt(e.target.getAttribute('data-id'));
    const item = menuItems.find(item => item.id === itemId);
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCart();
    
    showNotification(`${item.name} added to cart!`);
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalElement.textContent = '0.00';
        cartCountElement.textContent = '0';
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = itemCount;
    
    
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

function decreaseQuantity(e) {
    const itemId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === itemId);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        const index = cart.findIndex(item => item.id === itemId);
        cart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function increaseQuantity(e) {
    const itemId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === itemId);
    
    item.quantity += 1;
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(e) {
    const itemId = parseInt(e.target.getAttribute('data-id'));
    const index = cart.findIndex(item => item.id === itemId);
    
    cart.splice(index, 1);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function toggleCart() {
    cartContainer.classList.toggle('active');
    overlay.classList.toggle('active');
    if (cartContainer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
        overlay.classList.remove('active');
    }
}

function toggleCheckoutModal() {
    checkoutModal.classList.toggle('active');
    cartContainer.classList.remove('active');
    overlay.classList.toggle('active');
    if (checkoutModal.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
        overlay.classList.remove('active');
    }
}

function handleCheckout(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment').value;
    
    if (!name || !email || !phone || !address || !paymentMethod) {
        alert('Please fill in all required fields');
        return;
    }
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || !expiry || !cvv) {
            alert('Please fill in all card details');
            return;
        }
    }
    
    const orderNumber = generateOrderNumber();
    orderNumberElement.textContent = orderNumber;
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    
    checkoutModal.classList.remove('active');
    orderConfirmation.classList.add('active');
    
    checkoutForm.reset();
    cardDetails.classList.remove('active');
}


function generateOrderNumber() {
    return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const notificationStyle = document.createElement('style');
notificationStyle.textContent = `    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyle);