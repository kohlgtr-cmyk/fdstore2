// Dados dos produtos
const products = [
    {
        id: 1,
        name: "Camiseta Premium Preta",
        category: "Camisetas",
        price: 89.90,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
        description: "Camiseta de algodão premium 100%"
    },
    {
        id: 2,
        name: "Camiseta Oversized Branca",
        category: "Camisetas",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop",
        description: "Modelagem oversized confortável"
    },
    {
        id: 3,
        name: "Moletom Básico Cinza",
        category: "Moletons",
        price: 159.90,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
        description: "Moletom com capuz e bolso canguru"
    },
    {
        id: 4,
        name: "Moletom Oversized Preto",
        category: "Moletons",
        price: 179.90,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop",
        description: "Moletom oversized de alta qualidade"
    },
    {
        id: 5,
        name: "Jaqueta Corta-Vento",
        category: "Jaquetas",
        price: 249.90,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
        description: "Jaqueta impermeável e respirável"
    },
    {
        id: 6,
        name: "Jaqueta Jeans Premium",
        category: "Jaquetas",
        price: 299.90,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=500&fit=crop",
        description: "Jaqueta jeans com acabamento premium"
    },
    {
        id: 7,
        name: "Calça Cargo Preta",
        category: "Calças",
        price: 189.90,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&h=500&fit=crop",
        description: "Calça cargo com múltiplos bolsos"
    },
    {
        id: 8,
        name: "Calça Jeans Slim",
        category: "Calças",
        price: 169.90,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
        description: "Calça jeans modelagem slim fit"
    },
    {
        id: 9,
        name: "Camiseta Listrada",
        category: "Camisetas",
        price: 79.90,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=500&fit=crop",
        description: "Camiseta com estampa listrada"
    },
    {
        id: 10,
        name: "Moletom com Zíper",
        category: "Moletons",
        price: 199.90,
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&h=500&fit=crop",
        description: "Moletom com zíper frontal"
    },
    {
        id: 11,
        name: "Jaqueta Bomber",
        category: "Jaquetas",
        price: 279.90,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
        description: "Jaqueta bomber estilo aviador"
    },
    {
        id: 12,
        name: "Calça Moletom",
        category: "Calças",
        price: 139.90,
        image: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=500&h=500&fit=crop",
        description: "Calça de moletom confortável"
    }
];

// Estado da aplicação
let cart = [];
let favorites = [];
let filteredProducts = [...products];

// Elementos do DOM
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
const menuIcon = document.getElementById('menuIcon');
const closeIcon = document.getElementById('closeIcon');
const searchInput = document.getElementById('searchInput');
const categoryPills = document.querySelectorAll('.category-pill');
const priceRange = document.getElementById('priceRange');

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    loadCartFromStorage();
    loadFavoritesFromStorage();
    updateCartUI();
});

// Renderizar produtos
function renderProducts() {
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">Nenhum produto encontrado com os filtros selecionados.</div>';
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <span class="product-category">${product.category}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Adicionar ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToStorage();
    updateCartUI();
    showToast('Produto adicionado ao carrinho!');
    
    // Animação no botão
    const btn = event.target;
    btn.classList.add('added');
    setTimeout(() => btn.classList.remove('added'), 1000);
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

// Atualizar quantidade
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCartToStorage();
            updateCartUI();
        }
    }
}

// Atualizar UI do carrinho
function updateCartUI() {
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.classList.toggle('active', totalItems > 0);

    // Atualizar conteúdo
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remover</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Atualizar total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        cartFooter.style.display = 'block';
    }
}

// Filtros
function applyFilters() {
    let filtered = [...products];

    // Filtro de busca
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    // Filtro de categoria
    const activeCategory = document.querySelector('.category-pill.active');
    if (activeCategory && activeCategory.dataset.category !== 'all') {
        filtered = filtered.filter(product => 
            product.category === activeCategory.dataset.category
        );
    }

    // Filtro de preço
    const priceValue = priceRange.value;
    if (priceValue !== 'all') {
        const [min, max] = priceValue.split('-').map(Number);
        filtered = filtered.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }

    filteredProducts = filtered;
    renderProducts();
}

// Event Listeners para filtros
searchInput.addEventListener('input', applyFilters);
priceRange.addEventListener('change', applyFilters);

categoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
        categoryPills.forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        applyFilters();
    });
});

// Toggle do menu mobile
menuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const isActive = mobileNav.classList.contains('active');
    menuIcon.style.display = isActive ? 'none' : 'block';
    closeIcon.style.display = isActive ? 'block' : 'none';
});

// Toggle do carrinho
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Fechar carrinho ao clicar no backdrop
cartSidebar.querySelector('.cart-backdrop').addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Toast de notificação
function showToast(message) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// LocalStorage
function saveCartToStorage() {
    localStorage.setItem('fdstore_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fdstore_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function saveFavoritesToStorage() {
    localStorage.setItem('fdstore_favorites', JSON.stringify(favorites));
}

function loadFavoritesFromStorage() {
    const savedFavorites = localStorage.getItem('fdstore_favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
}

// Favoritos (funcionalidade básica)
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removido dos favoritos');
    } else {
        favorites.push(productId);
        showToast('Adicionado aos favoritos!');
    }
    saveFavoritesToStorage();
}

// Botão de checkout
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('checkout-btn')) {
        if (cart.length > 0) {
            alert('Funcionalidade de checkout em desenvolvimento!\n\nTotal: R$ ' + 
                  cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
                      .toFixed(2).replace('.', ','));
        }
    }
});

