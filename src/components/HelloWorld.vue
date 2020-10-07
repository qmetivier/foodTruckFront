<template>
  <div class="hello">
    <div>
      <label for="calcPosi">Donner sa position :
        <button id="calcPosi" v-on:click="getRandXY">Donner</button>
      </label>
    </div>
    <div></div>
    <div>
      <label for="xPosi">X:
        <input type="number" id="xPosi" v-model="X" disabled>
      </label>
      <label for="yPosi">Y:
        <input type="number" id="yPosi" v-model="Y" disabled>
      </label>
    </div>
    <br />
    <div>
      <label for="findTrucks">Trouver les 10 Food Trucks les plus proches :
        <button id="findTrucks" v-on:click="getFoodTrucks">Trouver</button>
      </label>
    </div>
    <br />
    <div class="tableau">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Distance</th>
        <th>Coordonées</th>
        <th>Lien Google Map</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(truck, index) in trucks" v-bind:key="truck.name + '_' + index">
        <td>{{truck.name}}</td>
        <td>{{truck.distance}}Km</td>
        <td>X: {{truck.coordinates.X}} <br> Y: {{truck.coordinates.Y}}</td>
        <td><a :href="generateLink(truck.coordinates.X, truck.coordinates.Y)">
          <img src="../assets/Google_Maps_icon.svg" alt="">
        </a></td>
      </tr>
      </tbody>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      urlWebSocket: 'ws://localhost:5050',
      client: WebSocket.prototype,
      X: 0,
      Y: 0,
      trucks: [],
    };
  },
  methods: {
    getRandXY() {
      this.X = this.getRandomFloat(-89, 89);
      this.Y = this.getRandomFloat(-179, 179);
    },
    getRandomFloat(min, max) {
      return Math.random() * (max - min) + min;
    },
    generateLink(X, Y) {
      return `https://www.google.com/maps/dir//${X},${Y}`;
    },
    webSocketConnect() {
      this.client = new WebSocket('ws://localhost:5050');
      this.client.onmessage = function (event) {
        this.trucks = event.data;
      };
      this.client.onclose = function () {
      };
      this.client.onopen = function () {
        this.client.send(JSON.stringify({ X: 0.0, Y: 0.0 }));
        this.client.close();
      };
    },
    webSocketConnectFake() {
      this.trucks = [
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
        { name: 'truck', distance: 314.47481604473296, coordinates: { X: 1.0, Y: 1.0 } },
      ];
    },
    getFoodTrucks() {
      this.webSocketConnectFake();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tableau{
  width: 500px;
  margin: 0 auto;

  table {
    border: medium solid #6495ed;
    border-collapse: collapse;
    width: 50%;
  }
  th {
    font-family: monospace;
    border: thin solid #6495ed;
    width: 50%;
    padding: 5px;
    background-color: #D0E3FA;
  }
  td {
    font-family: sans-serif;
    border: thin solid #6495ed;
    width: 50%;
    padding: 5px;
    text-align: center;
    background-color: #ffffff;
  }
  caption {
    font-family: sans-serif;
  }

}
</style>
