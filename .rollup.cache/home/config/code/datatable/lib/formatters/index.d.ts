import { FormatterFunction, FormatterType, FormatterContext, FormatterResult } from '@/types/formatters';
export declare const FORMATTERS: Record<FormatterType, FormatterFunction>;
/**
 * Función principal para aplicar formateo a una celda
 */
export declare function formatCell(context: FormatterContext): FormatterResult;
/**
 * Aplica template a un valor (ej: "TASK-{value}" con value="123" -> "TASK-123")
 */
export declare function applyTemplate(template: string, value: any, record?: any): string;
/**
 * Utilidad para crear un formatter personalizado
 */
export declare function createCustomFormatter(render: (context: FormatterContext) => React.ReactNode): FormatterFunction;
export type { FormatterFunction, FormatterContext, FormatterResult, FormatterType } from '@/types/formatters';
