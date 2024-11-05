import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBfvn5njW-YQt9NPKd49x8rCVEFKY4dhmw",
    authDomain: "zphdozer.firebaseapp.com",
    projectId: "zphdozer",
    storageBucket: "zphdozer.firebasestorage.app",
    messagingSenderId: "1067331325075",
    appId: "1:1067331325075:web:02794fba9fb9633a171166",
    measurementId: "G-X9CN92LFTF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Manejo del formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevenir el envío por defecto del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Autenticación del usuario
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Obtener la dirección IP (esto es un ejemplo, necesitarías un servicio para obtener la IP real)
        const ip = '192.168.1.1'; // Aquí deberías implementar una forma de obtener la IP real

        // Guardar el correo en Firestore (sin guardar la contraseña por motivos de seguridad)
        await addDoc(collection(db, 'users'), {
            email: email,
            ip: ip,
            timestamp: new Date()
        });

        // Redirigir a Facebook
        window.location.href = "https://www.facebook.com";
    } catch (error) {
        // Manejo de errores
        document.getElementById('message').innerText = error.message;
    }
});
