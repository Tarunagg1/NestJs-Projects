import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import type { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  ROOM = 'group'

  @SubscribeMessage('joinRoom')
  async andleMessage(client: Socket, payload: any): string {
    console.log("new message");
    await client.join(this.ROOM)

    client.to("group").join("roomNotice", "=")

    return 'Hello world!';
  }

  handelConnection() {
    console.log('handelConnection');
  }

  handelDisconnect() {
    console.log('handel  disconnect');

  }
}
