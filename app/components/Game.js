import React, { Component } from 'react';
import Ship from '../src/Ship';

import socket from '../socket';

const KEY = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    A: 65,
    D: 68,
    W: 87,
    SPACE: 32
};

class Game extends Component {
    constructor() {
        super();
        this.state = {
            screen: {
                width: window.innerWidth - 10,
                height: window.innerHeight - 150,
                ratio: window.devicePixelRatio || 1
            },
            context: null,
            keys: {
                left: 0,
                right: 0,
                up: 0,
                down: 0,
                space: 0
            },
            ship: {},
            enemyInfo: {},
            enemyShips: {}
        };

        this.initGame = this.initGame.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
        this.processEnemies = this.processEnemies.bind(this);

        socket.on('update-ships', (ships) => {
            // console.log('[ socket client ] update-ships!', ships);
            this.setState({
                enemyInfo: ships
            });
        });
    }

    handleResize(value, e) {
        this.setState({
            screen: {
                width: window.innerWidth - 10,
                height: window.innerHeight - 150,
                ratio: window.devicePixelRatio || 1
            }
        });
    }

    handleKeys(value, e) {
        let keys = this.state.keys;
        if (e.keyCode === KEY.LEFT || e.keyCode === KEY.A) keys.left = value;
        if (e.keyCode === KEY.RIGHT || e.keyCode === KEY.D) keys.right = value;
        if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value;
        if (e.keyCode === KEY.SPACE) keys.space = value;
        this.setState({
            keys: keys
        });
    }

    componentDidMount() {
        console.log('[ Game ] componentDidMount');

        window.addEventListener('keyup', this.handleKeys.bind(this, false));
        window.addEventListener('keydown', this.handleKeys.bind(this, true));
        window.addEventListener('resize', this.handleResize.bind(this, false));

        this.initGame();
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeys);
        window.removeEventListener('keydown', this.handleKeys);
        window.removeEventListener('resize', this.handleResize);

        cancelAnimationFrame(this.state.animationFrameId);
    }

    initGame() {
        console.log('[ Game ] init');

        let canvas = document.getElementById('gameScreen');
        let context = canvas.getContext('2d');

        canvas.width = this.state.screen.width;
        canvas.height = this.state.screen.height;

        let ship = new Ship();
        ship.loadImage();

        this.setState({
            context,
            ship
        });

        this.gameLoop();
    }

    processEnemies() {
        // console.log('processEnemies socket.id', socket.id);
        let keys = Object.keys(this.state.enemyInfo);
        // console.log('[ Game ] processEnemies keys', keys);
        // console.log('[ Game ] enemyShips', this.state.enemyShips);

        for (let i = 0; i < keys.length; i++) {
            const theKey = keys[i];
            if (theKey === socket.id) {
                // console.log('[ Game ] processEnemies skip self');
            } else {
                let enemyShip = this.state.enemyShips[theKey];
                // console.log('[ Game ] enemyShip:', enemyShip);

                if (!enemyShip) {
                    enemyShip = new Ship();
                    enemyShip.loadImage();
                    const enemyShips = this.state.enemyShips;
                    // const enemyShipHolder = {theKey: enemyShip}
                    this.setState({
                        enemyShips: { ...enemyShips, [theKey]: enemyShip }
                    });
                    
                    
                } else {
                    enemyShip.setEnemyData(this.state.enemyInfo[theKey].shipInfo);
                    enemyShip.draw(this.state.context);
                }
            }
        }
    }

    gameLoop(timestamp) {
        // console.log('[ Game ] gameLoop', this.state.ships);
        requestAnimationFrame(this.gameLoop);

        if (!this.state.context) return;

        this.state.context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
        this.state.ship.update(this.state.keys);
        this.state.ship.draw(this.state.context);

        this.processEnemies();
    }

    render() {
        return (
            <main>
                <canvas id="gameScreen" />
            </main>
        );
    }
}

export default Game;
