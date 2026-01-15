// Dados dos produtos
const products = [
    {
        id: 1,
        name: 'Camiseta Premium FD',
        description: 'Personalização completa com IA',
        price: 89.90,
        icon: '👕',
        isPremium: true,
        category: 'camiseta'
    },
    {
        id: 2,
        name: 'Moletom Classic',
        description: 'Conforto e estilo urbano',
        price: 149.90,
        icon: '🧥',
        isPremium: false,
        category: 'moletom'
    },
    {
        id: 3,
        name: 'Uniforme Corporate',
        description: 'Profissionalismo garantido',
        price: 129.90,
        icon: '👔',
        isPremium: true,
        category: 'uniforme'
    },
    {
        id: 4,
        name: 'Camiseta FD Dynamic',
        description: 'Edição especial limitada',
        price: 99.90,
        icon: '👕',
        isPremium: false,
        category: 'camiseta'
    },
    {
        id: 5,
        name: 'Moletom Premium FD',
        description: 'Tecnologia de aquecimento',
        price: 189.90,
        icon: '🧥',
        isPremium: true,
        category: 'moletom'
    },
    {
        id: 6,
        name: 'Uniforme Esportivo',
        description: 'Performance e conforto',
        price: 119.90,
        icon: '🏃',
        isPremium: false,
        category: 'uniforme'
    }
];

// Estado global
let cart = [];
let favorites = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    updateFavoritesCount();
    initPersonalizer();
    initScrollAnimations();
});

// Renderizar produtos
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            ${product.isPremium ? '<div class="product-badge">⭐ Premium</div>' : ''}
            <button class="product-favorite ${isFavorite(product.id) ? 'active' : ''}" 
                    onclick="toggleFavorite(${product.id})"
                    id="fav-${product.id}">
                ${isFavorite(product.id) ? '❤️' : '🤍'}
            </button>
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">R$ ${formatPrice(product.price)}</div>
                <button class="product-btn" onclick="addToCart(${product.id})">
                    🛒 Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('');
}

// Favoritos
function isFavorite(productId) {
    return favorites.some(fav => fav.id === productId);
}

function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    const favBtn = document.getElementById(`fav-${productId}`);
    
    if (isFavorite(productId)) {
        favorites = favorites.filter(fav => fav.id !== productId);
        favBtn.innerHTML = '🤍';
        favBtn.classList.remove('active');
        showNotification('💔 Removido dos favoritos');
    } else {
        favorites.push(product);
        favBtn.innerHTML = '❤️';
        favBtn.classList.add('active');
        showNotification('❤️ Adicionado aos favoritos!');
    }
    
    updateFavoritesCount();
    updateFavoritesSidebar();
}

function updateFavoritesCount() {
    const count = document.getElementById('favCount');
    if (count) count.textContent = favorites.length;
}

function updateFavoritesSidebar() {
    const container = document.getElementById('favoritesItems');
    if (!container) return;
    
    if (favorites.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">💝</div>
                <p>Nenhum favorito ainda</p>
                <p style="opacity: 0.6; font-size: 0.9rem; margin-top: 0.5rem;">
                    Clique no ❤️ dos produtos para adicionar!
                </p>
            </div>
        `;
    } else {
        container.innerHTML = favorites.map(item => `
            <div class="product-card" style="margin-bottom: 1rem;">
                ${item.isPremium ? '<div class="product-badge">⭐ Premium</div>' : ''}
                <div class="product-image" style="height: 150px; font-size: 4rem;">${item.icon}</div>
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="product-price">R$ ${formatPrice(item.price)}</div>
                    <button class="product-btn" onclick="addToCart(${item.id}); showNotification('✓ Adicionado ao carrinho!');" style="margin-bottom: 0.5rem;">
                        🛒 Adicionar ao Carrinho
                    </button>
                    <button class="btn btn-secondary btn-block" onclick="toggleFavorite(${item.id})">
                        ✕ Remover dos Favoritos
                    </button>
                </div>
            </div>
        `).join('');
    }
}

// Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    updateCartSidebar();
    showNotification('✓ Produto adicionado ao carrinho!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartSidebar();
    showNotification('🗑️ Produto removido do carrinho');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartCount();
        updateCartSidebar();
    }
}

function updateCartCount() {
    const count = document.getElementById('cartCount');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (count) count.textContent = total;
}

function updateCartSidebar() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    
    if (!container) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalEl) totalEl.textContent = `R$ ${formatPrice(total)}`;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🛍️</div>
                <p>Seu carrinho está vazio</p>
                <p style="opacity: 0.6; font-size: 0.9rem; margin-top: 0.5rem;">
                    Adicione produtos para começar!
                </p>
            </div>
        `;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="product-card" style="margin-bottom: 1rem;">
                ${item.isPremium ? '<div class="product-badge">⭐ Premium</div>' : ''}
                <div class="product-image" style="height: 120px; font-size: 3rem;">${item.icon}</div>
                <div class="product-info">
                    <h3 style="font-size: 1.1rem;">${item.name}</h3>
                    <div class="product-price" style="font-size: 1.25rem; margin: 0.5rem 0;">
                        R$ ${formatPrice(item.price)}
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <button onclick="updateQuantity(${item.id}, -1)" 
                                class="btn btn-secondary" 
                                style="padding: 0.5rem 1rem; border-radius: 8px;">
                            −
                        </button>
                        <span style="font-weight: bold; font-size: 1.1rem; min-width: 30px; text-align: center;">
                            ${item.quantity}
                        </span>
                        <button onclick="updateQuantity(${item.id}, 1)" 
                                class="btn btn-secondary" 
                                style="padding: 0.5rem 1rem; border-radius: 8px;">
                            +
                        </button>
                        <button onclick="removeFromCart(${item.id})" 
                                class="btn btn-secondary" 
                                style="margin-left: auto; padding: 0.5rem 1rem; background: #ff4444; border: none;">
                            🗑️
                        </button>
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">
                        Subtotal: R$ ${formatPrice(item.price * item.quantity)}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('⚠️ Carrinho vazio!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`🎉 Pedido realizado com sucesso!\n\n${itemCount} item(ns)\nTotal: R$ ${formatPrice(total)}\n\nObrigado por comprar na FD Store!`);
    
    cart = [];
    updateCartCount();
    updateCartSidebar();
    closeCart();
}

// Sidebar Controls
function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    updateCartSidebar();
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

function openFavorites() {
    document.getElementById('favoritesSidebar').classList.add('open');
    document.getElementById('overlay').classList.add('active');
    updateFavoritesSidebar();
}

function closeFavorites() {
    document.getElementById('favoritesSidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

// Event Listeners
document.getElementById('cartBtn')?.addEventListener('click', openCart);
document.getElementById('favoritesBtn')?.addEventListener('click', openFavorites);
document.getElementById('overlay')?.addEventListener('click', () => {
    closeCart();
    closeFavorites();
});

// Personalizer
function initPersonalizer() {
    // Color picker
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const color = this.dataset.color;
            const tshirtBody = document.querySelector('.tshirt-body');
            if (tshirtBody) tshirtBody.style.background = color;
        });
    });
    
    // Size picker
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Character picker
    document.querySelectorAll('.character-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.character-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            const character = this.textContent;
            const design = document.querySelector('.tshirt-design');
            if (design) design.innerHTML = `<span style="font-size: 3rem;">${character}</span>`;
        });
    });
}

function openPersonalizer() {
    document.getElementById('personalizar')?.scrollIntoView({ behavior: 'smooth' });
}

// Notificações
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Utilidades
function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.feature-card, .product-card, .tech-card, .flow-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Parallax effect no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// Console Art
console.log(`
%c
███████╗██████╗     ███████╗████████╗ ██████╗ ██████╗ ███████╗
██╔════╝██╔══██╗    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
█████╗  ██║  ██║    ███████╗   ██║   ██║   ██║██████╔╝█████╗  
██╔══╝  ██║  ██║    ╚════██║   ██║   ██║   ██║██╔══██╗██╔══╝  
██║     ██████╔╝    ███████║   ██║   ╚██████╔╝██║  ██║███████╗
╚═╝     ╚═════╝     ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
                                                                
        Vista-se com Autoridade | Fort Dynamic
        Powered by AI & Innovation 🚀
`, 'color: #ffc107; font-weight: bold;');

console.log('%cSistema carregado com sucesso! ✓', 'color: #4CAF50; font-size: 14px; font-weight: bold;');
console.log('%cEcossistema FD Store pronto para uso.', 'color: #2196F3; font-size: 12px;');