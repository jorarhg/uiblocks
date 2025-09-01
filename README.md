# UI Blocks (`@teribit/ui-blocks`)

![version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![license](https://img.shields.io/badge/license-MIT-green.svg)
![status](https://img.shields.io/badge/status-alpha-orange.svg)
<!-- Reemplazar bundle size badge tras publicar en npm -->
![bundle size](https://img.shields.io/badge/bundle--size-pending-lightgrey.svg)

Colección modular de bloques de interfaz (tablas, tabs colapsables, charts, toolbar dinámica) para acelerar dashboards y aplicaciones internas. Construido con React 19, TypeScript, Radix Primitives y Tailwind.

## 🚀 Características principales

- 📊 DataTable avanzada: filtrado, ordenamiento multi‑columna, paginación, selección, hide/show, grouping (opcional) y reordenamiento con animación FLIP.
- 🧩 simpleColumns: define columnas con objetos declarativos (key, label, sortable, filterable, width, align, render) sin escribir `ColumnDef` manual.
- 🧪 Toolbar dinámica: filtros facetados, búsqueda y acciones reutilizables.
- 📑 CollapsibleSidebarTabs: barra vertical colapsable con resize animado, íconos o números y tooltips automáticos al colapsar.
- � Charts suite (Recharts): line, multiline, referenced line, bar, stacked bar, area, donut, scatter, radar, heatmap, heatmap grid y gauge semicircular.
- 🎨 Theming consistente + utilidades (`cn`) y variantes via CVA.
- ♿ Accesible: Radix + ARIA labels en componentes interactivos y charts.
- ⚙️ Extensible: acciones de fila, renderers personalizados y configuración JSON de tablas.
- 🔒 Type Safe: TypeScript completo y d.ts incluidos.

## 📦 Instalación

Instala el paquete y peer deps mínimos (si aún no existen en tu proyecto):

```bash
npm install @teribit/ui-blocks @tanstack/react-table lucide-react class-variance-authority clsx tailwind-merge
```

Configura Tailwind y Radix (ver docs internas si partes de cero).

## 🔗 Integración vía `git subtree`

Si prefieres traer el paquete (o todo el repo) dentro de otro mono‑repo sin publicar aún en npm, puedes usar `git subtree`. Esto evita hacks con submódulos y mantiene un historial aplanado.

### Opción 1: Todo el repositorio como subtree

```bash
# Dentro de tu repo destino
git remote add uiblocks https://github.com/jorarhg/uiblocks.git
git fetch uiblocks
git subtree add --prefix=vendor/uiblocks uiblocks main --squash
```

Actualizar más adelante:

```bash
git fetch uiblocks
git subtree pull --prefix=vendor/uiblocks uiblocks main --squash
```

### Opción 2: Sólo el paquete `packages/ui-blocks`

Para evitar traer docs y sitio demo, se puede mantener (en este repo origen) una rama split que contenga únicamente el directorio `packages/ui-blocks`.

En el repo de UI Blocks (mantenedor):

```bash
# Crear / actualizar rama split (ejecutar tras cambios relevantes)
git subtree split --prefix packages/ui-blocks -b split/ui-blocks
git push origin split/ui-blocks:split/ui-blocks
```

En el repo consumidor:

```bash
git remote add uiblocks https://github.com/jorarhg/uiblocks.git
git fetch uiblocks split/ui-blocks
git subtree add --prefix=libs/ui-blocks uiblocks split/ui-blocks --squash
```

Actualizar luego:

```bash
git fetch uiblocks split/ui-blocks
git subtree pull --prefix=libs/ui-blocks uiblocks split/ui-blocks --squash
```

### Convenciones sugeridas

- Usa `--squash` para mantener un historial compacto en el repo consumidor.
- Prefijos comunes: `vendor/`, `libs/` o `external/`.
- Documenta en tu README interno el origen y comandos de actualización.
- Si haces cambios locales que quieras devolver, crea un branch y abre PR aquí en lugar de `subtree push` inicialmente (evita divergencias tempranas).

### Problemas frecuentes

| Situación | Causa | Solución rápida |
|-----------|-------|-----------------|
| Conflictos al `pull` | Cambios locales en mismo archivo | Haz commit local, luego `git subtree pull ... --squash`; resuelve y commit |
| Historia demasiado grande | Añadiste todo el repo y sólo quieres el paquete | Migra a Opción 2 usando rama split |
| Cambios no reflejados | Olvidaste regenerar rama split | Ejecuta nuevamente `git subtree split ...` y `push` |

Si se publica el paquete en npm, podrás reemplazar el subtree por la dependencia directa y borrar la carpeta vendorizada.

## 🏃‍♂️ Quick Start

### 1. (Opcional) Define tu tipo de dato

```tsx
interface Task {
  id: string
  title: string
  status: "todo" | "in-progress" | "done"
  priority: "low" | "medium" | "high"
}
```

### 2A. Columnas con `simpleColumns` (más rápido)

```tsx
import { DataTable } from '@teribit/ui-blocks'

const data: Task[] = [
  { id:'1', title:'Setup', status:'todo', priority:'high' },
]

export function TasksSimple(){
  return <DataTable simpleColumns={[
    { key:'title', label:'Título', sortable:true, filterable:true },
    { key:'status', label:'Estado', filterable:true, width:120, align:'center' },
    { key:'priority', label:'Prioridad', render:v => <span className='capitalize'>{v}</span> }
  ]} data={data} searchPlaceholder='Buscar tarea...' />
}
```

### 2B. ColumnDef avanzado (control completo)

```tsx
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return <Badge variant="outline">{status}</Badge>
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
]
```

### 3. Monta la tabla

```tsx
import { DataTable } from "@/components/data-table/data-table"

export default function TasksPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={taskData} />
    </div>
  )
}
```

## 📚 Documentación local

Ejecuta el entorno y visita `/docs` y `/blocks`:

- `/docs/components/*` Componentes base y props.
- `/blocks/data-tables/*` Variantes (básica, filtros, reorder, grouping).
- `/blocks/charts` Suite de gráficas y ejemplos.
- `/docs/components/tabs` Demos de Tabs y `CollapsibleSidebarTabs`.

## 🎯 Componentes Principales

### Resumen rápido de bloques

| Bloque | Clave | Destacado |
|--------|------|-----------|
| DataTable | `DataTable` | Reorder, grouping, filters, selection |
| DataTable simple | `simpleColumns` | Declarar columnas en segundos |
| Toolbar dinámica | `DataTableWithDynamicToolbar` | Filtros facetados + acciones |
| Sidebar Tabs | `CollapsibleSidebarTabs` | Colapsable, animado, tooltips |
| Charts | `SimpleLineChart`, etc. | Paleta uniforme + gauge |
| Gauge | `GaugeChart` | Semicircular, thresholds personalizables |

## 🎨 Ejemplos

### Tabla Básica
```tsx
<DataTable columns={columns} data={data} />
```

### Con Filtros Dinámicos
```tsx
<DataTableWithDynamicToolbar 
  columns={columns} 
  data={data}
  options={{
    enableGlobalFilter: true,
    filters: {
      status: {
        type: "select",
        options: ["todo", "in-progress", "done"]
      }
    }
  }}
/>
```

### Configuración desde JSON
```tsx
const config = await getConfigFromJSON()
<DataTableWithDynamicToolbar 
  columns={config.columns}
  data={data}
  options={config.options}
/>
```

## 🛠️ Tecnologías

- **React 18+**: Framework principal
- **TypeScript**: Tipado estático
- **TanStack Table v8**: Motor de tabla
- **shadcn/ui**: Componentes base
- **Tailwind CSS**: Estilos
- **Radix UI**: Primitivos accesibles
- **Lucide React**: Iconos

## 📁 Estructura (simplificada)

```
uiblocks/
├── packages/ui-blocks/               # Paquete publicable (dist, rollup, src)
├── app/                              # Sitio demo + documentación (Next.js)
│   ├── (docs)/docs/components        # Páginas de componentes
│   ├── blocks/                       # Demos agrupadas (tables, charts)
├── components/                       # Fuente local (migrando al paquete)
├── lib/                              # Utils y factories
├── docs/                             # Documentos de arquitectura / notas
└── CHANGELOG.md
```

## 🧩 Ejemplo Sidebar Tabs

```tsx
import { CollapsibleSidebarTabs } from '@teribit/ui-blocks'
import { Home, Bell, Settings } from 'lucide-react'

<CollapsibleSidebarTabs
  variant='icon'
  items=[
    { value:'home', label:'Home', icon:<Home className='h-5 w-5' />, content:'Panel' },
    { value:'alerts', label:'Alertas', icon:<Bell className='h-5 w-5' />, content:'Notificaciones' },
    { value:'settings', label:'Ajustes', icon:<Settings className='h-5 w-5' />, content:'Preferencias' },
  ]
  config={{ base:224, min:54, maxFactor:1.35 }}
/>
```

## 📈 Ejemplo Gauge

```tsx
import { GaugeChart } from '@teribit/ui-blocks'

<GaugeChart value={72} min={0} max={100} thresholds={[{ value:50, color:'#16a34a'},{ value:80, color:'#f59e0b'}]} />
```

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar tests
npm test
```

## 📄 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Ejecutar linting
- `npm run validate:filters` - Validar integración de filtros
- `npm run test:filters` - Tests de filtros
- `npm run demo:filters` - Demo de filtros

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [shadcn/ui](https://ui.shadcn.com) por los componentes base
- [TanStack Table](https://tanstack.com/table) por el motor de tabla
- [Tailwind CSS](https://tailwindcss.com) por el sistema de estilos
- [Radix UI](https://radix-ui.com) por los primitivos accesibles

---

Construido con ❤️ para acelerar dashboards productivos.

## 🗺️ Roadmap (short term)

- [ ] Persistencia local de preferencias (orden / visibilidad de columnas)
- [ ] Virtualización (react-virtual) para datasets grandes
- [ ] Filtro avanzado (builder: AND/OR, rangos, date presets)
- [ ] Export (CSV / XLSX) desde DataTable
- [ ] Tokens de tema (dark auto + escalas semantic) y docs theming
- [ ] API onCollapseChange para `CollapsibleSidebarTabs`
- [ ] Charts: área apilada + streaming live demo
- [ ] Paquete de iconos interno optimizado (tree‑shake)
- [ ] Infra CI: release semántico + changelog automático

Sugerencias o prioridades distintas: abrir issue / discusión.
