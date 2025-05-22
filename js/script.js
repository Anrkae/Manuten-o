// Aguardar o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Adicionar classe active ao link do menu correspondente à seção visível
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                menuLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Inicializar Swiper para o carrossel da Hero Section
    const heroSwiper = new Swiper('.hero-swiper', {
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        loopAdditionalSlides: 3,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: { // Mobile
                slidesPerView: 1.2,
            },
            768: { // Tablet
                slidesPerView: 'auto',
            },
            1024: { // Desktop
                slidesPerView: 'auto',
            }
        }
    });
    
    // Inicializar Swiper para a seção de Destaques
    const destaquesSwiper = new Swiper('.destaques-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
    
    // Inicializar Swiper para a seção de Depoimentos
    const depoimentosSwiper = new Swiper('.depoimentos-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
    
    // Filtro de Produtos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const produtoItems = document.querySelectorAll('.produto-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            // Obter o valor do filtro
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar os produtos
            produtoItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
                
                // Adicionar animação aos itens visíveis
                setTimeout(() => {
                    if (item.style.display === 'block') {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }
                }, 100);
            });
        });
    });
    
    // Botão Voltar ao Topo
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Modal de Produto
    const btnVer = document.querySelectorAll('.btn-ver');
    const modal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalProductImage = document.getElementById('modal-product-image');
    const modalProductTitle = document.getElementById('modal-product-title');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalWhatsappLink = document.getElementById('modal-whatsapp-link');
    
    btnVer.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obter informações do produto
            const produtoCard = this.closest('.produto-card');
            const produtoImage = produtoCard.querySelector('img').src;
            const produtoTitle = produtoCard.querySelector('h3').textContent;
            const produtoPrice = produtoCard.querySelector('.price').textContent;
            const whatsappLink = produtoCard.querySelector('.btn-whatsapp').href;
            
            // Preencher o modal com as informações do produto
            modalProductImage.src = produtoImage;
            modalProductTitle.textContent = produtoTitle;
            modalProductPrice.textContent = produtoPrice;
            modalWhatsappLink.href = whatsappLink;
            
            // Mostrar o modal
            modal.classList.add('show');
            
            // Desabilitar o scroll do body
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar o modal
    modalClose.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });
    
    // Fechar o modal ao clicar fora do conteúdo
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Seleção de tamanho no modal
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sizeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Formulário de Contato
    const formContato = document.getElementById('form-contato');
    const toast = document.getElementById('toast');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio de formulário
            setTimeout(() => {
                // Mostrar toast de sucesso
                toast.classList.add('show');
                
                // Resetar o formulário
                formContato.reset();
                
                // Esconder o toast após 3 segundos
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }, 1000);
        });
    }
    
    // Formulário de Newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de inscrição na newsletter
            const input = this.querySelector('input');
            const email = input.value;
            
            if (email) {
                // Mostrar toast de sucesso
                toast.querySelector('.toast-message').textContent = 'Inscrição realizada com sucesso!';
                toast.classList.add('show');
                
                // Resetar o formulário
                this.reset();
                
                // Esconder o toast após 3 segundos
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        });
    }
    
    // Adicionar efeito de hover nos cards de produtos
    const produtoCards = document.querySelectorAll('.produto-card');
    
    produtoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.produto-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.produto-overlay').style.opacity = '0';
        });
    });
    
    // Suporte a gestos de swipe em dispositivos móveis para o carrossel
    const heroCarousel = document.querySelector('.hero-carousel');
    
    if (heroCarousel) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        heroCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        heroCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Swipe para a esquerda
                heroSwiper.slideNext();
            } else if (touchEndX > touchStartX) {
                // Swipe para a direita
                heroSwiper.slidePrev();
            }
        }
    }
    
    // Animação de entrada para os elementos quando entram no viewport
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    window.addEventListener('load', checkIfInView);
    
    // Efeito parallax sutil em algumas seções
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Adicionar funcionalidade de máscara para o campo de telefone
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value;
                
                if (value.length > 3) {
                    value = value.substring(0, 3) + ') ' + value.substring(3);
                }
                
                if (value.length > 10) {
                    value = value.substring(0, 10) + '-' + value.substring(10, 15);
                }
            }
            
            e.target.value = value;
        });
    }
    
    // Adicionar efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn, .btn-whatsapp, .btn-ver, .social-icon');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 87, 34, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Adicionar efeito de loading ao enviar formulário
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    
    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity()) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.innerHTML = this.dataset.originalText || '<i class="fas fa-check"></i> Enviado!';
                    
                    setTimeout(() => {
                        this.innerHTML = this.dataset.originalText || 'Enviar';
                        this.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
        
        // Salvar o texto original do botão
        button.dataset.originalText = button.innerHTML;
    });
    
    // Adicionar efeito de hover nas imagens dos produtos
    const produtoImages = document.querySelectorAll('.produto-image img, .destaque-image img');
    
    produtoImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Detectar quando o usuário chega ao final da página
    window.addEventListener('scroll', function() {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            // O usuário chegou ao final da página
            // Podemos mostrar um popup de newsletter, por exemplo
        }
    });
    
    // Adicionar funcionalidade de preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });
    
    // Adicionar estilos para o preloader
    const preloaderStyle = document.createElement('style');
    preloaderStyle.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #121212;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .spinner {
            width: 70px;
            text-align: center;
        }
        
        .spinner > div {
            width: 18px;
            height: 18px;
            background-color: #FF5722;
            border-radius: 100%;
            display: inline-block;
            animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        }
        
        .spinner .bounce1 {
            animation-delay: -0.32s;
        }
        
        .spinner .bounce2 {
            animation-delay: -0.16s;
        }
        
        @keyframes sk-bouncedelay {
            0%, 80%, 100% { 
                transform: scale(0);
            } 40% { 
                transform: scale(1.0);
            }
        }
    `;
    document.head.appendChild(preloaderStyle);
});
