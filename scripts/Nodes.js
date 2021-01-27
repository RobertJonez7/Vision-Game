class Nodes extends GameObject
{
    constructor (context, x, y){
        super(context, x, y);

        this.width = 50;
        this.height = 50;
    }

    draw(){
        this.context.fillStyle = 'red';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

}