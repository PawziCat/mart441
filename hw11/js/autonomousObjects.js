// Class for autonomous object
class AutonomousObject {
    constructor(x, y, radius, color, canvas) {
        this.x = x; // X-coordinate of the object
        this.y = y; // Y-coordinate of the object
        this.radius = radius; // Radius of the object
        this.color = color; // Color of the object
        this.dx = Math.random() * 8 - 2; // Random horizontal velocity
        this.dy = Math.random() * 8 - 2; // Random vertical velocity
        this.canvas = canvas; // Reference to the canvas element
    }
    // Method to draw the object on the canvas
    draw(ctx) {
        ctx.fillStyle = this.color; // Set fill color
        ctx.beginPath(); // Start a new path
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // Draw a circle
        ctx.fill(); // Fill the circle
    }
    // Method to update the object's position based on velocity
    update() {
        this.x += this.dx; // Update x-coordinate
        this.y += this.dy; // Update y-coordinate
        // Bounce off the edges of the canvas
        if (this.x - this.radius < 0 || this.x + this.radius > this.canvas.width) this.dx *= -1;
        if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.height) this.dy *= -1;
    }
    // Method to handle collision with user-controlled object
    handleCollision(userObj) {
        this.radius = Math.random() * 40 + 30; // Change size of autonomous object
        const angle = Math.atan2(this.y - userObj.y, this.x - userObj.x);
        this.x += Math.cos(angle) * 50; // Bounce back 50pt
        this.y += Math.sin(angle) * 50; // Bounce back 50pt
    }
}
