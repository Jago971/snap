const suits = [
    {
        suit: 'clubs',
        color: 'black'
    },
    {
        suit: 'spades',
        color: 'black'
    },
    {
        suit: 'hearts',
        color: 'red'
    },
    {
        suit: 'diamonds',
        color: 'red'
    }
]
const faces = [
    {
        face: 'ace',
        value: 1
    },
    {
        face: '2',
        value: 2
    },
    {
        face: '3',
        value: 3
    },
    {
        face: '4',
        value: 4
    },
    {
        face: '5',
        value: 5
    },
    {
        face: '6',
        value: 6
    },
    {
        face: '7',
        value: 7
    },
    {
        face: '8',
        value: 8
    },
    {
        face: '9',
        value: 9
    },
    {
        face: '10',
        value: 10
    },
    {
        face: 'jack',
        value: 11
    },
    {
        face: 'queen',
        value: 12
    },
    {
        face: 'king',
        value: 13
    }
]

const slider = document.getElementById("difficulty")
const startBtn = document.getElementById("start")
let side = 'R';
let difficulty = 0
let cards = [];
let drawnCards = [];
let matches = 0;
let yourMatches = 0;
let yourLosses = 0;

function createDeck() {
    suits.forEach(s => {
        faces.forEach(f => {
            let card = {
                suit: s.suit,
                color: s.color,
                face: f.face,
                value: f.value
            }
            cards.push(card);
        })
    });
}

function drawCard(cards) {
    let rand = Math.floor(Math.random() * cards.length)
    let chosenCard =  cards.splice(rand, 1)[0]
    side == 'R' ? side = 'L' : side = 'R';
    drawnCards.push(chosenCard);
    return chosenCard
}

function startTheClock(difficulty) {
    let count = cards.length;
    moveCards()
    console.log(side, drawCard(cards))

    const timer = setInterval(function() {
        count--;
        if (count == 0) {
            clearInterval(timer);
            console.log("No more cards!");
            console.log(`${yourMatches} out of ${matches} matches`)
        } else {
            console.log(side, drawCard(cards))
            moveCards();
            if(sameNumber() || oneUpOneDown() || equalToTen()) {
                matches++
            }
        }
    }, difficulty);
}

function sameNumber() {
    let currentCard = drawnCards[drawnCards.length - 1]
    let previousCard = drawnCards[drawnCards.length - 2]
    if(currentCard.value == previousCard.value) {
        console.log('match')
        return true;
    }
}

function oneUpOneDown() {
    let currentCard = drawnCards[drawnCards.length - 1]
    let previousCard = drawnCards[drawnCards.length - 2]
    if
    (
        currentCard.value - 1 == previousCard.value ||
        currentCard.value == previousCard.value ||
        currentCard.value + 1 == previousCard.value
    )
    {
        console.log('match')
        return true;
    }
}

function equalToTen() {
    let currentCard = drawnCards[drawnCards.length - 1]
    let previousCard = drawnCards[drawnCards.length - 2]
    if(currentCard.value + previousCard.value == 10) {
        console.log('match')
        return true;
    }
}

createDeck();

startBtn.addEventListener("click", () => {

    if(startBtn.innerText == "START") {
        let difficulty = 2000 - (slider.value * 100)
        startBtn.innerText = "SNAP";
        startTheClock(difficulty);
    } else if(drawnCards.length >= 2) {
        if(sameNumber() || oneUpOneDown() || equalToTen()) {
            yourMatches++;
        }
    }
})

let cardSide = 1;

function moveCards() {
    console.log(cardSide);
    const card1 = document.getElementById("card1")
    const card2 = document.getElementById("card2")
    const card3 = document.getElementById("card3")
    const card4 = document.getElementById("card4")

    if(cardSide == 1) {
        card1.classList.add("left");
        setTimeout(() => {
            card1.classList.remove("faceDown")
        }, 300)
        setTimeout(() => {
            card3.classList.remove("left")
            card3.classList.add("faceDown")
        }, 1000)
    } else if (cardSide == 2) {
        card2.classList.add("right");
        setTimeout(() => {
            card2.classList.remove("faceDown")
        }, 300)
        setTimeout(() => {
            card4.classList.remove("right")
            card4.classList.add("faceDown")
        }, 1000)
    } else if (cardSide == 3) {
        card3.classList.add("left");
        setTimeout(() => {
            card3.classList.remove("faceDown")
            card3.classList.add("front")
        }, 300)
        setTimeout(() => {
            card1.classList.remove("left")
            card1.classList.add("faceDown")
            card4.classList.add("front")
        }, 1000)
    } else if (cardSide == 4) {
        card4.classList.add("right");
        setTimeout(() => {
            card4.classList.remove("faceDown")
            card4.classList.add("front")
        }, 300)
        setTimeout(() => {
            card2.classList.remove("right")
            card2.classList.add("faceDown")
        }, 1000)
    }
    if(cardSide == 4) {
        cardSide = 1
    } else {
        cardSide++;
    }
}