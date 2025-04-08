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
