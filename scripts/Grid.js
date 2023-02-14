export default class Grid{
    constructor ( rows = 10, columns = 10 ){
        this.size = {
            row: rows,
            column : columns
        };

        this.grid = [];
        for (let i = 0; i < rows; i++){
            this.grid[i] = [];
            for (let j = 0; j < columns; j++){
                this.grid[i][j] = {};
            }
        }
// removed code here
        this.placeMushrooms();
        // place the mushrooms
        // set start point for centipede
    }

    get rows() {return this.size.row }
    get column() {return this.size.column }
}