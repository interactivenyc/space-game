import React, { Component } from 'react';
// import SpaceGame from '../src/SpaceGame';
import Ship from '../src/Ship';
// import InputHandler from '../src/InputHandler';

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
            ship: null,
            animationFrameId: 0,
            lastTime: 0
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
        window.removeEventListener('keyup', this.handleKeys.bind(this, false));
        window.removeEventListener('keydown', this.handleKeys.bind(this, true));
        window.removeEventListener('resize', this.handleResize.bind(this, false));

        cancelAnimationFrame(this.state.animationFrameId);
    }

    initGame() {
        console.log('[ Game ] init');

        let canvas = document.getElementById('gameScreen');
        let context = canvas.getContext('2d');

        canvas.width = this.state.screen.width;
        canvas.height = this.state.screen.height;

        let ship = new Ship(this.state.screen.width, this.state.screen.height, this.context);
        ship.loadImage();

        // this.inputHandler = new InputHandler(ship);

        this.setState({
            context,
            ship
        });

        this.gameLoop();
    }

    gameLoop(timestamp) {
        // console.log('[ Game ] gameLoop', this.state);
        const deltaTime = timestamp - this.state.lastTime;

        if (this.state.context) {
            // context doesn't exist on first run
            this.state.context.clearRect(0, 0, this.state.screen.width, this.state.screen.height);
            this.state.ship.draw(this.state.context, this.state.keys, deltaTime);
        }

        const animationFrameId = requestAnimationFrame(this.gameLoop);

        this.setState({
            animationFrameId,
            lastTime: timestamp
        });
    }

    render() {
        // console.log('[ Game ] render');

        return (
            <main>
                <canvas id="gameScreen" />
            </main>
        );
    }
}

export default Game;
