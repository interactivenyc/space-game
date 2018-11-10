export default class Ship {
    constructor(gameWidth, gameHeight) {
        console.log('[ Ship ] constructor');

        this.width = 150;
        this.height = 30;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.position = {
            x: 200,
            y: 200
        };
        this.maxSpeed = 10;
        this.speed = 0;
        this.rotation = 0;
        this.rotSpeed = 6;

        this.image = new Image();
    }

    loadImage() {
        this.image.src = '/images/ship_1_sm.png';
        this.image.onload = () => this.onLoad(this);
    }

    onLoad(thisClass) {
        console.log('[ Ship ]image loaded', thisClass);
    }

    rotateLeft() {
        // console.log('[ Ship ] rotateLeft');
        this.rotation = this.rotation - (this.rotSpeed % 360);
    }
    rotateRight() {
        // console.log('[ Ship ] rotateRight');
        this.rotation = this.rotation + (this.rotSpeed % 360);
    }

    draw(context, keys, deltaTime) {
        if (keys.left) {
            this.rotateLeft();
        }
        if (keys.right) {
            this.rotateRight();
        }

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
