const spreadsheetContainer = document.querySelector('#spreadsheet-container');
const btnExportingSpreadsheet = document.querySelector('#export-btn');
const sellectedCellInfo = document.querySelector('#cell-status');
const numOfRows = 15;
const numOfCols = 15;
const spreadsheetArray = [];
const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// 3. 문자열이 아닌 객체 데이터 생성하기
class Cell {
    constructor(row, col, cellName, cellData, isHeader, disabled) {
        this.row = row;
        this.col = col;
        this.cellName = cellName;
        this.cellData = cellData;
        this.isHeader = isHeader;
        this.disabled = false;
    }
}

btnExportingSpreadsheet.addEventListener('click', function(){exportSpreadsheet()});

createTable();

function createTable(){
    for (let i = 0; i < numOfRows; i++){
        const rowList = []
        for(let j = 0; j < numOfCols; j++){
            const cellName = `${i}-${j}`;
            const cell = new Cell(i, j, cellName, "", false);
            if(i === 0) {
                cell.isHeader = true;
                cell.cellData = alphabetArray[j-1];
                cell.disabled = true;
            }
            if(j === 0) {
                cell.isHeader = true;
                cell.cellData = i;
                cell.disabled = true;
            }
            if(i === 0 && j === 0){
                cell.cellData = null;
            }
            rowList.push(cell);
        }
        spreadsheetArray.push(rowList);
    }
    creatCellElement();
};

function creatCellElement(){
    for(let i = 0; i < spreadsheetArray.length; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        for(let j = 0; j < spreadsheetArray[0].length; j++) {
            const cellElement = document.createElement('input');
            const cell = spreadsheetArray[i][j];
            cellElement.classList.add('cell');
            cellElement.id = cell.cellName;
            cellElement.value = cell.cellData;
            cellElement.disabled = cell.disabled;
            
            cellElement.addEventListener('click', function(){specifyClickedElement(cell)});
            cellElement.addEventListener('change', function(){inputText(this.value ,cell)});

            if(cell.isHeader) {
                cellElement.classList.add('header');
            }
            
            rowContainer.append(cellElement);
        }
        spreadsheetContainer.append(rowContainer);
    }
}
function specifyClickedElement(cell) {
    clickedElements = document.querySelectorAll('.clicked');
    if (clickedElements.length > 0) {
        clickedElements.forEach((clickedElement) => {
            clickedElement.classList.remove('clicked');
        });
    }
    const rowIndexOfSellectedCell = cell.row;
    const colIndexOfSellectedCell = cell.col;
    const rowCellOfSellectedCell = document.getElementById(`0-${colIndexOfSellectedCell}`);
    const colCellOfSellectedCell = document.getElementById(`${rowIndexOfSellectedCell}-0`);
    rowCellOfSellectedCell.classList.add('clicked');
    colCellOfSellectedCell.classList.add('clicked');

    sellectedCellInfo.innerHTML = alphabetArray[colIndexOfSellectedCell - 1] + rowIndexOfSellectedCell;
}
function inputText(data ,cell){
    cell.cellData = data;
    console.log(cell);
}
function exportSpreadsheet() {
    let csv = "";
    for (let i = 0; i < spreadsheetArray.length; i++){
        if(i === 0) continue;
        csv +=
                spreadsheetArray[i]
                .filter(i => !i.isHeader)
                .map(i => i.cellData)
                .join(',') + '\r\n';
    }

    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = 'spread-sheet download: file title.csv';
    a.click();
}