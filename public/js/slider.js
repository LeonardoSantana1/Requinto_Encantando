(() => {
    let currentSlide = 0;
    const slidesContainer = document.querySelector(".Slides");
    let totalSlides = 0;
  
    function updateSlider() {
      if (totalSlides === 0) return;
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  
    function addSlidesToSlider(comentarios) {
      slidesContainer.innerHTML = "";
      
      if (!comentarios || comentarios.length === 0) {
        // Adiciona um slide padrão quando não há comentários
        const slide = document.createElement("div");
        slide.classList.add("slide-dinamico");
        slide.innerHTML = `
          <div style="padding: 20px;">
            <h3>Nenhum comentário ainda</h3>
            <p>Seja o primeiro a deixar seu comentário!</p>
          </div>
        `;
        slidesContainer.appendChild(slide);
      } else {
        // Adiciona os slides dos comentários
        comentarios.forEach((comentario) => {
          const slide = document.createElement("div");
          slide.classList.add("slide-dinamico");
          slide.innerHTML = `
            <div>
              <h3>${comentario.nome}</h3>
              <p>${comentario.mensagem}</p>
              <div>${"⭐".repeat(comentario.nota)}</div>
            </div>
          `;
          slidesContainer.appendChild(slide);
        });
      }
      
      totalSlides = slidesContainer.children.length;
      currentSlide = 0; // Reseta para o primeiro slide
      updateSlider();
    }
  
    document.querySelector(".next").addEventListener("click", () => {
      if (totalSlides <= 1) return;
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });
  
    document.querySelector(".prev").addEventListener("click", () => {
      if (totalSlides <= 1) return;
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });
  
    window.addSlidesToSlider = addSlidesToSlider;
  })();