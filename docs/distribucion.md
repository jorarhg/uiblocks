Checklist para dejarlo listo (orden recomendado):

Estructura de fuente aislada

Crear packages/ui-blocks/ (o lib/ui-blocks/).
Mover sólo componentes reutilizables (sin páginas, sin rutas Next) a src/.
Crear packages/ui-blocks/src/index.ts exportando lo público.
Empaquetado

Renombrar package-lib.json a package.json con nombre final (ej. @teribit/ui-blocks).
Ajustar "private": false.
Scripts: "build": "rollup -c".
Añadir types y "files": ["dist"].
Ejecutar npm run build y verificar dist/ (CJS + ESM + d.ts).
Dependencias

Mover a peerDependencies: react, react-dom, @tanstack/react-table, lucide-react, class-variance-authority, clsx, tailwind-merge, @radix-ui/*, zod.
Mantener en devDependencies sólo tooling (typescript, rollup plugins, tailwindcss para tipos si necesitas).
Alias / Paths

Dentro de la librería, reemplazar @/components/... por rutas relativas.
tsconfig.lib.json con "rootDir": "src", "declaration": true, "composite": false.
Rollup: añadir plugin de alias si queda algo especial (ideal dejar limpio y no depender de alias).
Estilos Opciones: A) Copy-paste (estilo shadcn) → Documentar pasos (añadir tokens CSS y tailwind config). B) Exportar un CSS empaquetado → Crear src/styles.css (importa variables + utilidades) y en rollup usar postcss para emitir dist/styles.css.

Incluir en README: import '@teribit/ui-blocks/dist/styles.css'.
Documentar variables CSS que el host puede overridear.
Componentes con estado/cliente

Marcar "use client" sólo donde sea necesario para no forzar todo el bundle.
Evitar dependencias de next/* dentro del paquete (no exportar cosas que dependan de next/navigation, layout o server components).
Limpieza de código experimental

Excluir carpetas: demos, pages, tests internos pesados, análisis experimentales (ej: dynamic-toolbar/analysis). Si deseas ejemplos, ponerlos bajo examples/ fuera del src/.
Eliminar / extraer código con errores TS antes de generar tipos.
Build QA

Comprobar: dist/index.js, dist/index.esm.js, dist/index.d.ts.
Verificar tree-shaking (importando componente suelto no arrastra todo).
README de la librería Incluir:

Instalación (peer deps).
Integración Tailwind (content + theme + variables).
Ejemplo mínimo de uso.
Cómo importar estilos (si opción B).
Tabla de componentes y estado.
Git Subtree Strategy A) Mantener todo en un solo repo:

Directorio fuente: packages/ui-blocks/
En proyecto consumidor:

git remote add ui-blocks git@github.com:tu-org/ui-blocks-monorepo.gitgit subtree add --prefix=vendor/ui-blocks ui-blocks main --squash
Actualizar: git subtree pull --prefix=vendor/ui-blocks ui-blocks main --squash
Contribuir de vuelta (si editas dentro del consumidor): git subtree push --prefix=vendor/ui-blocks ui-blocks main
B) Branch dedicado (opcional): - Crear branch library que sólo contenga packages/ui-blocks. - Subtree apunta a ese branch (más limpio).

Versión / Tagging
Usar tags semver: git tag v0.1.0 && git push --tags.
Documentar cambios (CHANGELOG.md opcional).
Validación en un proyecto consumidor
Clonar, añadir subtree, instalar peer deps:

npm install react react-dom @tanstack/react-table lucide-react class-variance-authority clsx tailwind-merge @radix-ui/react-dropdown-menu ...
Ajustar tailwind.config.js:

content: [  "./vendor/ui-blocks/**/*.{ts,tsx}",  "./src/**/*.{ts,tsx}"]
Importar un componente y verificar estilos.