import { FormatterFunction, FormatterContext, FormatterResult } from '../internal/types/formatters';
import { applyTemplate, createCustomFormatter } from './helpers';
/**
 * Registry mutable de formatters.
 * Puedes extenderlo con formatters personalizados usando registerFormatter()
 */
export declare const FORMATTERS: Record<string, FormatterFunction>;
/**
 * Registra un formatter personalizado en el registry global.
 *
 * @example
 * ```typescript
 * import { registerFormatter, type FormatterFunction } from '@teribit/ui-blocks'
 *
 * const myCustomFormatter: FormatterFunction = (context) => ({
 *   content: <span className="custom">{context.value}</span>
 * })
 *
 * registerFormatter('my-custom', myCustomFormatter)
 *
 * // Ahora puedes usarlo en tus columnas:
 * { formatter: { type: 'my-custom' } }
 * ```
 */
export declare function registerFormatter(type: string, formatter: FormatterFunction): void;
/**
 * Verifica si un formatter está registrado
 */
export declare function hasFormatter(type: string): boolean;
/**
 * Obtiene un formatter del registry (útil para composición)
 */
export declare function getFormatter(type: string): FormatterFunction | undefined;
export declare function formatCell(context: FormatterContext): FormatterResult;
export { applyTemplate, createCustomFormatter };
export type { FormatterFunction, FormatterContext, FormatterResult, FormatterType } from '../internal/types/formatters';
