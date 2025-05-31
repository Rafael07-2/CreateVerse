// Importar Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAahbC24sbhuaVUm5xKrqQWLAw6rzqzvg",
    authDomain: "createverse-a55f2.firebaseapp.com",
    projectId: "createverse-a55f2",
    storageBucket: "createverse-a55f2.appspot.com",
    messagingSenderId: "152053470607",
    appId: "1:152053470607:web:92a48488f4690682db27fa",
    measurementId: "G-8301H3QG1E"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// **Registro de usuario y envío de verificación**
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user)
        .then(() => {
            alert("✅ Registro exitoso! Se envió un correo de verificación.");
            window.location.href = "login.html"; // Redirigir al login
        });
    })
    .catch((error) => {
        console.error("Error en el registro:", error);
        alert("❌ Error en el registro: " + error.message);
    });
});

// **Inicio de sesión con verificación de correo**
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        if (user.emailVerified) {
            alert("✅ Inicio de sesión exitoso! Bienvenido.");
            window.location.href = "home.html"; // Redirige al usuario a home.html
        } else {
            alert("❌ Debes verificar tu correo antes de ingresar.");
        }
    })
    .catch((error) => {
        console.error("Error en inicio de sesión:", error);
        alert("❌ Error en el inicio de sesión: " + error.message);
    });
});