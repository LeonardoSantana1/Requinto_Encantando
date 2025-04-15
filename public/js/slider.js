(() => {
  let currentSlide = 0;
  const slidesContainer = document.querySelector(".Slides");
  let totalSlides = 0;
  let isTransitioning = false;

  // Função para atualizar a posição do slide
  function updateSlider() {
    if (totalSlides === 0 || isTransitioning) return;

    isTransitioning = true;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Remove o flag quando a transição terminar
    const handleTransitionEnd = () => {
      isTransitioning = false;
      slidesContainer.removeEventListener("transitionend", handleTransitionEnd);
    };

    slidesContainer.addEventListener("transitionend", handleTransitionEnd);
  }

  // Função para adicionar slides
  function addSlidesToSlider(comentarios) {
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
    currentSlide = 0;
    slidesContainer.style.transform = "translateX(0)";

    // Força o navegador a reconhecer a mudança
    void slidesContainer.offsetWidth;

    // Reativa a transição
    slidesContainer.style.transition =
      "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    isTransitioning = false;
  }

  // Event listeners para os botões
  document.querySelector(".next").addEventListener("click", () => {
    if (totalSlides <= 1 || isTransitioning) return;
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  });

  document.querySelector(".prev").addEventListener("click", () => {
    if (totalSlides <= 1 || isTransitioning) return;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  // Torna a função acessível globalmente
  window.addSlidesToSlider = addSlidesToSlider;
})();
