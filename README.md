SPRINT 3 - TP 3 -- VISTA EJS (Actualización del SPRINT 3 - TP 2)

Superhéroes App — CRUD con Node.js, Express y EJS

Aplicación web desarrollada con Node.js, Express y EJS que permite gestionar un listado de superhéroes mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar).

---

## Funcionalidades

- ➕ Agregar nuevos superhéroes
- ✏️ Editar información existente
- ❌ Eliminar superhéroes con confirmación
- 📋 Visualizar listado en dashboard responsive
- 📬 Formulario de contacto funcional
- ℹ️ Página "Acerca de"
- 🎯 Landing page con CTA

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- EJS (plantillas)
- express-ejs-layouts
- CSS (estilos personalizados)

---

## 🎨 Características de UI

- Layout reutilizable con `express-ejs-layouts`
- Navbar dinámica (transparente en landing / sólida en vistas internas)
- Dashboard en grid responsive (2 columnas)
- Cards con efecto hover
- Botones con iconos
- Landing page con hero + CTA
- Estilos centralizados en `styles.css`

---

🌐 Rutas principales

    Ruta        	        Descripción
/	                    Landing page
/heroes	                Dashboard de superhéroes
/heroes/agregar	        Formulario de creación
/heroes/editar/:id	    Edición
/acerca	                Página informativa
/contacto	            Formulario de contacto

🧠 Conceptos aplicados
Arquitectura MVC
Manejo de rutas con Express
Renderizado dinámico con EJS
Middlewares (method-override, express.urlencoded)
Validación de formularios
Separación de responsabilidades (controllers / routes / views)
Diseño responsive


🚧 Mejoras futuras

🔍 Búsqueda de superhéroes
🚫 Evitar duplicados en base de datos
