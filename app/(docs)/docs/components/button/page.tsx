import { DocExample } from '@/components/docs/doc-example'
import { Button } from '@/components/ui/button'
import { Plus, ArrowRight, Loader2, Upload, ChevronDown, Trash, Link as LinkIcon, Search, MoreHorizontal } from 'lucide-react'
import { PropsTable } from '@/components/docs/props-table'

export default function ButtonComponentDoc(){
  return (
    <div className='space-y-8'>
      <header className='space-y-2'>
        <h1 className='text-3xl font-bold'>Button</h1>
        <p className='text-muted-foreground'>Botón accesible con variantes, tamaños y estados themables.</p>
      </header>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Ejemplo rápido</h2>
        <DocExample
          preview={<div className='flex flex-wrap gap-3'>
            <Button>Primary</Button>
            <Button variant='secondary'>Secondary</Button>
            <Button variant='outline'>Outline</Button>
            <Button variant='ghost'>Ghost</Button>
            <Button variant='destructive'>Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>}
          code={`import { Button } from '@teribit/ui-blocks'

export function Demo(){
  return <Button variant='secondary'>Acción</Button>
}`}
          title='Variantes'
          description='Estados básicos del botón.'
          variant='panel'
        />
      </section>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Variantes básicas</h2>
          <DocExample
            preview={<div className='flex flex-wrap gap-3'>
              <Button>Primary</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='outline'>Outline</Button>
              <Button variant='ghost'>Ghost</Button>
              <Button variant='destructive'>Destructive</Button>
              <Button variant='dashed'>Dashed</Button>
              <Button variant='link'>Link</Button>
              <Button disabled>Disabled</Button>
            </div>}
            code={`<Button>Primary</Button>
  <Button variant='secondary'>Secondary</Button>
  <Button variant='outline'>Outline</Button>
  <Button variant='ghost'>Ghost</Button>
  <Button variant='destructive'>Destructive</Button>
  <Button variant='dashed'>Dashed</Button>
  <Button variant='link'>Link</Button>
  <Button disabled>Disabled</Button>`}
            title='Variantes'
            description='Estados visuales predeterminados más estilos extendidos.'
            variant='panel'
          />
        </section>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Tamaños</h2>
          <DocExample
            preview={<div className='flex flex-wrap items-end gap-3'>
              <Button size='xs'>XS</Button>
              <Button size='sm'>SM</Button>
              <Button size='default'>Default</Button>
              <Button size='lg'>LG</Button>
              <Button size='icon' leftIcon={<Plus />} aria-label='Icon size example' />
            </div>}
            code={`<Button size='xs'>XS</Button>
  <Button size='sm'>SM</Button>
  <Button size='default'>Default</Button>
  <Button size='lg'>LG</Button>
  <Button size='icon' leftIcon={<Plus />} aria-label='Add' />`}
            title='Size'
            description='Controla la altura y padding del botón.'
            variant='flat'
          />
        </section>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Icon Only & Circle</h2>
          <DocExample
            preview={<div className='flex flex-wrap gap-3'>
              <Button iconOnly leftIcon={<Plus />} aria-label='Add' />
              <Button iconOnly variant='secondary' leftIcon={<Search />} aria-label='Search' />
              <Button variant='circle' size='circle' leftIcon={<Plus />} aria-label='Action' />
              <Button variant='circle' size='circle' leftIcon={<MoreHorizontal />} aria-label='More' />
            </div>}
            code={`<Button iconOnly leftIcon={<Plus />} aria-label='Add' />
  <Button iconOnly variant='secondary' leftIcon={<Search />} aria-label='Search' />
  <Button variant='circle' size='circle' leftIcon={<Plus />} aria-label='Action' />
  <Button variant='circle' size='circle' leftIcon={<MoreHorizontal />} aria-label='More' />`}
            title='Icon Only'
            description='Botones solo icono; circle produce una forma redonda.'
            variant='flat'
          />
        </section>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Badge</h2>
          <DocExample
            preview={<div className='flex flex-wrap gap-3'>
              <Button variant='badge'>Activo</Button>
              <Button variant='badge' tone='neutral'>Neutral</Button>
            </div>}
            code={`<Button variant='badge'>Activo</Button>
  <Button variant='badge' tone='neutral'>Neutral</Button>`}
            title='Badge'
            description='Estilo pill para tags accionables.'
            variant='flat'
          />
        </section>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>As Input</h2>
          <DocExample
            preview={<div className='flex flex-wrap gap-3'>
              <Button variant='input' leftIcon={<Search />}>Buscar</Button>
              <Button variant='input' size='input' className='w-56 justify-start text-muted-foreground font-normal' leftIcon={<Search />}>Placeholder...</Button>
            </div>}
            code={`<Button variant='input' leftIcon={<Search />}>Buscar</Button>
  <Button variant='input' size='input' className='w-56 justify-start text-muted-foreground font-normal' leftIcon={<Search />}>Placeholder...</Button>`}
            title='As Input'
            description='Usa estilo de campo para acciones que parecen inputs.'
            variant='flat'
          />
        </section>
        <section className='space-y-4'>
          <h2 className='text-xl font-semibold'>Full Width</h2>
          <DocExample
            preview={<div className='flex flex-col gap-3 w-full max-w-sm'>
              <Button variant='full'>Guardar cambios</Button>
              <Button variant='full' loading>Procesando</Button>
            </div>}
            code={`<Button variant='full'>Guardar cambios</Button>
  <Button variant='full' loading>Procesando</Button>`}
            title='Full width'
            description='Ocupa el 100% del contenedor.'
            variant='flat'
          />
        </section>
      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>Iconos</h2>
        <DocExample
          title='Iconos a la izquierda'
          preview={<div className='flex flex-wrap gap-3'>
            <Button leftIcon={<Plus />}>Crear</Button>
            <Button variant='secondary' leftIcon={<Upload />}>Subir archivo</Button>
            <Button variant='outline' leftIcon={<Trash />}>Eliminar</Button>
          </div>}
          code={`<Button leftIcon={<Plus />}>Crear</Button>
<Button variant='secondary' leftIcon={<Upload />}>Subir archivo</Button>
<Button variant='outline' leftIcon={<Trash />}>Eliminar</Button>`}
          variant='flat'
        />
        <DocExample
          title='Iconos a la derecha'
          preview={<div className='flex flex-wrap gap-3'>
            <Button rightIcon={<ArrowRight />}>Continuar</Button>
            <Button variant='secondary' rightIcon={<ChevronDown />}>Más</Button>
          </div>}
          code={`<Button rightIcon={<ArrowRight />}>Continuar</Button>
<Button variant='secondary' rightIcon={<ChevronDown />}>Más</Button>`}
          variant='flat'
        />
        <DocExample
          title='Iconos en ambos lados'
          preview={<div className='flex flex-wrap gap-3'>
            <Button leftIcon={<Upload />} rightIcon={<ChevronDown />}>Acción</Button>
            <Button variant='ghost' leftIcon={<Plus />} rightIcon={<ArrowRight />}>Flow</Button>
          </div>}
          code={`<Button leftIcon={<Upload />} rightIcon={<ChevronDown />}>Acción</Button>
<Button variant='ghost' leftIcon={<Plus />} rightIcon={<ArrowRight />}>Flow</Button>`}
          variant='flat'
        />
          <DocExample
            title='Link con icono'
            preview={<div className='flex flex-wrap gap-3'>
              <Button variant='link' leftIcon={<LinkIcon />}>Documentación</Button>
            </div>}
            code={`<Button variant='link' leftIcon={<LinkIcon />}>Documentación</Button>`}
            variant='flat'
          />
        <DocExample
          title='Estado de carga'
          preview={<div className='flex flex-wrap gap-3'>
            <Button loading>Guardando</Button>
            <Button loading variant='secondary'>Procesando</Button>
            <Button loading leftIcon={<Plus />}>Creando</Button>
            <Button loading loadingIcon={<Loader2 className='h-4 w-4 animate-spin' />}>
              Custom loader
            </Button>
            <Button loading />
          </div>}
          code={`<Button loading>Guardando</Button>
<Button loading variant='secondary'>Procesando</Button>
<Button loading leftIcon={<Plus />}>Creando</Button>
<Button loading loadingIcon={<Loader2 className='h-4 w-4 animate-spin' />}>Custom loader</Button>
<Button loading />`}
          variant='flat'
        />
      </section>
    </div>
  )
}

// Sección de API (props + eventos) añadida debajo de ejemplos
export const metadata = { description: 'Button component docs' }

