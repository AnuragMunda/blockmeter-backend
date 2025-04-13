import { forwardRef, Module } from '@nestjs/common';
import { GasController } from './gas.controller';
import { GasService } from './gas.service';
import { HttpModule } from '@nestjs/axios';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [HttpModule, forwardRef(() => EventsModule)],
  controllers: [GasController],
  providers: [GasService],
  exports: [GasService],
})
export class GasModule {}
