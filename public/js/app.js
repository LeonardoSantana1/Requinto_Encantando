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

//Evento com  o menu de login
document.addEventListener("DOMContentLoaded", () => {
  const userBtn = document.getElementById("userButton");
  const dropdown = document.getElementById("dropdownContent");

  if (userBtn && dropdown) {
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // impede que o clique feche o menu na mesma hora
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
      if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }
});
