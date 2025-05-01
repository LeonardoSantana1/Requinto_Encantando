//Variaveis
const Hamburguer = document.querySelector(".Hamburguer");
const navbar = document.querySelector("nav");
const menuLinks = document.querySelectorAll(".ItensNavBar a");

//Faz com que ao clicar no menu hamburguer a navbar receba uma nova classe chama "active" e ao clicar novamente tira a classe
Hamburguer.addEventListener("click", () => navbar.classList.toggle("active"));

//Faz com que cada a de .ItensNavBar remova o active da navbar ao ser clicaco, assim fechando o menu hamburguer
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
  });
});

//Animação do scroll ao clicar em algum "a", funciona em qualquer browser
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.pageYOffset;
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 1000; // define a velocidades
    let startTime = null;

    function scrollStep(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      window.scrollTo(0, startY + distance * ease);
      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  });
});
