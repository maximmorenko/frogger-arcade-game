const countRows = 6;
const countColumns = 5;

const tileHight = 80;
const tileWidth = 105;

class Position {
    startX;
    startY;

    x;
    y;

    minY;
    minX;
    maxY;
    maxX;
    
    constructor( row, col ) {
        // at the entrance we are waiting for the coordinates of the tiles of all members (player, enemies)
        this.startX = (tileWidth * col) - (tileWidth);
        this.startY = (tileHight * row) - (tileHight / 2); 
        this.x = this.startX;
        this.y = this.startY;

        this.maxY = tileHight * (countRows - 1);
        this.maxX = tileWidth * (countColumns - 1);
        this.minY = tileHight * (row - 1) - this.startY;
        this.minX = 0;
    }

    reset() {
        this.x = this.startX;
        this.y = this.startY;
        
    }
}

class Enemy {

    speed = (Math.floor(Math.random(4) * (500 - 100 + 1)) + 100);
    sprite = 'images/enemy-bug.png';

    constructor ( PositionEnemy ) {
        this.position = PositionEnemy;
    }

    update (dt) {
        if (this.position.x <= this.position.maxX) {
            this.position.run(this.speed, dt);
        } else {
            this.position.reset();
        }
    }

    render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
    }
}

class PositionEnemy extends Position {

    run(speed, dt) {
        this.x += (speed * dt); 
    }
}

class Player {
    sprite = 'images/char-horn-girl.png';

    constructor ( PositionPlayer ) {
        this.position = PositionPlayer;
    }

    alertWin() {
        if (this.position.y == this.position.minY) {
            setTimeout(() => {
                alert("Not bed! Try again!");
                this.position.reset();
            }, 0);
        }
    }

    update () {
        this.alertWin();
    }

    handleInput (keyCode) {

        switch(keyCode) {
            case 'up': 
                this.position.moveUp();
                break;
            case 'down': 
                this.position.moveDown();
                break;
            case 'right': 
                this.position.moveRigtht();
                break;
            case 'left': 
                this.position.moveLeft();
                break;
            default: 
                break;
        }
    }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
    }
}

class PositionPlayer extends Position {

    moveRigtht() {
        let newPositionX = this.x + tileWidth;
        if (newPositionX <= this.maxX) {
            this.x = newPositionX; 
        }
    }

    moveLeft() {
        let newPositionX = this.x - tileWidth;
        if (newPositionX >= this.minX) {
            this.x = newPositionX; 
        }
    }

    moveUp() {
        let newPositionY = this.y - tileHight;
        if (newPositionY >= this.minY) {
            this.y = newPositionY; 
        }
    }

    moveDown() {
        let newPositionY = this.y + tileHight;
        if (newPositionY <= this.maxY) {
            this.y = newPositionY;
        }
    }
}

const player = new Player (new PositionPlayer( 5, 3 ));

const allEnemies = [
    new Enemy (new PositionEnemy ( 1, 0 )), 
    new Enemy (new PositionEnemy ( 2, 0 )),
    new Enemy (new PositionEnemy ( 3, 0 )),
];

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
