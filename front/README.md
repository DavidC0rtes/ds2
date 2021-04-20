# Funcionamiento del front-end

## Instalacion
Para instalar la aplicacion se debe inicializar el comando `npm install --force`

## Uso
Para iniciar la aplicacion se debe utilizar el comando `npm start`

## Estructura de carpetas
En la carpeta src se encuentran 5 distintas carpetas, cada una con una funcion especifica:
- `src/assets` es donde van todos los scripts y archivos de diseño (CSS, imgs, y JSS)
- `src/components` carpeta donde van todos los componentes de una pagina, cuando hablamos de componentes nos referimos a las distintas partes que forman la pagina, por ejemplo links estilizados, navbars, tablas, tipografias.
- `src/layouts` corresponde a la carpeta de "plantillas", cada distinta pagina o view es una ventana que se renderiza encima de una plantilla, esto basandose en las similitudes que tiene con otras disintas paginas, en el caso de este proyecto se tiene el layout inicio, que inicialmente solo posee un navbar con todo lo que deberia contener la pagina inicio, en esta se renderizan los views de Login y Signup (por ahora).
- `src/variables` por el momento no se utiliza, pero aqui deberian ir todo lo que se refiere a datos que se usan como variables para una funcion o tabla (por ejemplo)
- `src/views` aqui van las distintas paginas que tiene la aplicacion, cada una divida en una subcarpeta dependiendo de la categoria que corresponda, por ejemplo en la subcarpeta `src/views/Usuario` van todas las paginas que tiene que ver con la categoria de usuarios (en este caso, la pagina para crear usuarios, para modificarlos, etc)

## Utilidad de algunos archivos
- `routes.js` es el encargado de los redireccionamientos.
