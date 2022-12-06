export interface StockPosition {
    ticker: string;
    dataDate: Date;
    unitsHeld: number;
    price: number;
    holdingValue?: number;
}