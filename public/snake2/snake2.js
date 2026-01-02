const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const buttonStart = document.getElementById("buttonStart");

const BLOCK_SIZE = 20;
const MAP_SIZE = canvas.width / BLOCK_SIZE;

const playerKey1 = [38, 40, 37, 39]; // ↑ ↓ ← →
const playerKey2 = [87, 83, 65, 68]; // W S A D

let snake1, snake2, apple;
let gameInterval, appleInterval;
let isGameOver = false;

/* ================== Snake ================== */
class Snake {
    constructor(startX, startY, color, playerKey) {
        this.startX = startX;
        this.startY = startY;
        this.color = color;
        this.playerKey = playerKey;
        this.score = 0;
        this.alive = true;
        this.body = [{ x: startX, y: startY }];
        this.size = 5;
        this.direction = { x: 0, y: -1 };
    }

    drawSnake() {
        // 死蛇：只畫，不更新
        if (!this.alive) {
            this.drawBody();
            return;
        }

        this.moveSnake();
        this.drawBody();
        this.eatApple();
    }

    drawBody() {
        ctx.fillStyle = this.color;
        for (let b of this.body) {
            ctx.fillRect(
                b.x * BLOCK_SIZE,
                b.y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
    }

    moveSnake() {
        const head = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(head);
        while (this.body.length > this.size) {
            this.body.pop();
        }
        this.checkWallDeath();
    }

    checkWallDeath() {
        const h = this.body[0];
        if (
            h.x < 0 || h.x >= MAP_SIZE ||
            h.y < 0 || h.y >= MAP_SIZE
        ) {
            this.alive = false;
        }
    }

    eatApple() {
        if (!this.alive) return;

        for (let i = 0; i < apple.apples.length; i++) {
            if (
                this.body[0].x === apple.apples[i].x &&
                this.body[0].y === apple.apples[i].y
            ) {
                apple.apples.splice(i, 1);
                this.size++;
                this.score++;
                break;
            }
        }
    }

    move(event) {
        if (!this.alive || isGameOver) return;

        const k = event.keyCode;
        if (k === this.playerKey[0] && this.direction.y !== 1)
            this.direction = { x: 0, y: -1 };
        else if (k === this.playerKey[1] && this.direction.y !== -1)
            this.direction = { x: 0, y: 1 };
        else if (k === this.playerKey[2] && this.direction.x !== 1)
            this.direction = { x: -1, y: 0 };
        else if (k === this.playerKey[3] && this.direction.x !== -1)
            this.direction = { x: 1, y: 0 };
    }
}

/* ================== Apple ================== */
class Apple {
    constructor() {
        this.apples = [];
        this.putApple();
    }

    drawApple() {
        ctx.fillStyle = "red";
        for (let a of this.apples) {
            ctx.fillRect(
                a.x * BLOCK_SIZE,
                a.y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
    }

    putApple() {
        // ⭐ Game Over 後絕不生成
        if (isGameOver) return;

        let x, y, valid = false;
        while (!valid) {
            x = Math.floor(Math.random() * MAP_SIZE);
            y = Math.floor(Math.random() * MAP_SIZE);
            valid = true;

            for (let b of snake1.body.concat(snake2.body)) {
                if (b.x === x && b.y === y) {
                    valid = false;
                    break;
                }
            }
        }
        this.apples.push({ x, y });
    }
}

/* ================== Game Logic ================== */
function drawMap() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "18px Verdana";
    ctx.fillText("P1: " + snake1.score, 10, 20);
    ctx.fillText("P2: " + snake2.score, 10, 40);
}

/* 🐍 蛇互撞 → 直接 Game Over */
function checkSnakeVsSnake() {
    if (isGameOver) return;
    if (!snake1.alive || !snake2.alive) return;

    const h1 = snake1.body[0];
    const h2 = snake2.body[0];

    if (h1.x === h2.x && h1.y === h2.y) {
        endGame("HEAD TO HEAD");
        return;
    }

    for (let b of snake2.body) {
        if (h1.x === b.x && h1.y === b.y) {
            endGame("SNAKE CRASH");
            return;
        }
    }

    for (let b of snake1.body) {
        if (h2.x === b.x && h2.y === b.y) {
            endGame("SNAKE CRASH");
            return;
        }
    }
}

/* ⭐ 兩隻蛇都死 → Game Over */
function checkBothDead() {
    if (!isGameOver && !snake1.alive && !snake2.alive) {
        endGame("BOTH SNAKES DEAD");
    }
}

function drawGame() {
    drawMap();
    apple.drawApple();
    snake1.drawSnake();
    snake2.drawSnake();
    checkSnakeVsSnake();
    checkBothDead();   // ⭐ 關鍵
    drawScore();
}

/* ================== Game Over ================== */
function endGame(reason) {
    if (isGameOver) return;

    isGameOver = true;
    clearInterval(gameInterval);
    clearInterval(appleInterval);
    drawGameOverText(reason);
}

function drawGameOverText(reason) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "32px Verdana";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
    ctx.font = "18px Verdana";
    ctx.fillText(reason, canvas.width / 2, canvas.height / 2 + 30);
    ctx.fillText("Press Start to Restart", canvas.width / 2, canvas.height / 2 + 60);
}

/* ================== Start / Restart ================== */
function gameStart() {
    clearInterval(gameInterval);
    clearInterval(appleInterval);
    isGameOver = false;

    snake1 = new Snake(MAP_SIZE / 2, MAP_SIZE / 2, "lime", playerKey1);
    snake2 = new Snake(MAP_SIZE / 4, MAP_SIZE / 2, "yellow", playerKey2);
    apple = new Apple();

    gameInterval = setInterval(drawGame, 100);
    appleInterval = setInterval(() => apple.putApple(), 3000);
}

/* ================== Event ================== */
buttonStart.addEventListener("click", gameStart);

document.addEventListener("keydown", (e) => {
    if (!snake1 || !snake2) return;
    snake1.move(e);
    snake2.move(e);
});
