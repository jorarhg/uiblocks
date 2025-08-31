"use client"
import * as React from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const MODES = ['light','dark','custom'] as const

// Variables HSL que vamos a permitir editar (solo modo custom)
const EDITABLE_VARS: {var: string; label: string}[] = [
  { var: '--background', label: 'Background' },
  { var: '--foreground', label: 'Foreground' },
  { var: '--primary', label: 'Primary' },
  { var: '--accent', label: 'Accent' },
  { var: '--secondary', label: 'Secondary' }
]

function hexToHslString(hex: string){
  hex = hex.replace('#','')
  if(hex.length===3){ hex = hex.split('').map(c=>c+c).join('') }
  const r = parseInt(hex.substring(0,2),16)/255
  const g = parseInt(hex.substring(2,4),16)/255
  const b = parseInt(hex.substring(4,6),16)/255
  const max = Math.max(r,g,b), min = Math.min(r,g,b)
  let h=0,s=0
  const l = (max+min)/2
  if(max!==min){
    const d = max-min
    s = l>0.5 ? d/(2-max-min) : d/(max+min)
    switch(max){
      case r: h = (g-b)/d + (g<b?6:0); break
      case g: h = (b-r)/d + 2; break
      case b: h = (r-g)/d + 4; break
    }
    h/=6
  }
  return `${Math.round(h*360)} ${Math.round(s*100)}% ${Math.round(l*100)}%`
}

function hslStringToHex(hsl: string){
  // hsl formato "H S% L%" (puede venir sin % en H)
  const parts = hsl.trim().split(/\s+/)
  if(parts.length<3) return '#000000'
  const h = parseFloat(parts[0])
  const s = parseFloat(parts[1]) / 100
  const l = parseFloat(parts[2]) / 100
  const c = (1-Math.abs(2*l-1))*s
  const x = c*(1-Math.abs(((h/60)%2)-1))
  const m = l - c/2
  let r=0,g=0,b=0
  if(h<60){ r=c; g=x; b=0 }
  else if(h<120){ r=x; g=c; b=0 }
  else if(h<180){ r=0; g=c; b=x }
  else if(h<240){ r=0; g=x; b=c }
  else if(h<300){ r=x; g=0; b=c }
  else { r=c; g=0; b=x }
  const toHex=(v:number)=>('0'+Math.round((v+m)*255).toString(16)).slice(-2)
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export function ThemeToggle(){
  const { theme, setTheme } = useTheme()
  const current = (theme as string) || 'light'
  const [openEditor, setOpenEditor] = React.useState(false)
  const [values, setValues] = React.useState<Record<string,string>>({}) // hex values

  // Cargar valores guardados
  React.useEffect(()=>{
    if(typeof window === 'undefined') return
    const stored = localStorage.getItem('customThemeColors')
    if(stored){
      try { setValues(JSON.parse(stored)) } catch{}
    }
  },[])
  const cycle = () => {
    const idx = MODES.indexOf(current as any)
    const next = MODES[(idx + 1) % MODES.length]
    setTheme(next)
  }
  React.useEffect(()=>{
    const root = document.documentElement
    if(current === 'custom') {
      root.classList.add('theme-custom')
      // Aplicar overrides
      EDITABLE_VARS.forEach(({var: v})=>{
        const hex = values[v]
        if(hex){
          root.style.setProperty(v, hexToHslString(hex))
        }
      })
    } else {
      root.classList.remove('theme-custom')
      // quitar overrides inline
      EDITABLE_VARS.forEach(({var: v})=> root.style.removeProperty(v))
      setOpenEditor(false)
    }
  },[current, values])

  const handleColorChange = (vName:string, hex:string)=>{
    setValues(prev=>{
      const next = { ...prev, [vName]: hex }
      if(typeof window!=='undefined') localStorage.setItem('customThemeColors', JSON.stringify(next))
      return next
    })
  }

  const resetColors = ()=>{
    setValues({})
    if(typeof window!=='undefined') localStorage.removeItem('customThemeColors')
  }

  return (
    <div className='relative flex items-center gap-1'>
      <Button size='sm' variant='outline' onClick={cycle} className='font-mono'>Theme: {current}</Button>
      {current==='custom' && (
        <>
          <Button size='sm' variant='outline' onClick={()=>setOpenEditor(o=>!o)}>{openEditor? 'Cerrar' : 'Colores'}</Button>
          {openEditor && (
            <div className='absolute right-0 top-full mt-2 z-50 w-72 rounded border bg-popover p-3 shadow-md text-xs space-y-3'>
              <div className='flex items-center justify-between'>
                <strong className='text-[11px] tracking-wide'>Custom Theme</strong>
                <button aria-label='close' className='p-1 hover:text-destructive' onClick={()=>setOpenEditor(false)}><X className='h-3 w-3'/></button>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                {EDITABLE_VARS.map(({var: v,label})=>{
                  // Obtener valor actual (preferir override, si no leer computed)
                  let hex = values[v]
                  if(!hex && typeof window!=='undefined'){
                    const hsl = getComputedStyle(document.documentElement).getPropertyValue(v).trim()
                    if(hsl){ hex = hslStringToHex(hsl) }
                  }
                  return (
                    <label key={v} className='flex flex-col gap-1 text-[10px] font-medium'>
                      {label}
                      <input aria-label={label} type='color' value={hex||'#000000'} onChange={e=>handleColorChange(v,e.target.value)} className='h-8 w-full cursor-pointer rounded border border-border p-0'/>
                    </label>
                  )
                })}
              </div>
              <div className='flex justify-between pt-1'>
                <Button size='sm' variant='secondary' onClick={resetColors} className='h-7 text-[11px]'>Reset</Button>
                <span className='text-muted-foreground text-[10px]'>Valores guardados localmente</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
