import io from 'socket.io-client';

const socket = io(window.location.origin);

socket.on('connect', () => {
    console.log('[ socket client ] Connected!', socket.id);
    socket.emit('register-ship');
});

socket.on('new-game-id', (gameId, enemies) => {
    console.log('[ socket client ] new-game-id!', gameId, enemies);
});

socket.on('new-enemy', (enemy) => {
    console.log('[ socket client ] new-enemy!', enemy);
});

export default socket;
