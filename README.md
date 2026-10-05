

Proyecto eCommerce de videojuegos migrado desde JavaScript/HTML/CSS a React utilizando Vite.

## Tecnologías

- React
- JavaScript
- Vite
- Bootstrap 5
- Bootstrap Icons
- GitHub Pages

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Crear build de producción

```bash
npm run build
```

## Publicar en GitHub Pages

Antes de publicar, revisar `vite.config.js` y comprobar que `base` coincide con el nombre del repositorio.

```bash
npm run deploy
```

## Estructura principal

```text
src/
├── components/
├── data/
├── App.jsx
├── main.jsx
└── styles.css

public/
├── assets/img/
└── data/productos.json
```

La lista de productos se carga mediante `fetch` dentro de `useEffect`. El carrito, filtros, búsqueda, estado de carga/error y juego destacado se gestionan mediante `useState`.
