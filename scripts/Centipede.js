import Segment from './Segment.js'

const HEAD = 0;

export default class Centipede{
    constructor( segCount = 5){
        this.segmentList = []; // make this a parameter

        // Create the segments

        for (let i = 0; i < segCount; i++){
            this.segmentList[i] = new Segment();
        }
    }
    
    get head() {
        // usage : let c = new Centipede();  let seg = c.head;
        return this.segmentList[HEAD];
    }

    set head ( value ) {
        // usage : let c = new Centipede(); c.head = new Segment();
        this.segmentList[HEAD] = value;
    }

    update(){
        
    }
}