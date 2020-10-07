import WS from 'jest-websocket-mock';
import HelloWorld from '../../src/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  beforeEach(async () => {
    window.server = new WS("ws://localhost:1234");
    window.client = new WebSocket("ws://localhost:1234");
    await window.server.connected;
  });

  afterEach(() => {
    WS.clean();
  });
  it('connects to the websocket server', async () => {
    const { server, client } = window;
    await server.connected;
    client.send('hello');
    await expect(server).toReceiveMessage('hello');
    expect(server).toHaveReceivedMessages(['hello']);
  });

  it('test the websocket is good', async () => {
    HelloWorld.methods.getRandXY();

    const { server, client } = window;
    await server.connected;
    HelloWorld.data().client = client;
    HelloWorld.data.client.send(JSON.stringify({ X: 1.000102, Y: 178.05421245 }));
    await expect(server).toReceiveMessage(JSON.stringify({ X: 1.000102, Y: 178.05421245 }));
    expect(server).toHaveReceivedMessages([JSON.stringify({ X: 1.000102, Y: 178.05421245 })]);
    server.send(JSON.stringify(
      {
        coo: { X: 0, Y: 0 },
        data: [
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        ],
      },
    ));
    expect(HelloWorld.data().trucks).toEqual(JSON.stringify(
      {
        coo: { X: 0, Y: 0 },
        data: [
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
          { name: 0, distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        ],
      },
    ));
  });
});
