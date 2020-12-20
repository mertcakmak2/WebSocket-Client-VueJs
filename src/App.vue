<template>
  <v-app>
    <v-content>
    <WebSocket/>
    </v-content>
  </v-app>
</template>

<script>
import websocket from './components/WebsocketGreetings';

export default {
  name: "App",

  components: {
    WebSocket:websocket
  },
  methods: { },
  data: () => ({
  }),
};
</script>

<style scoped>
</style>
