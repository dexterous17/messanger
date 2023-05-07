import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

// Define self as the global scope object
const self = typeof window !== 'undefined' ? window : self;

self.addEventListener('message', (event) => {
  switch (event.data.action) {
    case 'send-message':
      socket.emit('message', event.data.payload);
      break;
    default:
      console.log('Invalid action');
  }
});

socket.on('connect', () => {
  self.postMessage({ action: 'connect' });
});

socket.on('message', (message) => {
  self.postMessage({ action: 'receive-message', payload: message });
});

export default socket;
