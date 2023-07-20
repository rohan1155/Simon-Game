let userClickedPattern = [];
let gamePattern = [];
let level = 0;
var started = false;


let buttonColors = ["red", "blue", "green", "yellow"];

$(document).keydown(function (event) {
    if (!started) {
        nextSequence();
        started = true;
    }
})

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
})


function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}


function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(chosenColor) {
    $("#" + chosenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + chosenColor).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        playSound("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 0;
    started = false;
}