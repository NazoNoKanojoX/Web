// =========================
// FIREBASE
// =========================

import { auth }

from "./firebase.js";

// =========================
// AUTH
// =========================

import {

    onAuthStateChanged,

    signOut

}

from
"https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

// =========================
// ELEMENTOS
// =========================

const usuarioActual =

document.getElementById(
"usuarioActual"
);

const inputArchivo =

document.getElementById(
"subirArchivo"
);

const botonPublicar =

document.getElementById(
"publicar"
);

// =========================
// VERIFICAR SESIÓN
// =========================

onAuthStateChanged(

    auth,

    (user) => {

        // USUARIO CONECTADO

        if(user){

            usuarioActual.textContent =

            "Conectado como: " +

            (

                user.displayName ||

                "Usuario"

            );

        }

        // SIN SESIÓN

        else{

            alert(
            "Debes iniciar sesión"
            );

            window.location.href =
            "index.html";

        }

    }

);

// =========================
// CERRAR SESIÓN
// =========================

document

.getElementById("logout")

.addEventListener(

"click",

async () => {

    try{

        await signOut(auth);

        alert(
        "Sesión cerrada"
        );

        window.location.href =
        "index.html";

    }

    catch(error){

        alert(
        error.message
        );

    }

});

// =========================
// PUBLICAR CONTENIDO
// =========================

botonPublicar.addEventListener(

"click",

() => {

    // ARCHIVO

    const archivo =

    inputArchivo.files[0];

    // VALIDAR ARCHIVO

    if(!archivo){

        alert(
        "Selecciona un archivo"
        );

        return;

    }

    // USUARIO

    const user =
    auth.currentUser;

    // TÍTULO

    const titulo =

    document.getElementById(
    "tituloPublicacion"
    ).value.trim() ||

    "Nueva publicación";

    // DESCRIPCIÓN

    const descripcion =

    document.getElementById(
    "descripcionPublicacion"
    ).value.trim() ||

    "Sin descripción";

    // URL TEMPORAL

    const url =

    URL.createObjectURL(
    archivo
    );

    // =========================
    // IMÁGENES
    // =========================

    if(

        archivo.type.startsWith(
        "image/"
        )

    ){

        const card =

        document.createElement(
        "div"
        );

        card.className =
        "media-card";

        card.innerHTML = `

            <img
            src="${url}"
            alt="${titulo}">

            <h3>

                ${titulo}

            </h3>

            <p class="descripcion">

                ${descripcion}

            </p>

            <p class="autor">

                Publicado por:
                ${user.displayName || "Usuario"}

            </p>

        `;

        document

        .getElementById(
        "galeriaFanarts"
        )

        .appendChild(card);

    }

    // =========================
    // VIDEOS
    // =========================

    else if(

        archivo.type.startsWith(
        "video/"
        )

    ){

        const card =

        document.createElement(
        "div"
        );

        card.className =
        "video-card";

        card.innerHTML = `

            <video controls>

                <source
                src="${url}"
                type="${archivo.type}">

                Tu navegador
                no soporta videos.

            </video>

            <h3>

                ${titulo}

            </h3>

            <p class="descripcion">

                ${descripcion}

            </p>

            <p class="autor">

                Publicado por:
                ${user.displayName || "Usuario"}

            </p>

        `;

        document

        .getElementById(
        "galeriaVideos"
        )

        .appendChild(card);

    }

    // =========================
    // ARCHIVO INVÁLIDO
    // =========================

    else{

        alert(
        "Formato no compatible"
        );

        return;

    }

    // =========================
    // LIMPIAR CAMPOS
    // =========================

    document.getElementById(
    "tituloPublicacion"
    ).value = "";

    document.getElementById(
    "descripcionPublicacion"
    ).value = "";

    inputArchivo.value = "";

    // =========================
    // MENSAJE
    // =========================

    alert(
    "Publicación subida correctamente"
    );

});