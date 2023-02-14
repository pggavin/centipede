import Grid from './Grid.js';
import Mushroom from './Mushroom.js'
import Bullet from './Bullet.js'

export default class Map{
    constructor ( rows = 10, columns = 10 ){
        this.bullet = new Bullet();
        this.grid = new Grid(rows, columns);
        this.placeMushrooms();
    }
    placeMushrooms( count = 10 ){
        // randomly determine some number of mushrooms

        // for each mushroom, generate a row, col, then
        // see if there is already one there
        // if not place a mushroom, else
        // choose another location
    }

    setCentipede( row, col){
        // set start point for centipede
    }
    // Move this probably 

    update(){
        
    }
}