class CarrosselProduto extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const produtos = await this.carregarProdutos();
    this.render(produtos);
  }

  async carregarProdutos() {
    //try {
      //const response = await fetch('produtos.json');
      //if (!response.ok) throw new Error('Erro ao carregar produtos');
      //const data = await response.json();
      //return data;
    //} catch (e) {
      //console.error(e);
      //return []; }
    return [
      {
        "imagem": "https://i.postimg.cc/59D3LPxn/Banner-Produto-2.png",
        "nome": "Camisa Flamengo",
        "descricao": "Camisa Flamengo 2025, tecido dry-fit, escudo emborrachado e costura premium."
      },
      {
        "imagem": "https://i.postimg.cc/156KHpXP/Banner-Produto-4.png",
        "nome": "Camisa Santos CBJR",
        "descricao": "Camisa retrô Santos CBJR, gola polo, tecido algodão premium, super confortável."
      },
      {
        "imagem": "https://i.postimg.cc/SRYnm73K/Banner-Produto-6.png",
        "nome": "Camisa Palmeiras",
        "descricao": "Camisa oficial Palmeiras 2025, tecido dry-fit, detalhes dourados e costura reforçada."
      },
      {
        "imagem": "https://i.postimg.cc/BZjp8WGj/Banner-Produto-3.png",
        "nome": "Camisa Botafogo",
        "descricao": "Camisa Botafogo 2025, tecido respirável, escudo emborrachado, modelo torcedor."
      },
      {
        "imagem": "https://i.postimg.cc/FH4Vn7kS/Banner-Produto-5.png",
        "nome": "Camisa Man City",
        "descricao": "Camisa Manchester City 2025, tecido dry-fit, escudo 3D, muito confortável e leve."
      }
    ];
  }

  render(produtos) {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
      <style>
        * {
          box-sizing: border-box;
          user-select: none;
        }

        .swiper {
          width: 100%;
          max-width: 1200px;
          padding: 50px 0;
        }

        .swiper-slide {
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 50px 0px;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 460px;
          max-width: 60%;
          justify-content: space-between;
          transition: all 0.4s ease;
        }
    
        .swiper-slide:hover {
          filter: contrast(1.07) saturate(1.1);
        }

        .swiper-slide-prev,
        .swiper-slide-next {
          opacity: 0.6;
        }
        
        .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next) {
          opacity: 0.4;
        }

        .card-img {
          width: 100%;
          max-width: 250px;
          border-radius: 15px;
          margin-bottom: 15px;
          transition: transform 0.4s ease;
        }
    
        .card-img:hover {
          transform: scale(1.2) translateY(-15px);
        }

        .card-title {
          font-size: 1.2rem;
          margin-bottom: 15px;
          text-align: center;
        }

        .btn {
          background-color: transparent;
          border: 2px solid #fff;
          color: #fff;
          width: 110px;
          height: 45px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-bottom: 10px;
        }

        .btn:hover {
          background-color: #00ddaa;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }

        /* Modal */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: none;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .modal-content {
          background: #2c2c2c;
          border-radius: 20px;
          padding: 30px;
          max-width: 400px;
          width: 90%;
          text-align: center;
          position: relative;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .modal-content img {
          width: 100%;
          border-radius: 15px;
          margin-bottom: 15px;
        }

        .modal-content h2 {
          margin: 10px 0;
        }

        .modal-content p {
          color: #fff;
        }

        .close-btn {
          color: #fff;
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
      </style>

      <div class="swiper">
        <div class="swiper-wrapper">
          ${produtos.map((p, index) => `
            <div class="swiper-slide" data-index="${index}">
              <img src="${p.imagem}" class="card-img">
              <div class="card-title">${p.nome}</div>
              <button class="btn" data-index="${index}"> Ver Mais</button>
            </div>
          `).join('')}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <!-- Modal -->
      <div class="modal">
        <div class="modal-content">
          <button class="close-btn">&times;</button>
          <img src="" alt="Imagem">
          <h2></h2>
          <p></p>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    `;

    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    swiperScript.onload = () => this.initSwiper(produtos);
    this.shadowRoot.appendChild(swiperScript);

    this.bloquearInteracoes();
  }

  initSwiper(produtos) {
    const swiper = new Swiper(this.shadowRoot.querySelector('.swiper'), {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,

      coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },

      navigation: {
        nextEl: this.shadowRoot.querySelector('.swiper-button-next'),
        prevEl: this.shadowRoot.querySelector('.swiper-button-prev'),
      },

      keyboard: { enabled: true },

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });

    this.setupModal(produtos);
  }

  setupModal(produtos) {
    const modal = this.shadowRoot.querySelector('.modal');
    const img = modal.querySelector('img');
    const title = modal.querySelector('h2');
    const desc = modal.querySelector('p');
    const closeBtn = modal.querySelector('.close-btn');

    const buttons = this.shadowRoot.querySelectorAll('.btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        const produto = produtos[index];

        img.src = produto.imagem;
        title.textContent = produto.nome;
        desc.textContent = produto.descricao;

        modal.style.display = 'flex';
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  bloquearInteracoes() {
    window.addEventListener('gesturestart', e => e.preventDefault());
    window.addEventListener('gesturechange', e => e.preventDefault());
    window.addEventListener('gestureend', e => e.preventDefault());

    window.addEventListener('wheel', e => {
      if (e.ctrlKey) e.preventDefault();
    }, { passive: false });

    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=')) {
        e.preventDefault();
      }
    });
  }
}

customElements.define('carrossel-produto', CarrosselProduto);