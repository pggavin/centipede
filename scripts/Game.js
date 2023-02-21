// Copyright © 2022 Gavin Van Hussen

// Player Pos Info
let p_x = 14;
let p_y = 14;
let xIncrease = 0;
let yIncrease = 0;
// Audio 
let death = new buzz.sound("/audio/death.ogg");
let shift = new buzz.sound("/audio/shift.ogg");
let shoot = new buzz.sound("/audio/shoot.ogg");
let bgm = new buzz.sound("/audio/bgm.ogg");
let win = new buzz.sound("/audio/win.ogg");
// Game Info
let gameOver = false;
let muted = false;
let score = 1;
// Entity Data
let enemies = [];
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dir = true; // going right
    }
}
let mushrooms = [];
class Mushroom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hp = 3; // each hp value uses a different sprite
    }
}
let shots = [];
class Shot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Board info. Board is 30x15
let board = new Array(30);
for (let i = 0; i < board.length; i++) {
    board[i] = new Array(15);
}

export default class Game {
    constructor() {
        this.tick = 0;
        this.p_x = 14;
        this.p_y = 14;

        // give control to the user
        this.buildTheTable();

        this.createCentipede();
        this.createMushrooms();
        // Init event handlers
        $("#play-now-btn").on("click", event => {
            this.showScreen(); // transition and other initialisation stuff
        });
        $("#refresh-button").click(function () {
            location.reload(); // for game win/loss
        });
        $("#sound-button").click(function () {
            // cache sound button reference
            let soundButton = document.querySelector("#sound-button");
            // Toggle the "muted" property of the page
            this.muted = !this.muted;
            // If page is muted, mute all sounds and add "muted" class to sound button
            if (this.muted) {
                buzz.all().mute();
                soundButton.classList.add("muted");
                // If page is not muted, unmute all sounds and remove "muted" class from sound button
            } else {
                buzz.all().unmute();
                soundButton.classList.remove("muted");
            }
        });
    }

    createMushrooms() {
        for (let i = 0; i < 18; i++) {
            let rx = Math.floor(Math.random() * 27) + 1;
            let ry = Math.floor(Math.random() * 10) + 1;
            mushrooms.push(new Mushroom(rx, ry));
        }// random numbers for x and y are used to place a bunch of mushrooms 
    }

    createCentipede() {
        for (let i = 0; i < 12; i++) {
            enemies.push(new Enemy(0, i));
        } // starts at index 0 and increments horizontally, places segments for each increment
    }

    showScreen() {
        // hide the splash
        $("#splash-screen").fadeOut(1500);
        // fades out the splash for 1.5 seconds
        if (!this.muted) new buzz.sound("/audio/win.ogg").play();
        setTimeout(() => {
            $("#game-screen").fadeIn(1500);
        }, 1500);
        // fades in the game screeen after 1.5 seconds 

        this.update();
    }

    gameLoss() {
        gameOver = true;
        const winScreen = document.querySelector("#win-screen");
        // Get the h1 element inside the #win-screen element
        const h1Element = winScreen.querySelector("h1");
        // Set the text of the h1 element
        h1Element.textContent = "You lose idiot";
        if (!this.muted) new buzz.sound("/audio/win/lose.ogg").play();
        // Plays lose sound and whatever
        this.shakeScreen();
        $("#win-screen").show();
    }

    buildTheTable(ROWS = 15, COLS = 30) {
        // Build the table...
        let markup = "<table>"
        for (let row = 0; row < ROWS; row++) {
            markup += `<tr class="cellrow">`;
            // Loop through each column in the current row
            for (let col = 0; col < COLS; col++) {
                // Create an ID for the current cell based on its row and column
                let id = row + ',' + col;
                // Create a list of class names for the current cell
                let classNameList = `ROW` + row;
                // Create the markup for the current cell with the ID and class name
                const innerCell = `<td id="${id}" class="${classNameList}" style="height: 20px; width: 20px;display: inline-block; "></td>`;
                // Add the current cell's markup to the current row
                markup += innerCell;
            }
            // Finish the current row with a closing </tr> tag
            markup += "</tr>";
        }
        // Finish building the table markup with a closing </table> tag
        markup += "</table>";
        $("#game-board").html(markup);
    }

    constructBoard() {
        // Create a new board as a 2D array with 30 columns and 15 rows, with all cells initialized to ' '
        board = new Array(30).fill().map(() => new Array(15).fill(' '));
        // Set the cells in the board to 'O' for each enemy's position
        for (let e of enemies)
            board[e.x][e.y] = 'O';
        // Set the cells in the board to 'T' for each mushroom's position
        for (let m of mushrooms)
            board[m.x][m.y] = 'T';
        // Set the cells in the board to 'l' for each shot's position
        for (let s of shots)
            board[s.x][s.y] = 'l';
    }


    updateColors() {
        const table = document.querySelector("#game-board table");
        const rows = table.querySelectorAll("tr");
        // Gets all the tr things

        // Set the color of each row based on a sine wave with the given number of ticks
        for (let i = 0; i < rows.length; i++) {
            const phase = (this.tick / 20) + (i / rows.length) * 2 * Math.PI;
            const r = Math.round(48 * Math.sin(phase));
            const b = Math.round(48 * Math.sin(phase + 4 * Math.PI / 3));
            // Cool red and blue values generated. Green is lame.
            rows[i].style.backgroundColor = `rgb(${r}, 0, ${b})`;
        }
    }

    shakeScreen() {
        const container = document.querySelector("#game-screen");
        // Only selects game screen
        container.classList.add("shake");
        setTimeout(() => {
            container.classList.remove("shake");
        }, 50);
    }  // Uses shake thingy defined in the css

    update() {
        if (!this.muted) { // Doesn't play music if the game is muted
            bgm.play();
            bgm.loop();
        }
        let willFire = false;
        document.addEventListener('keydown', function (event) {
            // MOVEMENT
            switch (event.key) {
                case 'w': if (p_x > 12) xIncrease = -1; break;
                case 'a': if (p_y > 0) yIncrease = -1; break;
                case 's': if (p_x < 14) xIncrease = 1; break;
                case 'd': if (p_y < 29) yIncrease = 1; break;
                case ' ': willFire = true; break;
            }; // Sets the actions that will be executed next 
        });
        // UPDATE LOOP
        let update = setInterval(event => {
            this.tick++;
            // tick increment
            this.updateColors();
            // Player Tick
            if (this.tick % 3 == 0) {
                p_x += xIncrease, p_y += yIncrease;
                // Update player position in the x+y directions
                if ((yIncrease != 0 || xIncrease != 0) && !this.muted) // If player moved and sound is not muted
                    shift.play();
                // Play shift sound
                xIncrease = 0, yIncrease = 0;
                // Reset x & y increase to 0
                if (willFire && shots.length < 2) {  // If player is firing and under 2 shots are present
                    if (!this.muted)            // If sound is not muted
                        shoot.play();           // Play shoot sound
                    shots.push(new Shot(p_x - 1, p_y));  // Add a new shot object to the shots array
                    willFire = false;           // Reset willFire to false
                }
            }
            // Centipede tick
            if (this.tick % 4 == 0)
                this.updateCentipede();
            // Constructs board for collision
            this.constructBoard();
            // Shot tick
            this.updateShots();
            // Constructs board for rendering
            this.constructBoard();
            this.render();

            // Winning stuff
            if (enemies.length == 0 && !gameOver) {
                if (!this.muted)
                    win.play();
                $("#win-screen").show();
                gameOver = true;
            }
            else if (gameOver) 
                clearInterval(update);
        }, 75);
    }

    updateShots() {
        // Loop through all the active shots in reverse order
        for (let s = shots.length - 1; s >= 0; s--) {
            // Move the current shot one cell to the left
            shots[s].x--;
            // Check if the shot has gone off the left edge of the game board
            if (shots[s].x < 0) {
                // Remove the shot from the shots array if it has gone off the edge
                shots.splice(s, 1);
            }
            // Check if the shot has hit an enemy
            else if (board[shots[s].x][shots[s].y] == 'O') {
                for (let e = enemies.length - 1; e >= 0; e--) {
                    if (enemies[e].x == shots[s].x && enemies[e].y == shots[s].y) {
                        // Add a mushroom at the position of the destroyed enemy
                        mushrooms.push(new Mushroom(enemies[e].y, enemies[e].x));
                        // Remove the enemy and the shot from their respective arrays
                        enemies.splice(e, 1);
                        shots.splice(s, 1);
                        // Update the score and break out of the loop
                        this.entityDestroyed();
                        break;
                    }
                }
            }
            // Check if the shot has hit a mushroom
            else if (board[shots[s].y][shots[s].x] == 'T') {
                for (let m = mushrooms.length - 1; m >= 0; m--) {
                    if (mushrooms[m].x == shots[s].y && mushrooms[m].y == shots[s].x) {
                        // Reduce the health of the mushroom by 1
                        mushrooms[m].hp--;
                        // Remove the mushroom if it has no more health
                        if (mushrooms[m].hp == 0)
                            mushrooms.splice(m, 1);
                        // Remove the shot from the shots array and update the score
                        shots.splice(s, 1);
                        this.entityDestroyed();
                        // Break out of the loop
                        break;
                    }
                }
            }
        }
    }

    entityDestroyed() {
        if (!this.muted)
            death.play();
        this.shakeScreen();
        document.getElementById("score").innerHTML = ++score;
    }  // Does screenshake, destroy sound, and adds to score

    updateCentipede() {
        for (let e = 0; e < enemies.length; e++) {
            let outOfBounds = (enemies[e].dir && enemies[e].y > 28) || ((!enemies[e].dir) && enemies[e].y < 1);
            // If the centipede is pressed against a border
            if (outOfBounds) {
                enemies[e].x++;
                enemies[e].dir = !enemies[e].dir;
            // Move up and flip
            } else {
                let dirIncrement = (enemies[e].dir? 1 : -1);
                // Whether y is increased or decreased
                let val = board[enemies[e].y + dirIncrement][enemies[e].x];
                if (val === 'T')
                    enemies[e].x++;
                // If the centipete is against a mushroom it goes up
                else if (val === 'l') {
                    mushrooms.push(new Mushroom(enemies[e].y, enemies[e].x));
                    this.entityDestroyed();
                    enemies.splice(e, 1);
                    e--;
                } else
                    enemies[e].y += (dirIncrement);
            }   // Increased direction
            if (enemies[e].x == 13)
                this.gameLoss();
        }
    }

    render() {
        this.cleartable();
        // Refreshes table
        this.addsprite("./images/Sp_Player.png", p_x, p_y);
        // Player sprite
        enemies.forEach(en => { this.addsprite("./images/Sp_EnemyBody.png", en.x, en.y); });
        // Enemy sprites
        shots.forEach(st => { this.addsprite("./images/Sp_Shot.png", st.x, st.y); });
        // Shot sprites
        mushrooms.forEach(ms => {
            if (ms.hp == 3)
                this.addsprite("./images/Sp_Mushroom.png", ms.y, ms.x);
            else if (ms.hp == 2)
                this.addsprite("./images/Sp_MushroomH.png", ms.y, ms.x);
            else if (ms.hp == 1)
                this.addsprite("./images/Sp_MushroomD.png", ms.y, ms.x);
        });
    }   // Mushroom sprites, 3 damage levels

    cleartable() {
        let table = document.getElementById("game-board");
        let cells = table.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++)
            cells[i].innerHTML = "";
    } // goes through gameboard cells and resets their html

    addsprite(sprite, row, col) {
        let id = row + ',' + col;
        let cell = document.getElementById(id);
        if (cell !== null) {
            let image = new Image();
            image.src = sprite;
            image.style.width = "100%";
            image.style.height = "100%";
            cell.innerHTML = "";
            cell.appendChild(image);
        }
    }
}
