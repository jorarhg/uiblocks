# Changelog

## 0.1.0 - 2025-08-31

Versión inicial etiquetada del paquete `@teribit/ui-blocks`.

### Features
- UI base y theming: botones, inputs, tabs (variants underline, pill, icon, number), checkbox, radio, tooltip, dialog, dropdown, etc.
- DataTable: selección, filtros facetados, paginación, ocultar columnas, reorder con FLIP, grouping opcional.
- DataTable simpleColumns: configuración declarativa de cabeceras (key, label, sortable, filterable, width, align, render).
- CollapsibleSidebarTabs: sidebar vertical colapsable con animación, resize configurable y tooltips en modo colapsado.
- Charts suite: line, multiline, line con referencia, bar, stacked bar, area, donut, scatter, radar, heatmap, heatmap grid, gauge semicircular.
- Blocks/Docs: páginas de componentes, ejemplos de charts y tablas, scrollspy en sidebar, TOC flotante.

### Fixes
- Reordenamiento de columnas: eliminado parpadeo infinito; área de drop completa y uso de último preview.
- Heatmap: alineación de etiquetas eje Y y tooltips corregidos.

### Docs
- Ejemplos simplificados para Tabs (CollapsibleSidebarTabs) y DataTable (simpleColumns).
- Snippets consistentes y reducción de verbosidad.

### Notas
- Punto de partida SemVer; cambios posteriores seguirán incrementos normales.
- `reorderTransition` permite personalizar la animación FLIP de reordenamiento.