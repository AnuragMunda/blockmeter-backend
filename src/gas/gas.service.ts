import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GasPriceData, GasPriceHistory } from './interfaces/gas.interface';
import { Cron } from '@nestjs/schedule';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class GasService {
  public chainId: number | null = null; // Default to Ethereum mainnet

  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => EventsGateway))
    private readonly eventsGateway: EventsGateway,
  ) {
    console.log('GasService initialized');
  }

  async getGasPrice(_chainId: number): Promise<GasPriceData> {
    const owracleApiKey = process.env.OWRACLE_API_KEY;

    if (!owracleApiKey) {
      throw new Error(
        'OWRACLE_API_KEY is not set in the environment variables',
      );
    }

    const response = this.httpService.get(
      `https://api.owlracle.info/v4/${_chainId}/gas?apikey=${owracleApiKey}`,
    );

    const gasPriceData = await firstValueFrom(response);
    if (gasPriceData.status !== 200) {
      throw new Error('Failed to fetch Ethereum gas prices');
    }
    if (this.chainId === null) {
      this.chainId = _chainId;
      console.log('Chain ID initialized to ', this.chainId);
    }
    if (this.chainId !== _chainId) {
      this.chainId = _chainId;
    }

    return gasPriceData.data as GasPriceData;
  }

  async getGasPriceHistory(_chainId: string): Promise<GasPriceHistory> {
    const owracleApiKey = process.env.OWRACLE_API_KEY;

    if (!owracleApiKey) {
      throw new Error(
        'OWRACLE_API_KEY is not set in the environment variables',
      );
    }

    const response = this.httpService.get(
      `https://api.owlracle.info/v4/${_chainId}/history?apikey=${owracleApiKey}`,
    );

    const gasPriceHistory = await firstValueFrom(response);
    if (gasPriceHistory.status !== 200) {
      throw new Error('Failed to fetch the history of Ethereum gas prices');
    }

    return gasPriceHistory.data as GasPriceHistory;
  }

  @Cron('* * * * *') // Every minute
  async scheduleGasPriceUpdate() {
    if (this.chainId === null) {
      console.log('Chain ID is not set. Skipping gas price update.');
      return; // Skip the cron job if chainId is not set
    }
    const response = await this.getGasPrice(this.chainId); // Example for Ethereum mainnet
    console.log('Gas price updated for chainId:', this.chainId);
    console.log('Block:', response.lastBlock);
    if (response) {
      this.eventsGateway.server.emit('gasPriceUpdate', response);
    }
  }

  @Cron('*/30 * * * *') // Every 30 minutes
  async scheduleGasPriceHistoryUpdate() {
    const response = await this.getGasPriceHistory('1'); // Example for Ethereum mainnet
    console.log(response);
  }
}
