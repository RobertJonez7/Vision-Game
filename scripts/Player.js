class Player extends GameObject
{
    constructor (context, x, y){
        super(context);

        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    setX(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    draw(x, y){
        this.setX(x);
        this.setY(y);
        let playerX, playerY;
        if (x === undefined || y === undefined) {
            playerX = 500;
            playerY = 500;
        }
        else {
            playerX = x;
            playerY = y;
        }

        //Draw a simple square
        this.context.fillStyle = this.isColliding ? '#da4625' : '#50af6d';
        this.context.fillRect(playerX, playerY, this.width, this.height);
    }

    update(secondsPassed){
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}
