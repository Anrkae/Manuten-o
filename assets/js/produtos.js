// produtos.js

// Variável para armazenar todos os produtos após serem carregados do JSON
let todosOsProdutos = [];
const PRODUTOS_JSON_URL = '../assets/back/json/produtos.json'; // Caminho para o seu arquivo JSON

// Função para criar o HTML de um produto
function criarProdutoHTML(produto) {
    return `
        <div class="produto-item ${produto.categoria}" data-aos="fade-up" data-aos-delay="${produto.delay}">
            <div class="produto-card">
                <div class="produto-image">
                    <img src="${produto.imgSrc}" alt="${produto.altText}">
                    <div class="produto-overlay">
                        <a href="#" class="btn-ver" data-product-id="${produto.id}">Ver Detalhes</a>
                    </div>
                </div>
                <div class="produto-info">
                    <h3>${produto.nome}</h3>
                    <p class="price">${produto.preco}</p>
                    <a href="${produto.whatsappLink}" class="btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> Comprar
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar e filtrar produtos
// Agora, ela aceita uma categoria para filtrar e usa os dados carregados
function carregarProdutosPorCategoria(categoria) {
    const produtosGrid = document.getElementById('produtos-grid');
    if (!produtosGrid) {
        console.error('Elemento com ID "produtos-grid" não encontrado.');
        return;
    }

    produtosGrid.innerHTML = ''; // Limpa o grid

    // Filtra os produtos com base na categoria
    const produtosFiltrados = todosOsProdutos.filter(produto => {
        return categoria === 'todos' || produto.categoria === categoria;
    });

    // Adiciona o HTML dos produtos filtrados ao grid
    produtosFiltrados.forEach(produto => {
        produtosGrid.innerHTML += criarProdutoHTML(produto);
    });

    // --- Importante para AOS (Animate On Scroll) ---
    if (typeof AOS !== 'undefined') {
        AOS.refresh(); // Re-escanear a página para novas animações
    }
}

// Função assíncrona para buscar os produtos do arquivo JSON
async function buscarProdutosDoJSON() {
    try {
        const response = await fetch(PRODUTOS_JSON_URL); // Faz a requisição ao JSON
        if (!response.ok) { // Verifica se a resposta foi bem-sucedida (status 200)
            throw new Error(`Erro ao carregar produtos: ${response.statusText}`);
        }
        todosOsProdutos = await response.json(); // Converte a resposta para JSON
        console.log('Produtos carregados do JSON:', todosOsProdutos);

        // Define a categoria padrão e carrega os produtos iniciais
        const defaultCategory = 'nacionais';
        carregarProdutosPorCategoria(defaultCategory);

        // Ativa visualmente o botão de filtro padrão
        const initialButton = document.querySelector(`.filter-btn[data-filter="${defaultCategory}"]`);
        if (initialButton) {
            initialButton.classList.add('active');
        }

    } catch (error) {
        console.error('Falha ao buscar os produtos:', error);
        const produtosGrid = document.getElementById('produtos-grid');
        if (produtosGrid) {
            produtosGrid.innerHTML = '<p style="color: red; text-align: center;">Erro ao carregar os produtos. Tente novamente mais tarde.</p>';
        }
    }
}

// Quando o DOM estiver completamente carregado (a página HTML pronta)
document.addEventListener('DOMContentLoaded', () => {
    // Inicia a busca pelos produtos
    buscarProdutosDoJSON();

    const filterButtons = document.querySelectorAll('.filter-btn');

    // Adiciona ouvintes de evento aos botões de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedFilter = event.target.getAttribute('data-filter');

            // Remove a classe 'active' de todos os botões de filtro
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' ao botão clicado
            event.target.classList.add('active');

            // Carrega os produtos da categoria selecionada (usando os dados já em 'todosOsProdutos')
            carregarProdutosPorCategoria(selectedFilter);
        });
    });

    // --- Lógica para o botão "Ver Detalhes" (Exemplo básico) ---
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-ver')) {
            event.preventDefault();
            const productId = event.target.getAttribute('data-product-id');
            // Você pode buscar o produto específico em 'todosOsProdutos'
            const produtoSelecionado = todosOsProdutos.find(p => p.id === productId);

            if (produtoSelecionado) {
                console.log('Detalhes do produto:', produtoSelecionado);
                alert(`Detalhes do produto: ${produtoSelecionado.nome}\nPreço: ${produtoSelecionado.preco}\nMais informações em breve!`);
                // Aqui você pode expandir para abrir um modal mais sofisticado
            } else {
                alert('Produto não encontrado.');
            }
        }
    });
});
