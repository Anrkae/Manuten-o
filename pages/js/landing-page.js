const produto = {
  nome: "Camisa Real Madrid 2025/26",
  precoBase: 149.90,
  descricao: "Camisa oficial Real Madrid 2025/26, tecido dry-fit premium, escudo 3D e detalhes dourados.",
  imagens: [
    "https://i.postimg.cc/XNttFPjv/9d018c83.jpg",
    "https://i.postimg.cc/hPx600v1/6de6b31b.jpg",
    "https://i.postimg.cc/d3ZmwnpH/2e9d6b5b.jpg",
    "https://i.postimg.cc/NLh8Mmwg/bceb8292.jpg",
    "https://i.postimg.cc/CMRWR0Vt/a602add6.jpg"
  ]
};

let personalizada = false;

const nomeProduto = document.getElementById("nome-produto");
const precoProduto = document.getElementById("preco-produto");
const descricaoProduto = document.getElementById("descricao-produto");
const imagemPrincipal = document.getElementById("imagem-principal");
const miniaturasContainer = document.getElementById("miniaturas");
const camposPersonalizacao = document.getElementById("campos-personalizacao");

nomeProduto.textContent = produto.nome;
descricaoProduto.textContent = produto.descricao;
imagemPrincipal.src = produto.imagens[0];
atualizarPreco();

produto.imagens.forEach((imgUrl) => {
  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = produto.nome;
  img.addEventListener("click", () => {
    imagemPrincipal.src = imgUrl;
  });
  miniaturasContainer.appendChild(img);
});

// Botões de personalização
const btnSim = document.getElementById("btn-sim");
const btnNao = document.getElementById("btn-nao");

btnSim.addEventListener("click", () => {
  personalizada = true;
  camposPersonalizacao.style.display = "flex";
  atualizarPreco();
  btnSim.classList.add("ativo");
  btnNao.classList.remove("ativo");
});

btnNao.addEventListener("click", () => {
  personalizada = false;
  camposPersonalizacao.style.display = "none";
  atualizarPreco();
  btnNao.classList.add("ativo");
  btnSim.classList.remove("ativo");
});

function atualizarPreco() {
  const precoFinal = personalizada ? produto.precoBase + 20 : produto.precoBase;
  precoProduto.textContent = `R$ ${precoFinal.toFixed(2)}`;
}