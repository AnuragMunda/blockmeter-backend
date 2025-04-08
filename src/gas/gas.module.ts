import { Module } from '@nestjs/common';
import { GasController } from './gas.controller';
import { GasService } from './gas.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GasController],
  providers: [GasService],
})
export class GasModule {}
