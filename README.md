# GameVerse 🎮

Catálogo de videojuegos utilizando la API de RAWG.

## Características

- Listado de videojuegos con cuadrícula responsive
- Búsqueda por nombre
- Filtros por género, plataforma y ordenamiento
- Vista detallada de cada juego
- CRUD de favoritos con notas personales (LocalStorage)
- Modo oscuro / claro
- Diseño responsive y moderno

## Tecnologías

- React 19
- Vite 8
- React Router
- CSS Modules
- Fetch API

## Instalación

```bash
npm install
```

## Configuración

Obtén una API key gratuita en https://rawg.io/apidocs y créa un archivo `.env`:

```
VITE_RAWG_API_KEY=tu_api_key_aqui
```

## Ejecutar

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Estructura

```
src/
├── api/          # Llamadas a la API de RAWG
├── components/   # Componentes reutilizables
├── context/      # ThemeContext y FavoritesContext
├── hooks/        # Custom hooks
├── pages/        # Páginas (Home, Detail, Favorites)
├── services/     # Utilidades (LocalStorage)
└── styles/       # Estilos globales
```
