/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundscore, activeplayer, dice1, dice2, gamePlaying, prevdice;
init();





document.querySelector('.btn-roll').addEventListener('click',function(){
	if(gamePlaying){
	//1. Random number is generated
	
	 dice1 = Math.floor(Math. random()*6) +1;
	 dice2 = Math.floor(Math. random()*6) +1;
	//2. rendering the corresponding dice image
	document.getElementById('dice-1').style.display="block";
	document.getElementById('dice-2').style.display="block";
	document.getElementById('dice-1').src= 'dice-'+ dice1+'.png';
	document.getElementById('dice-2').src= 'dice-'+ dice2+'.png';
	//3. 
 	
 	// 	if(dice === 6 && prevdice === 6){
 		
 	// 	//console.log('number becomes 0');
 	// 	score[activeplayer]=0;
 	// 	document.querySelector('#score-'+ activeplayer).textContent='0';
 	// 	nextPlayer();

 	// }else if
 	if(dice1!==1 && dice2!==1){

 		roundscore += dice1+dice2;
 		document.querySelector('#current-'+ activeplayer).textContent=roundscore;
 		
 	}else{
 		//next player
 		nextPlayer();
 		
 	}
 // 	prevdice=dice;
  }
});

	document.querySelector('.btn-hold').addEventListener('click',function(){
		if(gamePlaying){
		//add current to global
		score[activeplayer] += roundscore;
		//update UI
		document.querySelector('#score-'+ activeplayer).textContent=score[activeplayer];

		var input=document.querySelector('.final-score').value;

		var winningScore;
		if(input){
			winningScore=input;
		}else{
			winningScore=100;
		}
		if(score[activeplayer]>=winningScore){
			gamePlaying =false;
			document.querySelector('#name-'+ activeplayer).textContent="Winner!";
			document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner');
		    document.getElementById('dice-1').style.display='none';
		    document.getElementById('dice-2').style.display='none';
		}else{
			// next player
		nextPlayer();
		}
		}
	});

	function nextPlayer(){
		
		//next player
 		activeplayer === 0 ? activeplayer =1 : activeplayer = 0;
 		roundscore=0;

 		document.getElementById('score-0').textContent=score[0];
 		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
	    document.getElementById('dice-1').style.display='none';
	    document.getElementById('dice-2').style.display='none';
	}

	document.querySelector('.btn-new').addEventListener('click',init);

	function init(){
		gamePlaying=true;
		score = [0,0];
		activeplayer= 0;
		roundscore=0;
		//document.querySelector('#current-'+ activeplayer).textContent=dice;
	    document.getElementById('dice-1').style.display='none';
	    document.getElementById('dice-2').style.display='none';
		document.getElementById('score-0').textContent='0';
		document.getElementById('score-1').textContent='0';
		document.getElementById('current-0').textContent='0';
		document.getElementById('current-1').textContent='0';
		document.getElementById('name-0').textContent="Player 1";
		document.getElementById('name-1').textContent="Player 2";
		document.querySelector('.player-0-panel').classList.remove('winner');
		document.querySelector('.player-1-panel').classList.remove('winner');
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.player-0-panel').classList.add('active');
	}