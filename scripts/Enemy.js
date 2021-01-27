class Enemy extends GameObject
{
    constructor (context, x, y, vx, vy, mass){
        super(context, x, y, vx, vy, mass);

        this.width = 50;
        this.height = 50;
    }

    draw(){
        this.context.fillStyle = this.isColliding ? '#da4625' : '#4875b7';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}
