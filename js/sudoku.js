const b = null
// Levels

    var arrEasy = [[[3,3],[4,5],[5,6],[7,4],[8,7],[13,3],[14,4],[15,2],[18,1],[20,2],[22,1],[23,9],[24,7],[28,4],[29,3],[33,6],[34,8],[35,1],[37,2],[39,6],[40,8],[44,9],[46,9],[51,3],[53,6],[58,6],[60,5],[61,1],[62,2],[63,3],[65,5],[66,8],[69,9],[70,7],[75,2],[77,3],[78,4],[79,5]],
                  [[1,9],[6,7],[11,5],[12,1],[14,9],[15,4],[16,7],[17,2],[19,4],[21,3],[28,8],[28,6],[29,8],[32,2],[33,3],[34,4],[35,7],[38,3],[39,4],[40,5],[43,1],[44,6],[46,2],[47,1],[51,6],[52,5],[58,4],[60,2],[62,1],[65,4],[66,2],[68,5],[70,6],[73,1],[74,9],[75,7],[79,2],[80,5]]]

    var arrMedium = [[[2,3],[10,7],[13,3],[17,8],[19,1],[22,2],[23,8],[24,4],[26,3],[29,2],[30,9],[32,6],[33,3],[36,8],[39,8],[40,4],[42,5],[44,2],[45,6],[46,5],[50,2],[57,4],[59,7],[61,5],[64,2],[65,5],[69,6],[80,7]],
                  [[2,1],[4,3],[6,9],[7,5],[8,4],[9,7],[10,4],[13,1],[22,2],[25,6],[26,9],[31,4],[34,8],[35,7],[39,5],[45,4],[47,7],[50,8],[51,2],[54,5],[55,5],[56,3],[57,1],[60,7],[63,9],[64,6],[79,3],[80,1]]]

    var arrHard = [[[1,8],[11,3],[12,6],[20,7],[23,9],[25,2],[29,5],[33,7],[41,4],[42,5],[43,7],[49,1],[53,3],[57,1],[62,6],[63,8],[66,8],[67,5],[71,1],[74,9],[40,8],[79,4]],
                  [[3,5],[4,3],[10,8],[17,2],[20,7],[23,1],[25,5],[28,4],[33,5],[34,3],[38,1],[41,7],[45,6],[48,3],[49,2],[53,8],[56,6],[58,5],[63,9],[66,4],[71,3],[78,9],[79,7]]]

function easy(){
  for (var i = 1; i <= 81; i++) {
    document.getElementById(String(i)).value = ''
  }
var x = Math.floor((Math.random() * arrEasy.length));
var a=arrEasy[x];
  for (var i = 0; i < a.length; i++) {
    document.getElementById(String(a[i][0])).value = (a[i][1])
  }
}

function medium(){
  for (var i = 1; i <= 81; i++) {
    document.getElementById(String(i)).value = ''
  }
var x = Math.floor((Math.random() * arrMedium.length));
var a=arrMedium[x];
  for (var i = 0; i < a.length; i++) {
    document.getElementById(String(a[i][0])).value = (a[i][1])
  }
}


function hard(){
  for (var i = 1; i <= 81; i++) {
    document.getElementById(String(i)).value = ''
  }
let x = Math.floor((Math.random() * arrHard.length));
var a=arrHard[x];
  for (var i = 0; i < a.length; i++) {
    document.getElementById(String(a[i][0])).value = (a[i][1])
  }
}


//
function initiate() {
  var startTime = performance.now()
  var startingBoard = [
    []
  ]
  var j = 0
  for (var i = 1; i <= 81; i++) {
    const val = document.getElementById(String(i)).value
    if (val == "") {
      startingBoard[j].push(null)
    } else {
      startingBoard[j].push(Number(val))
    }
    if (i % 9 == 0 && i < 81) {
      startingBoard.push([])
      j++
    }
  }
  const inputValid = validBoard(startingBoard)
  if (!inputValid) {
    inputIsInvalid()
  } else {
    const answer = solve(startingBoard)
    updateBoard(answer, inputValid)
  }


  var endTime = performance.now()
  document.getElementById("time").innerHTML = (`${(endTime - startTime).toFixed(4)} milliseconds`)
}

function solve(board) {
  if (solved(board)) {
    return board
  } else {
    const possibilities = nextBoards(board)
    const validBoards = keepOnlyValid(possibilities)
    return searchForSolution(validBoards)
  }
}


function searchForSolution(boards) {
  if (boards.length < 1) {
    return false
  } else {
    var first = boards.shift()
    const tryPath = solve(first)
    if (tryPath != false) {
      return tryPath
    } else {
      return searchForSolution(boards)
    }
  }
}


function solved(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return false
      }
    }
  }
  return true
}


function nextBoards(board) {
  var res = []
  const firstEmpty = findEmptySquare(board)
  if (firstEmpty != undefined) {
    const y = firstEmpty[0]
    const x = firstEmpty[1]
    for (var i = 1; i <= 9; i++) {
      var newBoard = [...board]
      var row = [...newBoard[y]]
      row[x] = i
      newBoard[y] = row
      res.push(newBoard)
    }
  }
  return res
}

function findEmptySquare(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return [i, j]
      }
    }
  }
}

function keepOnlyValid(boards) {
  var res = []
  for (var i = 0; i < boards.length; i++) {
    if (validBoard(boards[i])) {
      res.push(boards[i])
    }
  }
  return res
}


function validBoard(board) {
  return rowsGood(board) && columnsGood(board) && boxesGood(board)
}

function rowsGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = []
    for (var j = 0; j < 9; j++) {
      if (cur.includes(board[i][j])) {
        return false
      } else if (board[i][j] != null ) {
        if(board[i][j]<1 || board[i][j]>9){
           return false;}
        cur.push(board[i][j])
      }
    }
  }
  return true
}

function columnsGood(board) {
  for (var i = 0; i < 9; i++) {
    var cur = []
    for (var j = 0; j < 9; j++) {
      if (cur.includes(board[j][i])) {
        return false
      } else if (board[j][i] != null) {
        cur.push(board[j][i])
      }
    }
  }
  return true
}


function boxesGood(board) {
  const boxCoordinates = [[0, 0],[0, 1],[0, 2],
                          [1, 0],[1, 1],[1, 2],
                          [2, 0],[2, 1],[2, 2]]
  for (var y = 0; y < 9; y += 3) {
    for (var x = 0; x < 9; x += 3) {
      var cur = []
      for (var i = 0; i < 9; i++) {
        var coordinates = [...boxCoordinates[i]]
        coordinates[0] += y
        coordinates[1] += x
        if (cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false
        } else if (board[coordinates[0]][coordinates[1]] != null) {
          cur.push(board[coordinates[0]][coordinates[1]])
        }
      }
    }
  }
  return true
}

function updateBoard(board) {
  if (board == false) {
    for (i = 1; i <= 9; i++) {
      document.getElementById("row " + String(i)).innerHTML = "NO SOLUTION EXISTS TO THE GIVEN BOARD"
    }
  } else {
    for (var i = 1; i <= 9; i++) {
      var row = ""
      for (var j = 0; j < 9; j++) {
        if (row == "") {
          row = row + String(board[i - 1][j])
        } else {
          row = row + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + String(board[i - 1][j])
        }
      }
      document.getElementById("row " + String(i)).innerHTML = row
    }
  }
}

function inputIsInvalid() {
  for (i = 1; i <= 9; i++) {
    document.getElementById("row " + String(i)).innerHTML = "THE GIVEN BOARD IS INVALID"
  }
}
