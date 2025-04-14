// Configuração do Firebase (substitua pelos seus dados)
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
let loginForm, dashboard, userRoleDisplay;

document.addEventListener("DOMContentLoaded", () => {
  loginForm = document.getElementById("login-form");
  dashboard = document.getElementById("dashboard");
  userRoleDisplay = document.getElementById("user-role");

  // Monitora estado de autenticação
  auth.onAuthStateChanged((user) => {
    if (user) {
      checkUserRole(user.uid);
    } else {
      showLogin();
    }
  });

  // Evento de login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = "Entrando...";

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert("Erro no login: " + error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  // Evento de logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    auth.signOut();
  });
});

// Verifica o nível de acesso
function checkUserRole(uid) {
  db.collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const role = doc.data().role;
        showDashboard(role);
        setupRoleBasedUI(role);
      } else {
        // Se não tem registro, cria como membro
        db.collection("users")
          .doc(uid)
          .set({
            email: auth.currentUser.email,
            role: "member",
          })
          .then(() => {
            showDashboard("member");
            setupRoleBasedUI("member");
          });
      }
    })
    .catch((error) => {
      console.error("Erro ao verificar role:", error);
    });
}

// Exibe a interface adequada
function showDashboard(role) {
  loginForm.style.display = "none";
  dashboard.style.display = "block";
  userRoleDisplay.textContent = `Você está logado como: ${role}`;
}

function showLogin() {
  loginForm.style.display = "block";
  dashboard.style.display = "none";
}

// Lógica de acesso
function setupRoleBasedUI(role) {
  const adminArea = document.getElementById("admin-area");
  const memberArea = document.getElementById("member-area");

  if (role === "admin") {
    adminArea.style.display = "block";
    loadAdminFeatures();
  } else {
    adminArea.style.display = "none";
  }

  memberArea.style.display = "block";
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
