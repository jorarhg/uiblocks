import React from 'react';
import { type ChartConfig } from '../ui/chart';
export interface DonutDatum {
    name: string;
    value: number;
    fill?: string;
}
export declare const DonutChart: React.FC<{
    data: DonutDatum[];
    height?: number;
    innerRadius?: number;
    outerRadius?: number;
    config?: ChartConfig;
    className?: string;
}>;
export interface ScatterDatum {
    x: number;
    y: number;
    z?: number;
    category?: string;
}
export declare const ScatterPointsChart: React.FC<{
    data: ScatterDatum[];
    height?: number;
    showZ?: boolean;
    className?: string;
}>;
export interface RadarDatum {
    subject: string;
    [serie: string]: any;
}
export declare const SimpleRadarChart: React.FC<{
    data: RadarDatum[];
    series: string[];
    height?: number;
    className?: string;
}>;
export interface HeatmapDatum {
    name: string;
    value: number;
    children?: HeatmapDatum[];
    fill?: string;
}
export declare const SimpleHeatmap: React.FC<{
    data: HeatmapDatum[];
    height?: number;
    className?: string;
}>;
export interface HeatmapCellDatum {
    x: string | number;
    y: string | number;
    value: number;
}
export declare const HeatmapChart: React.FC<{
    data: HeatmapCellDatum[];
    xKeys?: (string | number)[];
    yKeys?: (string | number)[];
    height?: number;
    className?: string;
    colors?: {
        from: string;
        to: string;
    };
    valueFormatter?: (v: number) => string | number;
    gap?: number;
    showCellValues?: boolean;
    showAxes?: boolean;
}>;
