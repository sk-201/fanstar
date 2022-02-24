import { io } from 'socket.io-client';

const socket = io('https://fanstar-backend.herokuapp.com/', {
  reconnection: false,
});

export default socket;
