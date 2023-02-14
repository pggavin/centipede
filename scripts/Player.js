
const UPDATE_TIME = 3;

export default class Player{
    constructor(){
        
    }

    update( tick ){
        if (!tick % UPDATE_TIME){
            return;
        }
    }
}