// =========================
// FIREBASE
// =========================

import { auth }

from "./firebase.js";

// =========================
// AUTH
// =========================

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    updateProfile

}

from
"https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// =========================
// ELEMENTOS
// =========================

const usernameInput =

document.getElementById(
"username"
);

const emailInput =

document.getElementById(
"email"
);

const passwordInput =

document.getElementById(
"password"
);

const registerButton =

document.getElementById(
"register"
);

const loginButton =

document.getElementById(
"login"
);

// =========================
// REGISTRO
// =========================

registerButton.addEventListener(

"click",

async () => {

    // =========================
    // DATOS
    // =========================

    const username =

    usernameInput.value.trim();

    const email =

    emailInput.value.trim();

    const password =

    passwordInput.value.trim();

    // =========================
    // VALIDACIÓN
    // =========================

    if(

        username === "" ||

        email === "" ||

        password === ""

    ){

        alert(
        "Completa todos los campos"
        );

        return;

    }

    // VALIDAR PASSWORD

    if(password.length < 6){

        alert(
        "La contraseña debe tener mínimo 6 caracteres"
        );

        return;

    }

    try{

        // =========================
        // CREAR CUENTA
        // =========================

        const userCredential =

        await createUserWithEmailAndPassword(

            auth,

            email,

            password

        );

        // =========================
        // USUARIO
        // =========================

        const user =
        userCredential.user;

        // =========================
        // GUARDAR USERNAME
        // =========================

        await updateProfile(user, {

            displayName:
            username

        });

        // =========================
        // MENSAJE
        // =========================

        alert(
        "Cuenta creada correctamente"
        );

        // =========================
        // LIMPIAR CAMPOS
        // =========================

        usernameInput.value = "";

        emailInput.value = "";

        passwordInput.value = "";

    }

    catch(error){

        // =========================
        // ERRORES FIREBASE
        // =========================

        if(

            error.code ===
            "auth/email-already-in-use"

        ){

            alert(
            "Ese correo ya está registrado"
            );

        }

        else if(

            error.code ===
            "auth/invalid-email"

        ){

            alert(
            "Correo inválido"
            );

        }

        else{

            alert(
            error.message
            );

        }

    }

});

// =========================
// LOGIN
// =========================

loginButton.addEventListener(

"click",

async () => {

    // =========================
    // DATOS
    // =========================

    const email =

    emailInput.value.trim();

    const password =

    passwordInput.value.trim();

    // =========================
    // VALIDACIÓN
    // =========================

    if(

        email === "" ||

        password === ""

    ){

        alert(
        "Completa todos los campos"
        );

        return;

    }

    try{

        // =========================
        // INICIAR SESIÓN
        // =========================

        const userCredential =

        await signInWithEmailAndPassword(

            auth,

            email,

            password

        );

        // =========================
        // USUARIO
        // =========================

        const user =
        userCredential.user;

        // =========================
        // MENSAJE
        // =========================

        alert(

            "Bienvenido " +

            (

                user.displayName ||

                "Usuario"

            )

        );

        // =========================
        // REDIRECCIÓN
        // =========================

        window.location.href =
        "comunidad.html";

    }

    catch(error){

        // =========================
        // ERRORES FIREBASE
        // =========================

        if(

            error.code ===
            "auth/user-not-found"

        ){

            alert(
            "Usuario no encontrado"
            );

        }

        else if(

            error.code ===
            "auth/wrong-password"

        ){

            alert(
            "Contraseña incorrecta"
            );

        }

        else if(

            error.code ===
            "auth/invalid-credential"

        ){

            alert(
            "Correo o contraseña incorrectos"
            );

        }

        else{

            alert(
            error.message
            );

        }

    }

});