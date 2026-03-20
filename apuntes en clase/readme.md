El frontend es la parte visible de una aplicación, es decir, todo lo que el usuario ve e interactúa: botones, textos, imágenes y pantallas. Está construido generalmente con tecnologías como HTML, CSS y JavaScript. Su función principal es mostrar información y permitir que el usuario realice acciones, como hacer clic en un botón o completar un formulario.

El backend, en cambio, es la parte que no se ve. Es donde ocurre la lógica del sistema. Se encarga de procesar datos, aplicar reglas, conectarse con bases de datos y decidir qué información devolver al frontend. El backend vive en un servidor y trabaja constantemente recibiendo pedidos y enviando respuestas.

Entre estas dos partes aparece la API Application Programming Interface, que actúa como intermediaria. La API define cómo el frontend puede comunicarse con el backend. No es solo un “puente”, sino también un conjunto de reglas que indican qué se puede pedir, cómo hacerlo y qué tipo de respuesta se va a recibir. Por ejemplo, una API puede definir que para obtener una lista de usuarios hay que hacer un pedido a una ruta específica como /users.

En clase se explicó esto con el ejemplo de un mozo en un restaurante. El cliente (frontend) no entra a la cocina (backend), sino que le hace el pedido al mozo (API). El mozo lleva el pedido, la cocina lo prepara y luego el mozo trae la respuesta. Este ejemplo ayuda a entender que el frontend nunca interactúa directamente con el backend.

Ejemplo:

https://rickandmortyapi.com/api/character

¿Cuando se usa?

cuando consumís datos de otros

apps reales

proyectos

es como: pedir comida a un restaurante real

Las APIs pueden clasificarse de distintas maneras. Una distinción importante es entre API local y API remota. Una API local es aquella que se ejecuta en la propia computadora del desarrollador, generalmente durante el desarrollo de una aplicación. Se accede a través de direcciones como localhost. En cambio, una API remota está alojada en internet y puede ser utilizada desde cualquier lugar, como ocurre con muchas APIs públicas.

También existen APIs públicas y privadas. Las públicas pueden ser utilizadas por cualquier persona sin necesidad de permisos especiales, mientras que las privadas requieren autenticación, como una clave o token, para poder acceder a sus datos.
API PRIVADA

ejemplos
Necesita permiso (token, clave)

Ejemplo:

API de bancos

API de pagos

 No cualquiera puede usarla

 4 API PÚBLICA

Cualquiera puede usarla

Ejemplo:

API de Rick and Morty

clima

películas

La comunicación entre frontend y backend se realiza a través del protocolo HTTP, que define cómo se envían los pedidos (requests) y las respuestas (responses). Dentro de HTTP existen distintos métodos que indican la intención del pedido: GET para obtener información, POST para enviar datos, PUT para actualizar y DELETE para eliminar.

MÉTODOS PARA USAR UNA API
1 GET → obtener datos

Se usa para pedir información

Ejemplo:

GET /characters

Significa:

“dame todos los personajes”

Otros ejemplos:

GET /characters/1

“dame el personaje con id 1”

2 POST → crear datos

Se usa para enviar información nueva

Ejemplo:

POST /characters

Y le mandás datos:

{
  "name": "Maca",
  "status": "Alive"
}

Significa:

“creá un nuevo personaje”

3 PUT → actualizar TODO

Se usa para modificar completamente un dato

Ejemplo:

PUT /characters/1
{
  "name": "Rick",
  "status": "Dead"
}

Significa:

“reemplazá todo el personaje 1”

4 PATCH → actualizar UNA PARTE

Se usa para cambios pequeños

Ejemplo:

PATCH /characters/1
{
  "status": "Dead"
}

Significa:

“cambiá solo el estado”

5 DELETE → borrar

Se usa para eliminar

Ejemplo:

DELETE /characters/1

Significa:

“borrá el personaje 1”

Cada vez que se realiza un pedido, el servidor responde con un código de estado que indica qué ocurrió. Por ejemplo, un código 200 significa que la operación fue exitosa, un 404 indica que el recurso no fue encontrado y un 500 representa un error interno del servidor. Estos códigos son fundamentales para entender si la comunicación funcionó correctamente o si hubo algún problema.

Se dividen así:

BIEN     200s → éxito

200 → todo bien

201 → creado

!    400s → error tuyo

400 → hiciste mal el pedido

401 → no autorizado

404 → no existe

X   500s → error del servidor

500 → se rompió todo

Finalmente, los datos que se intercambian suelen estar en formato JSON, que es liviano y fácil de leer tanto para humanos como para programas. Antes se utilizaba mucho XML, pero hoy en día JSON es el estándar más común.
explicacion de for a un api 
mostrame el nombre del personaje en esa posición del array
${arr[index].name} a parece esto = “Rick”, “Morty”, etc.

for → recorre
[] → accede

arr → lista de personajes

[index] → uno en específico

arr[index] → agarro un personaje

.name → saco su nombre

${} → lo muestro en pantalla

https://www.npmjs.com/package/bootscrap 
https://jestjs.io/docs/getting-started 

package.json es la partida de nacimiento 
dependencia de desarrollo para testiar el proyectos
sistmas rebersionados nodejs, 
*unit testing 
            *unitario, es el proceso de divdir ek codigo en funiones mas pequeñas
            y probar cada una de esas fucionespor separado, intentando romper nuestro codigo -> jest
            babel, typescrip etc
*ventajas 
fomentane el cambio
siplifica la integracion
documentacion el codigo
ayuda a que los errores sean mas acotados y sean mas faciles de localizar
ahorran tiempo 

npm install --save-dev jest
npm install 
node modules
          nomARCHIVO
me funciono con esto npm install jest
node ./js/sum.js
modularizacion 

const sum = require('./sum'); //importar la funcion a evaluar

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

{
  "scripts": {
    "test": "jest"// corre npn run test
  }
}

*practica de unit test*

1 clonar repositorio dela practica y seguir instrucciones de README
para su uso exitoso
2 seguir las instrucciones de tutorial

intalar y levantar el proyecto