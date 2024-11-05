// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Referencia a la colección de usuarios
const userCollection = collection(db, 'users');

// Obtener datos en tiempo real
onSnapshot(userCollection, (snapshot) => {
    const userTableBody = document.getElementById('user-table-body');
    userTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

    snapshot.forEach(doc => {
        const userData = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${userData.email}</td>
            <td>${userData.ip}</td>
            <td>${userData.timestamp.toDate().toLocaleString()}</td>
        `;
        userTableBody.appendChild(row);
    });
});