
import React from 'react'
import { FormatterFunction } from '@/types/formatters'

/**
 * Formatter para imágenes con configuración de tamaño y fallback
 */
export const ImageFormatter: FormatterFunction = ({ value, field }) => {
  const options = field.formatter?.options
  
  if (!value) {
    return {
      content: <span className="text-muted-foreground">-</span>
    }
  }
  
  const width = options?.width || 32
  const height = options?.height || 32
  const alt = options?.alt || 'Image'
  const fallbackSrc = options?.fallbackSrc || '/placeholder.svg'
  
  return {
    content: (
      <img
        src={String(value)}
        alt={alt}
        width={width}
        height={height}
        className={`rounded ${options?.className || ''}`}
        style={options?.style}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          if (target.src !== fallbackSrc) {
            target.src = fallbackSrc
          }
        }}
      />
    )
  }
}
