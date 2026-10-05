#GameStore React

Aplicacion web de compra simulada de videojuegos, se actualiza desde javascript para uso de React, vite, npm. Se mantiene uso de bootstrap.
Se agrega ademas el uso de usestate, useeffect, renderizado condicional, componentes reutilizables y props. 



El catalogo no esta escrito dentro de componentes. Al iniciar la aplicacion se hace una peticion con fetch para obtener el archivo json con los datos de los juegos, que son almacenados en el estado de productos. 
Desde alli se contruye el resto de la interfaz de forma dinamica.


Funciones de la aplicacion:

-visualizar catalogo
- filtrar productos por tipo de consola
- buscar por filtrado de palabras en el nombre, descripcion o categoria
- visualizar un juego destacado que cambia cada 5 segundos y tambien se puede cambiar con un boton.
- agregar juegos al carrito, si es necesario mas de una vez por juego.
- eliminar productos del carrito
- vaciar completamente el carrito
- visualizar la cantidad total de unidades de juegos en carrito
- visualizar el total del carrito
- recibir feedback visual cuando los datos se esta cargando
- recibir un mensaje de error si falla la carga del JSON
- recibir un mensaje cuando una busqueda no tiene resultado
-cambio del boton agregar a "ya en el carrito" cuando ya se agrego una unidad del juego.
- navegar en una interfaz responsive adaptada al tamaño de pantallas
-mensaje de carrito vacio




## Repositorio GitHub

```text
https://github.com/LpBarras/ecommerce-s6-LazarethParra
```

## GitHub Pages


```text
https://lpbarras.github.io/ecommerce-s6-LazarethParra/
```

---



El proyecto implementa ocho estados principales dentro de `App.jsx`:

```jsx
const [productos, setProductos] = useState([]) : desde el se realizan:
filtros;
búsquedas;
selección del juego destacado;
renderizado del catálogo;
obtención de datos para el carrito.

const [carrito, setCarrito] = useState([]) se cambia el estado inicial vacio mediante distintas acciones que permiten;
aumenta el contador de la navbar;
modifica el contenido del modal;
recalcula el total;
muestra la cantidad por producto;
cambia el texto de botones a enel carrito.

const [categoriaActual, setCategoriaActual] = useState('Todos') inicialmente esta en la categoria todos por default, puede cambiar a cada una de las consolas a traves de botones en pantalla

const [terminoBusqueda, setTerminoBusqueda] = useState('') Cada vez que el usuario escribe, se actualiza el estado.
const [terminoAplicado, setTerminoAplicado] = useState('') permite que la busqueda se realice solo cuando el usuario envia el filtro
const [juegoDestacado, setJuegoDestacado] = useState(null)  permite que el componente Hero cambie dinámicamente:
- imagen;
- categoría;
- nombre;
- descripción;
- precio normal;
- precio de oferta;
- estado del botón del carrito.
const [estadoCarga, setEstadoCarga] = useState('loading') La aplicacion diferencia tres estados durante la obtencion de productos: loading a success o error .
permite realizar el renderizado condicional de feedback
const [cantidadResultados, setCantidadResultados] = useState(null), sirve para mostrar el resultado de busquedas, se utiliza null para diferenciar el estado con 0 resultados encrontrados y el estado con un numero de resultados encontrados.
```


