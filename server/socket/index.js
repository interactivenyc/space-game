module.exports = (io) => {
    let ships = {};

    io.on('connection', (socket) => {
        console.log(`A socket connection to the server has been made: ${socket.id}`);

        socket.on('disconnect', () => {
            console.log(`Connection ${socket.id} has left the building`);
            delete ships[socket.id];
            socket.broadcast.emit('enemy-left', socket.id);
        });

        socket.on('ship-update', (shipInfo) => {
            ships[socket.id] = { ...ships[socket.id], shipInfo };
            socket.broadcast.emit('update-ships', ships);
        });

        socket.on('trace-state', () => {
            console.log('[ socket server ] trace-state ----------------------');
            console.log('[ socket server ] trace-state\n\n', JSON.stringify(ships));
        });
    });
};
