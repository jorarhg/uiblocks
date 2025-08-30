import React from 'react';
import { ChartTooltip, type ChartConfig } from '../ui/chart';
export type LineDatum = {
    category: string;
    value?: number;
    [k: string]: any;
};
export interface BaseLineChartProps {
    data: LineDatum[];
    lines: Array<{
        dataKey: string;
        stroke?: string;
        strokeWidth?: number;
        dot?: boolean;
        type?: string;
    }>;
    config: ChartConfig;
    height?: number;
    grid?: boolean;
    areaUnder?: boolean;
    referenceLines?: Array<{
        y?: number;
        x?: string | number;
        label?: string;
        stroke?: string;
        strokeDasharray?: string;
    }>;
    tooltipProps?: Partial<React.ComponentProps<typeof ChartTooltip>>;
    className?: string;
}
export declare const BaseLineChart: React.FC<BaseLineChartProps>;
export declare const SimpleLineChart: React.FC<{
    data: LineDatum[];
}>;
export declare const MultiLineChart: React.FC<{
    data: LineDatum[];
    series: string[];
}>;
export declare const LineChartWithReference: React.FC<{
    data: LineDatum[];
    referenceY: number;
}>;
export interface BaseBarChartProps {
    data: LineDatum[];
    bars: Array<{
        dataKey: string;
        fill?: string;
        stackId?: string;
        radius?: number | [number, number, number, number];
    }>;
    config: ChartConfig;
    height?: number;
    grid?: boolean;
    stacked?: boolean;
    tooltipProps?: Partial<React.ComponentProps<typeof ChartTooltip>>;
    className?: string;
}
export declare const BaseBarChart: React.FC<BaseBarChartProps>;
export declare const SimpleBarChart: React.FC<{
    data: LineDatum[];
}>;
export declare const StackedBarChart: React.FC<{
    data: LineDatum[];
    series: string[];
}>;
export declare const SimpleAreaChart: React.FC<{
    data: LineDatum[];
}>;
