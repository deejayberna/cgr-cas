# CGR-CAS — Sitio web

Sitio estático del despacho contable **CGR Candelario y Asociados**, preparado para despliegue en [Vercel](https://vercel.com).

## Estructura del proyecto

```
├── frontend/          # Contenido original (fuente de las páginas)
├── src/
│   ├── layout.html    # Plantilla base
│   ├── partials/      # Header, footer y chat compartidos
│   └── assets/        # CSS, JS e imágenes
├── scripts/build.js   # Genera el sitio en /public
├── public/            # Salida del build (se despliega en Vercel)
├── vercel.json        # Configuración de Vercel
└── package.json
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

1. Sube este repositorio a GitHub, GitLab o Bitbucket.
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. Vercel detectará automáticamente el build (`npm run build`) y la carpeta de salida (`public`).
4. Conecta tu dominio personalizado en **Settings → Domains**.

### Imágenes

Coloca estos archivos en `src/assets/images/` (o en `frontend/` para que el build los copie):

- `logo-candelarios.jpg`
- `fondo-candelario.jpg`

Si faltan, se usa un logo SVG de respaldo.

## Editar contenido

1. Modifica las páginas en `frontend/` (solo la sección `<main>` se usa en el build).
2. Ejecuta `npm run build`.
3. El header, footer y estilos se mantienen centralizados en `src/`.

## Mejoras incluidas

- URLs limpias (`/contadores` en lugar de `/contadores.html`)
- Navegación unificada en todas las páginas
- Meta descripción para SEO
- Menú responsive en móvil
- Enlaces `tel:` y `mailto:` en contacto
- Asistente virtual con botón para reabrir
- Redirección automática de URLs antiguas con `.html`
