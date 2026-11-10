
/* ==========================================================
   PORTFÓLIO ESCOLAR — PROJETO DE VIDA
   Estudante: Bernardo Silva Xavier
   Instituição: FUNEC Xangrilá
   Ano: 2026

   Arquivo: script.js
   ========================================================== */


/* ==========================================================
   1. INICIALIZAÇÃO
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Elementos principais
    const header = document.querySelector('.header');

    const menuToggle = document.querySelector('.menu-toggle');

    const navMenu = document.querySelector('.nav-menu');

    const navLinks = document.querySelectorAll('.nav-link');

    const backToTop = document.querySelector('.back-to-top');

    const sections = document.querySelectorAll(
        'main section[id]'
    );


    /* ======================================================
       2. MENU MOBILE
       ====================================================== */

    function openMenu() {

        navMenu.classList.add('active');

        menuToggle.classList.add('active');

        menuToggle.setAttribute('aria-expanded', 'true');

        menuToggle.setAttribute('aria-label', 'Fechar menu');

        document.body.classList.add('menu-open');

    }

    function closeMenu() {

        navMenu.classList.remove('active');

        menuToggle.classList.remove('active');

        menuToggle.setAttribute('aria-expanded', 'false');

        menuToggle.setAttribute('aria-label', 'Abrir menu');

        document.body.classList.remove('menu-open');

    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener('click', () => {

            const isOpen = navMenu.classList.contains('active');

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        // Fechar ao clicar em um link
        navLinks.forEach(link => {

            link.addEventListener('click', closeMenu);

        });

        // Fechar ao pressionar ESC
        document.addEventListener('keydown', event => {

            if (event.key === 'Escape') {

                closeMenu();

            }

        });

        // Fechar se a tela voltar ao tamanho de computador
        window.addEventListener('resize', () => {

            if (window.innerWidth > 1100) {

                closeMenu();

            }

        });

    }


    /* ======================================================
       3. ROLAGEM SUAVE
       ====================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener('click', event => {

            const targetId = link.getAttribute('href');

            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: 'smooth'

            });

        });

    });


    /* ======================================================
       4. INDICADOR DA SEÇÃO ATUAL
       ====================================================== */

    function updateActiveLink() {

        let currentSection = 'inicio';

        const position = window.scrollY + 200;

        sections.forEach(section => {

            const top = section.offsetTop;

            const bottom = top + section.offsetHeight;

            if (position >= top && position < bottom) {

                currentSection = section.id;

            }

        });

        navLinks.forEach(link => {

            const destination = link.getAttribute('href');

            link.classList.remove('active');

            link.removeAttribute('aria-current');

            if (destination === `#${currentSection}`) {

                link.classList.add('active');

                link.setAttribute('aria-current', 'location');

            }

        });

    }

    window.addEventListener('scroll', updateActiveLink);

    window.addEventListener('load', updateActiveLink);


    /* ======================================================
       5. CABEÇALHO AO ROLAR A PÁGINA
       ====================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add('scrolled');

        } else {

            header.classList.remove('scrolled');

        }

    }

    window.addEventListener('scroll', updateHeader);

    updateHeader();


    /* ======================================================
       6. BOTÃO VOLTAR AO TOPO
       ====================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 500) {

            backToTop.classList.add('visible');

        } else {

            backToTop.classList.remove('visible');

        }

    }

    if (backToTop) {

        window.addEventListener('scroll', updateBackToTop);

        backToTop.addEventListener('click', () => {

            window.scrollTo({

                top: 0,

                behavior: 'smooth'

            });

        });

    }


    /* ======================================================
       7. ANIMAÇÕES AO APARECER NA TELA
       ====================================================== */

    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {

        const revealObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('visible');

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }

        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add('visible');

        });

    }


    /* ======================================================
       8. LIGHTBOX — ELEMENTOS
       ====================================================== */

    const lightbox = document.querySelector('#lightbox');

    const lightboxImage = document.querySelector('#lightboxImage');

    const lightboxCaption = document.querySelector('#lightboxCaption');

    const lightboxClose = document.querySelector('#lightboxClose');

    const lightboxPrev = document.querySelector('#lightboxPrev');

    const lightboxNext = document.querySelector('#lightboxNext');

    const galleryButtons = Array.from(

        document.querySelectorAll('.gallery-button')

    );

    let currentImageIndex = 0;

    let previousFocus = null;


    /* ======================================================
       9. ABRIR FOTOGRAFIA
       ====================================================== */

    function openLightbox(index) {

        if (!lightbox || galleryButtons.length === 0) return;

        currentImageIndex = index;

        previousFocus = document.activeElement;

        updateLightbox();

        lightbox.classList.add('active');

        lightbox.setAttribute('aria-hidden', 'false');

        document.body.classList.add('lightbox-open');

        lightboxClose.focus();

    }


    /* ======================================================
       10. ATUALIZAR FOTOGRAFIA
       ====================================================== */

    function updateLightbox() {

        const button = galleryButtons[currentImageIndex];

        if (!button) return;

        const image = button.querySelector('img');

        const fullImage = button.dataset.full;

        const caption = button.dataset.caption;

        // Utiliza a imagem ampliada definida no HTML
        lightboxImage.src = fullImage || image.src;

        lightboxImage.alt = image.alt;

        // Legenda definida no HTML
        lightboxCaption.textContent = caption ||
            button.closest('.gallery-item')
                ?.querySelector('figcaption')
                ?.textContent ||
            image.alt;

        // Mostrar navegação somente se houver mais imagens
        const hasMultipleImages = galleryButtons.length > 1;

        lightboxPrev.hidden = !hasMultipleImages;

        lightboxNext.hidden = !hasMultipleImages;

    }


    /* ======================================================
       11. PRÓXIMA FOTOGRAFIA
       ====================================================== */

    function nextImage() {

        currentImageIndex++;

        if (currentImageIndex >= galleryButtons.length) {

            currentImageIndex = 0;

        }

        updateLightbox();

    }


    /* ======================================================
       12. FOTOGRAFIA ANTERIOR
       ====================================================== */

    function previousImage() {

        currentImageIndex--;

        if (currentImageIndex < 0) {

            currentImageIndex = galleryButtons.length - 1;

        }

        updateLightbox();

    }


    /* ======================================================
       13. FECHAR LIGHTBOX
       ====================================================== */

    function closeLightbox() {

        if (!lightbox) return;

        lightbox.classList.remove('active');

        lightbox.setAttribute('aria-hidden', 'true');

        document.body.classList.remove('lightbox-open');

        // Devolve o foco ao elemento anterior
        if (previousFocus) {

            previousFocus.focus();

        }

    }


    /* ======================================================
       14. EVENTOS DA GALERIA
       ====================================================== */

    galleryButtons.forEach((button, index) => {

        button.addEventListener('click', () => {

            openLightbox(index);

        });

    });


    /* ======================================================
       15. EVENTOS DO LIGHTBOX
       ====================================================== */

    if (lightbox) {

        lightboxClose.addEventListener('click', closeLightbox);

        lightboxNext.addEventListener('click', nextImage);

        lightboxPrev.addEventListener('click', previousImage);

        // Fechar ao clicar fora da fotografia
        lightbox.addEventListener('click', event => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        });

    }


    /* ======================================================
       16. CONTROLES PELO TECLADO
       ====================================================== */

    document.addEventListener('keydown', event => {

        if (
            !lightbox ||
            !lightbox.classList.contains('active')
        ) return;

        if (event.key === 'Escape') {

            closeLightbox();

        }

        if (event.key === 'ArrowRight') {

            nextImage();

        }

        if (event.key === 'ArrowLeft') {

            previousImage();

        }

    });


    /* ======================================================
       17. PREVENIR ROLAGEM COM LIGHTBOX ABERTO
       ====================================================== */

    // A classe lightbox-open será utilizada pelo CSS
    // para bloquear a rolagem do documento.

    /* ======================================================
       18. INICIALIZAÇÃO FINAL
       ====================================================== */

    updateActiveLink();

    updateBackToTop();

    console.log(
        'Portfólio Projeto de Vida — carregado com sucesso!'
    );

});


document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // ELEMENTOS
    // =====================================

    const filtros = document.querySelectorAll(".year-filter");
    const meses = document.querySelectorAll(".year-month");

    const modal = document.getElementById("memoryModal");
    const fecharModal = document.getElementById("closeMemoryModal");

    const tituloModal = document.getElementById("memoryModalTitle");
    const descricaoModal = document.getElementById("memoryModalDescription");
    const mesModal = document.getElementById("memoryModalMonth");

    const imagemPessoal = document.getElementById("personalMemoryImage");
    const imagemEscola = document.getElementById("schoolMemoryImage");

    const legendaPessoal = document.getElementById("personalMemoryCaption");
    const legendaEscola = document.getElementById("schoolMemoryCaption");

    const placeholderPessoal = document.getElementById("personalPlaceholder");
    const placeholderEscola = document.getElementById("schoolPlaceholder");

    // =====================================
    // DADOS DOS MESES
    // =====================================

    const memorias = {

        fevereiro: {
            nome: "Fevereiro",
            numero: "02",
            descricao: "O começo de uma nova etapa.",
            pessoal: {
                imagem: "imagens/galeria/fevereiro/pessoal.jpg",
                legenda: "Uma lembrança especial da minha vida pessoal."
            },
            escola: {
                imagem: "imagens/galeria/fevereiro/escola.jpg",
                legenda: "Um registro da minha caminhada na escola."
            }
        },

        marco: {
            nome: "Março",
            numero: "03",
            descricao: "Novas experiências e descobertas.",
            pessoal: {
                imagem: "imagens/galeria/marco/pessoal.jpg",
                legenda: "Uma lembrança especial de março."
            },
            escola: {
                imagem: "imagens/galeria/marco/escola.jpg",
                legenda: "Um momento vivido durante as aulas."
            }
        },

        abril: {
            nome: "Abril",
            numero: "04",
            descricao: "Momentos que marcaram o mês.",
            pessoal: {
                imagem: "imagens/galeria/abril/pessoal.jpg",
                legenda: "Uma lembrança da minha vida pessoal."
            },
            escola: {
                imagem: "imagens/galeria/abril/escola.jpg",
                legenda: "Uma atividade ou experiência escolar."
            }
        },

        maio: {
            nome: "Maio",
            numero: "05",
            descricao: "Novos aprendizados e experiências.",
            pessoal: {
                imagem: "imagens/galeria/maio/pessoal.jpg",
                legenda: "Um momento especial de maio."
            },
            escola: {
                imagem: "imagens/galeria/maio/escola.jpg",
                legenda: "Um registro da minha vida escolar."
            }
        },

        junho: {
            nome: "Junho",
            numero: "06",
            descricao: "Experiências e descobertas.",
            pessoal: {
                imagem: "imagens/galeria/junho/pessoal.jpg",
                legenda: "Uma lembrança especial de junho."
            },
            escola: {
                imagem: "imagens/galeria/junho/escola.jpg",
                legenda: "Um momento vivido na escola."
            }
        },

        julho: {
            nome: "Julho",
            numero: "07",
            descricao: "Uma pausa para recordar.",
            pessoal: {
                imagem: "imagens/galeria/julho/pessoal.jpg",
                legenda: "Uma lembrança das férias."
            },
            escola: {
                imagem: "imagens/galeria/julho/escola.jpg",
                legenda: "Um registro escolar deste período."
            }
        },

        agosto: {
            nome: "Agosto",
            numero: "08",
            descricao: "Mais um capítulo da minha jornada.",
            pessoal: {
                imagem: "imagens/galeria/agosto/pessoal.jpg",
                legenda: "Uma lembrança especial de agosto."
            },
            escola: {
                imagem: "imagens/galeria/agosto/escola.jpg",
                legenda: "Uma experiência da minha caminhada escolar."
            }
        },

        setembro: {
            nome: "Setembro",
            numero: "09",
            descricao: "Novos momentos e aprendizados.",
            pessoal: {
                imagem: "imagens/galeria/setembro/pessoal.jpg",
                legenda: "Uma lembrança especial de setembro."
            },
            escola: {
                imagem: "imagens/galeria/setembro/escola.jpg",
                legenda: "Um momento vivido na escola."
            }
        },

        outubro: {
            nome: "Outubro",
            numero: "10",
            descricao: "Lembranças que merecem ser guardadas.",
            pessoal: {
                imagem: "imagens/galeria/outubro/pessoal.jpg",
                legenda: "Um momento especial de outubro."
            },
            escola: {
                imagem: "imagens/galeria/outubro/escola.jpg",
                legenda: "Um registro da vida escolar."
            }
        },

        novembro: {
            nome: "Novembro",
            numero: "11",
            descricao: "A reta final de 2026.",
            pessoal: {
                imagem: "imagens/galeria/novembro/pessoal.jpg",
                legenda: "Uma lembrança especial de novembro."
            },
            escola: {
                imagem: "imagens/galeria/novembro/escola.jpg",
                legenda: "Um registro da minha caminhada escolar."
            }
        }

    };

    // =====================================
    // FILTROS DOS TRIMESTRES
    // =====================================

    filtros.forEach(filtro => {

        filtro.addEventListener("click", () => {

            // Remove seleção anterior
            filtros.forEach(botao => {
                botao.classList.remove("active");
            });

            filtro.classList.add("active");

            const trimestre = filtro.dataset.filter;

            meses.forEach(mes => {

                const trimestreMes = mes.dataset.trimestre;

                if (
                    trimestre === "todos" ||
                    trimestreMes === trimestre
                ) {
                    mes.classList.remove("month-hidden");
                } else {
                    mes.classList.add("month-hidden");
                }

            });

        });

    });

    // =====================================
    // CARREGAR IMAGENS
    // =====================================

    function carregarImagem(img, placeholder, caminho) {

        img.style.display = "none";
        placeholder.style.display = "flex";

        img.onload = () => {
            img.style.display = "block";
            placeholder.style.display = "none";
        };

        img.onerror = () => {
            img.style.display = "none";
            placeholder.style.display = "flex";
        };

        img.src = caminho;

    }

    // =====================================
    // ABRIR MODAL
    // =====================================

    function abrirModal(mesSelecionado) {

        const dados = memorias[mesSelecionado];

        if (!dados) return;

        tituloModal.textContent = dados.nome;
        descricaoModal.textContent = dados.descricao;
        mesModal.textContent = `${dados.numero} / 2026`;

        // Fotografia pessoal
        carregarImagem(
            imagemPessoal,
            placeholderPessoal,
            dados.pessoal.imagem
        );

        legendaPessoal.textContent = dados.pessoal.legenda;

        // Fotografia escolar
        carregarImagem(
            imagemEscola,
            placeholderEscola,
            dados.escola.imagem
        );

        legendaEscola.textContent = dados.escola.legenda;

        // Abre o modal
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        fecharModal.focus();

    }

    // =====================================
    // CLIQUE NOS MESES
    // =====================================

    meses.forEach(botao => {

        botao.addEventListener("click", () => {

            const mesSelecionado = botao.dataset.month;

            abrirModal(mesSelecionado);

        });

    });

    // =====================================
    // FECHAR MODAL
    // =====================================

    function fechar() {

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

    }

    fecharModal.addEventListener("click", fechar);

    // Fecha ao clicar no fundo
    modal.querySelectorAll("[data-close-modal]").forEach(elemento => {

        elemento.addEventListener("click", fechar);

    });

    // Fecha com ESC
    document.addEventListener("keydown", evento => {

        if (
            evento.key === "Escape" &&
            modal.classList.contains("active")
        ) {
            fechar();
        }

    });

});
