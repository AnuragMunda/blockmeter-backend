import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GasPriceData } from './gas.interface';

@Injectable()
export class GasService {
  constructor(private readonly httpService: HttpService) {}

  async getGasPrice(chainId: string): Promise<any> {
    const owracleApiKey = process.env.OWRACLE_API_KEY;

    if (!owracleApiKey) {
      throw new Error(
        'OWRACLE_API_KEY is not set in the environment variables',
      );
    }

    const response = this.httpService.get(
      `https://api.owlracle.info/v4/${chainId}/gas?apikey=${owracleApiKey}`,
    );

    const gasPriceData = await firstValueFrom(response);
    if (gasPriceData.status !== 200) {
      throw new Error('Failed to fetch Ethereum gas prices');
    }

    return gasPriceData.data as GasPriceData;
  }
}
