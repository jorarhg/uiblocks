import React from 'react';
export interface GaugeChartProps {
    value: number;
    maxValue?: number;
    height?: number;
    barSize?: number;
    color?: string;
    showValue?: boolean;
    formatValue?: (v: number, pct: number) => string;
    label?: string;
    className?: string;
}
export declare const GaugeChart: React.FC<GaugeChartProps>;
