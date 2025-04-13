import { forwardRef, Inject, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GasService } from 'src/gas/gas.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  constructor(
    @Inject(forwardRef(() => GasService))
    private readonly gasService: GasService,
  ) { }

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);
    });

    this.server.on('disconnect', (socket: Socket) => {
      console.log('Client disconnected:', socket.id);
    });
  }

  @SubscribeMessage('onChainId')
  handleMessage(@MessageBody() chainId: number) {
    console.log('Chain Updated');
    this.gasService.chainId = chainId;
    console.log('New chain ID: ', chainId);
  }
}
