module.exports = (io) => {
    let gameId = 0;
    let ships = {};

    io.on('connection', (socket) => {
        console.log(`A socket connection to the server has been made: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Connection ${socket.id} has left the building`);
            delete ships[socket.id];
            socket.broadcast.emit('enemy-left', socket.id);
            console.log('[ socket server ] ships left\n', ships);
        });

        socket.on('register-ship', () => {
            console.log('[ socket server ] register ship', socket.id);
            gameId++;

            socket.emit('new-game-id', gameId, ships);

            ships[socket.id] = { gameId };
            socket.broadcast.emit('new-enemy', ships[socket.id]);
        });

        socket.on('ship-update', (shipInfo) => {
            // console.log('[ socket server ] ship-update:', ships[socket.id].gameId);

            ships[socket.id] = { ...ships[socket.id], shipInfo };
            socket.broadcast.emit('update-ships', ships);
        });

        socket.on('trace-state', () => {
            console.log('[ socket server ] trace-state', JSON.stringify(ships));
        });
    });
};
