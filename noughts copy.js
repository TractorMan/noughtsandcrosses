var noughts = {


	color: "blue",
	arrWin: [["1", "2" ,"3"],["4", "5", "6"], ["7", "8", "9"], ["1", "4", "7"],["2", "5", "8"], ["3", "6", "9"], ["1", "5", "9"], ["3", "5", "7"]],
	blue: [],
	red: [],
	turns: 0,
	status: "playing",
	mode: "two",
	turn: "p1"
	
	
};

var drawBoard = function () {

	$(".board").html("");
	
	for (var i =1; i<=9; i++){
		
		
		$(".board").append("<div class='square active' id="+i+"></div>");
		
	}
	
	
};


var switchColor = function(){
	
	if (noughts.color=="red") noughts.color = "blue";
	else noughts.color = "red";
	
	if(noughts.mode =="cpu"&&noughts.turn =="cpu"){
		
		
		
		
	}
	
};


var squareFill = function () {

		
		$(".active").click(function () {
			console.log(randomSquare())
			if($(this).hasClass("active")){ 
				
				$(this).addClass(noughts.color).removeClass("active");
				noughts[noughts.color].push(event.target.id);
				noughts.turns++;
				if(checkWin(noughts[noughts.color])){
					
					alert(checkWin(noughts[noughts.color]));
					reset();
				}
				
				switchColor();
			
				
			
			}
	
	
	});
	
};

var reset = function(){
	
	noughts.blue=[];
	noughts.red=[];
	noughts.turns=0;
	main();
}


var randomSquare = function(){

	return Math.floor(Math.random()*9)+1
	
	
}

var cpuPlay = function(){
	var color = noughts.color;
	var arr = noughts.blue.concat(noughts.red);
	console.log(arr);
	
	
	var num = randomSquare()+"";
	if (arr.indexOf(num)>=1){
		
		cpuPlay();
		
	}
	
	$("#"+num).addClass(noughts.color).removeClass("active");
	noughts[color].push(num);
	noughts.turns++;
		
	
}


var checkWin = function(arr){
	
	
	for(var i = 0; i<noughts.arrWin.length; i++){
		
	if (arr.indexOf(noughts.arrWin[i][0])>=0&& arr.indexOf(noughts.arrWin[i][1])>=0 &&arr.indexOf(noughts.arrWin[i][2])>=0) return(noughts.color+" wins");
	
	}

	if(noughts.turns==9) return "draw";
	return false;
};


var main = function(){
	drawBoard();
	
	squareFill();

};




$(document).ready(main);