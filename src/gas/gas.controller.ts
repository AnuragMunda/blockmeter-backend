import { Controller, Get, Param } from '@nestjs/common';
import { GasService } from './gas.service';

@Controller('gas')
export class GasController {
  constructor(private readonly gasService: GasService) {}

  @Get(':chainId')
  getGasPrice(@Param('chainId') chainId: string): Promise<any> {
    if (!chainId) {
      throw new Error('Chain ID is required');
    }

    return this.gasService.getGasPrice(chainId);
  }
}
