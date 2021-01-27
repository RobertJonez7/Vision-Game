class Game {
    constructor(canvas, x, y){
        this.canvas = null;
        this.context = null;
        this.player = null;
        this.enemies = [];
        this.token = [];
        this.resetCounter = 0;
        this.prevTimeStamp = 0;
        this.count = 0;
        this.score = 0;
        this.x = x;
        this.y = y;

        this.initialize(canvas);
    }

    /*********************************************************************************
     * Initialize the game.
    *********************************************************************************/
    initialize(canvas) {
        this.canvas = document.getElementById(canvas);
        this.context = this.canvas.getContext('2d');

        this.populateScreen();
        this.counter();

        window.requestAnimationFrame(timeStamp => {this.gameLoop(timeStamp)});
    }

    /*********************************************************************************
     * Creates and populates screen with enemies.
    *********************************************************************************/
    populateScreen() {
        this.player = new Player(this.context);
        this.enemies = [
            new Enemy(this.context, 10, 50, 0, 100, 1),
            new Enemy(this.context, 20, 300, 0, -50, 1),
            new Enemy(this.context, 30, 0, 50, 50, 1),
            new Enemy(this.context, 40, 150, 50, 50, 1),
            new Enemy(this.context, 50, 75, -50, 50, 1),
            new Enemy(this.context, 60, 300, 50, -50, 1),
            new Enemy(this.context, 70, 50, 0, 50, 1),
            new Enemy(this.context, 80, 300, 0, -50, 1),
            new Enemy(this.context, 90, 0, 50, 50, 1),
         
        ];
        this.token = [
            new Token(this.context, Math.floor(Math.random() * (window.innerWidth - 400)), Math.floor(Math.random() * (window.innerHeight - 200))),
        ]
    }

    counter() {
        if (!this.player.isColliding) {
            setInterval(() => {
                this.count++;
            }, 1000)
        }
    }

    /*********************************************************************************
     * Getters and setters for players X and Y cooridinates
    *********************************************************************************/
    setX(x) {
        this.x = x;
    }

    getX() {
        return this.x;
    }

    setY(y) {
        this.y = y;
    }

    getY() {
        return this.y;
    }

    /*********************************************************************************
     * The loop that draws and updates enemies on screen
    *********************************************************************************/
    gameLoop(timeStamp) {
        if (!this.player.isColliding) {
            const seconds = (timeStamp - this.prevTimeStamp) / 1000;
            this.prevTimeStamp = timeStamp;

            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].update(seconds);
            }

            this.player.update(seconds);

            this.detectCollisions();

            this.clearCanvas();

            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].draw();
            }

            this.player.draw(this.x, this.y);

            if (this.token[0]) {
                this.token[0].draw();
            }
            else {
                this.token = [
                    new Token(this.context, Math.floor(Math.random() * (window.innerWidth - 150)), Math.floor(Math.random() * (window.innerHeight - 200))),
                ];

                this.token[0].draw();
            }

            this.detectPlayerCollision();
            this.detectPlayerCollisionWithToken();
            this.drawScore();

            window.requestAnimationFrame(timeStamp => this.gameLoop(timeStamp));
        }
        else {
            console.log(this.count);
        }
    }

    /*********************************************************************************
     * Detects if player have collided with enemies
    *********************************************************************************/
    detectPlayerCollision() {
        for (let i = 0; i < this.enemies.length; i++) {
            const rect1= this.player;
            const rect2 = this.enemies[i];
            if (rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.y + rect1.height > rect2.y) {
                 this.player.isColliding = true;
             }
        }
    }

    detectPlayerCollisionWithToken() {
        const rect1 = this.player;
        const rect2= this.token[0];

        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y) {
             this.score++;
             delete this.token[0];
         }
    }

    /*********************************************************************************
     * Detects collisions for enemies.
    *********************************************************************************/
    detectCollisions() {
        let obj1;
        let obj2;
        
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].isColliding = false;
        }

        for (let i = 0; i < this.enemies.length; i++) {
            obj1 = this.enemies[i];

            if( obj1.x < 0 || obj1.x > 1350) {
                obj1.vx = -obj1.vx;
                obj1.isColliding = true; 
            } 

            if( obj1.y < 0 || obj1.y > 650) {
                obj1.vy = -obj1.vy; 
                obj1.isColliding = true;
            }

            for (let j = i + 1; j < this.enemies.length; j++)
            {
                obj2 = this.enemies[j];
              
                if (this.intersection(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;

                    const vCollision = {x: obj2.x - obj1.x, y: obj2.y - obj1.y};
                    const distance = Math.sqrt((obj2.x-obj1.x)*(obj2.x-obj1.x) + (obj2.y-obj1.y)*(obj2.y-obj1.y));
                    const vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
                    const vRelativeVelocity = {x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy};
                    const speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

                    if (speed < 0) {
                        break;
                    }

                    const impulse = 2 * speed / (obj1.mass + obj2.mass);
                    obj1.vx -= (impulse * obj2.mass * vCollisionNorm.x);
                    obj1.vy -= (impulse * obj2.mass * vCollisionNorm.y);
                    obj2.vx += (impulse * obj1.mass * vCollisionNorm.x);
                    obj2.vy += (impulse * obj1.mass * vCollisionNorm.y);
                }

            }
        }
    }

    intersection(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }

        return true;
    }

    /*********************************************************************************
     * Clears the screen
    *********************************************************************************/
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawScore() {
        document.getElementById("counter").innerHTML = "Time: " + this.count;
        document.getElementById("score").innerHTML = "Score: " + this.score;
    }
}