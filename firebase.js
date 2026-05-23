// =========================
// IMPORTS FIREBASE
// =========================

import { initializeApp }

from
"https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {

    getAuth

}

from
"https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// =========================
// CONFIG FIREBASE
// =========================

const firebaseConfig = {

    apiKey:
    "AIzaSyCc4-d0wdwuMzoR9WbOLDN3SC1yh9tYBvg",

    authDomain:
    "comunidad-urabe.firebaseapp.com",

    projectId:
    "comunidad-urabe",

    storageBucket:
    "comunidad-urabe.firebasestorage.app",

    messagingSenderId:
    "713009903023",

    appId:
    "1:713009903023:web:8a86519ad51b817080ab5a"

};

// =========================
// INICIALIZAR FIREBASE
// =========================

const app =

initializeApp(
firebaseConfig
);

// =========================
// AUTH
// =========================

const auth =

getAuth(app);

// =========================
// EXPORTAR
// =========================

export {

    app,

    auth

};