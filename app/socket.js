import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log('[ socket client ] Connected!', socket.id);
    socket.emit('register-ship');
});

socket.on('new-game-id', (gameId) => {
    console.log('[ socket client ] new-game-id!', gameId);
});

export default socket;
