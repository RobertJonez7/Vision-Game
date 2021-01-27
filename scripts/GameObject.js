class GameObject
{
    constructor (context, x, y, vx, vy, mass, isPlayer){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.mass = mass;
        this.isPlayer = isPlayer

        this.isColliding = false;
    }

}
