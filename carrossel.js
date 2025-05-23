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
    try {
      const response = await fetch('produtos.json');
      if (!response.ok) throw new Error('Erro ao carregar produtos');
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
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
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .card-img {
          width: 100%;
          max-width: 250px;
          border-radius: 15px;
          margin-bottom: 15px;
        }

        .card-title {
          font-size: 1.2rem;
          margin-bottom: 8px;
          text-align: center;
        }

        .card-price {
          font-size: 1rem;
          margin-bottom: 15px;
          color: #00ffaa;
        }

        .btn {
          background-color: #00ffaa;
          color: #000;
          padding: 10px 20px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn:hover {
          background-color: #00ddaa;
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }
      </style>

      <div class="swiper">
        <div class="swiper-wrapper">
          ${produtos.map(p => `
            <div class="swiper-slide">
              <img src="${p.imagem}" class="card-img">
              <div class="card-title">${p.nome}</div>
              <div class="card-price">${p.preco}</div>
              <button class="btn">Comprar</button>
            </div>
          `).join('')}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    `;

    const swiperScript = document.createElement('script');
    swiperScript.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    swiperScript.onload = () => this.initSwiper();
    this.shadowRoot.appendChild(swiperScript);

    this.bloquearInteracoes();
  }

  initSwiper() {
    const swiper = new Swiper(this.shadowRoot.querySelector('.swiper'), {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,

      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },

      navigation: {
        nextEl: this.shadowRoot.querySelector('.swiper-button-next'),
        prevEl: this.shadowRoot.querySelector('.swiper-button-prev'),
      },

      keyboard: {
        enabled: true,
      },
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