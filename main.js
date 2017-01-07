/* global $ */
//initialize variables for the card game

var memoryArray = ['Brewster', 'Brewster', 'Celeste', 'Celeste', 'Chip', 'Chip', 'Cyrus', 'Cyrus', 'Grams', 'Grams', 'Gulliver', 'Gulliver', 'Isabelle', 'Isabelle', 'Kicks', 'Kicks','KKSlider', 'KKSlider', 'TomNook', 'TomNook', 'Porter', 'Porter', 'Sable', 'Sable' ];

var memoryValues = []
var memoryTileIds = []
var tilesFlipped = 0
var currentPlayer = 1

//for the timer
var timerId = 0
var seconds = 0
var player1time = 0
var player2time = 0

//fisher yates shuffle modern algorithm programming for unbiased shuffle
Array.prototype.memoryTileShuffle = function(){
    var i = this.length, j, temp
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1))
        temp = this[j]
        this[j] = this[i]
        this[i] = temp
    }
}

//to generate shuffled cards
function newBoard(){
	tilesFlipped = 0
	var output = ''
  memoryArray.memoryTileShuffle()
	for (var i = 0 i < memoryArray.length i++) {
		output += '<div class="front" id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memoryArray[i]+'\')"></div>'
  }
	document.getElementById('memoryBoard').innerHTML = output
  console.log(output)
}


//logic to flip over cards
//this takes in the tile that is flipped over and the value on the tile that is flipped over
function memoryFlipTile(tile,val){
//will only start if the memoryValues or the flipped over tiles are less than 2
	if((tile.innerHTML === "") && (memoryValues.length < 2)){
    console.log("what is" + tile)
    //only then the tiles will be set to background white and given a value from the shuffle
		tile.style.background = "#FFF url('./pictures/"+val+".png') center no-repeat"
    tile.style.backgroundSize = "80% 80%"
		// tile.innerHTML = val --> not used
    // display selected character separately
    $("#anclChar").text("You have selected " + val)
    //checks that the flipped over tile array is empty & will push in the flipped over tile value
		if(memoryValues.length === 0){
			memoryValues.push(val)
      console.log("val pushed " + val)
			memoryTileIds.push(tile.id)
      console.log("tile id pushed " + tile.id)
      //however, if it is not empty, it will then check if the memory values are matched
		} else if (memoryValues.length === 1){
			memoryValues.push(val)
			memoryTileIds.push(tile.id)
			if(memoryValues[0] == memoryValues[1]){
				tilesFlipped += 2
				// Clear both arrays to restart the comparison
				memoryValues = []
        memoryTileIds = []
				// Check to see if the whole board is cleared and generate new board after alert
				if(tilesFlipped === memoryArray.length){
          if (currentPlayer === 1) {
            player1time = seconds
            $("#player1time").text("Player 1: " + player1time + "s")
            clearInterval(timerId)
            // document.getElementById('memoryBoard').innerHTML = ""
            setTimeout(function () {
              alert("Board cleared... click start for next player.")
              restart()
              currentPlayer = 2
            } ,2000)
          } else {
            player2time = seconds
            $("#player2time").text("Player 2: " + player2time + "s")
            clearInterval(timerId)
            setTimeout(function () {
              endGame()
              // alert("This is the end of the game.")
            } ,1000)
          }
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over if both are not a match
				    var tile1 = document.getElementById(memoryTileIds[0])
				    var tile2 = document.getElementById(memoryTileIds[1])
				    tile1.style.background = '#FFF url(anclLogo.png) center no-repeat'
            tile1.style.backgroundSize = "80% 60%"
            	    tile1.innerHTML = ""
				    tile2.style.background = '#FFF url(anclLogo.png) center no-repeat'
            tile2.style.backgroundSize = "80% 60%"
            	    tile2.innerHTML = ""

				    // Clear both arrays
				    memoryValues = []
            memoryTileIds = []
				}
				setTimeout(flip2Back, 1000)
			}
		}
	}
}

function updateTime() {
  //increase seconds
  //inserts that value into the <h1> element with id="timer"
    seconds = seconds + 1
    $("#timer").text("Player :" + currentPlayer + ". Time elapsed: "+ seconds + "s")
}

function endGame() {
  if (currentPlayer === 2) {
    if (player1time > player2time) {
      // $("#timer").text("Player 2 wins")
      alert("This is the end of the game. Player 2 wins.")
    } else {
      // $("#timer").text("Player 1 wins")
      alert("This is the end of the game. Player 1 wins.")
    }
  }
}

$("#start").on("click", function() {
  console.log("start")
  console.log(currentPlayer)
  newBoard()
  timerId = setInterval(updateTime, 1000)
})

function restart() {
  $("#anclChar").text("Selected Character")
  $("#timer").text("Get Ready Player")
  clearInterval(timerId)
  newBoard()
  seconds = 0
  currentPlayer = 1
}

$("#restart").on("click", function() {
  console.log("retart")
  console.log(currentPlayer)
  restart()
})
