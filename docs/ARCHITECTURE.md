# UI Blocks - Arquitectura

Este documento describe la arquitectura global del proyecto (layouts, theming, capas de componentes, sistema de variantes, documentación y flujo de datos dinámicos) y resume las decisiones clave implementadas recientemente.

---

## 1. Layout Compartido ✅

El proyecto utiliza un **layout global** que inyecta el header en todas las páginas y un layout específico para la sección de documentación con sidebar.

### 📁 Estructura de Layouts

```
app/
├── layout.tsx                    # 🌟 Layout global con DocsHeader
├── page.tsx                      # Página principal
├── (docs)/                       # Route group para documentación
│   ├── layout.tsx               # Layout específico de docs (sidebar)
│   ├── docs/
│   │   ├── page.tsx            # /docs
│   │   ├── installation/
│   │   ├── quick-start/
│   │   └── customization/
│   └── examples/
├── blocks/                      # Páginas de bloques
│   ├── page.tsx                # /blocks
│   └── data-tables/
└── [demos]/                    # Páginas de demostración
```

### 🎯 Funcionalidad del Layout

#### Layout Global (`app/layout.tsx`)
- ✅ **DocsHeader** en todas las páginas
- ✅ Estructura HTML base
- ✅ Metadata global
- ✅ Estilos globales

#### Layout de Docs (`app/(docs)/layout.tsx`)
- ✅ **Sidebar de navegación** solo en páginas de documentación
- ✅ Grid responsive para docs
- ✅ Navegación específica de documentación

### 🌟 Beneficios

1. **Consistencia**: Todas las páginas tienen el mismo header
2. **Mantenibilidad**: Un solo lugar para modificar el header
3. **Performance**: Layout reutilizado en navegación
4. **UX**: Navegación coherente en toda la aplicación

### 📋 Páginas Cubiertas

Todas estas páginas ahora incluyen el DocsHeader automáticamente:

- ✅ `/` - Página principal
- ✅ `/blocks` - Navegador de bloques
- ✅ `/blocks/data-tables` - Bloques de datos
- ✅ `/docs` - Documentación principal
- ✅ `/docs/installation` - Guía de instalación
- ✅ `/docs/quick-start` - Inicio rápido
- ✅ `/docs/customization` - Personalización
- ✅ `/examples` - Página de ejemplos
- ✅ Todas las páginas de demo (formatters, filters, skeleton, etc.)

### 🛠️ Customización

Para modificar el header global:
1. Editar `components/docs/docs-header.tsx`
2. Los cambios se reflejan automáticamente en todas las páginas

Para agregar navegación específica a una sección:
1. Crear un layout dentro del directorio de la sección
2. El layout heredará el header global

---

## 2. Capas de Arquitectura de Componentes

Los componentes se organizan conceptualmente en capas para favorecer separación de responsabilidades y extensibilidad:

| Capa | Descripción | Ejemplos |
|------|-------------|----------|
| 0. Primitivos | Librerías externas altamente accesibles | Radix UI (checkbox, radio-group, dialog, select...) |
| 1. Utilidades | Funciones genéricas y helpers | `cn` en `lib/utils.ts` |
| 2. Tokens & Theming | Variables CSS, temas y editor de temas | `app/globals.css`, `.dark`, `.theme-custom`, ThemeProvider |
| 3. Variants Layer | Definición declarativa de variantes con CVA | `buttonVariants`, `badgeVariants`, tamaños radio/checkbox |
| 4. Componentes Base UI | Envolturas estilizadas sobre Radix / HTML | `components/ui/*` (Button, Checkbox, RadioGroup, Dialog...) |
| 5. Composición Intermedia | Combina base UI + lógica | Dynamic toolbar, filtros, formatters integration |
| 6. Componentes de Dominio | Data-driven / generativos | DataTable dinámico (`column-factory-*`, config JSON) |
| 7. Documentación & Demos | Ejemplos, tablas de props | `DocExample`, `PropsTable`, páginas en `app/(docs)` |
| 8. Distribución | Empaquetado y export público | `packages/ui-blocks` (Rollup, index export) |

Relación: (0-2) proveen fundamentos -> (3) crea un DSL ligero para estilos -> (4) expone API estable -> (5-6) añaden comportamiento adaptativo -> (7) muestra y valida -> (8) publica.

---

## 3. Sistema de Temas (Light / Dark / Custom)

### Elementos Clave
- `ThemeProvider` con `attribute="class"` y `enableSystem=false` garantiza control explícito.
- Clases raíz: `:root`, `.dark`, `.theme-custom` definen variables (`--background`, `--primary`, etc.).
- Editor de tema custom: UI que permite editar subconjunto `EDITABLE_VARS`, convierte HEX ↔ HSL y persiste en `localStorage`.
- Aplicación dinámica: se inyectan overrides como inline style sobre `document.documentElement` sólo cuando el tema activo es `custom`.

### Flujo del Editor de Tema
```
Usuario -> cambia color (input) -> estado local overrides -> escribe localStorage -> aplica setProperty(variable, valor) -> re-render UI inmediato
```

### Consideraciones
- No se aplican overrides si el tema activo no es `custom`.
- Animaciones/transiciones limitadas a properties críticas (ej. coloreado) para evitar jank.

---

## 4. Sistema de Variantes (CVA)

Se emplea `class-variance-authority` como mini DSL que produce clases Tailwind combinadas en función de props declarativas.

Ejemplo Button (resumen actual):
- Variants: `default | destructive | outline | secondary | ghost | link | dashed | input | badge | circle | full`
- Sizes: `default | sm | lg | icon | circle | xs | input`
- Tone (extensión para badge): `default | neutral`
- Prop adicional: `iconOnly` reconfigura layout interno.

Ventajas:
1. Consistencia horizontal entre componentes.
2. Reducción de repetición de clases.
3. Extensión controlada (añadir nueva variante = 1 línea en mapa). 

Patrón: cada componente UI mantiene su `*Variants` + lógica mínima de orquestación de slots internos (iconos, label, spinner).

---

## 5. Documentación Centralizada de Props

Archivo fuente: `components/docs/props-data.ts`.
Estructura:
- `COMPONENT_DOCS`: diccionario -> `ComponentDoc` -> lista de props (`PropDoc`).
- Bandera `event: true` para resaltar eventos en tablas.
- Se actualizó Button (nuevas variantes, sizes, tone, iconOnly) y RadioGroup (layout, size, indicatorVariant).

Renderizado:
- `PropsTable` consume la metadata y genera tabla accesible (sin duplicar descripciones en cada página).

Beneficios:
1. Fuente única (SPOF controlado) para documentación.
2. Facilita futura extracción automática (ts-morph) sin romper API docs.

---

## 6. Evoluciones Recientes de Componentes

### Button
- Ampliado con variantes: dashed, input, badge, circle, full.
- Nuevos tamaños: xs, circle, input.
- Prop `iconOnly` para control explícito (evita spans extra, layout centrado).
- Modo `badge` soporta `tone` (extensible a más tonos).

### Checkbox
- Tamaño aumentado (~25%), borde 2px, hover + transición, variantes de ícono: `check | cross | fill` (fill con inversión de color y ajuste de tamaño interno).

### RadioGroup / Radio
- Re-styling para alineación visual con checkbox (contraste y estados).
- Variantes de layout: `stack | inline`.
- Variantes de tamaño: `sm | md | lg | xl` con escalado interno.
- Indicador animado (pop) centralizado sólo al estado checked.

### Theming Personalizado
- Editor interactivo persistente con overrides por variable (HSL canonicalizado para compatibilidad con Tailwind que usa HSL vars en utilidades).

---

## 7. DataTable Dinámico & Configuración Basada en Esquemas

Capas involucradas:
1. Config JSON (`config/datatable-config.json` / público) define columnas, tipos, formatters.
2. Factories (`lib/column-factory-*.tsx`) generan definiciones TanStack Table dinámicamente.
3. Integración de formatters (`lib/formatters-integration.tsx`) aplica transformaciones declarativas.
4. Render final DataTable orquesta sorting, filtering, pagination, skeleton, dynamic filters.

Flujo Simplificado:
```
config JSON -> parse -> column factory -> (attach formatters + acciones) -> TanStack column defs -> DataTable -> UI (sorting/filtering)
```

Ventajas:
- Permite variar columnas sin recompilar (cuando se sirve config externo).
- Reutilización de formatters y acciones.

---

## 8. Flujo de Renderizado de un Componente UI (Ej: Button)

```
User JSX <Button variant="badge" leftIcon=... loading />
	↓ props
Button.tsx
	- Determina iconOnly
	- Llama buttonVariants({ variant, size, tone })
	↓ clases resultantes (string Tailwind)
<button class="..." disabled=loading>
	children + icon spans condicionales
	spinner si loading
```

Estado no se mantiene dentro del botón (stateless), lo que facilita SSR y snapshot testing.

---

## 9. Flujo de Tema Personalizado

```
Toggle ciclo: light -> dark -> custom
custom seleccionado?
	sí: lee overrides localStorage -> aplica -> usuario edita -> setProperty -> persiste
	no: ignora overrides (estilos por .dark o :root)
```

Fallback: si valores corruptos en localStorage se ignoran (parse defensivo en editor - ver conversión HSL/HEX).

---

## 10. Distribución y Build

- Código fuente empaquetado en `packages/ui-blocks` vía Rollup.
- Genera: `dist/index.mjs`, `dist/index.cjs.js`, `.d.ts` para tipado consumers.
- Exports incluyen `buttonVariants` (para tests y extensión externa) y componentes.
- Tests smoke (`tests/package-import.test.mjs`) + test variantes Button.

Pipeline local de verificación manual:
1. `pnpm -C packages/ui-blocks build`
2. `pnpm build` (Next) para validar integración SSR/ISR.
3. Tests node para exports críticos.

---

## 11. Consideraciones de Accesibilidad

- Uso de Radix garantiza roles / aria estándar.
- Botones icon-only requieren `aria-label` (documentado en ejemplos).
- RadioGroup y Checkbox expondrán eventos controlados (`onValueChange`, `onCheckedChange`).
- Estados de carga deshabilitan interacción para evitar acciones duplicadas.

---

## 12. Próximos Pasos Recomendados

1. Automatizar extracción de props (ts-morph) para sincronizar metadata.
2. Añadir visual regression tests (Playwright + percy / loki) para variantes críticas (Button, Checkbox, Radio) en los 3 temas.
3. Extender `tone` a más variantes (success, warning, info) centralizando tokens.
4. Añadir fallback robusto de color si usuario selecciona contraste insuficiente en tema custom (algoritmo WCAG quick check).
5. Generar storybook (opcional) para pruebas aisladas.

---

## 13. Resumen Ejecutivo

El sistema está estructurado en capas claras: tokens + variants + componentes base forman una plataforma estable sobre la que se construyen composiciones dinámicas (DataTable) y documentación viva derivada de una fuente central de props. El theming soporta un ciclo tri-modo con un editor inmediato y persistente. La extensión de funcionalidad (nuevas variantes) requirió sólo añadir configuraciones declarativas, validando la modularidad del diseño.

---

Fin del documento.
