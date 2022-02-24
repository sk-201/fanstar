import { io } from 'socket.io-client';

const socket = io('https://fanstar-backend-uiwtg.ondigitalocean.app/', {
  reconnection: false,
});

export default socket;
