export declare const CHART_VIBRANT_PALETTE: string[];
export declare function chartColor(index: number): string;
export declare function buildSeriesConfig(keys: (string | number)[]): Record<string, {
    label: string;
    color: string;
}>;
