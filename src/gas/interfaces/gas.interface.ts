export interface GasPriceData {
  timestamp: string;
  lastBlock: number;
  avgTime: number;
  avgTx: number;
  avgGas: number;
  speeds: Array<{
    acceptance: number;
    maxFeePerGas: number;
    maxPriorityFeePerGas: number;
    baseFee: number;
    estimatedFee: number;
  }>;
}

export interface GasPriceHistory {
  candles: Array<{
    gasPrice: {
      open: number;
      close: number;
      low: number;
      high: number;
    };
    avgGas: number;
    timestamp: string;
    samples: number;
  }>;
}
