(function(){
	

function Question(question, answer, correct) {
	this.question = question;
	this.answers = answer;
	this.correct = correct;
}

Question.prototype.displayQuestion= function() {
	console.log(this.question);
	for(var i=0; i< this.answers.length; i++){
	console.log(i+':'+this.answers[i]);
	}
}
Question.prototype.checkAnswer = function(ans, callback) {
	if(ans == this.correct){
	    console.log('Correct answer')
	    sc = callback(true);
	    console.log(sc);

	}
	else {
		console.log('Wrong Answer. Try again!')
		sc = callback(false);
		console.log(sc);
	}
	this.displayScore(sc);
}

Question.prototype.displayScore= function(score) {
	console.log('Your current score is:' + score);
	
	}
	var q1= new Question('Who are you?',['Robot','Human'], 0 );
	var q2= new Question('Who\'s your favourite?',['Harry','Ron', 'Hermoine'], 0 );
	var q3= new Question('Focus is on?',['Eating', 'Sleeping','Learning'], 2);
	var questions = [q1,q2,q3];

function score() {
	var sc=0;
	return function (correct){
		if(correct){
		sc++;
		} 
		return sc;
	}
}
var keepScore = score();
function nextQuestion(){

	var n= Math.floor(Math.random(0) * questions.length);
	questions[n].displayQuestion();

	var answer=prompt('Please select the correct answer');
	
	if(answer !== 'exit') {
	questions[n].checkAnswer(parseInt(answer),keepScore);
	nextQuestion();
	}

}
nextQuestion();	
})();

