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
createDeck();

function drawCard(cards) {
    let rand = Math.floor(Math.random() * cards.length)
    let chosenCard =  cards.splice(rand, 1)[0]
    side == 'R' ? side = 'L' : side = 'R';
    drawnCards.push(chosenCard);

    return chosenCard
}

function startTheClock(difficulty) {
    let count = cards.length + 1;
    const timer = setInterval(function() {
        count--;
        if(drawnCards.length >= 2) {
            snapSameNumber('')
        }
        if(count != 0) {
            console.log(side, drawCard(cards))
        }
        if (count == 0) {
            clearInterval(timer);
            console.log("No more cards!");
            console.log(`${yourMatches} out of ${matches} matches`)
        }
    }, difficulty);
}

startBtn.addEventListener("click", () => {
    if(startBtn.innerText == "START") {
        let difficulty = 1000 - (slider.value * 100)
        startBtn.innerText = "SNAP";
        startTheClock(difficulty);
    } else if(drawnCards.length >= 2) {
        snapSameNumber('SNAP')
    }
})

function snapSameNumber(key) {
    let currentCard = drawnCards[drawnCards.length - 1]
    let previousCard = drawnCards[drawnCards.length - 2]
    if(currentCard.value == previousCard.value) {
        matches ++;
        console.log("match")
        if(key = 'SNAP') {
            yourMatches++;
        }
    }
}