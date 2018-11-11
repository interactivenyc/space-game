module.exports = (io) => {
    let gameId = 0;
    let ships = {};

    io.on('connection', (socket) => {
        console.log(`A socket connection to the server has been made: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Connection ${socket.id} has left the building`);
            delete ships[socket.id];
            console.log('[ socket server ] ships left\n', ships);
        });

        socket.on('register-ship', () => {
            console.log('[ socket server ] register ship');
            gameId++;
            ships[socket.id] = { gameId };
            console.log('[ socket server ] ships\n', ships);

            socket.emit('new-game-id', gameId, socket.id);
        });
    });
};
