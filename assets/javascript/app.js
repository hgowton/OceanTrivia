var card = $("#quiz-area");
var score = $("#results-area")
var countStart = 30;
var correct = 0;
var incorrect = 0;
var currentQuestion = 0;

//Question Array
var questions = [{
    question: "Our oceans cover more than ______ of the Earth’s surface.",
    answers: ["60%", "65%", "70%", "75%"],
    correctAnswer: "70%",
    image: "assets/images/earth.jpg",
    extraInfo: "With so much of the Earth’s surface taken up by ocean, it’s evident how vital these marine environments are to the planet, and how much there still is to be explored."
}, {
    question: "The majority of life on Earth is __________",
    answers: ["aquatic", "benthic", "terrestrial", "nocturnal"],
    correctAnswer: "aquatic",
    image: "assets/images/biodiversity.png",
    extraInfo: "As so much of the Earth’s surface is underwater, it comes as no surprise that marine species outnumber those on land. But, it’s an incredible 94 per cent of the Earth’s living species that exist within the oceans."
},{
    question: "Where is the world's largest mountain chain?",
    answers: ["India", "Antartica", "under water", "Africa"],
    correctAnswer: "under water",
    image: "assets/images/mountain.jpg",
    extraInfo : "Earth’s longest chain of mountains, the Mid-Ocean Ridge, is almost entirely beneath the ocean, stretching across a distance of 65,000 kilometres. It’s said that this mountain chain is less explored than the surface of Venus or Mars"
},{
    question: "The copper found in this organism's blood has helped it become a key research specimen.",
    answers: ["horseshoe crab", "blue crab", "jellyfish", "octupus"],
    correctAnswer: "horseshoe crab",
    image: "assets/images/copper.jpg",
    extraInfo : "Horseshoe crabs use hemocyanin to carry oxygen through their blood. Because of the copper present in hemocyanin, their blood is blue. Their blood contains amebocytes, which play a similar role to the white blood cells of vertebrates in defending the organism against pathogens."
}]

//Variable for setInterval
var timer;

//variable to setup game functionality
var game = {
    questions: questions,
    // currentQuestion: 0,
    counter: countStart,

    countdown: function () {
        this.counter--;
        $("#counter-number").text(this.counter);
        if (this.counter === 0) {
            console.log("TIME UP");
            this.timeUp();
        }
    },

    loadQuestion: function () {
        $("#results-area").empty();
        $("#quiz-area").show();


        timer = setInterval(this.countdown.bind(this), 1000);

        card.html("<h3>" + questions[currentQuestion].question + "</h3>");

        //creates a button for each possible answer with a data attribute of name for the answer
        for (var i=0; i < questions[currentQuestion].answers.length; i++) {
            card.append("<button class='ansButton' id='button' data-name='" + questions[currentQuestion].answers[i] + "'>" + questions[currentQuestion].answers[i] + "</button>")
        };
    },

    //calls the next question ---- restarts timer, increases current question number, loads next question
    nextQuestion: function() {
        this.counter = window.countStart;
        $("#counter-number").text(this.counter);
        currentQuestion++;
        this.loadQuestion.bind(this)();
    },

    timeUp: function () {
        clearInterval(window.timer);
        $("#quiz-area").hide();

        
        //resets timer
        $("#counter-number").text(this.counter);

        var warnings = $("<div class='col-md-6'>").append(
            $("<h2>").text("You ran out of time!"),
            $("<h3>").text("The correct answer was: " + questions[currentQuestion].correctAnswer)
        )
        var image = $("<div class='col-md-6 oceanImage'>").append(
            $("<img class='img-fluid'/>").attr("src", questions[currentQuestion].image).attr("alt", "ocean image")
            );
        card.append(warnings, image);

        //If no more questions, show results 
        //Otherwise, show next question
        if (currentQuestion === questions.length - 1) {
            setTimeout(this.results, 3 * 1000); 
        } else {
            setTimeout(this.nextQuestion, 3 * 1000);
        }
    },

    results: function () {
        clearInterval(window.timer);
        $("#results-area").empty();
        var end = $("<div class='col-md-6'>").append(
            $("<h1>").text(" You finished, check out your results!"),
            $("counter-number").text(this.counter),
        )
        var gameResults = $("<div class='col-md-6'>").append(
            $("<h2>").text("Your Game Results"),
            $("<h3>").text("Total Number Correct: " + correct),
            $("<h3>").text("Total Number Incorrect: " + incorrect),
            $("<button id='reattempt'>").text("Reattempt")
        )
        var row = $("<div class='row'>").append(end, gameResults)
        score.append(row);
    },

    //Determines which element (button) the user selected
    clicked: function(e) {
        clearInterval(window.timer);
        if($(e.target).attr("data-name") === questions[currentQuestion].correctAnswer) {
            this.correctAnswer();
        } else {
            this.wrongAnswer();
        }
    },

    wrongAnswer: function () {
        incorrect++;
        clearInterval(window.timer);

        var answer = $("<div class='col-md-6'>").append(
            $("<h2>").text("Sorry, that answer is incorrect!"),
            $("<p>").html("<span class='info'>The correct answer was: </span>" + questions[currentQuestion].correctAnswer),
            $("<p>").html("<span class='info'>Did you know: </span>" + questions[currentQuestion].extraInfo),
            $("<p>").html("<span class='info'> Score: </span>" + correct)
        )
        var image = $("<div class='col-md-6 oceanImage'>").append(
            $("<img class='img-fluid'/>").attr("src", questions[currentQuestion].image).attr("alt", "ocean image")
            );
        var row = $("<div class='row'>").append(answer, image);
        score.append(row);
            
        if (currentQuestion === questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    correctAnswer: function() {
        clearInterval(window.timer);
        correct++;

        var answer = $("<div class='col-md-6'>").append(
            $("<h2>").text("Stupendous, you are correct!"),
            $("<p>").html("<span class='info'> Did you know: </span>" + questions[currentQuestion].extraInfo)
        )
        var image = $("<div class='col-md-6 oceanImage'>").append(
            $("<img class='img-fluid'/>").attr("src", questions[currentQuestion].image).attr("alt", "ocean image")
            );

        var row = $("<div class='row'>").append(answer, image);
        score.append(row);

        if (currentQuestion === questions.length -1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    //resets game variables
    reset: function () {
        currentQuestion = 0;
        this.counter = countStart;
        correct = 0;
        incorrect = 0;
        this.loadQuestion();
        $("#quiz-area").show();
        $("#results-area").empty();
    }
};

//Click Events
$(document).on("click", "#reattempt", game.reset.bind(game));

$(document).on("click", ".ansButton", function(e) {
    game.clicked.bind(game, e) ();
    $("#quiz-area").hide();
    console.log(game)
});

//When the game starts, the question timer is added to the sub-wrapper
$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h4> Timer : <span id='counter-number'>30</span> Seconds</h4>");
    game.loadQuestion.bind(game)();
    $("#start").hide();
});