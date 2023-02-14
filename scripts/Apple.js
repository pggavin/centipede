export default class Apple {
    constructor(seedcount = 100, skin = true) {
        this.seeds = seedcount;
        this.hasSkin = skin;
    }

    countSeeds() {
        return this.seeds;
    }
}