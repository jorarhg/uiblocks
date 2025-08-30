import * as React from 'react'
import { CommandDialog, CommandGroup, CommandInput, CommandItem, CommandList, CommandEmpty, CommandSeparator } from '../ui/command'
import { Button } from '../ui/button'

/** Ejemplo mínimo de uso del Command palette integrado */
export function CommandPaletteExample(){
  const [open,setOpen]=React.useState(false)
  React.useEffect(()=>{
    const down = (e:any) => {
      if (e.key==='k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(o=>!o)
      }
    }
    window.addEventListener('keydown',down)
    return ()=>window.removeEventListener('keydown',down)
  },[])
  return (
    <>
      <Button variant='outline' onClick={()=>setOpen(true)} className='gap-2'>⌘K <span className='text-xs opacity-70'>(o Ctrl+K)</span></Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Buscar comando...' />
        <CommandList>
          <CommandEmpty>Sin resultados.</CommandEmpty>
          <CommandGroup heading='Navegación'>
            <CommandItem onSelect={()=>alert('Ir a inicio')}>Inicio</CommandItem>
            <CommandItem onSelect={()=>alert('Ir a reportes')}>Reportes</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Acciones'>
            <CommandItem onSelect={()=>alert('Crear registro')}>Crear registro</CommandItem>
            <CommandItem onSelect={()=>alert('Exportar')}>Exportar</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
