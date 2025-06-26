window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoIndex = urlParams.get('id'); // Agora 'id' é o índice

  if (produtoIndex !== null && produtoIndex !== '') {
    inicializarPaginaProduto(produtoIndex);
  } else {
    document.body.innerHTML = `
      <div style="color: white; text-align: center; padding-top: 50px;">
        <h1>Erro: Produto não especificado</h1>
        <p>Por favor, volte para a loja e selecione um produto.</p>
      </div>
    `;
  }
});

async function inicializarPaginaProduto(index) {
  try {
    const response = await fetch('../components/produtos/produtos-grid.json');
    const todosOsProdutos = await response.json();

    // Alteração: Encontrando o produto pelo índice, não mais por 'find'
    const produto = todosOsProdutos[index];

    if (!produto) {
      throw new Error(`Produto com índice ${index} não existe no catálogo.`);
    }

    // Seus elementos e lógica originais
    const nomeProdutoEl = document.getElementById("nome-produto");
    const precoProdutoEl = document.getElementById("preco-produto");
    const descricaoProdutoEl = document.getElementById("descricao-produto");
    const imagemPrincipalEl = document.getElementById("imagem-principal");
    const miniaturasContainerEl = document.getElementById("miniaturas");
    const camposPersonalizacaoEl = document.getElementById("campos-personalizacao");
    const btnSim = document.getElementById("btn-sim");
    const btnNao = document.getElementById("btn-nao");

    let personalizada = false;

    nomeProdutoEl.textContent = produto.nome;
    descricaoProdutoEl.textContent = produto.descricao;
    imagemPrincipalEl.src = produto.imagens[0];

    miniaturasContainerEl.innerHTML = '';
    produto.imagens.forEach((imgUrl) => {
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = produto.nome;
      img.addEventListener("click", () => {
        imagemPrincipalEl.src = imgUrl;
      });
      miniaturasContainerEl.appendChild(img);
    });

    function atualizarPreco() {
      // Alteração: Convertendo o preço de "R$ 149,90" para um número
      const precoBase = parseFloat(produto.preco.replace('R$ ', '').replace(',', '.')) || 0;
      const precoFinal = personalizada ? precoBase + 20 : precoBase;
      // Exibe o preço final formatado em Reais
      precoProdutoEl.textContent = `R$ ${precoFinal.toFixed(2).replace('.', ',')}`;
    }

    btnSim.addEventListener("click", () => {
      personalizada = true;
      camposPersonalizacaoEl.style.display = "flex";
      atualizarPreco();
      btnSim.classList.add("ativo");
      btnNao.classList.remove("ativo");
    });

    btnNao.addEventListener("click", () => {
      personalizada = false;
      camposPersonalizacaoEl.style.display = "none";
      atualizarPreco();
      btnNao.classList.add("ativo");
      btnSim.classList.remove("ativo");
    });
    
    atualizarPreco(); // Chama a função para exibir o preço inicial

  } catch (error) {
    console.error("Falha ao inicializar a página do produto:", error);
    document.body.innerHTML = `
      <div style="color: red; text-align: center; padding-top: 50px;">
        <h1>Ocorreu um Erro</h1>
        <p>${error.message}</p>
      </div>
    `;
  }
}
