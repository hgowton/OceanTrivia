var card = $("#quiz-area");
var countStart = 30;

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
    exInfo : "Earth’s longest chain of mountains, the Mid-Ocean Ridge, is almost entirely beneath the ocean, stretching across a distance of 65,000 kilometres. It’s said that this mountain chain is less explored than the surface of Venus or Mars"
},{
    question: "The copper found in this organism's blood has helped it become a key research specimen.",
    answers: ["horseshoe crab", "blue crab", "jellyfish", "octupus"],
    correctAnswer: "horseshoe crab",
    image: "assets/images/copper.jpg",
    exInfo : "Horseshoe crabs use hemocyanin to carry oxygen through their blood. Because of the copper present in hemocyanin, their blood is blue. Their blood contains amebocytes, which play a similar role to the white blood cells of vertebrates in defending the organism against pathogens."
}]

//Variable for setInterval
var timer;

//variable to setup game functionality
var game = {
    questions: questions,
    currentQuestion: 0,
    counter: countStart,
    correct: 0,
    incorrect: 0,

    countdown: function () {
        this.counter--;
        $("#counter-number").text(this.counter);
        if (this.counter === 0) {
            console.log("TIME UP");
            this.timeUp();
        }
    },

    loadQuestion: function () {

        timer = setInterval(this.countdown.bind(this), 1000);

        card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        //creates a button for each possible answer with a data attribute of name for the answer
        for (var i=0; i<questions[this.currentQuestion].answers.length; i++) {
            card.append("<button class='ansButton' id='button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>")
        };
    },

    //calls the next question ---- restarts timer, increases current question number, loads next question
    nextQuestion: function() {
        this.counter = window.countStart;
        $("#counter-number").text(this.counter);
        this.currentQuestion++;
        this.loadQuestion.bind(this)();
    },

    timeUp: function () {
        clearInterval(window.timer);
        
        //resets timer
        $("#counter-number").text(this.counter);

        //Lets the user know time has run out and the correct answer
        card.html("<h2> You ran out of time!</h2>");
        card.append("<h3>The correct answer was: " + questions[this.currentQuestion].correctAnswer);
        card.append("<img src='" + questions[this.currentQuestion].image + "'/>");

        //If no more questions, show results 
        //Otherwise, show next question
        if (this.currentQuestion === questions.length - 1) {
            setTimeout(this.results, 3 *1000); 
        } else {
            setTimeout(this.nextQuestion, 3 * 1000);
        }
    }

}