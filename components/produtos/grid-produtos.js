class GridProdutos extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.fetchProdutos();
  }

  async fetchProdutos() {
    try {
      const res = await fetch('components/produtos/produtos-grid.json');
      const produtos = await res.json();
      this.render(produtos);
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
    }
  }

  render(produtos) {
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
          border: 2px solid rgba(255, 255, 255, 0.08);
          scroll-snap-align: start;
        }
        .card img {
          width: 100%;
          border-radius: 15px;
          margin-bottom: 10px;
          display: block;
        }
        .card-title {
          font-weight: bold;
          text-align: center;
          margin-bottom: 8px;
        }
        .card-price {
          color: #00ffaa;
          text-align: center;
          margin-bottom: 15px;
          font-weight: bold;
        }
        .btns {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 0 20px;
        }
        .btn {
          background-color: #fff;
          border: none;
          color: #000;
          padding: 8px 16px;
          border-radius: 10px;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          text-decoration: none;
        }
        .btn:hover {
          background-color: #00ddaa;
        }
        .btnComprar {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .whatsapp-icon {
          width: 25px !important;
          height: 25px !important;
        }
        /* Modal */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.8);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #111;
          border-radius: 20px;
          padding: 20px;
          max-width: 400px;
          width: 90%;
          color: white;
          text-align: center;
          position: relative;
          animation: fadeIn 0.3s;
        }
        .modal-gallery {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          margin-bottom: 15px;
        }
        .modal-gallery img {
          width: 100%;
          border-radius: 10px;
          flex-shrink: 0;
          max-width: 300px;
        }
        .close {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          color: #fff;
          cursor: pointer;
        }
        @keyframes fadeIn {
          from {opacity: 0; transform: scale(0.9);}
          to {opacity: 1; transform: scale(1);}
        }
      </style>
    `;

    const cards = produtos.map((p, i) => `
      <div class="card">
        <img src="${p.imagens[0]}" alt="${p.nome}">
        <div class="card-title">${p.nome}</div>
        <div class="card-price">${p.preco}</div>
        <div class="btns">
          <div class="btnComprar">
            <a class="btn" href="https://wa.me/5585998537355?text=Olá! Quero comprar a ${encodeURIComponent(p.nome)}" target="_blank">
              Comprar
            </a>
          </div>
          <button class="btn" data-index="${i}">Detalhes</button>
        </div>
      </div>
    `).join('');

    const modal = `
      <div class="modal" id="modal">
        <div class="modal-content">
          <span class="close" id="closeModal">&times;</span>
          <div class="modal-gallery" id="modalImgs"></div>
          <div class="card-title" id="modalTitle"></div>
          <div class="card-price" id="modalPrice"></div>
          <div class="card-desc" id="modalDesc"></div>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = `
      ${style}
      <div class="grid">
        ${cards}
      </div>
      ${modal}
    `;

    const modalEl = this.shadowRoot.getElementById('modal');
    const closeModal = this.shadowRoot.getElementById('closeModal');
    const modalImgs = this.shadowRoot.getElementById('modalImgs');
    const modalTitle = this.shadowRoot.getElementById('modalTitle');
    const modalPrice = this.shadowRoot.getElementById('modalPrice');
    const modalDesc = this.shadowRoot.getElementById('modalDesc');

    const detailButtons = this.shadowRoot.querySelectorAll('button[data-index]');
    detailButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.getAttribute('data-index');
        const produto = produtos[index];

        modalImgs.innerHTML = produto.imagens.map(src => `
          <img src="${src}">
        `).join('');
        modalEl.style.display = 'flex';
      });
    });

    closeModal.addEventListener('click', () => {
      modalEl.style.display = 'none';
    });

    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        modalEl.style.display = 'none';
      }
    });
  }
}

customElements.define('grid-produtos', GridProdutos);
