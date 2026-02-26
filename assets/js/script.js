// ============================================
// BANCO DE DADOS DE PRODUTOS (Array de Objetos)
// ============================================
const produtos = [
    {
        id: 1,
        nome: "Camiseta SM Classic",
        categoria: "Camisetas",
        preco: 89.90,
        descricao: "Camiseta de algodão premium com logo bordado",
        imagem: "/assets/img/products/camiseta1.jpg",
        novo: true
    },
    {
        id: 2,
        nome: "Moletom Sua Marca",
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
        nome: "Calça Cargo SM",
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
// SISTEMA DE FAVORITOS - COMPLETO
// ============================================

// Array para armazenar os produtos favoritos
// Começa vazio, igual o carrinho
let favoritos = [];

// ============================================
// FUNÇÃO PARA ALTERNAR FAVORITO (Adicionar/Remover)
// ============================================
// Esta função adiciona OU remove o produto dos favoritos
function toggleFavorito(produtoId) {
    // 1. Encontrar o produto pelo ID
    const produto = produtos.find(p => p.id === produtoId);
    
    // 2. Verificar se o produto já está nos favoritos
    // findIndex() retorna -1 se não encontrar
    const indexFavorito = favoritos.findIndex(fav => fav.id === produtoId);
    
    if (indexFavorito !== -1) {
        // Se JÁ está nos favoritos, REMOVE
        favoritos.splice(indexFavorito, 1); // splice() remove do array
        mostrarNotificacao(' Removido dos favoritos');
    } else {
        // Se NÃO está nos favoritos, ADICIONA
        favoritos.push(produto);
        mostrarNotificacao(' Adicionado aos favoritos!');
    }
    
    // 3. Atualizar a interface
    atualizarFavoritos();
    atualizarBotoesFavoritos(); // Atualiza os corações nos cards
}

// ============================================
// FUNÇÃO PARA ATUALIZAR LISTA DE FAVORITOS
// ============================================
function atualizarFavoritos() {
    const favoritesItems = document.getElementById('favoritesItems');
    const favoritesCount = document.getElementById('favoritesCount');
    const favoriteBtn = document.querySelector('[title="favorite-btn"]');
    
    // 1. Se não tiver favoritos
    if (favoritos.length === 0) {
        favoritesItems.innerHTML = '<p class="favorites-empty">Você ainda não tem favoritos</p>';
        favoritesCount.textContent = '0';
        
        // Remove o badge de quantidade
        const badge = favoriteBtn.querySelector('.favorite-badge');
        if (badge) badge.remove();
        return;
    }
    
    // 2. Criar HTML para cada favorito
    let favoritesHTML = '';
    
    favoritos.forEach(produto => {
        favoritesHTML += `
            <div class="favorite-item">
               <div class="favorite-item-image">
    <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.parentElement.style.background='linear-gradient(135deg,#1A1A1A,#3A3A3A)'; this.style.display='none';" style="width:100%; height:100%; object-fit:cover;">
</div>
                <div class="favorite-item-info">
                    <div>
                        <p class="favorite-item-categoria">${produto.categoria}</p>
                        <h3 class="favorite-item-name">${produto.nome}</h3>
                        <p class="favorite-item-descricao">${produto.descricao}</p>
                        <p class="favorite-item-price">R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                    <div class="favorite-item-actions">
                        <button class="add-to-cart-from-fav-btn" onclick="adicionarAoCarrinhoDosFavoritos(${produto.id})">
                            🛒 Adicionar ao Carrinho
                        </button>
                        <button class="remove-favorite-btn" onclick="toggleFavorito(${produto.id})">
                            ❌
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    // 3. Atualizar o HTML
    favoritesItems.innerHTML = favoritesHTML;
    favoritesCount.textContent = favoritos.length;
    
    // 4. Atualizar badge de quantidade no header
    let badge = favoriteBtn.querySelector('.favorite-badge');
    
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'favorite-badge';
        favoriteBtn.appendChild(badge);
    }
    
    badge.textContent = favoritos.length;
}

// ============================================
// FUNÇÃO PARA VERIFICAR SE PRODUTO É FAVORITO
// ============================================
// Retorna true se o produto está nos favoritos, false se não está
function isFavorito(produtoId) {
    return favoritos.some(fav => fav.id === produtoId);
}

// ============================================
// FUNÇÃO PARA ATUALIZAR BOTÕES DE FAVORITO NOS CARDS
// ============================================
// Atualiza os corações nos cards dos produtos
function atualizarBotoesFavoritos() {
    // Percorre todos os botões de favorito
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const produtoId = parseInt(btn.dataset.produtoId);
        
        // Se o produto é favorito, adiciona classe 'active'
        if (isFavorito(produtoId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ============================================
// FUNÇÃO PARA ADICIONAR AO CARRINHO DOS FAVORITOS
// ============================================
// Permite adicionar ao carrinho direto da lista de favoritos
function adicionarAoCarrinhoDosFavoritos(produtoId) {
 
   }   // Reutiliza a função que já existe
    function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = carrinho.findIndex(item => item.id === produtoId);
    
    if (itemExistente !== -1) {
        carrinho[itemExistente].quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    atualizarCarrinho();
    salvarCarrinho(); // ⭐ ADICIONE ESTA LINHA
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

// ============================================
// FUNÇÃO PARA LIMPAR TODOS OS FAVORITOS
// ============================================
function limparFavoritos() {
    // Confirma com o usuário antes de limpar
    if (confirm('Deseja remover todos os favoritos?')) {
        favoritos = [];
        atualizarFavoritos();
        atualizarBotoesFavoritos();
        mostrarNotificacao('Favoritos limpos!');
    }
}

// ============================================
// CONTROLE DO MODAL DE FAVORITOS
// ============================================
function abrirFavoritos() {
    const overlay = document.getElementById('favoritesOverlay');
    overlay.classList.add('active');
}

function fecharFavoritos() {
    const overlay = document.getElementById('favoritesOverlay');
    overlay.classList.remove('active');
}
// ============================================
// SALVANDO FAVORITOS NO NAVEGADOR (OPCIONAL)
// ============================================
// LocalStorage permite salvar dados no navegador
// Assim os favoritos não são perdidos ao recarregar a página

// Função para salvar favoritos no LocalStorage
function salvarFavoritos() {
    // JSON.stringify() converte array em texto
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

// Função para carregar favoritos do LocalStorage
function carregarFavoritos() {
    const favoritosSalvos = localStorage.getItem('favoritos');
    
    // Se existem favoritos salvos
    if (favoritosSalvos) {
        // JSON.parse() converte texto em array
        favoritos = JSON.parse(favoritosSalvos);
        atualizarFavoritos();
    }
}

// IMPORTANTE: Modifique a função toggleFavorito para salvar:
function toggleFavorito(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const indexFavorito = favoritos.findIndex(fav => fav.id === produtoId);
    
    if (indexFavorito !== -1) {
        favoritos.splice(indexFavorito, 1);
        mostrarNotificacao('❤️ Removido dos favoritos');
    } else {
        favoritos.push(produto);
        mostrarNotificacao('❤️ Adicionado aos favoritos!');
    }
    
    atualizarFavoritos();
    atualizarBotoesFavoritos();
    salvarFavoritos(); // ← ADICIONE ESTA LINHA
}


// ============================================
// CARRINHO DE COMPRAS
// ============================================
let carrinho = [];

// ⭐ ADICIONE ESTAS DUAS FUNÇÕES AQUI ⭐

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    console.log('💾 Carrinho salvo!', carrinho);
}

function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        carrinho = JSON.parse(carrinhoSalvo);
        atualizarCarrinho();
        console.log('📂 Carrinho carregado!', carrinho);
    }
}

// ============================================
// ESTADO DOS FILTROS ATIVOS
// ============================================
// IMPORTANTE: Este objeto guarda qual filtro está ativo
let filtrosAtivos = {
    categoria: 'Todos',
    precoMin: 0,
    precoMax: Infinity,
    busca: ''
};

// ============================================
// FUNÇÃO PARA RENDERIZAR PRODUTOS
// ============================================
// ============================================
// FUNÇÃO PARA RENDERIZAR PRODUTOS - COM BOTÃO DE FAVORITO
// ============================================
function renderizarProdutos(produtosParaMostrar) {
    const grid = document.getElementById('produtosGrid');
    grid.innerHTML = '';
    
    produtosParaMostrar.forEach(produto => {
        const produtoHTML = `
            <div class="produto-card">
                ${produto.novo ? '<span class="produto-badge">Novo</span>' : ''}
                
                <!-- ⭐ BOTÃO DE FAVORITO (NOVO!) ⭐ -->
                <button class="favorite-btn" data-produto-id="${produto.id}" onclick="toggleFavorito(${produto.id})">
                    <svg viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
                
                <div class="produto-image">
    <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.parentElement.style.background='linear-gradient(135deg,#1A1A1A,#3A3A3A)'; this.style.display='none';">
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
        grid.innerHTML += produtoHTML;
    });
    
    // ⭐ IMPORTANTE: Atualizar o estado dos botões de favorito ⭐
    // Esta linha faz os corações ficarem vermelhos se o produto já for favorito
    atualizarBotoesFavoritos();
}
// ============================================
// FUNÇÃO PRINCIPAL - APLICAR TODOS OS FILTROS
// ============================================
// ESTA É A FUNÇÃO QUE ESTAVA FALTANDO!
function aplicarFiltros() {
    // Começamos com TODOS os produtos
    let produtosFiltrados = produtos;
    
    // FILTRO 1: Categoria
    if (filtrosAtivos.categoria !== 'Todos') {
        produtosFiltrados = produtosFiltrados.filter(produto => {
            return produto.categoria === filtrosAtivos.categoria;
        });
    }
    
    // FILTRO 2: Preço
    produtosFiltrados = produtosFiltrados.filter(produto => {
        return produto.preco >= filtrosAtivos.precoMin && 
               produto.preco <= filtrosAtivos.precoMax;
    });
    
    // FILTRO 3: Busca por texto
    if (filtrosAtivos.busca !== '') {
        produtosFiltrados = produtosFiltrados.filter(produto => {
            const nomeLower = produto.nome.toLowerCase();
            const buscaLower = filtrosAtivos.busca.toLowerCase();
            return nomeLower.includes(buscaLower);
        });
    }
    
    // Renderiza os produtos filtrados
    renderizarProdutos(produtosFiltrados);
    
    // Log para debug (ver no console do navegador)
    console.log('Filtros aplicados:', filtrosAtivos);
    console.log('Produtos encontrados:', produtosFiltrados.length);
}

// ============================================
// SISTEMA DE FILTROS - ATUALIZADO
// ============================================
function filtrarPorCategoria(categoria) {
    // Atualiza o estado
    filtrosAtivos.categoria = categoria;
    
    // Aplica TODOS os filtros
    aplicarFiltros();
}

function filtrarPorPreco(min, max = Infinity) {
    // Atualiza o estado
    filtrosAtivos.precoMin = min;
    filtrosAtivos.precoMax = max;
    
    // Aplica TODOS os filtros
    aplicarFiltros();
}

function buscarProduto(termo) {
    // Atualiza o estado
    filtrosAtivos.busca = termo;
    
    // Aplica TODOS os filtros
    aplicarFiltros();
}

// ============================================
// FUNÇÃO PARA LIMPAR TODOS OS FILTROS
// ============================================
function limparFiltros() {
    console.log('Limpando filtros...');
    
    // Reseta todos os filtros para o valor inicial
    filtrosAtivos = {
        categoria: 'Todos',
        precoMin: 0,
        precoMax: Infinity,
        busca: ''
    };
    
    // Limpa o campo de busca visualmente
    const searchInput = document.querySelector('.search');
    if (searchInput) searchInput.value = '';
    
    // Remove a classe 'active' de todos os botões
    document.querySelectorAll('.filter-category button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.filter-price button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Adiciona 'active' no botão "Todos"
    const todosbtn = document.querySelector('.filter-category button');
    if (todosbtn) todosbtn.classList.add('active');
    
    // Aplica os filtros (vai mostrar todos os produtos)
    aplicarFiltros();
    
    console.log('Filtros limpos! Mostrando todos os produtos.');
}

// ============================================
// CARRINHO - FUNÇÕES
// ============================================
function adicionarAoCarrinho(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    const itemExistente = carrinho.findIndex(item => item.id === produtoId);
    
    if (itemExistente !== -1) {
        carrinho[itemExistente].quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }
    
    atualizarCarrinho();
    salvarCarrinho();
    mostrarNotificacao('Produto adicionado ao carrinho!');
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartBtn = document.querySelector('[title="cart-btn"]');
    
    if (carrinho.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
        cartTotal.textContent = 'R$ 0,00';
        const badge = cartBtn.querySelector('.cart-badge');
        if (badge) badge.remove();
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        cartHTML += `
            <div class="cart-item">
               <div class="cart-item-image">
    <img src="${item.imagem}" alt="${item.nome}" onerror="this.parentElement.style.background='linear-gradient(135deg,#1A1A1A,#3A3A3A)'; this.style.display='none';" style="width:100%; height:100%; object-fit:cover;">
</div>
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
    
    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    let badge = cartBtn.querySelector('.cart-badge');
    
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-badge';
        cartBtn.appendChild(badge);
    }
    
    badge.textContent = totalItens;
}

function aumentarQuantidade(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item) {
        item.quantidade++;
        atualizarCarrinho();
        salvarCarrinho();
    }
}

function diminuirQuantidade(produtoId) {
    const item = carrinho.find(item => item.id === produtoId);
    if (item && item.quantidade > 1) {
        item.quantidade--;
        atualizarCarrinho();
        salvarCarrinho();
    }
}

function removerItem(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
    salvarCarrinho();    
}

function abrirCarrinho() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.add('active');
}

function fecharCarrinho() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.remove('active');
}

// ============================================
// NOTIFICAÇÃO
// ============================================
function mostrarNotificacao(mensagem) {
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
    
    setTimeout(() => {
        notif.remove();
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    carregarFavoritos();
    carregarCarrinho();
    
    // Renderizar produtos inicialmente
    aplicarFiltros(); // IMPORTANTE: Usar aplicarFiltros() em vez de renderizarProdutos()
    
    // Botão do carrinho
    const cartBtn = document.querySelector('[title="cart-btn"]');
    if (cartBtn) {
        cartBtn.addEventListener('click', abrirCarrinho);
    }
    
    // Botão fechar carrinho
    const closeBtn = document.getElementById('closeCartBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', fecharCarrinho);
    }
    
    // Fechar ao clicar fora do modal
    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                fecharCarrinho();
            }
        });
    }
    
    // Botão de finalizar compra
    const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', finalizarCompraWhatsApp);
}
    
    // Campo de busca com debounce
    let timeoutBusca;
    const searchInput = document.querySelector('.search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            clearTimeout(timeoutBusca);
            timeoutBusca = setTimeout(() => {
                buscarProduto(e.target.value);
            }, 300);
        });
    }
    
    // Botões de categoria
    const categoriaBtns = document.querySelectorAll('.filter-category button');
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.textContent.trim();
            filtrarPorCategoria(categoria);
            
            categoriaBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Botões de preço
    const precoBtns = document.querySelectorAll('.filter-price button');
    precoBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const texto = this.textContent.trim();
            
            if (texto.includes('Até')) {
                filtrarPorPreco(0, 50);
            } else if (texto.includes('50 - 100')) {
                filtrarPorPreco(50, 100);
            } else if (texto.includes('100 - 200')) {
                filtrarPorPreco(100, 200);
            } else if (texto.includes('200+')) {
                filtrarPorPreco(200, Infinity);
            }
            
            precoBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Criar botão "Limpar Filtros"
    const filtersDiv = document.querySelector('.filters');
    if (filtersDiv) {
        const limparBtn = document.createElement('button');
        limparBtn.textContent = '🔄 Limpar Filtros';
        limparBtn.className = 'limpar-filtros-btn';
        limparBtn.style.cssText = `
            background: #ff4444;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            margin-top: 10px;
        `;
        
        limparBtn.addEventListener('click', limparFiltros);
        filtersDiv.appendChild(limparBtn);
    }
    // ===== FAVORITOS (ADICIONE ISSO) =====
    
    // Carregar favoritos salvos
    carregarFavoritos();
    
    // Botão de favoritos no header
    const favoriteBtn = document.querySelector('[title="favorite-btn"]');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', abrirFavoritos);
    }
    
    // Botão fechar favoritos
    const closeFavBtn = document.getElementById('closeFavoritesBtn');
    if (closeFavBtn) {
        closeFavBtn.addEventListener('click', fecharFavoritos);
    }
    
    // Fechar ao clicar fora
    const favOverlay = document.getElementById('favoritesOverlay');
    if (favOverlay) {
        favOverlay.addEventListener('click', function(e) {
            if (e.target === favOverlay) {
                fecharFavoritos();
            }
        });
    }
    
    // Botão limpar favoritos
    const clearFavBtn = document.getElementById('clearFavoritesBtn');
    if (clearFavBtn) {
        clearFavBtn.addEventListener('click', limparFavoritos);
    }
});


// ============================================
// CHECKOUT VIA WHATSAPP
// ============================================

// ⭐ COLOQUE AQUI O NÚMERO DO SEU WHATSAPP ⭐
// Formato: Código do país + DDD + Número (sem espaços, traços ou parênteses)
// Exemplo: 5511999999999 (55 = Brasil, 11 = DDD, 999999999 = número)
const WHATSAPP_NUMERO = '99999999999'; // ← ALTERE PARA SEU NÚMERO

// Função para enviar pedido via WhatsApp
function finalizarCompraWhatsApp() {
    // 1. Verificar se o carrinho está vazio
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
        return;
    }
    
    // 2. Montar a mensagem
    let mensagem = 'PEDIDO - FD STORE\n\n';
    mensagem += 'Produtos:\n';
    
    
    // 3. Adicionar cada produto do carrinho
    let total = 0;
    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        
        mensagem += `\n${index + 1}. *${item.nome}*\n`;
        mensagem += `   Categoria: ${item.categoria}\n`;
        mensagem += `   Quantidade: ${item.quantidade}x\n`;
        mensagem += `   Preço unitário: R$ ${item.preco.toFixed(2)}\n`;
        mensagem += `   Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    });
    
    // 4. Adicionar total
    mensagem += '\n━━━━━━━━━━━━━\n';
    mensagem += `TOTAL: R$ ${total.toFixed(2)}*\n\n`;
    
    // 5. Adicionar informações extras (opcional)
    //mensagem += '📍 *Próximos passos:*\n';
  //  mensagem += '1️⃣ Confirmar endereço de entrega\n';
//    mensagem += '2️⃣ Escolher forma de pagamento\n';
    //mensagem += '3️⃣ Finalizar pedido';    
    //mensagem += '✨ Obrigado por escolher a FD Store!';
    
    // 6. Codificar a mensagem para URL
    // encodeURIComponent() transforma a mensagem em formato de URL
    // Substitui espaços, quebras de linha, caracteres especiais
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // 7. Criar o link do WhatsApp
    // https://wa.me/ é o link universal do WhatsApp
    const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagemCodificada}`;
    
    // 8. Abrir o WhatsApp em nova aba
    window.open(linkWhatsApp, '_blank');
    
    // 9. Feedback visual
    mostrarNotificacao('📱 Abrindo WhatsApp...');
    
    // 10. (OPCIONAL) Limpar carrinho após enviar
    // Descomente as linhas abaixo se quiser limpar o carrinho automaticamente
     setTimeout(() => {
         if (confirm('Deseja limpar o carrinho?')) {
             carrinho = [];
             atualizarCarrinho();
             salvarCarrinho();
             fecharCarrinho();
         }
     }, 2000);

     function fecharMenuMobile() {
    document.getElementById('mobileMenu').classList.remove('active');
    document.getElementById('hamburgerBtn').classList.remove('active');
}

document.getElementById('hamburgerBtn').addEventListener('click', function () {
    this.classList.toggle('active');
    document.getElementById('mobileMenu').classList.toggle('active');
});
}
