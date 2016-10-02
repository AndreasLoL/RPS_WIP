/**
 * Created by ANDREAS on 29.09.2016.
 */
var gameResult;
var timer;
var count;
var onGoing = false;
var p1Val = 0;
var computerValue = 0;
var p1Score = 0;
var p2Score = 0;
var gameCount = 0;
var AI_lastMove = -1;
var AI_patternCount = 0;
var roundTimer = 0;
var measuredTime;
var roundTimerInterval = setInterval(function(){
    roundTimer++;
}, 100);




function endCountdown() {
    onGoing = false;
    $('#result_field').text(gameResult);
    $(".matchup_hand").toggleClass('toggleShake', false);
    $("#player1_hand").attr('src', "images/" + getCorrespondingImage(p1Val) + "_left.png");
    $("#player2_hand").attr('src', "images/" + getCorrespondingImage(computerValue) + "_right.png");
    $("#game_score").text(p1Score + " - " + p2Score);


    if (p1Score + p2Score != 0) {
        $("#win_percentage").text("Game #" + ++gameCount + "(" + parseInt((p1Score / (p1Score+p2Score)) * 100) + "%)");
    } else {
        $("#win_percentage").text("Game #" + ++gameCount + "(0%)");
    }

    var hiscoreResult = gameResult + "You: " + getCorrespondingName(p1Val) + ". Opponent: " +
        getCorrespondingName(computerValue) + ". Round time: " + (measuredTime / 10).toFixed(2) +
        " seconds.";
    roundTimer = 0;

    $("ol").append("<li>" + hiscoreResult + "</li>");


}

function handleTimer() {
    if(count === 0) {
        clearInterval(timer);
        endCountdown();
    } else {
        $('#countdown').attr('src','c'+count+'.png').animate({zoom: '125%'}, 999).animate({zoom: '75%'}, 1);
        count--;
    }
}

function resetTimer() {
    if (!onGoing){
        count = 3;
        $("#player1_hand").attr('src', "images/" + getCorrespondingImage(0) + "_left.png");
        $("#player2_hand").attr('src', "images/" + getCorrespondingImage(0) + "_right.png");
        timer = setInterval(function() { handleTimer(count); }, 1000);
        $('#result_field').text("VS.");
        onGoing = true;
        $(".matchup_hand").toggleClass('toggleShake', true);
        measuredTime = roundTimer;
        roundTimer = 0;
    }
}


function onHandSelected(handValue) {
    //0 -> Rock 1 -> Paper 2 -> Scissors
    if (onGoing) {
        return;
    }

    console.log(AI_patternCount > 2);

    if (AI_patternCount >= 2) {
        console.log("PATTERN FOUND!");
        computerValue = findCounterMove(AI_lastMove);
    } else {
        computerValue = Math.floor(Math.random() * 3);
    }

    if (AI_lastMove == handValue) {
        AI_patternCount += 1;
    } else {
        AI_lastMove = handValue;
        AI_patternCount = 1;
    }

    p1Val = handValue;

    if (computerValue == handValue) {
        gameResult = "TIE!";
    } else if ((handValue == 1 && computerValue == 0) || (handValue == 0 && computerValue == 2)
        || (handValue == 2 && computerValue == 1)) {
        gameResult = "VICTORY!";
        p1Score += 1;
    } else {
        gameResult = "DEFEAT!";
        p2Score += 1;
    }

    resetTimer();

}

function getCorrespondingName(handValue) {
    switch (handValue) {
        case 0:
            return "Rock";
        case 1:
            return "Paper";
        case 2:
            return "Scissors";
    }
}

function getCorrespondingImage(handValue) {
    switch (handValue) {
        case 0:
            return "hand1";
        case 1:
            return "hand2";
        case 2:
            return "hand3";
    }
}

function findCounterMove(handId) {
    switch (handId) {
        case 0:
            return 1;
        case 1:
            return 2;
        case 2:
            return 0;
    }
}