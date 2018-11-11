import React, { Component } from 'react';
// import SpaceGame from '../src/SpaceGame';
import Ship from '../src/Ship';
// import InputHandler from '../src/InputHandler';

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
            ships: []
        };

        this.initGame = this.initGame.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
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

        // this.inputHandler = new InputHandler(ship);

        const ships = this.state.ships; // getting eslint warning if passing this.state.ships directly into setState

        this.setState({
            context,
            ships: [...ships, ship]
        });

        this.gameLoop();
    }

    gameLoop(timestamp) {
        // console.log('[ Game ] gameLoop', this.state.ships);
        requestAnimationFrame(this.gameLoop);

        if (!this.state.context) return;

        this.state.context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
        this.state.ships[0].update(this.state.keys);
        for (let ship of this.state.ships) {
            ship.draw(this.state.context);
        }
    }

    render() {
        // console.log('[ Game ] render', this.state.animationFrameId, this.state.lastTime);

        return (
            <main>
                <canvas id="gameScreen" />
            </main>
        );
    }
}

export default Game;
