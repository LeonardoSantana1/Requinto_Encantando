import { Membros } from "./quemsomos.js";

(() => {
  let currentSlide = 0;
  const slidesContainer = document.querySelector(
    ".SliderQuemSomos .QuemSomosSlides"
  );
  const nextButton = document.querySelector(".SliderQuemSomos .next-qs");
  const prevButton = document.querySelector(".SliderQuemSomos .prev-qs");
  const sliderWrapper = document.querySelector(".SliderQuemSomos"); // Referência ao contêiner principal do slider
  const totalSlides = Membros.length;

  let autoplayInterval; // Variável para armazenar o ID do intervalo do autoplay
  const AUTOPLAY_DELAY = 5000; // Tempo em milissegundos (5 segundos)

  function renderSlides() {
    // Limpa o conteúdo atual do container de slides
    slidesContainer.innerHTML = "";

    Membros.forEach((membro, index) => {
      const slide = document.createElement("div");
      slide.classList.add("slide-qs");
      // Oculta os slides que não são o slide atual
      if (index !== currentSlide) slide.style.display = "none";
      // Exibe o slide atual (usar 'flex' se o seu CSS `.slide-qs` for display: flex)
      else slide.style.display = "flex";

      slide.innerHTML = `
        <div class="conteudo-qs">
          <div class="bloco-qs foto-qs">
            <img src="${membro.imagem}" alt="${membro.nome}" onerror="this.onerror=null;this.src='https://placehold.co/150x150/cccccc/333333?text=Erro';">
          </div>
          <div class="bloco-qs texto-qs">
            <h3>${membro.nome}</h3>
            <p>${membro.descricao}</p>
          </div>
        </div>
      `;

      slidesContainer.appendChild(slide);
    });
  }

  // Função para avançar para o próximo slide
  function goToNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    renderSlides();
  }

  // Função para parar o autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Função para iniciar o autoplay
  function startAutoplay() {
    stopAutoplay(); // Garante que não há múltiplos intervalos rodando
    autoplayInterval = setInterval(goToNextSlide, AUTOPLAY_DELAY);
  }

  // Event listener para o botão "Próximo"
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      stopAutoplay(); // Para o autoplay
      goToNextSlide(); // Avança o slide
      startAutoplay(); // Reinicia o autoplay
    });
  }

  // Event listener para o botão "Anterior"
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      stopAutoplay(); // Para o autoplay
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Volta um slide
      renderSlides(); // Renderiza o slide
      startAutoplay(); // Reinicia o autoplay
    });
  }

  // Event listeners para pausar/retomar autoplay no mouseover/mouseout
  // Verifica se o sliderWrapper existe antes de adicionar os listeners
  if (sliderWrapper) {
    sliderWrapper.addEventListener("mouseenter", stopAutoplay); // Pausa o autoplay ao entrar
    sliderWrapper.addEventListener("mouseleave", startAutoplay); // Reinicia o autoplay ao sair
  }

  // Inicia a renderização dos slides e o autoplay quando a página carrega
  renderSlides();
  startAutoplay();
})();
