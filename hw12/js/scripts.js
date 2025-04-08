// Class definition for obstacles in the game
class Obstacle {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Method to draw the obstacle on the canvas
    draw(ctx) {
        ctx.fillStyle = 'lightsalmon';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Class definition for the player in the game
class Player {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Method to draw the player on the canvas
    draw(ctx) {
        ctx.fillStyle = 'lightcoral';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    // Method to move the player based on keyboard input
    move(dx, dy, canvas) {
        // Calculate new position
        let newX = this.x + dx;
        let newY = this.y + dy;

        // Check boundaries
        if (newX >= 0 && newX + this.width <= canvas.width) {
            this.x = newX;
        }
        if (newY >= 0 && newY + this.height <= canvas.height) {
            this.y = newY;
        }
    }

    // Method to check collision between player and obstacles
    checkCollision(obstacles) {
        for (let obstacle of obstacles) {
            if (this.x < obstacle.x + obstacle.width &&
                this.x + this.width > obstacle.x &&
                this.y < obstacle.y + obstacle.height &&
                this.y + this.height > obstacle.y) {
                return true;
            }
        }
        return false;
    }

    // Method to check collision between player and collectibles
    collect(collectibles) {
        for (let i = 0; i < collectibles.length; i++) {
            let collectible = collectibles[i];
            if (this.x < collectible.x + collectible.width &&
                + this.width > collectible.x &&
                this.y < collectible.y + collectible.height &&
                this.y + this.height > collectible.y) {
                collectibles.splice(i, 1); // Remove collectible from array
                return collectible.score; // Return the score value of the collectible
            }
        }
        return 0;
    }
}

// Class definition for collectibles in the game
class Collectible {
    constructor(id, x, y, width, height, score) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.score = score;
    }

    // Method to draw the collectible on the canvas
    draw(ctx) {
        ctx.fillStyle = 'teal';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Array to store obstacle objects
let obstacles = [];
// Array to store collectible objects
let collectibles = [];
// Variable to store the player's score
let score = 0;

// Function to initialize the game
function initializeGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    // Fetch obstacle data from JSON file and create obstacle objects
    fetch('json/obstacles.json')
        .then(response => response.json())
        .then(data => {
            obstacles = data.map(item => new Obstacle(item.id, item.x, item.y, item.width, item.height));
            obstacles.forEach(obstacle => obstacle.draw(ctx));
        });

    // Fetch player data from JSON file and create player object
    fetch('json/player.json')
        .then(response => response.json())
        .then(data => {
            const player = new Player(data.id, data.x, data.y, data.width, data.height);

            // Event listener for keyboard input to move the player
            document.addEventListener('keydown', (event) => {
                let dx = 0, dy = 0;
                if (event.key === 'ArrowUp') dy = -5;
                if (event.key === 'ArrowDown') dy = 5;
                if (event.key === 'ArrowLeft') dx = -5;
                if (event.key === 'ArrowRight') dx = 5;

                // Move the player and check for collisions
                player.move(dx, dy, canvas);
                if (player.checkCollision(obstacles)) {
                    player.move(-dx, -dy, canvas); // Move back if collision detected
                }

                // Collect collectibles and update score
                score += player.collect(collectibles);

                // Clear the canvas and redraw all objects
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                obstacles.forEach(obstacle => obstacle.draw(ctx));
                collectibles.forEach(collectible => collectible.draw(ctx));
                player.draw(ctx);

                // Update the score display
                document.getElementById('scoreBoard').innerText = `Score: ${score}`;
            });

            // Draw the player on the canvas
            player.draw(ctx);
        });

    // Fetch collectible data from JSON file and create collectible objects
    fetch('json/collectibles.json')
        .then(response => response.json())
        .then(data => {
            collectibles = data.map(item => new Collectible(item.id, item.x, item.y, item.width, item.height, item.score));
            collectibles.forEach(collectible => collectible.draw(ctx));
        });
}

// Event listener for the play button to start the game
document.getElementById('playButton').addEventListener('click', initializeGame);
