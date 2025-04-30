document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sheetdb-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Seus dados foram enviados com sucesso!!");
        form.reset();
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
        alert(
          "Erro ao enviar os dados. Por favor, tente novamente ou contate nos pelo email/whatsapp para correção do problema."
        );
      });
  });
});
