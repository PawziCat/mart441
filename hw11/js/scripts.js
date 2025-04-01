$(document).ready(function() {
    const canvas = document.getElementById('myCanvas'); // Get the canvas element
    const ctx = canvas.getContext('2d'); // Get the 2D drawing context

    // Initial background color
    const backgroundColors = ['#ffffc1', '#ffe2ac', '#beffff'];
    let currentColorIndex = 0;
    canvas.style.backgroundColor = backgroundColors[currentColorIndex];

    // Class for user-controlled object
    class UserControlledObject {
        constructor(x, y, radius, color, canvas) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.canvas = canvas;
            this.dx = 0;
            this.dy = 0;
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
        update() {
            this.x += this.dx;
            this.y += this.dy;
            // Prevent the object from leaving the canvas
            if (this.x - this.radius < 0 || this.x + this.radius > this.canvas.width) {
                this.dx = 0;
                this.x = Math.max(this.radius, Math.min(this.canvas.width - this.radius, this.x));
            }
            if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) {
                this.dy = 0;
                this.y = Math.max(this.radius, Math.min(this.canvas.height - this.radius, this.y));
            }
        }
        handleKeyPress(event) {
            const speed = 5;
            switch (event.key) {
                case 'ArrowUp':
                    this.dy = -speed;
                    case 'ArrowDown':
                    this.dy = speed;
                    break;
                case 'ArrowLeft':
                    this.dx = -speed;
                    break;
                case 'ArrowRight':
                    this.dx = speed;
                    break;
            }
        }
        handleKeyRelease(event) {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                    this.dy = 0;
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    this.dx = 0;
                    break;
            }
        }
    }

    // Class for autonomous objects
    class AutonomousObject {
        constructor(x, y, radius, color, canvas) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.canvas = canvas;
            this.dx = Math.random() * 4 - 2; // Random horizontal velocity
            this.dy = Math.random() * 4 - 2; // Random vertical velocity
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
        update() {
            this.x += this.dx;
            this.y += this.dy;
            // Prevent the object from leaving the canvas
            if (this.x - this.radius < 0 || this.x + this.radius > this.canvas.width) {
                this.dx *= -1;
            }
            if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) {
                this.dy *= -1;
            }
        }
        handleCollision(userObj) {
            this.radius = Math.random() * 40 + 30; // Change size of autonomous object
            const angle = Math.atan2(this.y - userObj.y, this.x - userObj.x);
            const newX = this.x + Math.cos(angle) * 50; // Calculate new x position
            newY = this.y + Math.sin(angle) * 50; // Calculate new y position
            // Ensure the new position is within canvas boundaries
            this.x = Math.max(this.radius, Math.min(this.canvas.width - this.radius, newX));
            this.y = Math.max(this.radius, Math.min(this.canvas.height - this.radius, newY));
            // Change background color
            currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
            canvas.style.backgroundColor = backgroundColors[currentColorIndex];
        }
    }

    // Initialize user-controlled object
    const userObject = new UserControlledObject(300, 370, 20, 'teal', canvas);

    // Initialize autonomous objects
    const autonomousObjects = [
        new AutonomousObject(644, 600, 20, 'yellow', canvas),
        new AutonomousObject(900, 200, 20, 'orange', canvas)
    ];

    // Function to check for collisions between two objects
    function checkCollision(obj1, obj2) {
        const dx = obj1.x - obj2.x; // Difference in x-coordinates
        const dy = obj1.y - obj2.y; // Difference in y-coordinates
        const distance = Math.sqrt(dx * dx + dy * dy); // Calculate distance between objects
        return distance < obj1.radius + obj2.radius; // Return true if objects are colliding
    }

    // Function to animate the objects on the canvas
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        userObject.update(); // Update user-controlled object
        userObject.draw(ctx); // Draw user-controlled object
        autonomousObjects.forEach(obj => {
            obj.update(); // Update autonomous object
            obj.draw(ctx); // Draw autonomous object
        });
        // Check for collisions between user-controlled object and autonomous objects
        autonomousObjects.forEach(autoObj => {
            if (checkCollision(userObject, autoObj)) {
                autoObj.handleCollision(userObject);
            }
        });
        requestAnimationFrame(animate); // Request next frame for animation
    }

    // Start the animation
    animate();

    // Add event listener for key press events to control the user object
    document.addEventListener('keydown', (event) => userObject.handleKeyPress(event));
    document.addEventListener('keyup', (event) => userObject.handleKeyRelease(event));
});