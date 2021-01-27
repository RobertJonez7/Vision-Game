class Token extends GameObject
{
    constructor (context, x, y, vx, vy, mass, isPlayer){
        super(context, x, y, vx, vy, mass, isPlayer);

        this.width = 25;
        this.height = 25;
    }

    draw(){
        this.context.fillStyle = '#dcb323';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
}