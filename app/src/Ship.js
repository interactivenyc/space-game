import socket from '../socket';

export default class Ship {
    constructor() {
        console.log('[ Ship ] constructor');

        this.position = {
            x: 200,
            y: 200
        };
        this.maxSpeed = 10;
        this.speed = 0.15;
        this.inertia = 0.99;
        this.velocity = {
            x: 0,
            y: 0
        };
        this.rotation = 0;
        this.rotSpeed = 6;

        this.image = new Image();
    }

    loadImage() {
        this.image.src = '/images/ship_1_sm.png';
        this.image.onload = () => this.onLoad(this);
    }

    onLoad(thisClass) {
        // console.log('[ Ship ]image loaded', thisClass);
    }

    handleKeys(keys) {
        if (keys.up) {
            this.accelerate();
        }
        if (keys.left) {
            this.rotateLeft();
        }
        if (keys.right) {
            this.rotateRight();
        }
    }

    accelerate() {
        this.velocity.x -= Math.sin((-this.rotation * Math.PI) / 180) * this.speed;
        this.velocity.y -= Math.cos((-this.rotation * Math.PI) / 180) * this.speed;
    }

    rotateLeft() {
        // console.log('[ Ship ] rotateLeft');
        this.rotation = this.rotation - (this.rotSpeed % 360);
    }
    rotateRight() {
        // console.log('[ Ship ] rotateRight');
        this.rotation = this.rotation + (this.rotSpeed % 360);
    }

    moveShip() {
        // Move
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.inertia;
        this.velocity.y *= this.inertia;

        // Screen edges
        let screenWidth = window.innerWidth - 10;
        let screenHeight = window.innerHeight - 150;

        if (this.position.x > screenWidth) {
            this.position.x = -this.image.height;
        } else if (this.position.x < -this.image.height) {
            this.position.x = screenWidth;
        }

        if (this.position.y > screenHeight) {
            this.position.y = -this.image.height;
        } else if (this.position.y < -this.image.height) {
            this.position.y = screenHeight;
        }
    }

    update(keys) {
        this.handleKeys(keys);
        this.moveShip();

        socket.emit('ship-update', {
            position: this.position,
            rotation: this.rotation
        });
    }

    setEnemyData(data) {
        // console.log('[ Ship ] setEnemyData', data);
        
        this.position.x = data.position.x;
        this.position.y = data.position.y;
        this.rotation = data.rotation;
    }

    draw(context) {
        context.save();
        context.translate(this.position.x + this.image.width / 2, this.position.y + this.image.height / 2);
        context.rotate((this.rotation * Math.PI) / 180);
        context.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            -this.image.width / 2,
            -this.image.height / 2,
            this.image.width,
            this.image.height
        );
        context.restore();
    }
}
