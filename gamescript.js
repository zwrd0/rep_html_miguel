const allQuestions = [
    "What’s your dirtiest sexual fantasy?",
    "How many people have you slept with?",
    "Where’s the weirdest place you’ve had sex?",
    "What’s your favourite part of my body?",
    "Have you ever had anal sex?",
    "If you could choose what I was wearing right now, what would you choose?",
    "Where on your body is your favourite place to be touched?",
    "When was the last time you had a dirty dream?",
    "If you could have sex anywhere in the world, where would it be?",
    "When did you first have sex?",
    "What’s the best sex you’ve ever had?",
    "What’s your favourite position?",
    "Have you ever been caught having sex?",
    "Do you watch porn?",
    "What kind of porn do you watch?",
    "How often do you masturbate?",
    "Name a sex position you’d like to try",
    "Do you prefer to give or receive?",
    "What was your best orgasm ever?",
    "Have you ever been skinny dipping?",
    "Have you ever slept with someone you work with?",
    "If we were out for dinner and I said I wanted to have sex right now, what would you do?",
    "Have you ever sent nudes of yourself?",
    "If you could sleep with any celebrity, who would it be?",
    "Would you/have you had group sex?",
    "What’s the most sex you’ve had in a day?",
    "Are you loud or quiet during sex?",
    "Have you ever tried using food during foreplay?",
    "Have you ever made a sex tape?",
    "What’s the first thing that sexually attracts you to someone?",
    "Would you say you have any fetishes?",
    "When it comes to BDSM, how far have you gone/would go?",
    "What’s your favourite toy?",
    "Do you ever read erotic fiction?",
    "Have you joined the mile high club?",
    "Do you think you could take off my underwear with no hands?",
    "Would you say you’re kinky?",
    "Do you enjoy shower sex?",
    "Where’s the weirdest place you’ve ever masturbated?",
    "Do you like to be spanked?",
    "What was your most embarrassing sexual experience?",
    "Have you ever fantasised about someone else during sex?",
    "If I ever caught you masturbating, would you stop or would you finish?",
    "Have you ever had an inappropriate crush?",
    "Have you ever cried or fallen asleep during sex?",
    "Do you prefer eye contact or not during sex?",
    "Do you like to kiss during sex?",
    "Do you get tired after sex?",
    "How many positions do you think you’ve tried?",
    "What’s the longest you’ve ever gone without sex?",
    "How high is your sex drive?",
    "What’s a surefire way to turn you on?",
    "Sex with lights on or lights off?",
    "Do you like dirty talk?",
    "Have you had sex in a car?",
    "Do you prefer to take control or be submissive?",
    "Do you prefer one night stands or longer-term sexual partners?",
    "Do you prefer to be on top or bottom?",
    "What would you like to do more of in bed?",
    "What’s your favourite time of day to have sex?",
    "Rough or romantic?",
    "Quickie or marathon session?",
    "What’s your favourite part of foreplay?",
    "Would you dress up for me in bed?",
    "What’s your favourite place to be kissed?",
    "Do you like sexting?",
    "What’s the best thing about our sex life?",
    "What’s the shortest time it’s ever taken for you to have an orgasm? And the longest?",
    "How would you make me have an orgasm?"
];

const allChallenges = [
    "Flash one of your private parts (dick, boobs, ass or pussy) to your partner.",
    "Your partner has to keep their hand inside your underwear for a minute.",
    "You must give an handjob to your partner for a minute.",
    "You must give head to your partner for a minute.",
    "You must let your partner kiss you anywhere he/she wants for 30 seconds",
    "Take a piece of clothing off.",
    "Take a piece of clothing off.",
    "Take a piece of clothing off.",
    "Take a piece of clothing off.",
    "Take a piece of clothing off.",
    "Let your partner take a piece of your clothing of his choice.",
    "Let your partner take a piece of your clothing of his choice.",
    "Let your partner take a piece of your clothing of his choice.",
    "Let your partner take a piece of your clothing of his choice.",
    "Let your partner take a piece of your clothing of his choice.",
    "Share a secret that you haven’t told your partner yet.",
    "You must let your partner give you an hickey anywhere he/she wants.",
    "You must let your partner touch you wherever he/she wants for 30 seconds.",
    "You must touch yourself (masturbate) for a minute while your partner watches.",
    "You must let your partner lick you wherever he/shey wants.",
    "You must strip all your clothes off, slowly and sensually, and then put them back on.",
    "Let your partner take control of you and your actions for a minute.",
    "Try to make your partner finish within a set time between you, if you fail to, you must complete a dare of their choice.",
    "VOUCHER OF HAPPINESS! Next time you make love, your partner gets to choose where the male finishes.",
    "Switch sexual roles for 3 minutes and make out.",
    "Record whatever the next challenge is."
];

let currentPlayer = 1;
let playerData = {
    1: resetPlayer(),
    2: resetPlayer()
};



function resetPlayer() {
    return {
        items: resetPlayerItems(),
        points: 0,
        alive: true
    };
}

function resetPlayerItems() {
    let selectedQuestions = shuffle(allQuestions).slice(0, 5);  // Pick 5 unique questions
    let selectedChallenge = shuffle(allChallenges).slice(0, 1);  // Pick 1 unique challenge
    return selectedQuestions.concat(selectedChallenge);  // Combine them for the player's items
}


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function updateDisplay(player) {
    const pointsDisplay = document.getElementById(`player${player}-points`);
    const bulletsDisplay = document.getElementById(`player${player}-bullets`);
    pointsDisplay.textContent = playerData[player].points;
    bulletsDisplay.textContent = playerData[player].items.length;
}

function updateTurnDisplay(message) {
    const turnDisplay = document.getElementById('turn-display');
    turnDisplay.textContent = message;
}

function getItemDrawnMessage(player, itemDrawn) {
    // Checking if the drawn item is a challenge
    if (allChallenges.includes(itemDrawn)) {
        document.getElementById('gunshotSound').play();
        return `Player ${player} draws a Challenge: ${itemDrawn} (Player loses)`;
    } else {
        document.getElementById('emptyshotSound').play();
        return `Player ${player} draws: ${itemDrawn} (still alive)`;
    }
}

function playRound(player) {
    const playerDiv = document.getElementById(`player${player}`);
    const otherPlayer = player === 1 ? 2 : 1;
    const outputDiv = document.getElementById(`player${player}-output`);
    const drawButton = document.getElementById('draw-button');
    const nextRoundButton = document.getElementById('next-round-button');

    if (nextRoundButton.style.display !== 'none') {
        return; // Ensures that no actions are taken if the next round button is visible.
    }

    playerDiv.classList.add('active'); // Ensures that the active class is properly managed.
    document.getElementById(`player${otherPlayer}`).classList.remove('active');

    const drawIndex = Math.floor(Math.random() * playerData[player].items.length);
    const itemDrawn = playerData[player].items.splice(drawIndex, 1)[0];
    updateDisplay(player);

    outputDiv.innerHTML = getItemDrawnMessage(player, itemDrawn);

    if (allChallenges.includes(itemDrawn)) {
        playerData[otherPlayer].points++;
        updateDisplay(otherPlayer);
        updateTurnDisplay(`End of round: Player ${player} triggered a challenge.`);
        drawButton.style.display = 'none';
        nextRoundButton.style.display = 'inline';
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateTurnDisplay(`Player ${currentPlayer}'s turn`);
    }
}


function resetGame() {
    playerData[1] = resetPlayer();
    playerData[2] = resetPlayer();
    updateDisplay(1);
    updateDisplay(2);

    const drawButton = document.getElementById('draw-button');
    const nextRoundButton = document.getElementById('next-round-button');
    drawButton.style.display = 'inline';
    nextRoundButton.style.display = 'none';

    currentPlayer = 1; 
    updateTurnDisplay(`Player ${currentPlayer}'s turn`);
    document.getElementById('player1').classList.remove('active');
    document.getElementById('player2').classList.remove('active');
}


document.addEventListener('DOMContentLoaded', function() {
    updateDisplay(1);
    updateDisplay(2);
    updateTurnDisplay(`Player ${currentPlayer}'s turn`);
});