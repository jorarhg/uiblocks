// Fuente centralizada de definición de props y eventos para componentes UI.
// Simplificado (manual) hasta que se integre extracción automática con ts-morph.

export interface PropDoc {
  name: string
  type: string
  default?: string
  required?: boolean
  description?: string
  deprecated?: boolean
  event?: boolean // Marca eventos
}

export interface ComponentDoc {
  displayName: string
  props: PropDoc[]
  notes?: string
}

// Utilidad para marcar boolean visibles
const bool = 'boolean'
const str = 'string'

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  Button: {
    displayName: 'Button',
    notes: 'Basado en <button>. Variantes gestionadas por cva.',
    props: [
  { name: 'variant', type: `'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'dashed' | 'input' | 'badge' | 'circle' | 'full'`, default: 'default', description: 'Estilo visual predefinido.' },
  { name: 'size', type: `'default' | 'sm' | 'lg' | 'icon' | 'circle' | 'xs' | 'input'`, default: 'default', description: 'Tamaño del botón.' },
  { name: 'tone', type: `'default' | 'neutral'`, default: 'default', description: 'Matiz alterno usado en variant="badge".' },
      { name: 'asChild', type: bool, default: 'false', description: 'Usa Slot para renderizar otro elemento preservando estilos.' },
      { name: 'leftIcon', type: 'ReactNode', description: 'Icono a la izquierda.' },
      { name: 'rightIcon', type: 'ReactNode', description: 'Icono a la derecha.' },
      { name: 'loading', type: bool, default: 'false', description: 'Activa estado de carga y deshabilita el botón.' },
      { name: 'loadingIcon', type: 'ReactNode', description: 'Icono/spinner personalizado para loading.' },
  { name: 'iconOnly', type: bool, default: 'false', description: 'Fuerza modo solo ícono (ignora children para layout).' },
      { name: 'disabled', type: bool, description: 'Deshabilita interacción (también se fuerza con loading).' },
      { name: 'onClick', type: '(e: React.MouseEvent<HTMLButtonElement>) => void', event: true, description: 'Evento click.' },
    ]
  },
  Input: {
    displayName: 'Input',
    props: [
      { name: 'type', type: str, default: 'text', description: 'Tipo de input nativo.' },
      { name: 'value', type: 'string | number | readonly string[]', description: 'Valor controlado.' },
      { name: 'defaultValue', type: 'string | number | readonly string[]', description: 'Valor inicial no controlado.' },
      { name: 'placeholder', type: str, description: 'Texto placeholder.' },
      { name: 'disabled', type: bool, description: 'Deshabilita el campo.' },
      { name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', event: true, description: 'Cambio de valor.' },
    ]
  },
  Select: {
    displayName: 'Select',
    notes: 'Composición Radix; Root controla estado y se compone de Trigger/Content/Item.',
    props: [
      { name: 'defaultValue', type: str, description: 'Valor inicial.' },
      { name: 'value', type: str, description: 'Valor controlado.' },
      { name: 'onValueChange', type: '(value: string) => void', event: true, description: 'Disparado al cambiar la selección.' },
      { name: 'disabled', type: bool, description: 'Deshabilita el select.' },
    ]
  },
  Checkbox: {
    displayName: 'Checkbox',
    props: [
      { name: 'checked', type: 'boolean | "indeterminate"', description: 'Estado controlado o indeterminado.' },
      { name: 'defaultChecked', type: bool, description: 'Estado inicial no controlado.' },
      { name: 'disabled', type: bool, description: 'Deshabilita interacción.' },
  { name: 'iconVariant', type: `'check' | 'cross' | 'fill'`, default: 'check', description: 'Estilo del ícono de selección.' },
      { name: 'onCheckedChange', type: '(value: boolean | "indeterminate") => void', event: true, description: 'Cambio de estado.' },
    ]
  },
  RadioGroup: {
    displayName: 'RadioGroup',
    props: [
      { name: 'value', type: str, description: 'Valor controlado seleccionado.' },
      { name: 'defaultValue', type: str, description: 'Valor inicial.' },
      { name: 'onValueChange', type: '(value: string) => void', event: true, description: 'Cambio de selección.' },
      { name: 'disabled', type: bool, description: 'Deshabilita todos los radios.' },
  { name: 'layout', type: `'stack' | 'inline'`, default: 'stack', description: 'Distribución de los radios.' },
  { name: 'size', type: `'sm' | 'md' | 'lg' | 'xl'`, default: 'md', description: 'Escala del radio.' },
  { name: 'indicatorVariant', type: `'dot' | 'fill' | 'ring'`, default: 'dot', description: 'Estilo visual del indicador interno.' },
    ]
  },
  Switch: {
    displayName: 'Switch',
    props: [
      { name: 'checked', type: bool, description: 'Estado controlado.' },
      { name: 'defaultChecked', type: bool, description: 'Estado inicial.' },
      { name: 'disabled', type: bool, description: 'Deshabilita el switch.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', event: true, description: 'Cambio de estado.' },
    ]
  },
  Badge: {
    displayName: 'Badge',
    props: [
      { name: 'variant', type: `'default' | 'secondary' | 'destructive' | 'outline'`, default: 'default', description: 'Estilo visual.' },
      { name: 'children', type: 'ReactNode', description: 'Contenido del badge.' },
    ]
  },
  Card: {
    displayName: 'Card',
    props: [
      { name: 'children', type: 'ReactNode', description: 'Contenido interno.' },
      { name: 'className', type: str, description: 'Clases extra.' },
    ]
  },
  Tabs: {
    displayName: 'Tabs (Root)',
    props: [
      { name: 'defaultValue', type: str, description: 'Valor inicial activo.' },
      { name: 'value', type: str, description: 'Valor controlado.' },
      { name: 'onValueChange', type: '(value: string) => void', event: true, description: 'Cambio de tab.' },
    ]
  },
  TabsList: {
    displayName: 'TabsList',
    props: [
      { name: 'justify', type: `'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'`, default: 'start', description: 'Justificación horizontal.' },
      { name: 'variant', type: `'default' | 'ghost' | 'outline'`, default: 'default', description: 'Estilo de fondo.' },
      { name: 'fullWidth', type: bool, default: 'false', description: 'Forzar ancho completo.' },
    ]
  },
  TabsTrigger: {
    displayName: 'TabsTrigger',
    props: [
      { name: 'value', type: str, required: true, description: 'Identificador de la tab.' },
      { name: 'size', type: `'sm' | 'md' | 'lg'`, default: 'md', description: 'Tamaño.' },
  { name: 'variant', type: `'default' | 'underline' | 'pill' | 'icon' | 'number'`, default: 'default', description: 'Estilo visual / layout del trigger.' },
    ]
  },
  Dialog: {
    displayName: 'Dialog',
    props: [
      { name: 'open', type: bool, description: 'Estado controlado de apertura.' },
      { name: 'defaultOpen', type: bool, description: 'Estado inicial.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', event: true, description: 'Cambio de apertura.' },
    ]
  },
  DropdownMenu: {
    displayName: 'DropdownMenu',
    props: [
      { name: 'open', type: bool, description: 'Estado controlado.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', event: true, description: 'Cambio de apertura.' },
    ]
  },
  Tooltip: {
    displayName: 'Tooltip',
    props: [
      { name: 'open', type: bool, description: 'Estado controlado.' },
      { name: 'defaultOpen', type: bool, description: 'Estado inicial.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', event: true, description: 'Cambio de apertura.' },
    ]
  },
}

export type ComponentDocKey = keyof typeof COMPONENT_DOCS
