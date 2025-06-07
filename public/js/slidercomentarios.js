(() => {
  let currentSlide = 0;
  const slidesContainer = document.querySelector(".Slides");
  let totalSlides = 0;
  let isTransitioning = false;

  let autoplayInterval; // Variável para armazenar o ID do intervalo do autoplay
  const AUTOPLAY_DELAY = 5000; // Tempo em milissegundos (6 segundos para comentários)

  // Função para atualizar a posição do slide
  function updateSlider() {
    // Se não há slides ou uma transição está em andamento, ou o container não foi encontrado, sai
    if (totalSlides === 0 || isTransitioning || !slidesContainer) return;

    isTransitioning = true;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Remove o flag quando a transição terminar
    const handleTransitionEnd = () => {
      isTransitioning = false;
      slidesContainer.removeEventListener("transitionend", handleTransitionEnd);
    };

    slidesContainer.addEventListener("transitionend", handleTransitionEnd);
  }

  // Função para avançar para o próximo slide para o autoplay
  function goToNextComment() {
    // Só avança se não houver transição em andamento e houver mais de um slide
    if (isTransitioning || totalSlides <= 1) return;

    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  // Função para parar o autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Função para iniciar o autoplay
  function startAutoplay() {
    stopAutoplay(); // Garante que não há múltiplos intervalos rodando
    // Inicia o autoplay apenas se houver mais de um slide
    if (totalSlides > 1) {
      autoplayInterval = setInterval(goToNextComment, AUTOPLAY_DELAY);
    }
  }

  // Função para adicionar slides (já existente, mas com pequenas otimizações para autoplay)
  function addSlidesToSlider(comentarios) {
    stopAutoplay(); // Para o autoplay enquanto os slides são atualizados

    isTransitioning = true; // Bloqueia durante a atualização

    slidesContainer.style.transition = "none"; // Desativa transição temporariamente
    slidesContainer.innerHTML = "";

    if (!comentarios || comentarios.length === 0) {
      const slide = document.createElement("div");
      slide.classList.add("slide-dinamico");
      slide.innerHTML = `
        <div>
          <h3 class="nome-comentario">Nenhum comentário ainda</h3>
          <p class="texto-comentario">Seja o primeiro a deixar seu comentário!</p>
        </div>
      `;
      slidesContainer.appendChild(slide);
    } else {
      comentarios.forEach((comentario) => {
        const slide = document.createElement("div");
        slide.classList.add("slide-dinamico");
        slide.innerHTML = `
          <div>
            <h3 class="nome-comentario">${comentario.nome || "Anônimo"}</h3>
            <p class="texto-comentario" style="white-space: pre-wrap;">${
              comentario.mensagem || "Sem mensagem"
            }</p>
            <div class="estrelas">${"⭐".repeat(comentario.nota || 0)}</div>
          </div>
        `;
        slidesContainer.appendChild(slide);
      });
    }

    totalSlides = slidesContainer.children.length;
    currentSlide = 0; // Reseta para o primeiro slide ao carregar novos comentários
    slidesContainer.style.transform = "translateX(0)";

    // Força o navegador a reconhecer a mudança
    void slidesContainer.offsetWidth;

    // Reativa a transição
    slidesContainer.style.transition =
      "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    isTransitioning = false;

    // Reinicia o autoplay após a atualização dos slides
    startAutoplay();
  }

  // Event listeners para os botões de navegação
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const sliderWrapper = document.querySelector(".Slider"); // O contêiner principal do slider

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      if (totalSlides <= 1 || isTransitioning) return;
      stopAutoplay(); // Para o autoplay
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
      startAutoplay(); // Reinicia o autoplay
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      if (totalSlides <= 1 || isTransitioning) return;
      stopAutoplay(); // Para o autoplay
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
      startAutoplay(); // Reinicia o autoplay
    });
  }

  // Event listeners para pausar/retomar autoplay no mouseover/mouseout
  if (sliderWrapper) {
    sliderWrapper.addEventListener("mouseenter", stopAutoplay); // Pausa o autoplay ao entrar
    sliderWrapper.addEventListener("mouseleave", startAutoplay); // Reinicia o autoplay ao sair
  }

  // Torna a função addSlidesToSlider acessível globalmente (já estava presente)
  window.addSlidesToSlider = addSlidesToSlider;

  // Inicia o autoplay quando a página carrega, caso já existam comentários ao iniciar
  // Isso será sobrescrito por addSlidesToSlider quando os comentários forem carregados do Firebase
  // ou de outra fonte, o que é o comportamento esperado.
  if (totalSlides > 1) {
    // Só inicia se houver mais de um slide
    startAutoplay();
  }
})();
