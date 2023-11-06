import {Cell} from "./Cell.js";

const spreadsheetContainer = document.querySelector('#spreadsheet-container');
const btnExportingSpreadsheet = document.querySelector('#export-btn');
const sellectedCellInfo = document.querySelector('#cell-status');
const numOfRows = 15;
const numOfCols = 15;
const spreadsheetArray = [];
const alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];



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
}
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
            
            cellElement.addEventListener('click', ()=>{specifyClickedElement(cell)}); 
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
    clickedElements.forEach((clickedElement) => {
        clickedElement.classList.remove('clicked');
    })
    const rowNum = cell.row;
    const colNum = cell.col;

    const rowCell = document.getElementById(`0-${colNum}`);
    const colCell = document.getElementById(`${rowNum}-0`);
    
    rowCell.classList.add('clicked');
    colCell.classList.add('clicked');

    sellectedCellInfo.innerHTML = alphabetArray[colNum - 1] + rowNum;
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