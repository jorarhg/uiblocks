import React from 'react'
import { FormatterFunction } from '../../internal/types/formatters'

export const ImageFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  if (!value) return { content: <span className='text-muted-foreground'>-</span> }
  const width = options?.width || 32
  const height = options?.height || 32
  const alt = options?.alt || 'Image'
  const fallbackSrc = options?.fallbackSrc || '/placeholder.svg'
  return { content: <img src={String(value)} alt={alt} width={width} height={height} className={`rounded ${options?.className || ''}`} style={options?.style} onError={(e)=>{const t=e.target as HTMLImageElement; if (t.src!==fallbackSrc) t.src=fallbackSrc}} /> }
}
