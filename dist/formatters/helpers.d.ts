import React from 'react';
import { FormatterContext, FormatterResult } from '../internal/types/formatters';
export declare function applyTemplate(template: string, value: any, record?: any): string;
export declare function createCustomFormatter(render: (context: FormatterContext) => React.ReactNode): (context: FormatterContext) => {
    content: React.ReactNode;
};
export declare function applyConditionalFormatting(context: FormatterContext, baseResult: FormatterResult, formatCell: (ctx: FormatterContext) => FormatterResult): FormatterResult;
