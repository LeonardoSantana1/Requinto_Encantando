(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAI0CKRIrIaceI6homcAfZWjIoNlotxHYk",
      authDomain: "requinte-encantado.firebaseapp.com",
      projectId: "requinte-encantado",
      storageBucket: "requinte-encantado.firebasestorage.app",
      messagingSenderId: "1039845728743",
      appId: "1:1039845728743:web:5979f2adc99b472eec1d42",
    };
  
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
  
    document.getElementById("comentarioForm").addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const mensagem = document.getElementById("mensagem").value;
      const nota = parseInt(document.getElementById("nota").value);
  
      try {
        await db.collection("comentarios").add({
          nome,
          email,
          mensagem,
          nota,
          criadoEm: firebase.firestore.FieldValue.serverTimestamp(),
        });
  
        alert("Comentário enviado com sucesso!");
        document.getElementById("comentarioForm").reset();
      } catch (err) {
        console.error("Erro ao enviar comentário: ", err);
        alert("Erro ao enviar comentário.");
      }
    });
  
    const containerSlides = document.querySelector(".Slides");
    let comentarios = [];
  
    firebase
      .firestore()
      .collection("comentarios")
      .orderBy("criadoEm", "desc")
      .onSnapshot((snapshot) => {
        comentarios = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          comentarios.push(data);
        });
  
        // Chama a função para atualizar os slides
        if (typeof window.addSlidesToSlider === "function") {
          window.addSlidesToSlider(comentarios);
        }
      });
  })();
  