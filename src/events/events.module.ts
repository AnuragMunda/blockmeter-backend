import { forwardRef, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { HttpModule } from '@nestjs/axios';
import { GasModule } from 'src/gas/gas.module';

@Module({
  imports: [HttpModule, forwardRef(() => GasModule)],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
