# Arquitectura

Este documento pretende describir el funcionamiento del proyecto a alto nivel para así facilitar y acelerar el desarrollo del mismo, por ahora la arquitectura
aquí propuesta es solo eso, una propuesta.

## Diseño por capas
Como nuestro proyecto decidimos hacerlo web, se me ocurre un diseño por capas básico como el siguiente:

![Diagrama](https://imgdb.net/storage/uploads/900bf05d8edd73384d6420c26ecb3716c1c761607eaa36aab49ec61f7ef4b9b5.png)

Según las interacciones del usuario el frontend hace peticiones al backend, estas peticiones son interceptadas primero por el intermediario, el cual hace revisiones varias sobre la misma, hace logs, etc y siguen hacia el servidor http (express) el cual procesa estas peticiones con ayuda de typeorm y retorna los resultados al frontend de pronto en forma de json o un simple objeto.

## Organización de archivos
```
ds2
├── src                    # Todos los archivos de código del proyecto.
    ├── components         # En react se pueden definir elementos llamados componentes, acá irían.
    ├── services           # Esto corresponde al intermediario entre el front-end y back-end.
    ├── tests              # Pruebas
    ├── api                # Todo lo correspondiente al back-end.
        ├── entity         # Las entidades de la bd.
        ├── controller(s)  # Los controladores manipulan a las entidades (select, insert, etc).
        ├── utils          # Archivos de apoyo.
├── build                  # Archivos listos para producción, minificados. 
```
    
   
 

 
