import { io } from "socket.io-client";

class SocketClient {
  constructor() {
    this.socket = null;
  }
  connect() {
    if (!this.socket) {
      this.socket = io("/", { autoConnect: true });
    } else if (!this.socket.connected) {
      this.socket.connect();
    }
  }
  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
  emit(event, payload) {
    if (this.socket) this.socket.emit(event, payload);
  }
  on(event, cb) {
    if (this.socket) this.socket.on(event, cb);
  }
  off(event, cb) {
    if (this.socket) this.socket.off(event, cb);
  }
}

const instance = new SocketClient();
export default instance;
