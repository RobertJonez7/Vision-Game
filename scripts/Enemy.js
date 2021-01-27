class Enemy extends GameObject
{
    constructor (context, x, y, vx, vy, mass, isPlayer){
        super(context, x, y, vx, vy, mass, isPlayer);

        this.width = 50;
        this.height = 50;
    }

    draw(){
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}
