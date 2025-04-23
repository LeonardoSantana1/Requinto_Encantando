import { Membros } from "./quemsomos.js";

(() => {
  let currentSlide = 0;
  const slidesContainer = document.querySelector(
    ".SliderQuemSomos .QuemSomosSlides"
  );
  const totalSlides = Membros.length;

  function renderSlides() {
    slidesContainer.innerHTML = "";

    Membros.forEach((membro, index) => {
      const slide = document.createElement("div");
      slide.classList.add("slide-qs");
      if (index !== currentSlide) slide.style.display = "none";

      slide.innerHTML = `
         <div class="conteudo-qs">
           <div class="bloco-qs foto-qs">
             <img src="${membro.imagem}" alt="${membro.nome}">
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

  document
    .querySelector(".SliderQuemSomos .next-qs")
    .addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      renderSlides();
    });

  document
    .querySelector(".SliderQuemSomos .prev-qs")
    .addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      renderSlides();
    });

  renderSlides(); // inicia
})();
