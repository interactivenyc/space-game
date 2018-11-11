'use strict';

const { db } = require('./server/db');
const app = require('./server');
const socketio = require('socket.io');

const PORT = 1337;

db.sync() // if you update your db schemas, make sure you drop the tables first and then recreate them
    .then(() => {
        console.log('db synced');
        let server = app.listen(PORT, () => console.log(`studiously serving silly sounds on port ${PORT}`));

        // set up our socket control center
        const io = socketio(server);
        require('./server/socket')(io);
        console.log('socket server started');
    });
