/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundscore, activeplayer, dice,gamePlaying;
init();



document.querySelector('#current-'+ activeplayer).textContent=dice;

document.querySelector('.btn-roll').addEventListener('click',function(){
	if(gamePlaying){
	//1. Random number is generated
	
	 dice = Math.floor(Math. random()*6) +1;
	 
	//2. rendering the corresponding dice image
	var diceDOM = document.querySelector('.dice');

	diceDOM.style.display='block';
	diceDOM.src= 'dice-'+ dice+'.png';

	//3.
 	if(dice!==1){

 		roundscore += dice;
 		document.querySelector('#current-'+ activeplayer).textContent=roundscore;
 		
 	}else{
 		//next player
 		nextPlayer();

 	}
 }
});

	document.querySelector('.btn-hold').addEventListener('click',function(){
		if(gamePlaying){
		//add current to global
		score[activeplayer] += roundscore;
		//update UI
		document.querySelector('#score-'+ activeplayer).textContent=score[activeplayer];
		if(score[activeplayer]>=100){
			gamePlaying =false;
			document.querySelector('#name-'+ activeplayer).textContent="Winner!";
			document.querySelector('.player-'+activeplayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activeplayer+'-panel').classList.add('winner');
		    document.querySelector('.dice').style.display='none';
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
		document.querySelector('.dice').style.display='none';
	}

	document.querySelector('.btn-new').addEventListener('click',init);

	function init(){
		gamePlaying=true;
		score = [0,0];
		activeplayer= 0;
		roundscore=0;

		document.querySelector('.dice').style.display='none';
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