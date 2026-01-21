// ============================================
// BANCO DE DADOS DE PRODUTOS (Array de Objetos)
// ============================================
// Array = lista de itens
// Objeto = estrutura com propriedades (chave: valor)
const produtos = [
    {
        id: 1, // identificador único
        nome: "Camiseta FD Classic",
        categoria: "Camisetas",
        preco: 89.90,
        descricao: "Camiseta de algodão premium com logo bordado",
        imagem: "/assets/img/products/camiseta1.jpg", // você pode usar uma URL de imagem
        novo: true // badge "novo"
    },
    {
        id: 2,
        nome: "Moletom Fort Dynamic",
        categoria: "Moletons",
        preco: 189.90,
        descricao: "Moletom com capuz e bolso canguru",
        imagem: "/assets/img/products/moletom1.jpg",
        novo: false
    },
    {
        id: 3,
        nome: "Jaqueta Tactical",
        categoria: "Jaquetas",
        preco: 349.90,
        descricao: "Jaqueta resistente com múltiplos bolsos",
        imagem: "/assets/img/products/jaqueta1.jpg",
        novo: true
    },
    {
        id: 4,
        nome: "Calça Cargo FD",
        categoria: "Calças",
        preco: 159.90,
        descricao: "Calça cargo com bolsos laterais",
        imagem: "/assets/img/products/calca1.jpg",
        novo: false
    },
    {
        id: 5,
        nome: "Camiseta Tactical",
        categoria: "Camisetas",
        preco: 79.90,
        descricao: "Camiseta dry-fit para performance",
        imagem: "/assets/img/products/camiseta2.jpg",
        novo: false
    },
    {
        id: 6,
        nome: "Uniforme Operacional",
        categoria: "Uniformes",
        preco: 299.90,
        descricao: "Conjunto completo para uso profissional",
        imagem: "/assets/img/products/uniforme1.jpg",
        novo: true
    }
];

// ============================================
// CARRINHO DE COMPRAS (Array vazio no início)
// ============================================
// Este array vai armazenar os produtos que o usuário adicionar
let carrinho = [];

// ============================================
// FUNÇÃO PARA RENDERIZAR (MOSTRAR) PRODUTOS
// ============================================
// "Renderizar" = criar e mostrar elementos HTML dinamicamente
function renderizarProdutos(produtosParaMostrar) {
    // 1. Pegar o elemento HTML onde vamos colocar os produtos
    const grid = document.getElementById('produtosGrid');
    
    // 2. Limpar o conteúdo anterior (innerHTML = conteúdo interno)
    grid.innerHTML = '';
    
    // 3. Loop para percorrer cada produto
    // forEach = "para cada" produto no array
    produtosParaMostrar.forEach(produto => {
        // 4. Criar o HTML do card do produto
        // Template literals (`) permitem usar ${variavel} dentro do texto
        const produtoHTML = `
            <div class="produto-card">
                ${produto.novo ? '<span class="produto-badge">Novo</span>' : ''}
                <div class="produto-image" style="background: linear-gradient(135deg, #1A1A1A 0%, #3A3A3A 100%); display: flex; align-items: center; justify-content: center; color: #D4AF37; font-size: 1.2rem;">
                    ${produto.nome}
                </div>
                <div class="produto-info">
                    <p class="produto-categoria">${produto.categoria}</p>
                    <h3 class="produto-nome">${produto.nome}</h3>
                    <p class="produto-descricao">${produto.descricao}</p>
                    <div class="produto-footer">
                        <span class="produto-preco">R$ ${produto.preco.toFixed(2)}</span>
                        <button class="add-to-cart-btn" onclick="adicionarAoCarrinho(${produto.id})">
                            Adicionar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // 5. Adicionar o HTML criado dentro da grid
        // += significa "adicionar ao que já existe"
        grid.innerHTML += produtoHTML;
    });
}

// ============================================
// FUNÇÃO PARA ADICIONAR PRODUTO AO CARRINHO
// ============================================
function adicionarAoCarrinho(produtoId) {
    // 1. Encontrar o produto pelo ID
    // find() procura um item no array que atenda a condição
    const produto = produtos.find(p => p.id === produtoId);
    
    // 2. Verificar se o produto já está no carrinho
    // findIndex() retorna a posição do item (-1 se não encontrar)
    const itemExistente = carrinho.findIndex(item => item.id === produtoId);
    
    if (itemExistente !== -1) {
        // Se já existe, apenas aumenta a quantidade
        carrinho[itemExistente].quantidade++;
    } else {
        // Se não existe, adiciona com quantidade 1
        // ... (spread operator) copia todas as propriedades do produto
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    // 3. Atualizar a exibição do carrinho
    atualizarCarrinho();
    
    // 4. Feedback visual (opcional - você pode adicionar depois)
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

// ============================================
// FUNÇÃO PARA ATUALIZAR CARRINHO NA TELA
// ============================================
function atualizarCarrinho() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBtn = document.querySelector('[title="cart-btn"]');
    
    // 1. Se o carrinho estiver vazio
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        // Remove o badge de quantidade
        const badge = cartBtn.querySelector('.cart-badge');
        if (badge) badge.remove();
        return;
    }
    
    // 2. Criar HTML para cada item do carrinho
    let cartHTML = '';
    let total = 0;
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image" style="background: linear-gradient(135deg, #1A1A1A 0%, #3A3A3A 100%);"></div>
                <div class="cart-item-info">
                    <p class="cart-item-name">${item.nome}</p>
                    <p class="cart-item-price">R$ ${item.preco.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="diminuirQuantidade(${item.id})">-</button>
                        <span class="cart-item-qty">${item.quantidade}</span>
                        <button class="qty-btn" onclick="aumentarQuantidade(${item.id})">+</button>
                        <button class="remove-item-btn" onclick="removerItem(${item.id})">Remover</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    // 3. Atualizar o HTML
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    // 4. Atualizar badge de quantidade
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    let badge = cartBtn.querySelector('.cart-badge');
    
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        cartBtn.appendChild(badge);
    }
    
    badge.textContent = totalItens;
}

// ============================================
// FUNÇÕES DE CONTROLE DE QUANTIDADE
// ============================================
function aumentarQuantidade(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        item.quantidade++;
        atualizarCarrinho();
    }
}

function diminuirQuantidade(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item && item.quantidade > 1) {
        item.quantidade--;
        atualizarCarrinho();
    }
}

function removerItem(produtoId) {
    // filter() cria um novo array sem o item removido
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
}

// ============================================
// CONTROLE DO MODAL DO CARRINHO
// ============================================
function abrirCarrinho() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.add('active');
}

function fecharCarrinho() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.remove('active');
}

// ============================================
// SISTEMA DE FILTROS
// ============================================
function filtrarPorCategoria(categoria) {
    if (categoria === 'Todos') {
        renderizarProdutos(produtos);
    } else {
        // filter() cria um novo array apenas com os produtos da categoria
        const produtosFiltrados = produtos.filter(p => p.categoria === categoria);
        renderizarProdutos(produtosFiltrados);
    }
}

function filtrarPorPreco(min, max) {
    const produtosFiltrados = produtos.filter(p => {
        if (max) {
            return p.preco >= min && p.preco <= max;
        } else {
            return p.preco >= min;
        }
    });
    renderizarProdutos(produtosFiltrados);
}

function buscarProduto(termo) {
    // toLowerCase() transforma em minúsculas para comparação
    // includes() verifica se contém o texto
    const produtosFiltrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo.toLowerCase())
    );
    renderizarProdutos(produtosFiltrados);
}

// ============================================
// NOTIFICAÇÃO (FEEDBACK VISUAL)
// ============================================
function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notif = document.createElement('div');
    notif.textContent = mensagem;
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #D4AF37;
        color: #0B0B0B;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notif);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// ============================================
// EVENT LISTENERS (OUVINTES DE EVENTOS)
// ============================================
// DOMContentLoaded = executar quando a página carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Renderizar produtos inicialmente
    renderizarProdutos(produtos);
    
    // 2. Botão do carrinho
    const cartBtn = document.querySelector('[title="cart-btn"]');
    cartBtn.addEventListener('click', abrirCarrinho);
    
    // 3. Botão fechar carrinho
    const closeBtn = document.getElementById('closeCartBtn');
    closeBtn.addEventListener('click', fecharCarrinho);
    
    // 4. Fechar ao clicar fora do modal
    const overlay = document.getElementById('cartOverlay');
    overlay.addEventListener('click', function(e) {
        // Se clicou no overlay (fundo escuro) e não no modal
        if (e.target === overlay) {
            fecharCarrinho();
        }
    });
    
    // 5. Botão de finalizar compra
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
        } else {
            alert('Funcionalidade de checkout em desenvolvimento!');
        }
    });
    
    // 6. Campo de busca
    const searchInput = document.querySelector('.search');
    searchInput.addEventListener('input', function(e) {
        // e.target.value = o que está escrito no input
        buscarProduto(e.target.value);
    });
    
    // 7. Botões de categoria
    const categoriaBtns = document.querySelectorAll('.filter-category button');
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // textContent = texto dentro do botão
            const categoria = this.textContent.trim();
            filtrarPorCategoria(categoria);
            
            // Remover classe 'active' de todos os botões
            categoriaBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe 'active' no botão clicado
            this.classList.add('active');
        });
    });
    
    // 8. Botões de preço
    const precoBtns = document.querySelectorAll('.filter-price button');
    precoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const texto = this.textContent.trim();
            
            // Analisar o texto do botão para pegar os valores
            if (texto.includes('Até')) {
                filtrarPorPreco(0, 50);
            } else if (texto.includes('50 - 100')) {
                filtrarPorPreco(50, 100);
            } else if (texto.includes('100 - 200')) {
                filtrarPorPreco(100, 200);
            } else if (texto.includes('200+')) {
                filtrarPorPreco(200);
            }
            
            // Gerenciar classe 'active'
            precoBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// ============================================
// CSS para botão ativo (adicione no CSS)
// ============================================
// .filter-category button.active,
// .filter-price button.active {
//     background-color: #D4AF37;
//     color: #FFFFFF;
// }