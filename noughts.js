var noughts = {


	color: "red",
	arrWin: [["1", "2" ,"3"],["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"],["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]], //stores the winning positions
	blue: [], //stores blue positions
	red: [], //stores red positions
	turns: 0,  
	status: "playing", 
	mode: "cpu", 
	turn: "player"
	
	
};

var drawBoard = function () {

	$(".board").html("");
	
	for (var i =1; i<=9; i++){
		
		
		$(".board").append("<div class='square active' id="+i+"></div>"); //adds the squares and gives them id's of 1-9 (strings)
		
	}
	
	
};

var buttonPress = function(){
	
	
		
		$(".button").click(function(){
			switchMode();
			console.log(noughts.mode)
			$(this).text(noughts.mode);
	
		});

	
};

var switchMode = function(){
	
	if(noughts.mode=="cpu") noughts.mode="two"
		else if(noughts.mode=="two") noughts.mode="cpu";

	drawBoard();
	playerPlay();
	reset();
	

}


var switchColor = function(){
	
	if (noughts.color=="red") noughts.color = "blue";
	else noughts.color = "red";
	
	if(noughts.mode =="cpu"&&noughts.turn =="player"){
			
			noughts.turn="cpu";
			setTimeout(cpuPlay,100);
			
	};
	
};


var playerPlay = function () {

		
		$(".active").click(function () {
			console.log(randomSquare())
			if($(this).hasClass("active")){ 
				
				$(this).addClass(noughts.color).removeClass("active");
				noughts[noughts.color].push(event.target.id);
				noughts.turns++;
				if(checkWin(noughts[noughts.color])){
					
					setTimeout(function(){alert(checkWin(noughts[noughts.color]));
					reset()},100)
					return;
					
				}
				
				
				noughts.turn="player";
				
				switchColor();
			
				
			
			}
	
	
	});
	
};

var reset = function(){
	drawBoard();
	playerPlay();
	noughts.blue=[];
	noughts.red=[];
	noughts.turns=0;
	
};


var randomSquare = function(){

	return Math.floor(Math.random()*9)+1
	
	
}

var cpuPlay = function(){
	var color = noughts.color;
	var arr = noughts.blue.concat(noughts.red); //create one array with every used board
	
	
	
	var num = randomSquare()+""; //get a number from one to nine and make it a string (because the )
	if (arr.indexOf(num)==-1){
		
		$("#"+num).addClass(noughts.color).removeClass("active");
		noughts[color].push(num);
		noughts.turns++;
	
		if(checkWin(noughts[color])){
			
			alert(checkWin(noughts[color]));
		
			reset();
			
		}
		
		switchColor();
	}
	
	else cpuPlay();

		
	
}


var checkWin = function(arr){
	
	
	for(var i = 0; i<noughts.arrWin.length; i++){
		
	if (arr.indexOf(noughts.arrWin[i][0])>=0&& arr.indexOf(noughts.arrWin[i][1])>=0 &&arr.indexOf(noughts.arrWin[i][2])>=0) return(noughts.color+" wins");
	
	}

	if(noughts.turns==9) return "draw";
	return false;
};


var switchSwitch = function(){
	
	
	$(".mode").click(function(){
		
		$(this).toggleClass("left right")
		switchMode();
		
	})
	
	$(".color").click(function(){
		
		$(this).toggleClass("left right")
		if (noughts.color=="red") noughts.color = "blue";
		else noughts.color = "red";
		reset();
		
	})
	
	
};


var main = function(){
	drawBoard();
	
	playerPlay();
	buttonPress();
	switchSwitch ();

};




$(document).ready(main);