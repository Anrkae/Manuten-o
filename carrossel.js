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
          padding: 0;
          margin: 35px 0 60px;
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
          height: auto;
          width: auto;
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
          opacity: 0.2;
        }

        .card-img {
          width: 100%;
          max-width: 350px;
          border-radius: 15px;
          margin-bottom: 15px;
          transition: transform 0.4s ease;
        }
    
        .card-img:hover {
          transform: scale(1.2) translateY(-15px);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white;
        }
      </style>

      <div class="swiper">
        <div class="swiper-wrapper">
          ${produtos.map((p, index) => `
            <div class="swiper-slide" data-index="${index}">
              <img src="${p.imagem}" class="card-img">
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