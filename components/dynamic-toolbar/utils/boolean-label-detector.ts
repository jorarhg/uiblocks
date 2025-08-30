/**
 * Sistema inteligente para detectar automáticamente etiquetas booleanas
 * Funciona con CUALQUIER par de valores sin hardcoding
 */

import type { Column } from "@tanstack/react-table"

export interface BooleanLabels {
  trueLabel: string
  falseLabel: string
  confidence: number // 0-1, qué tan seguro está
  method: 'semantic' | 'frequency' | 'lexical' | 'positional'
}

export class BooleanLabelDetector {
  private static readonly POSITIVE_PATTERNS = [
    // Inglés
    /^(yes|true|on|enabled?|active?|valid|available|complete?|included?|present)$/i,
    // Español  
    /^(sí|si|verdadero?|activo?|habilitado?|válido?|disponible|completo?|incluido?|presente|tiene)$/i,
    // Números y símbolos
    /^(1|✓|✅|👍)$/i
  ]

  private static readonly NEGATIVE_PATTERNS = [
    // Inglés
    /^(no|false|off|disabled?|inactive?|invalid|unavailable|incomplete?|excluded?|absent)$/i,
    // Español
    /^(no|falso?|inactivo?|deshabilitado?|inválido?|no\s+disponible|incompleto?|excluido?|ausente|no\s+tiene)$/i,
    // Números y símbolos
    /^(0|✗|❌|👎)$/i
  ]

  /**
   * Detecta automáticamente las etiquetas booleanas de una columna
   */
  static detectLabels<TData>(column: Column<TData, unknown>): BooleanLabels | null {
    const uniqueValues = column?.getFacetedUniqueValues()
    if (!uniqueValues) return null

    const values = Array.from(uniqueValues.keys()).map(v => String(v))
    
    // Solo procesar si hay exactamente 2 valores únicos
    if (values.length !== 2) return null

    // Intentar diferentes métodos de detección
    const methods = [
      () => this.detectBySemantic(values),
      () => this.detectByFrequency(values, uniqueValues),
      () => this.detectByLexical(values),
      () => this.detectByPosition(values)
    ]

    for (const method of methods) {
      const result = method()
      if (result && result.confidence > 0.6) {
        return result
      }
    }

    // Fallback: usar los valores tal como están
    return {
      trueLabel: values[1] || values[0],
      falseLabel: values[0] || values[1], 
      confidence: 0.3,
      method: 'positional'
    }
  }

  /**
   * Detección semántica basada en patrones conocidos
   */
  private static detectBySemantic(values: string[]): BooleanLabels | null {
    let trueValue: string | null = null
    let falseValue: string | null = null

    for (const value of values) {
      const isPositive = this.POSITIVE_PATTERNS.some(pattern => pattern.test(value))
      const isNegative = this.NEGATIVE_PATTERNS.some(pattern => pattern.test(value))

      if (isPositive && !trueValue) trueValue = value
      if (isNegative && !falseValue) falseValue = value
    }

    if (trueValue && falseValue) {
      return {
        trueLabel: trueValue,
        falseLabel: falseValue,
        confidence: 0.95,
        method: 'semantic'
      }
    }

    return null
  }

  /**
   * Detección por frecuencia - el valor menos común suele ser "true"
   */
  private static detectByFrequency(values: string[], uniqueValues: Map<any, number>): BooleanLabels | null {
    const frequencies = values.map(v => ({
      value: v,
      count: uniqueValues.get(v) || 0
    }))

    // Ordenar por frecuencia (menos común primero)
    frequencies.sort((a, b) => a.count - b.count)

    // En contextos booleanos, "true" suele ser menos común que "false"
    const lessCommon = frequencies[0]
    const moreCommon = frequencies[1]

    return {
      trueLabel: lessCommon.value,
      falseLabel: moreCommon.value,
      confidence: 0.7,
      method: 'frequency'
    }
  }

  /**
   * Detección lexical - análisis de características de las palabras
   */
  private static detectByLexical(values: string[]): BooleanLabels | null {
    const analysis = values.map(value => ({
      value,
      score: this.calculatePositivityScore(value)
    }))

    analysis.sort((a, b) => b.score - a.score)

    if (Math.abs(analysis[0].score - analysis[1].score) > 0.3) {
      return {
        trueLabel: analysis[0].value, // Mayor score = más positivo
        falseLabel: analysis[1].value,
        confidence: 0.8,
        method: 'lexical'
      }
    }

    return null
  }

  /**
   * Calcula un score de "positividad" para una palabra
   */
  private static calculatePositivityScore(value: string): number {
    const val = value.toLowerCase()
    let score = 0

    // Características positivas
    if (val.includes('yes') || val.includes('sí') || val.includes('si')) score += 0.4
    if (val.includes('true') || val.includes('verdadero')) score += 0.4
    if (val.includes('active') || val.includes('activo')) score += 0.3
    if (val.includes('enable') || val.includes('habilita')) score += 0.3
    if (val.includes('valid') || val.includes('válido')) score += 0.3
    if (val.includes('tiene') || val.includes('have') || val.includes('has')) score += 0.3
    if (val.includes('complete') || val.includes('completo')) score += 0.3
    if (val.includes('available') || val.includes('disponible')) score += 0.3

    // Características negativas
    if (val.includes('no ') || val.startsWith('no')) score -= 0.4
    if (val.includes('false') || val.includes('falso')) score -= 0.4
    if (val.includes('inactive') || val.includes('inactivo')) score -= 0.3
    if (val.includes('disable') || val.includes('deshabilita')) score -= 0.3
    if (val.includes('invalid') || val.includes('inválido')) score -= 0.3
    if (val.includes('incomplete') || val.includes('incompleto')) score -= 0.3

    // Longitud (valores más largos suelen ser más específicos/positivos)
    if (val.length > 8) score += 0.1
    if (val.length < 4) score -= 0.1

    return Math.max(0, Math.min(1, score + 0.5)) // Normalizar entre 0-1
  }

  /**
   * Detección posicional - simplemente usar orden alfabético
   */
  private static detectByPosition(values: string[]): BooleanLabels {
    const sorted = [...values].sort()
    
    return {
      trueLabel: sorted[1], // Segundo alfabéticamente suele ser más "positivo"
      falseLabel: sorted[0],
      confidence: 0.4,
      method: 'positional'
    }
  }
}

/**
 * Función de conveniencia para usar en componentes
 */
export function detectBooleanLabels<TData>(column: Column<TData, unknown>): BooleanLabels | null {
  return BooleanLabelDetector.detectLabels(column)
}
