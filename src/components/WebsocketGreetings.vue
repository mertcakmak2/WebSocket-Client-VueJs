<template>
  <div>
        <div>
            <label for="connect">WebSocket connection:</label>
            <button id="connect"  type="submit" :disabled="connected == true"  @click.prevent="connect" >   Connect  </button>
            <button id="disconnect" type="submit" :disabled="connected == false" @click.prevent="disconnect" >  Disconnect  </button>
        </div>

        <div>
            <form>
                <div>
                <label for="name">What is your name?</label>
                <input  type="text" id="name" v-model="send_message" placeholder="Your name here..."   />
                </div>
                <button id="send" type="submit"  @click.prevent="send">  Send  </button>
            </form>
        </div>

        <div>
            <table id="conversation">
                <thead>
                    <tr>
                    <th>Greetings</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in received_messages" :key="item">
                    <td>{{ item }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
export default {
  name: "websocketdemo",
  data() {
    return {
      received_messages: [],
      send_message: null,
      connected: false
    };
  },
  methods: {
    connect() {
        this.socket = new SockJS("http://localhost:5000/websocket");
        this.stompClient = Stomp.over(this.socket);
        this.stompClient.connect(
            {},
            frame => {
            this.connected = true;
            console.log(frame);
            this.stompClient.subscribe("/topic", tick => {
                console.log(tick);
                this.received_messages.push(JSON.parse(tick.body).name);
            });
            },
            error => {
            console.log(error);
            this.connected = false;
            }
        );
    },
    send() {
      console.log("Send message:" + this.send_message);
      if (this.stompClient && this.stompClient.connected) {
        const msg = { name: this.send_message };
        console.log(JSON.stringify(msg));
        this.stompClient.send("/websocket", JSON.stringify(msg), {});
      }
    },
    disconnect() {
      if (this.stompClient) {
        this.stompClient.disconnect();
      }
      this.connected = false;
    }
  },
};
</script>