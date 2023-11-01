const spreadsheetContainer = document.querySelector('#spreadsheet-container');
const btnExportingSpreadsheet = document.querySelector('#export-btn');
const sellectedCellInfo = document.querySelector('#cell-status');
const numOfRows = 10;
const numOfCols = 10;
const spreadsheetArray = [];
// 3. 문자열이 아닌 객체 데이터 생성하기
class Cell {
    constructor(row, col, cellName, cellData, isHeader) {
        this.row = row;
        this.col = col;
        this.cellName = cellName;
        this.cellData = cellData;
        this.isHeader = isHeader;
    }
}
creatTable();

function creatTable(){
    for (i = 0; i < numOfRows; i++){
        const rowList = []
        for(j = 0; j < numOfCols; j++){
            const cellName = `${i}-${j}`;
            const cell = new Cell(i, j, cellName, "", false);
            rowList.push(cell);
        }
        spreadsheetArray.push(rowList);
    }
    // console.log(spreadsheetArray);
    creatCellElement();
};

function creatCellElement(){
    for(i = 0; i < spreadsheetArray.length; i++){
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row-container');
        for(j = 0; j < spreadsheetArray[0].length; j++) {
            const cellElement = document.createElement('input');
            cellElement.classList.add('cell');
            rowContainer.append(cellElement);
        }
        spreadsheetContainer.append(rowContainer);
    }
}
// 클래스 정의 되어야지만 객체 생성 가능. Uncaught ReferenceError: Cannot access 'Cell' before initialization at initSpreadSheet
// 1. 필요한 상수 생성하기
// 2. 기본 데이터 생성하기
// 3. 문자열이 아닌 객체 데이터 생성하기 
// 4. cell 요소 생성하기
// 5. 렌더링 하기
// 6. 요소를 1행씩 감싸주는 container 만들기
// 7. cell 스타일 생성하기 
// 8. 첫번째 열에 숫자 넣기
// 9. 첫번재 행에 알파벳 넣기. -> defined 값은 빈 값으로 해주기 
// 10. 헤더 행성 (헤더인지 여부에 따라서 active 여부가 결정된다. 대부분 header를 제외하고 나머지는 false이기에 기본적으로 처음엔 false로 준다)
// 11. disabled 생성 (header 부분은 값 자체를 넣을 수 없도록 고정한다. input 태그를 불능으로 만든다.)
// 11. header 스타일링
// 12. rowName, colName 설정. 왜? 선택된 객체가 어떤 행의 어떤 열에 있는 객체인지 시각적으로(text와 header 색 변화) 표현하기 위해서
// 13. onclick 상태에서 색 변화
// 14. col header, row header 요소 가져오기
// 15. 하이라이트 된 부분 지우기
