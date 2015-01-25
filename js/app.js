
// Helper function to check if player and enemy have collided
function collided(player, enemy) {
    if (player.row !== enemy.row) {
        return false;
    }

    var enemyRightBorder = enemy.x + enemy.width/2,
        enemyLeftBorder = enemy.x - enemy.width/2;

    var playerRightBorder = player.col * 101 + player.width/2,
        playerLeftBorder = player.col * 101 - player.width/2;

    return (playerLeftBorder < enemyRightBorder && playerLeftBorder > enemyLeftBorder) ||
        (playerRightBorder > enemyLeftBorder && playerRightBorder < enemyRightBorder);
}

// Enemies our player must avoid
var Enemy = function(row) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.row = row;
    this.speed = Math.random() * 4;
    this.width = 100;
}

// Update to enemy location and speed after next tick
Enemy.prototype.update = function(dt) {
    this.x = this.x + (101 * dt * this.speed);
    if (this.x > 505) {
        this.x = 0;
        this.speed = Math.random() * 4;
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.row * 83 - 22);
}

// Return to first location after win or loss
Enemy.prototype.reset = function() {
    this.x = 0;
}

// Player location represented as row and col
var Player = function(row, col) {
    this.sprite = 'images/char-boy.png';
    this.row = row;
    this.col = col;
    this.state = 'stay';
    this.width = 66;
}

// If keystoke sets state, do corresponding action
Player.prototype.update = function() {
    if (this.state === 'left' && this.col > 0) {
        this.col--;
    }
    else if (this.state === 'right' && this.col < 4) {
        this.col++;
    }
    else if (this.state === 'up' && this.row > 0) {
        this.row--;
    }
    else if (this.state === 'down' && this.row < 5) {
        this.row++;
    }
    this.state = 'stay';
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * 101, this.row * 83 - 10);
}

Player.prototype.handleInput = function(key) {
    this.state = key;
}

// Return to orignal location after win or loss
Player.prototype.reset = function(key) {
    this.row = 5;
    this.col = 2;
}

// Instatiate all game objects to be picked up by event loop
var allEnemies = [];
var startingPoints = [1, 2, 3];
for (var i = 0; i < startingPoints.length; i++) {
    allEnemies.push(new Enemy(startingPoints[i]));
}

var player = new Player(5, 2);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
