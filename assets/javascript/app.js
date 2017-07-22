
var app = {

	// Variables

	correctCount: 0,
	wrongCount: 0,

	timer: {
		intervalId: null,
		timerRunning: false,
		timeRemaining: 30,
		updateHTML: function () {
			$('#timer').html(app.timer.timeRemaining);
		},
		startTimer: function () {
			if (!app.timer.timerRunning) {
				app.timer.intervalId = setInterval(app.timer.timeMinus, 1000);
				app.timer.timerRunning = true;
			};
		},
		stopTimer: function () {
			clearInterval(app.timer.intervalId);
			app.timer.timerRunning = false;
		},

		timeMinus: function () {
			app.timer.timeRemaining--;
			app.timer.updateHTML();
			if (app.timer.timeRemaining < 1) {
				app.timer.stopTimer();
				app.wrongAnswer();
			};
		},

		reset: function () {
			app.timer.timeRemaining = 30;
		}

	},
	currentQuestionIndex: 0,

	questions: [
		{
			questionText: "the answer is number 1",
			possibleAnswers: [
				{
					answer: "blay blabyablaybablyablaybalyblayb",
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
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
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
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
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
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
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
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
		}
	],

	genQuestionHTML: function () {
		var index = app.currentQuestionIndex;
		var curQest = app.questions[index];
		$('.question').html('<p>' + app.questions[index].questionText + '</p>');
		for (var i = 0; i < curQest.possibleAnswers.length; i++) {

			var newButton = $('<button>');
			newButton.attr("class", "btnAnswer");
			newButton.attr("data-correct", curQest.possibleAnswers[i].correct);
			newButton.text(curQest.possibleAnswers[i].answer);
			$('.question').append($('<p>').html(newButton));

		};

	},

	correctAnswer: function (answer) {

		var crtAns = $('<p>');
		crtAns.html(answer);
		var ansImg = $('<img>');
		ansImg.attr('src', app.questions[app.currentQuestionIndex].answerCorrectPic);
		ansImg.attr('alt', 'correct-image');
		$('.question').append(crtAns);
		$('.question').append(ansImg);



	},

	wrongAnswer: function(answer){

		var crtAns = $('<p>');
		crtAns.html(answer);
		var ansImg = $('<img>');
		ansImg.attr('src', app.questions[app.currentQuestionIndex].answerWrongPic);
		ansImg.attr('alt', 'correct-image');
		$('.question').append(crtAns);
		$('.question').append(ansImg);
	}
};

$('document').ready( function(){

$('.btnStart').on('click', function () {
	app.genQuestionHTML();
	app.timer.startTimer();
});

$("body").on('click', '.btnAnswer', function() {
	console.log("clicked");
	console.log(this);
	var answer = $(this).attr('data-correct');
	console.log(answer);
	if (answer == 'true') {
		app.correctAnswer("Correct");
	} else {
		app.wrongAnswer("Wrong");
	};
});

});