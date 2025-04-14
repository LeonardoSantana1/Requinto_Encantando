// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAI0CKRIrIaceI6homcAfZWjIoNlotxHYk",
  authDomain: "requinte-encantado.firebaseapp.com",
  projectId: "requinte-encantado",
  storageBucket: "requinte-encantado.firebasestorage.app",
  messagingSenderId: "1039845728743",
  appId: "1:1039845728743:web:5979f2adc99b472eec1d42",
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Elementos da página
let loginForm;

document.addEventListener("DOMContentLoaded", () => {
  loginForm = document.getElementById("login-form");

  // Verifica estado de autenticação
  auth.onAuthStateChanged((user) => {
    const loginLink = document.getElementById("loginLink");
    const userMenu = document.getElementById("userMenu");

    if (user) {
      // Mostra o menu do usuário
      if (loginLink) loginLink.style.display = "none";
      if (userMenu) userMenu.style.display = "inline-block";
      setupUserMenu(user.uid);
      setupRoleBasedUI(user.uid);
    } else {
      // Mostra o link de login
      if (loginLink) loginLink.style.display = "inline-block";
      if (userMenu) userMenu.style.display = "none";
    }
  });

  // Evento de login
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Entrando...";

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      await auth.signInWithEmailAndPassword(email, password);
      window.location.href = "../index.html";
    } catch (error) {
      alert("Erro no login: " + error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  // Registro de novo usuário
  document
    .getElementById("signupForm")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = e.target.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Criando...";

        const userCredential = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await db.collection("users").doc(userCredential.user.uid).set({
          email: email,
          role: "member",
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        document.getElementById("signup-email").value = "";
        document.getElementById("signup-password").value = "";
        document.getElementById("signup-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
        document.getElementById("cadastrar-se").style.display = "block";

        alert("Cadastro realizado com sucesso! Faça login para continuar.");
      } catch (error) {
        alert(`Erro no cadastro: ${error.message}`);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });

  // Alternar entre login/cadastro
  document.getElementById("show-signup")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";

    // Aqui esconde o "Cadastre-se"
    document.getElementById("cadastrar-se").style.display = "none";
  });

  document.getElementById("back-to-login")?.addEventListener("click", () => {
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";

    // Mostra o "Cadastre-se" de novo
    document.getElementById("cadastrar-se").style.display = "block";
  });
});

// ==== MENU DO USUÁRIO ====
function setupUserMenu(userId) {
  document.getElementById("loginLink")?.style.setProperty("display", "none");
  document.getElementById("userMenu")?.style.setProperty("display", "block");

  db.collection("users")
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const userRoleElement = document.getElementById("userRole");
        if (userRoleElement) {
          userRoleElement.textContent = `Cargo: ${userData.role || "membro"}`;
          userRoleElement.className =
            userData.role === "admin" ? "user-role admin" : "user-role member";
        }
      }
    });

  document.getElementById("logoutButton")?.addEventListener("click", () => {
    auth.signOut().then(() => {
      window.location.reload();
    });
  });
}

function setupGuestMenu() {
  document.getElementById("loginLink")?.style.setProperty("display", "block");
  document.getElementById("userMenu")?.style.setProperty("display", "none");
}

function showLoginForm() {
  loginForm?.style.setProperty("display", "block");
}

// ==== INTERFACE BASEADA NO CARGO ====
function setupRoleBasedUI(uid) {
  db.collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const role = doc.data().role;
        updateRoleUI(role);
      }
    });
}

function updateRoleUI(role) {
  const adminArea = document.getElementById("admin-area");
  const memberArea = document.getElementById("member-area");

  if (adminArea && memberArea) {
    if (role === "admin") {
      adminArea.style.display = "block";
      loadAdminFeatures();
    } else {
      adminArea.style.display = "none";
    }
    memberArea.style.display = "block";
  }
}

function loadAdminFeatures() {
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
}
