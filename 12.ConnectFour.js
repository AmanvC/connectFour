var p1 = prompt('Player One: Enter Your Name , you will be Blue');
var colorp1 = 'rgb(86, 151, 255)';

var p2 = prompt('Player Two: Enter Your Name, you will be Red')
var colorp2 = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr');

function reportWin(rowNum, colNum){
  console.log('You won starting at this row, col');
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
  return table.eq(rowIndex).find('td').eq('colIndex').find('button').css('background-color', color);
  //selects 1st row index    find all td    select 1st col index    find the respective button     change bg color of button and not bg color of td
}

function returnColor(rowIndex, colIndex){
  return table.eq(rowIndex).find('td').eq('colIndex').find('button').css('background-color');
}

function checkBottom(colIndex){
  var colorReport = returnColor(5, colIndex);
  for( var row = 5; row >= 0; row--){
    colorReport = returnColor(row, colIndex);
    if(colorReport === 'rgb(128, 128, 128)'){
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four){
  return (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one !== undefined)
}

function horizontalWinCheck(){
  for( var row = 0; row < 6 ; row++){
    for( var col = 0; col < 4; col++){
      if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row, col+3))){
        console.log('horizontal');
        reportWin(row, col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function verticalWinCheck(){
  for( var col = 0; col < 7; col++){
    for( var row = 0; row < 3; row++){
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
        console.log('vertical');
        reportWin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

function diagonalWinCheck(){
  for(var row = 0; row < 5; row++){
    for(var col=0; col<7; col++){
      if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))){
        console.log('diagonal');
        reportWin(row,col);
        return true;
      }else if(colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1), returnColor(row-2,col+2), returnColor(row-3,col+3))){
        console.log('diagonal');
        reportWin(row,col);
        return true;
      }else{
        continue;
      }
    }
  }
}

//Start with player 1
var currentPlayer = 1;
var currentName = p1;
var currentColor = colorp1;

$('h3').text(player1+" it is your turn, pick a column to drop in!");


$('.board button').on('click', function(){
  var col = $(this).closest('td').index();
  var bottomAvail = checkBottom(col);
  changeColor(bottomAvail, col, currentColor);
  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
    $('h1').text(currentName+ 'You have won');
    $('h2').fadeOut('fast');
    $('h3').fadeOut('fast');
  }
  currentPlayer = currentPlayer * -1;
  if(currentPlayer === 1){
    currentName = p1;
    $('h3').text(currentName+" it is your turn");
    currentColor = colorp1;
  }else{
    currentName = p2;
    $('h3').text(currentName+" it is your turn")
    currentColor = colorp2;
  }
})
