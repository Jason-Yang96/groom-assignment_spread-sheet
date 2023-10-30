// 1. 필요한 상수 생성하기
const spreadSheetContainer = document.querySelector('#spreadsheet-container');
const Rows = 10;
const Cols = 10;
const exportBtn = document.querySelector('#export-btn');
const spreadsheet = [];
const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
// 3. 문자열이 아닌 객체 데이터 생성하기 
// 클래스 정의 되어야지만 객체 생성 가능. Uncaught ReferenceError: Cannot access 'Cell' before initialization at initSpreadSheet
class Cell {
    constructor(isHeader, disabled, data, row, col, rowName, colName, active = false) { //자바스크립트는 타입 유형을 정의 안하구나
        //this는 생성자 함수 내에서 빈 객체를 가르킨다. 
        this.isHeader = isHeader;
        this.disabled = disabled;
        this.data = data;
        this.row = row;
        this.col = col;
        this.rowName = rowName;
        this.colName = colName;
        this.active = active;
    }
}
initSpreadSheet();
exportBtn.onclick = function(e) {
    let csv = "";
    for (let i = 0; i<spreadsheet.length; i++) {
        if(i===0) continue;
        csv +=
            spreadsheet[i].filter((item) => !item.isHeader)
            .map((item) => item.data)
            .join(',') + '\r\n'
    }
    const csvObj = new Blob([csv]);
    const csvUrl = URL.createObjectURL(csvObj);
    console.log("csv", csvUrl);

    const a = document.createElement('a');
    a.href = csvUrl;
    a.download = "spreadsheet file name.csv";
    a.click();
}

// 2. 기본 데이터 생성하기
function initSpreadSheet(){
    for (let i = 0; i < Rows; i++) {
        let spreadsheetRows = []
        for(let j = 0; j < Cols; j++) {
            // 8. 첫번째 열에 숫자 넣기
            let cellData = "";
            // 10. 헤더 행성 (헤더인지 여부에 따라서 active 여부가 결정된다. 대부분 header를 제외하고 나머지는 false이기에 기본적으로 처음엔 false로 준다)
            let isHeader = false;
            // 11. disabled 생성 (header 부분은 값 자체를 넣을 수 없도록 고정한다. input 태그를 불능으로 만든다.)
            let disabled = false
            if (j === 0){ // 0열에 도달할 때 i 값을 부여한다
                cellData = i;
                isHeader = true; // 0열만 isheader값을 true로 바꿔준다. 
                disabled = true; // 0열만 disabled값을 true로 바꿔준다. 
            }
            // 9. 첫번재 행에 알파벳 넣기. -> defined 값은 빈 값으로 해주기 
            if (i === 0){
                cellData = alphabets[j-1]; //배열의 -1번째 같은 경우는 사실 Z가 아닌가? 
                isHeader = true;
                disabled = true;
            }
            // if (cellData <= 0) { //0행0열은 값을 부여하지 않는다. 
            //     cellData = "";
            // }
            if (!cellData) {
                cellData = "";
            }
            // 3. 문자열이 아닌 객체 데이터 생성하기 
            // spreadsheetRows.push(`${i}-${j}`);
            
            // 12. rowName, colName 설정. 왜? 선택된 객체가 어떤 행의 어떤 열에 있는 객체인지 시각적으로(text와 header 색 변화) 표현하기 위해서
            const rowName = i;
            const colName = alphabets[j-1];

            const cell = new Cell(isHeader, disabled, cellData, i, j, rowName, colName, false);
            spreadsheetRows.push(cell);
        }
        spreadsheet.push(spreadsheetRows);
    }
    drawSheet();
    console.log("spreadsheet", spreadsheet);
}

// 4. cell 요소 생성하기
// 이 함수는 parameter로 객체 하나하나를 받아야 한다. 여기서는 cell 객체이다.
function createCellEl(cell) {
    const cellEl = document.createElement('input');
    cellEl.classList.add('cell');
    cellEl.id = `cell_${cell.row}-${cell.col}`;
    cellEl.value = cell.data;
    cellEl.disabled = cell.disabled; //이 속성은 실제 input 태그의 요소에 있는 것. 그래서 미리 만들어둔다. 
    // 11. header 스타일링
    if (cell.isHeader) {
        cellEl.classList.add('header');
    }
    // 13. onclick 상태에서 색 변화
    cellEl.onclick =() => {handleCellClick(cell)};
    cellEl.onchange = (e) => handleOnChange(e.target.value, cell);
    return cellEl;
}
function handleOnChange(data, cell){
    cell.data = data;
}
function handleCellClick(cell){
    clearHeaderActiveStatet();
    const rowHeader = spreadsheet[cell.row][0];
    const colHeader = spreadsheet[0][cell.col];
    const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.col);
    const colHeaderEl = getElFromRowCol(colHeader.row, colHeader.col);
    colHeaderEl.classList.add('active');
    rowHeaderEl.classList.add('active');
    document.querySelector('#cell-status').innerHTML = cell.colName + "" + cell.rowName;
}

// 15. 하이라이트 된 부분 지우기
function clearHeaderActiveStatet(){
    const headers = document.querySelectorAll('.header');
    headers.forEach((header) => {
        header.classList.remove('active');
    })
}

// 14. col header, row header 요소 가져오기
function getElFromRowCol (row, col) {
    return document.querySelector(`#cell_${row}-${col}`);
}
// 5. 렌더링 하기
function drawSheet(){
    // 6. 요소를 1행씩 감싸주는 container 만들기
    for(let i = 0; i < spreadsheet.length; i++){
        const rowContainerEl = document.createElement('div'); //중요한 것은 상위 루프 1회 마무리되고 2회 시작 시 rowContainerEl는 초기화되어 다시 만들어 진다.
        rowContainerEl.classList.add('cell-row');
        for(let j = 0; j < spreadsheet[i].length; j++){
            const cell = spreadsheet[i][j] //객체 위치 지정
            rowContainerEl.append(createCellEl(cell)) //각 행에 객체 요소가 담기게 된다.
            spreadSheetContainer.append(rowContainerEl);
        }
    }
}