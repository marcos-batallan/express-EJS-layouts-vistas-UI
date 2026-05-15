// Función para renderizar la vista de feedback con mensajes personalizados
export function renderFeedback(res, {
    tipo = 'success',
    mensaje,
    subtext = 'Volver al Dashboard',
    redirect = '/',
    textoBoton = 'Volver',
    autoRedirect = true,
    status = 200
}) {
    return res.status(status).render('feedback', {
        tipo,
        mensaje,
        subtext,
        redirect,
        textoBoton,
        autoRedirect
    });
}

/***** 
Este archivo contiene funciones auxiliares para renderizar vistas de Success y Error con mensajes personalizados
*****/