export default class Mushroom{
    constructor( aRow = 0, aCol = 0 ){
        this.row = aRow;
        this.col = aCol;
        this.hp = 3; // default damage to take, count down

    }
    hit(){
        this.hp--;
        if (this.hp < 0){
            // TODO : Score, plus eliminate from map?
            this.hp = 0;
            // what
        }
    }
}