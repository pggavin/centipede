// Copyright (C) 2022 Scott Henshaw

import Map from './Map.js';
import Player from './Player.js';
import Centipede from './Centipede.js';

/*
ooooooooooooooooooooo
ooooooooooooooooooooo
ooooooooooooooooooooo
ooooooooooooooooooooo
ooooooooooooooooooooo
oooooooooooooooooooo
oooooooooooooooooooo
oooooooooooooooooooo
oooooooooooooooooooo
oooooooooooooooooooo
ooooooooooooooooooo
ooooooooooooooooooo
ooooooooooooooooooo
ooooooooooooooooooo
ooooooooooooooooooo
oooooooooooooooooo
oooooooooooooooooo
oooooooooooooooooo
oooooooooooooooooo
oooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
ooooooooooooooooo
oooooooooooooooo
oooooooooooooooo
oooooooooooooooo
oooooooooooooooo
oooooooooooooooo
ooooooooooooooo
ooooooooooooooo
ooooooooooooooo
ooooooooooooooo
ooooooooooooooo
oooooooooooooo
oooooooooooooo
oooooooooooooo
oooooooooooooo
oooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
ooooooooooooo
oooooooooooo
oooooooooooo
oooooooooooo
oooooooooooo
oooooooooooo
ooooooooooo
ooooooooooo
ooooooooooo
ooooooooooo
ooooooooooo
oooooooooo
oooooooooo
oooooooooo
oooooooooo
oooooooooo
ooooooooo
ooooooooo
ooooooooo
ooooooooo
ooooooooo
oooooooo
oooooooo
oooooooo
oooooooo
oooooooo
ooooooo
ooooooo
ooooooo
ooooooo
ooooooo
oooooo
oooooo
oooooo
oooooo
oooooo
ooooo
ooooo
ooooo
ooooo
ooooo
oooo
oooo
oooo
oooo
oooo
ooo
ooo
ooo
ooo
ooo
oo
oo
oo
oo
oo
o
o
o
o
o
*/

const NOT_STARTED = 0;
const IN_PROGRESS = 1;
const OVER = 2;

const MAX_TICK = 120;


const BULLET_UPDATE_TIME = 1;
const CENTIPEDE_UPDATE_TIME = 5;
const PLAYER_UPDATE_TIME = 3;

export default class App {

    constructor() {
        /*
        TODO
        >map
        >centipede
        >turret
        >init event handler
        >give control to user
        */

        this.initHandlers(); return;
        this.gameState = NOT_STARTED;
        this.tick = 0;
        this.map = new Map();
        this.player = new Player();
        this.centipedeList = []; // a list of active centipedes

        this.sampleDOMInteraction();
        this.buildTheTable();
    }

    isGameOver(){
        return true;
    }

    sampleDOMInteraction() {
        const el = document.querySelector("#actual-img");
        const msg = "My special code";
        el.innerHTML = `<div id="stuff">${msg}</div>`;
        el.style.backgroundColor = "rgba(107,43,55,1)"
    }

    buildTheTable() {
        const ROWS = 15;
        const COLS = 30;

        let markup = "<table>";

        for (let row = 0; row < ROWS; row++) {
            markup += `<tr>`;
            for (let col = 0; col < COLS; col++) {
                let id = "01";
                let classNameList = "border white";
                const innerCell = `<td id ="${id}" class="${classNameList}"></td>`
                markup += innerCell;
            }
            markup += `</tr>`;
        }
        markup += "</table>";

        document.querySelector('#game-board').innerHTML = markup;
    }

    updateTickCounter(){
        this.tick++;
        if (this.tick > MAX_TICK){
            this.tick = 0;
        }
    }

    update(){
        // TODO : update the model based on a tick counter
        this.updateTickCounter();
        // TODO : move all bullets, and score

        // TODO : move the player
        if (!this.tick % PLAYER_UPDATE_TIME)
        this.player.update( this.tick );
        // TODO : move the centipedes
        if (!this.tick % BULLET_UPDATE_TIME)
        this.updateCentipedes();
        // TODO : update the map
        if (!this.tick % BULLET_UPDATE_TIME)
        this.map.update();
    }

    updateCentipedes() {
        // TODO : walk the list of centipedes and update them
        for (let aCentipede of this.centipedeList){
            aCentipede.update();// pass current tick count into update
        }
    }

    render(){
        // TODO : update the screen based on the current model
    }

    initHandlers() {
        // play now - hide the play now section show the game
        // game over dialogue show/hide/clear
        // win / loss screen - play again

        let button = document.querySelector("#play-now-btn");
        button.addEventListener("click", event => {
            // hide the button
            
            document.querySelector("#play-now-btn").classList.add("hide");
            document.querySelector("#splash-screen").classList.add("hide");
            document.querySelector("#game-screen").classList.remove("hide");
        })// show the game

        document.querySelector("#quit-btn").addEventListener("click", event => {
            // return to splash
        })

        /*
                const assert = true;
                document.querySelector("#cancel-btn")
                    .addEventListener("click", event => { this.postMessage(this.message) });
        
                function handleCancel() {
                    // debug only
                    document.querySelector("#console").innerHTML = "Button clicked";
                }*/
    }


    waitForStart() {
        let tickCount = 0;
        timer = window.setInterval(deltaTime => {
            if (this.gameState != NOT_STARTED) {
                window.clearInterval(timer);
            }
        }, 2000)
    }

    runTilGameOver() {
        let tickCount = 0;
        timer = window.setInterval(deltaTime => {
            if (this.gameState != NOT_STARTED) {
                return;
            }
            if (this.gameState != IN_PROGRESS){
                window.clearInterval(timer);
            }
        }, 1000)
    }


    runOldSchool() {
        this.waitForStart();
        this.runTilGameOver();
    }

    run( timestamp ){
        this.update();
        this.render();
        if (!this.isGameOver)
        window.requestAnimationFrame(timestamp => {this.run(timestamp)})
    }
}





























