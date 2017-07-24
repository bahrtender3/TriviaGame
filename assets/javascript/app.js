
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

			if (app.timer.timerRunning) {
				clearInterval(app.timer.intervalId);
				app.timer.timerRunning = false;
			};
		},

		timeMinus: function () {
			app.timer.timeRemaining--;
			app.timer.updateHTML();
			if (app.timer.timeRemaining < 1) {
				app.timer.stopTimer();
				app.wrongAnswer("Time Ran Out!");
			};
		},

		reset: function () {
			app.timer.timeRemaining = 30;
		}

	},
	currentQuestionIndex: 0,

	questions: [
		{
			questionText: 'What does the word "Dinosaur" mean?',
			possibleAnswers: [
				{
					answer: "Terrible Lizard",
					correct: true,
				},
				{
					answer: "Terrible Breath",
					correct: false,
				},
				{
					answer: "Terrible Two's",
					correct: false,
				},
				{
					answer: "Terribly Old",
					correct: false,
				}
			],
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
		},
		{
			questionText: "One of the heaviest dinosaurs, Brachiosaurus, weighed the same as?",
			possibleAnswers: [
				{
					answer: "10 Rhinos",
					correct: false,
				},
				{
					answer: "17 African Elephants",
					correct: true,
				},
				{
					answer: "12 Polar Bears",
					correct: false,
				},
				{
					answer: "Your Mom",
					correct: false,
				}
			],
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
		},
		{
			questionText: "An adult Stegosaurus had a brain the size of a... ?",
			possibleAnswers: [
				{
					answer: "Small Car",
					correct: false,
				},
				{
					answer: "BasketBall",
					correct: false,
				},
				{
					answer: "Lime",
					correct: true,
				},
				{
					answer: "Walnut",
					correct: false,
				}
			],
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
		},
		{
			questionText: "In which continent was the Velociraptor first found?",
			possibleAnswers: [
				{
					answer: "Americas",
					correct: false,
				},
				{
					answer: "Austrailia",
					correct: false,
				},
				{
					answer: "Africa",
					correct: false,
				},
				{
					answer: "Asia",
					correct: true,
				}
			],
			answerCorrectPic: "assets/images/correct.gif",
			answerWrongPic: "assets/images/wrong.gif"
		}
	],

	genQuestionHTML: function () {
		var index = app.currentQuestionIndex;
		if (index < app.questions.length){
			var curQest = app.questions[index];
			$('.question').html("<h3>Time Remaining: <span id='timer'></span> Seconds</h3>")
			$('.question').append('<h4 class="question-text">' + app.questions[index].questionText + '</p>');
			for (var i = 0; i < curQest.possibleAnswers.length; i++) {

				var newButton = $('<button>');
				newButton.attr("class", "btnAnswer");
				newButton.attr("data-correct", curQest.possibleAnswers[i].correct);
				newButton.text(curQest.possibleAnswers[i].answer);
				$('.question').append($('<p>').html(newButton));

			};
			app.timer.reset();
			app.timer.startTimer();
		} else {
			$('.question').html("<h3>Results:</h3>");
			var percentage = (app.correctCount/app.questions.length);
			percentage = (percentage*100).toFixed(1) + "%";
			$('.question').append("<h3 class='percent'>" + percentage + "</h3>");
			$('.question').append("<h3 class='correct'> Correct: " + app.correctCount + "</h3>");
			$('.question').append("<h3 class='wrong'> Wrong: " + app.wrongCount + "</h3>");

			var button = $('<button class="btnRestart">');
			button.text("Restart");
			$('.question').append(button);
		};

	},

	correctAnswer: function (answer) {

		app.timer.stopTimer();
		var crtAns = $('<h3>');
		crtAns.html(answer);
		var ansImg = $('<img>');
		ansImg.attr('src', app.questions[app.currentQuestionIndex].answerCorrectPic);
		ansImg.attr('alt', 'correct-image');
		$('.question').html(crtAns);
		$('.question').append(ansImg);
		app.currentQuestionIndex++;
		app.correctCount++;
		setTimeout(app.genQuestionHTML, 3000);

	},

	wrongAnswer: function(answer){

		app.timer.stopTimer();
		var crtAns = $('<h3>');
		crtAns.html(answer);
		var ansImg = $('<img>');
		ansImg.attr('src', app.questions[app.currentQuestionIndex].answerWrongPic);
		ansImg.attr('alt', 'correct-image');
		$('.question').html(crtAns);
		$('.question').append(ansImg);
		app.currentQuestionIndex++;
		app.wrongCount++;
		setTimeout(app.genQuestionHTML, 3000);

	}
};

$('document').ready(function () {

	$('.btnStart').on('click', function () {
		app.genQuestionHTML();
		// app.timer.startTimer();
	});

	$("body").on('click', '.btnAnswer', function () {

		var answer = $(this).attr('data-correct');
		if (answer == 'true') {
			app.correctAnswer("Correct");
		} else {
			app.wrongAnswer("Wrong");
		};
	});

	$("body").on('click', '.btnRestart', function () {

		app.correctCount = 0;
		app.wrongCount = 0;
		app.currentQuestionIndex = 0;
		app.genQuestionHTML();
	});

});