# Como funciona el proyecto (API Rick and Morty)

Este proyecto consume la API de Rick and Morty para mostrar personajes y planetas (locations) en una interfaz web.

## Flujo general

1. El frontend hace un pedido a la API usando `fetch`.
2. La API responde con datos en formato JSON.
3. JavaScript procesa esos datos.
4. Se renderizan en pantalla como tarjetas (cards).

---

## Characters

* Se obtienen con:

```js
fetch("https://rickandmortyapi.com/api/character")
```

* Se muestran en cards con:

  * imagen
  * nombre
  * género, estado y especie

* El botón **Learn more** redirige a:

```
details.html?id=ID
```

---

## Planets (Locations)

* Se obtienen con:

```js
fetch("https://rickandmortyapi.com/api/location")
```

* Se muestran en cards con:

  * nombre
  * tipo
  * imagen (placeholder)

* El botón **Learn more** redirige a:

```
details.html?planetId=ID
```

## Página de detalle (details.html)

La página detecta qué mostrar según la URL:

* Si hay `id` → muestra personaje
* Si hay `planetId` → muestra planeta

Ejemplo:

```js
const id = params.get("id");
const planetId = params.get("planetId");
```

---

## Favoritos

* Se guardan en un array global
* Se agregan o eliminan con el botón del corazón
* Se muestran en el dropdown del navbar


