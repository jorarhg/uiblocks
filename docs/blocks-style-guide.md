# Guía de Estilo de Bloques

Referencia oficial para construir y documentar nuevos bloques UI.

## Layout general
- Contenedor máximo: `max-w-[1440px]` con padding horizontal `px-4 md:px-8`.
- Distribución: `flex` con sidebar fija (`sticky top-20`) y área principal `flex-1`.
- Separación horizontal: `gap-6 md:gap-10`.

## Sidebar
- Ancho: `w-56 xl:w-60`.
- Grupos con título en uppercase `text-[11px] tracking-wider text-muted-foreground`.
- Item activo: fondo `bg-muted`, texto foreground y barra lateral de 3px (`absolute left-0 top-1 bottom-1 w-[3px]`) opaca.
- Hover: `hover:bg-accent` para ítems inactivos, indicador lateral con `opacity-40`.

## Cards de bloque
- Sin borde externo ni sombra: `border-0 shadow-none bg-transparent p-0`.
- Estructura interna conserva `CardHeader` (título / descripción / badges) y `CardContent`.
- Tags: pills mini (`text-[10px] bg-muted px-2 py-0.5 uppercase`).
- Estado (stable/beta/...): usa `Badge` en mayúsculas.

## Tabs dentro de la card
- Componente `TabsList` con clases adicionales: `mb-2 w-fit self-start` para evitar estiramiento.
- Mantener estilo original (background mutado compacto) sin justificar a ancho completo.
- Triggers: estilo por defecto del componente; NO grid, NO `w-full`.

## Área de preview / código
- `TabsContent` para preview: `rounded-md border bg-background p-5 overflow-auto`.
- Evitar doble borde: el contenedor `preview` interno NO debe tener `border`.
- Contenido de código: mantener borde propio; padding externo 0 para que el `<pre>` gobierne.

## Prop `fullWidth`
- Bloques que requieren ancho completo (tablas extensas, dashboards) marcan `fullWidth: true`.
- La grilla principal usa `md:grid-cols-12` y cada bloque decide:
  - `md:col-span-12` si `fullWidth`.
  - `md:col-span-6 xl:col-span-4` por defecto.

## Espaciado y tipografía
- Header de sección principal: `text-2xl md:text-3xl font-semibold tracking-tight`.
- Descripción: `text-sm md:text-base leading-relaxed text-muted-foreground max-w-2xl`.
- Distancias clave: header inferior `mb-6 md:mb-8`; separación entre bloques `gap-8`.

## Breadcrumb
- Minimalista en desktop: `text-xs text-muted-foreground`, separador con `ChevronRight`.

## Consistencia futura
Al añadir nuevos bloques repetir:
1. Definir objeto `BlockMeta` (usar `fullWidth` si aplica).
2. Evitar colocar bordes adicionales en preview.
3. Reutilizar el mismo patrón de Tabs (sin expansión horizontal).
4. Mantener tags, badges y semántica tipográfica estable.
5. Asegurar que los ejemplos sigan la misma densidad de padding (`p-5`).

## Ejemplo mínimo
```tsx
const blocks: BlockMeta[] = [
  {
    id: 'datatable-basic',
    title: 'DataTable Básico',
    category: 'tables',
    description: 'Tabla con búsqueda y paginación.',
    preview: (
      <div className='rounded-md'>
        <DataTable columns={columns} data={data} searchKey='title' />
      </div>
    ),
    code: basicTableCode,
    tags: ['table','pagination'],
    status: 'stable',
    fullWidth: true
  }
]
```

## Checklist para nuevos bloques
- [ ] Objeto `BlockMeta` con `id` único.
- [ ] Uso de `rounded-md` sin borde en preview.
- [ ] Tabs con `w-fit self-start`.
- [ ] Padding preview `p-5`.
- [ ] Evaluar `fullWidth`.
- [ ] Tags en formato pills minúsculas.
- [ ] Sin estilos ad-hoc que rompan consistencia.

---
Esta guía se actualiza cuando se aprueben nuevas variantes (añadir sección de cambios si se amplia).