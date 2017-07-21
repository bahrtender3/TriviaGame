
var app = {

	// Variables

	correctCount: 0,
	wrongCount: 0,

	timer: {
		intervalId: null,
		timerRunning: false,
		timeRemaining: 30,
		updateHTML: function(){
			$('#timer').html(app.timer.timeRemaining);
		},
		startTimer: function(){
			if(!app.timer.timerRunning){
				app.timer.intervalId = setInterval(app.timer.timeMinus, 1000);
				app.timer.timerRunning = true;
				
			};
		},
		stopTimer: function(){
			clearInterval(app.timer.intervalId);
			app.timer.timerRunning = false;
		},

		timeMinus: function(){
			app.timer.timeRemaining --;
			app.timer.updateHTML();
		},

		reset: function(){
			app.timer.timeRemaining = 30;
		}

	},
	currentQuestionIndex: 0,

	questions: [
		{
			questionText: "the answer is number 1",
			possibleAnswers: [
				{
					answer: "1",
					correct: true,
				},
				{
					answer: "2",
					correct: false,
				},
				{
					answer: "3",
					correct: false,
				},
				{
					answer: "4",
					correct: false,
				}
			],
			answerCorrectPic: "../images/correct.gif",
			answerWrongPic: "../images/wrong.gif"
		},
		{
			questionText: "the answer is number 2",
			possibleAnswers: [
				{
					answer: "1",
					correct: false,
				},
				{
					answer: "2",
					correct: true,
				},
				{
					answer: "3",
					correct: false,
				},
				{
					answer: "4",
					correct: false,
				}
			],
			answerCorrectPic: "../images/correct.gif",
			answerWrongPic: "../images/wrong.gif"
		},
		{
			questionText: "the answer is number 3",
			possibleAnswers: [
				{
					answer: "1",
					correct: false,
				},
				{
					answer: "2",
					correct: false,
				},
				{
					answer: "3",
					correct: true,
				},
				{
					answer: "4",
					correct: false,
				}
			],
			answerCorrectPic: "../images/correct.gif",
			answerWrongPic: "../images/wrong.gif"
		},
		{
			questionText: "the answer is number 4",
			possibleAnswers: [
				{
					answer: "1",
					correct: false,
				},
				{
					answer: "2",
					correct: false,
				},
				{
					answer: "3",
					correct: false,
				},
				{
					answer: "4",
					correct: true,
				}
			],
			answerCorrectPic: "../images/correct.gif",
			answerWrongPic: "../images/wrong.gif"
		}
	],

	genQuestionHTML: function(){
		var index = app.currentQuestionIndex;
		var curQest = app.questions[index];
		$('.question').html('<p>' + app.questions[index].questionText + '</p>');
		for (var i = 0; i < curQest.possibleAnswers.length; i++) {
			
			var newButton = $('<button>');
			newButton.addClass("btnAnswer");
			newButton.attr("data-correct", curQest.possibleAnswers[i].correct);
			newButton.text(curQest.possibleAnswers[i].answer);
			$('.question').append($('<p>').html(newButton));		
			
		};
		 
	}
};

console.log("//-----------------------------------------working");
app.timer.startTimer();
console.log("1");
app.genQuestionHTML();
console.log("2");







