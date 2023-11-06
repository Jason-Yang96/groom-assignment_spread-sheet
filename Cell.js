export class Cell {
    constructor(row, col, cellName, cellData, isHeader, disabled){
        this.row = row;
        this.col = col;
        this.cellName = cellName;
        this.cellData = cellData;
        this.isHeader = isHeader;
        this.disabled = false;
    }
}