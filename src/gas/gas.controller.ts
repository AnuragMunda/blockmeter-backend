import { Controller, Get, Param } from '@nestjs/common';
import { GasService } from './gas.service';
import { GasPriceData, GasPriceHistory } from './interfaces/gas.interface';

@Controller('gas-price')
export class GasController {
  constructor(private readonly gasService: GasService) { }

  @Get(':chainId')
  getGasPrice(@Param('chainId') chainId: number): Promise<GasPriceData> {
    if (!chainId) {
      throw new Error('Chain ID is required');
    }

    return this.gasService.getGasPrice(chainId);
  }

  @Get('/history/:chainId')
  getGasPriceHistory(
    @Param('chainId') chainId: string,
  ): Promise<GasPriceHistory> {
    if (!chainId) {
      throw new Error('Chain ID is required');
    }

    return this.gasService.getGasPriceHistory(chainId);
  }
}
