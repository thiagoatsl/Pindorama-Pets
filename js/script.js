document.addEventListener('DOMContentLoaded', function () {
    
    // --- LÓGICA DO CARROSSEL ---

    // Seletores dos elementos do carrossel
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    const carousel = document.querySelector('.carousel-container');
    const overlay = document.querySelector('.carousel-overlay');
    const overlayTitle = overlay.querySelector('.carousel-overlay-title');
    const overlayCta = document.querySelector('.carousel-cta-floating');

    // Verificação de segurança: Só executa se os elementos principais existirem
    if (!carousel || slides.length === 0 || !prevBtn || !nextBtn || indicators.length === 0 || !overlay) {
        console.warn("Elementos do carrossel não encontrados. O script do carrossel não será executado.");
        return; // Para a execução se o carrossel não estiver completo
    }

    let current = 0;
    const total = slides.length;

    // Conteúdo dinâmico de cada slide
    const slideContents = [
        {
            subtitle: 'Nos dias 19 a 28 de novembro',
            title: 'Campanha de vacinação',
            ctaText: 'Saiba mais',
            ctaHref: '#contato', // Atualize este link se necessário
            show: true
        },
        {
            title: 'Campanha de adoção',
            subtitle: 'Dê um lar cheio de amor a quem só quer te fazer feliz!\nAdote um amigo de quatro patas e transforme sua\nvida e a dele',
            ctaText: 'Saiba mais',
            ctaHref: '#servicos', // Atualize este link se necessário
            show: true
        },
        {
            title: 'Banho e tosa: cuidado e saúde para seu pet',
            subtitle: 'Nossa clínica dispõe do serviço de higiene para seu Pet \npermanecer limpo, cheiroso e longe de parasitas\n.',
            ctaText: 'Saiba mais',
            ctaHref: '#contato', // Atualize este link se necessário
            show: true
        }
    ];

    // Função principal para trocar de slide
    function goTo(index) {
        current = (index + total) % total; // Garante que o índice seja cíclico

        // Atualiza a classe 'active' nos slides
        slides.forEach((s, i) => {
            const isActive = i === current;
            s.classList.toggle('active', isActive);
        });

        // Atualiza a classe 'active' nos indicadores
        indicators.forEach((ind, i) => {
            const selected = i === current;
            ind.classList.toggle('active', selected);
            ind.setAttribute('aria-selected', selected ? 'true' : 'false');
            ind.setAttribute('tabindex', selected ? '0' : '-1');
        });

        // Atualiza o conteúdo do overlay (título, subtítulo, CTA)
        const content = slideContents[current] || { title: '', ctaText: 'Saiba mais', ctaHref: '#contato', show: false };
        const overlaySubtitle = overlay.querySelector('.carousel-overlay-subtitle');
        
        if (content.show) {
            overlayTitle.textContent = content.title;
            if (overlayCta) {
                overlayCta.textContent = content.ctaText;
                overlayCta.setAttribute('href', content.ctaHref);
                overlayCta.style.display = '';
                overlayCta.setAttribute('aria-hidden', 'false');
            }
            if (overlaySubtitle) {
                overlaySubtitle.textContent = content.subtitle || '';
                overlaySubtitle.style.display = content.subtitle ? '' : 'none';
            }
            overlay.style.display = '';
            overlay.setAttribute('aria-hidden', 'false');
        } else {
            // Esconde o overlay se 'show' for false
            overlay.style.display = 'none';
            overlay.setAttribute('aria-hidden', 'true');
            if (overlaySubtitle) overlaySubtitle.style.display = 'none';
            if (overlayCta) {
                overlayCta.style.display = 'none';
                overlayCta.setAttribute('aria-hidden', 'true');
            }
        }

        // Define o atributo 'data-slide' para aplicar estilos CSS específicos
        overlay.setAttribute('data-slide', String(current));

        // Lógica de CSS-in-JS para posicionar o CTA no slide 1 (adoção)
        if (overlayCta) {
            if (current === 1) { // Slide de adoção
                overlayCta.style.position = 'absolute';
                overlayCta.style.left = '21.5%';
                overlayCta.style.top = '55%';
                overlayCta.style.transform = 'translate(-50%, -0%)';
                overlayCta.style.zIndex = '14';
            } else { // Reseta o estilo para os outros slides
                overlayCta.style.left = '';
                overlayCta.style.top = '';
                overlayCta.style.transform = '';
                overlayCta.style.position = '';
                overlayCta.style.zIndex = '';
            }
        }
    }

    // Funções auxiliares de navegação
    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // --- Event Listeners ---

    // Cliques nos botões de seta
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // Cliques nos indicadores (bolinhas)
    indicators.forEach(ind => {
        ind.addEventListener('click', () => {
            const idx = parseInt(ind.getAttribute('data-index'), 10);
            goTo(idx);
        });
    });

    // Navegação pelo teclado (setas)
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    // Inicia o carrossel no primeiro slide
    goTo(0);

    // --- FIM DA LÓGICA DO CARROSSEL ---
});