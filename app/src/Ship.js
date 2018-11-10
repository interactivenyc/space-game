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
        console.log('[ Ship ]image loaded', thisClass);
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

    draw(context, keys, deltaTime) {
        if (keys.up) {
            this.accelerate();
        }
        if (keys.left) {
            this.rotateLeft();
        }
        if (keys.right) {
            this.rotateRight();
        }

        // Move
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.inertia;
        this.velocity.y *= this.inertia;

        // Screen edges
        let screenWidth = window.innerWidth - 10;
        let screenHeight = window.innerHeight - 150;
        if (this.position.x > screenWidth) {
            console.log('offScreen right', screenWidth);
            this.position.x = -this.image.height;
        } else if (this.position.x < -this.image.height) {
            console.log('offScreen left', screenWidth);
            this.position.x = screenWidth;
        }
        if (this.position.y > screenHeight) {
            console.log('offScreen bottom', screenHeight);
            this.position.y = -this.image.height;
        } else if (this.position.y < -this.image.height) {
            console.log('offScreen top', screenHeight);
            this.position.y = screenHeight;
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
