# endorse-translator-web

Frontend de ejemplo para "endorse-translator-web" — plantilla basada en Vue 3 + Vite.

Este repositorio contiene la aplicación cliente que consume servicios (por ejemplo en `src/services/endorseService.ts`) y usa Bootstrap para estilos rápidos.

## Contenido relevante
- `src/main.ts` — punto de entrada de la aplicación.
- `src/App.vue` — componente raíz.
- `src/services/endorseService.ts` — lógica de consumo de API (translator/endorse logic).
- `env.d.ts` — declaraciones globales (aquí se incluye el shim para `.vue`).
- `tsconfig.app.json` — configuración TypeScript para la app.

## Requisitos
- Node.js (>= 16 recomendado)
- npm (o yarn/pnpm si prefieres)

## Instalación

```bash
npm install
```

## Desarrollo

Levanta la app en modo desarrollo con recarga en caliente:

```bash
npm run dev
```

Abre http://localhost:5173 (o la URL que Vite indique) en tu navegador.

## Build (producción)

```bash
npm run build
```

El artefacto resultante queda en `dist/`.

## Type checking

Usamos `vue-tsc` para chequear tipos con SFCs (.vue):

```bash
npm run type-check
```

Si tu `package.json` no tiene el script, puedes usar:

```bash
npx vue-tsc --noEmit
```

## Editor recomendado

- VS Code + extensión Volar (Vue 3 + TypeScript). Desactiva Vetur si la tienes instalada.

## Problema común y solución — Editor muestra: "Cannot find module './App.vue' or its corresponding type declarations.ts(2307)"

Descripción:
- El error aparece en el editor/servidor de TypeScript (Volar/TS Server) porque TypeScript no reconoce archivos `.vue` como módulos con tipos.

Solución (ya aplicada en este repo):

1. Añadir un shim de tipo para `.vue` en `env.d.ts` con el siguiente contenido:

```ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

2. Asegúrate de que `env.d.ts` esté incluido en `tsconfig.app.json` (normalmente ya está en "include").
3. Reinicia el servidor TypeScript en VS Code: abre la paleta y ejecuta "TypeScript: Restart TS Server" o recarga la ventana (`Developer: Reload Window`).

Nota: la app puede correr con `npm run dev` porque Vite resuelve SFCs en tiempo de ejecución; el problema solo afecta al lenguaje/edición en el editor si falta el shim.

## Troubleshooting adicional

- Si Volar sigue mostrando errores, comprueba que Volar esté activo y que no haya conflicto con Vetur.
- Si usas monorepo o paths personalizados, revisa `tsconfig` y `paths` para incluir aliases.

## Scripts útiles (ejemplos en `package.json`)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "type-check": "vue-tsc --noEmit"
  }
}
```