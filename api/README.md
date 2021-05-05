# Estructura de archivos
Los archivos del proyecto `api` están organizados de la siguiente manera:

- `build`: archivos estáticos de js, css, img, etc. Esta carpeta contiene todo el frontend optimizado para una posible subida a producción.
- `controllers`: acá están los "controladores" de cada entidad, aunque me gustaría que solo utilizáramos uno (Control.js) he tratado de agregar funciones generales, si en algún momento necesitan algo demasiado específico diría que lo mejor es importar typeorm directamente donde necesitan hacerlo (como última instancia).
- `entity`: las entidades (tablas) del proyecto.
- `routes`: cada archivo acá adentro define que debe hacerse cuando recibe una solicitud HTTP especifica a la url especifica (`baseUrl`). Un archivo por ruta.
- `tests`: directorio donde se encuentran las pruebas al backend.
- `utils`: archivos que son útiles para el backend. Por ejemplo, `config.js` define como van a conectarse a la bd (localmente, o a la de produccion, o a la de pruebas y que puerto van a usar para que el backend corra). También hay otro archivo importante (`middleware.js`) se encarga de registrar cada petición hecha al backend  y en caso de ocurrir un error, devolver una respuesta HTTP adecuada con su mensaje de error apropiado.
- `app.js` es el método "main" del backend.
