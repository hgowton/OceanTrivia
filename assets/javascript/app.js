var card = $("#quiz-area");
var score = $("#results-area")
var countStart = 30;
var correct = 0;
var incorrect = 0;
var currentQuestion = 0;

//Question Array
var questionsBank = [{
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
}, {
    question: "Communities living in midocean ridges rely on bacteria beforing ______________ to create energy.", 
    answers: ["photosynthesis", "exocytosis", "chemosynthesis", "cellular respiration"],
    correctAnswer: "chemosynthesis", 
    image: "assets/images/hydrothermalVent.gif",
    extraInfo: "Chemosynthesis is the process by which food (glucose) is made by bacteria using chemicals as the energy source, rather than sunlight. Chemosynthesis occurs around hydrothermal vents and methane seeps in the deep sea where sunlight is absent."
}, {
    question: "What part of the starfish enables it to regenerate?", 
    answers: ["gonad", "pyloric cecum", "gonopore", "madreporite"],
    correctAnswer: "madreporite", 
    image: "assets/images/starfish.jpg",
    extraInfo: "Because starfish like to eat clams and oysters, fishermen who gather shellfish have tried for years to get rid of them. To kill the starfish, fishermen would catch them, slice them right in half, and throw them back in the ocean. However, if even a small part of their madreporite is present the starfish can grow back parts of their bodies. Thus fisherman were actually increasing the number of starfish."
},
{
    question: "Coral bleaching is caused by all of the following except",
    answers: [ "infection by protists, bacteria, or viruses", "overexposure to sunlight", "runoff and pollution", "change in ocean temperature" ],
    correctAnswer: "infection by protists, bacteria, or viruses",
    image: "assets/images/coralBleach.png",
    extraInfo: "The color of coral is due largely to its symbiotic relationship with zooxanthellae.  Stressing coral causes the algea to leave, not only removing the color but depleating the coral of its primary food source."
},
{
    question: "Fish are able to detect movement in water mainly through their",
    answers: [ "optical system", "lateral line system", "transitional scale movements", "epidermal neral system" ],
    correctAnswer: "lateral line system",
    image: "assets/images/lateralLine.jpg",
    extraInfo: "The lateral line system enables fish and some amphibians to gain information about their aquatic surroundings.  Besides detecting movement, the lateral line system can help fish orient themselves and play a viatal role in schooling."
},
{
    question: "What gives the ocean its color?",
    answers: [ "the sun", "the moon", "aquatic organisms", "tidal system" ],
    correctAnswer: "the sun",
    image: "https://www.rd.com/wp-content/uploads/2018/05/blue-ocean_ocean-facts-760x506.jpg",
    extraInfo: 'The "deep blue sea"—and our "blue planet" along with it!—owe their iconic color to the light of the sun. When the sun shines on the ocean, the water absorbs the longer red and orange wavelengths of light while reflecting blue light back. This will only happen, though, with a large amount of water; the more water you have, the bluer it is.'
},
{
    question: "The pressure at the bottom of the Marianna Trench can reach up to ____ tons per square inch.",
    answers: [ "8", "10", "6", "4"],
    correctAnswer: "8",
    image: "https://www.rd.com/wp-content/uploads/2018/05/ocean-pressure_ocean-facts-760x506.jpg",
    extraInfo: "Like, being-crushed-under-a-pile-of-elephants extreme. At the bottom of the Mariana Trench, the pressure is about eight tons per square inch, the equivalent of about 100 fully grown elephants. It's so intense that, while we do have machines capable of withstanding it, equipment has simply imploded under that amount of pressure. "
},
// {
//     question: "",
//     answers: [ "", "", "", "" ],
//     correctAnswer: "",
//     image: "assets/images/.jpg",
//     extraInfo: ""
// },

]

answerType = {
    incorrect: ["assets/images/worried.gif", "assets/images/madOctopus.gif","assets/images/eatFish.gif","assets/images/smileMad.gif","assets/images/sadFaces.gif","assets/images/changeMood.gif"], 
    correct: ["assets/images/fishMouths.gif","assets/images/crabWave.gif","assets/images/fish.gif", "assets/images/jellyfish.gif","assets/images/littlefish.gif","assets/images/octopus.gif","assets/images/penguin.gif","assets/images/turtle.gif","assets/images/surfing.gif"]
}

//Variable for setInterval
var timer;

//variable to setup game functionality
var game = {
    questions: [...questionsBank],
    counter: countStart,
    answerType: answerType,

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
        $("#quiz-area").empty();
        $("#quiz-area").show();


        timer = setInterval(this.countdown.bind(this), 1000);
        
        var questions = $("<div class='col-md-7 questions'>").html("<h3>" + this.questions[currentQuestion].question + "</h3>");
        var questionImage = $("<div class='col-md-5'>").append(
            $("<img class='img-fluid oceanImage'/>").attr("src", this.questions[currentQuestion].image).attr("alt", "ocean image")
            );
            
        this.questions[currentQuestion].answers.sort(()=> Math.random() - .5)
        //creates a button for each possible answer with a data attribute of name for the answer
        for (var i=0; i < this.questions[currentQuestion].answers.length; i++) {
            questions.append("<button class='ansButton' id='button' data-name='" + this.questions[currentQuestion].answers[i] + "'>" + this.questions[currentQuestion].answers[i] + "</button>")
        };
        
        var row = $("<div class='row'>").append(questions, questionImage)
        card.append(row);
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
        ++incorrect;
        
        //resets timer
        $("#counter-number").text(this.counter);

        var warnings = $("<div class='col-md-6'>").append(
            $("<h2>").text("You ran out of time!"),
            $("<h3>").text("The correct answer was: " + this.questions[currentQuestion].correctAnswer)
        )
        var image = $("<div class='col-md-6'>").append(
            $("<img class='img-fluid oceanImage'/>").attr("src", "assets/images/timer.gif",).attr("alt", "timer image")
            );
        var row = $("<div class='row'>").append(warnings, image)
        score.append(row);
    
        //If no more questions, show results 
        //Otherwise, show next question

        if (currentQuestion === this.questions.length - 1) {
            setTimeout(this.results.bind(this), 3 * 1000); 
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    results: function () {
        clearInterval(window.timer);
        $("#results-area").empty();
        var end = $("<div class='col-md-6'>").append(
            $("<h1>").text(" You finished, check out your results!"),
            $("counter-number").text(this.counter),
        )
        var gameResults = $("<div class='col-md-6' id='results'>").append(
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
        if($(e.target).attr("data-name") === this.questions[currentQuestion].correctAnswer) {
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
            $("<p>").html("<span class='info'>The correct answer was: </span>" + this.questions[currentQuestion].correctAnswer),
            $("<p>").html("<span class='info'>Did you know: </span>" + this.questions[currentQuestion].extraInfo),
            $("<p>").html("<span class='info'> Score: </span>" + correct)
        )
        
        randomPic = Math.floor(Math.random()*6);
        var image = $("<div class='col-md-6'>").append(
            $("<img class='img-fluid oceanImage'/>").attr("src", answerType.incorrect[randomPic]).attr("alt", "incorrect image")
            );
        var row = $("<div class='row'>").append(answer, image);
        score.append(row);
            
        if (currentQuestion === this.questions.length - 1) {
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
            $("<p>").html("<span class='info'> Did you know: </span>" + this.questions[currentQuestion].extraInfo)
        )

        randomPic = Math.floor(Math.random()*7);
        var image = $("<div class='col-md-6'>").append(
            $("<img class='img-fluid oceanImage'/>").attr("src", answerType.correct[randomPic]).attr("alt", "correct image")
            );

        var row = $("<div class='row'>").append(answer, image);
        score.append(row);

        if (currentQuestion === this.questions.length -1) {
            setTimeout(this.results.bind(this), 3 * 1000);
        } else {
            setTimeout(this.nextQuestion.bind(this), 3 * 1000);
        }
    },

    //resets game variables
    reset: function () {
        this.questions = [...questionsBank]
        this.questions.sort(()=> Math.random() - .5)
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