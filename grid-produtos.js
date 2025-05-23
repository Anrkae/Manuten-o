class GridProdutos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const produtos = [
      {
        imagem: "https://i.postimg.cc/59D3LPxn/Banner-Produto-2.png",
        nome: "Camisa Flamengo",
        preco: "R$ 149,90",
        descricao: "Camisa oficial do Flamengo, tecido dry-fit premium."
      },
      {
        imagem: "https://i.postimg.cc/156KHpXP/Banner-Produto-4.png",
        nome: "Camisa Santos CBJR",
        preco: "R$ 149,90",
        descricao: "Camisa retrô do Santos CBJR, gola polo, tecido algodão."
      },
      {
        imagem: "https://i.postimg.cc/SRYnm73K/Banner-Produto-6.png",
        nome: "Camisa Palmeiras",
        preco: "R$ 149,90",
        descricao: "Camisa Palmeiras 2025, detalhes dourados e dry-fit."
      },
      {
        imagem: "https://i.postimg.cc/BZjp8WGj/Banner-Produto-3.png",
        nome: "Camisa Botafogo",
        preco: "R$ 149,90",
        descricao: "Camisa Botafogo 2025, escudo emborrachado e tecido leve."
      },
      {
        imagem: "https://i.postimg.cc/FH4Vn7kS/Banner-Produto-5.png",
        nome: "Camisa Man City",
        preco: "R$ 149,90",
        descricao: "Camisa Manchester City dry-fit, escudo 3D, muito confortável."
      }
    ];

    const style = `
      <style>
        :host {
          display: block;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
        }
        .grid {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 10px;
          scroll-snap-type: x mandatory;
        }
        .card {
          min-width: 220px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 15px;
          color: white;
          scroll-snap-align: start;
        }
        .card img {
          width: 100%;
          border-radius: 15px;
          margin-bottom: 10px;
        }
        .card-title {
          font-weight: bold;
          margin-bottom: 8px;
        }
        .card-price {
          color: #00ffaa;
          margin-bottom: 8px;
          font-weight: bold;
        }
        .card-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 10px;
        }
        .btn {
          background-color: #00ffaa;
          color: black;
          padding: 8px 16px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
        }
        .btn:hover {
          background-color: #00ddaa;
        }
      </style>
    `;

    const cards = produtos.map(p => `
      <div class="card">
        <img src="${p.imagem}" alt="${p.nome}">
        <div class="card-title">${p.nome}</div>
        <div class="card-price">${p.preco}</div>
        <div class="card-desc">${p.descricao}</div>
        <button class="btn">Comprar</button>
      </div>
    `).join('');

    this.shadowRoot.innerHTML = `
      ${style}
      <div class="grid">
        ${cards}
      </div>
    `;
  }
}

customElements.define('grid-produtos', GridProdutos);