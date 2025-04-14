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
