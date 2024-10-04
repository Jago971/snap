const suits = [
    {
        suit: '♣',
        color: 'black'
    },
    {
        suit: '♠',
        color: 'black'
    },
    {
        suit: '♥',
        color: 'red'
    },
    {
        suit: '♦',
        color: 'red'
    }
]

const faces = [
    {
        face: 'A',
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
        face: 'J',
        value: 11
    },
    {
        face: 'Q',
        value: 12
    },
    {
        face: 'K',
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
    drawnCards.push(chosenCard);
    return chosenCard
}

function startTheClock(difficulty) {
    let count = cards.length;
    moveCards(drawCard(cards))

    const timer = setInterval(function() {
        count--;
        if (count == 0) {
            clearInterval(timer);
            console.log("No more cards!");
            console.log(`${yourMatches} out of ${matches} matches`)
            let message = document.querySelector("#message>p")
            message.innerHTML = `You got<br>${yourMatches}<br>out of<br>${matches}<br>matches`
        } else {
            moveCards(drawCard(cards));
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

function moveCards(card) {
    const card1 = document.getElementById("card1")
    const card1suit = card1.querySelectorAll(".suit")
    const card1face = card1.querySelectorAll(".face")

    const card2 = document.getElementById("card2")
    const card2suit = card2.querySelectorAll(".suit")
    const card2face = card2.querySelectorAll(".face")

    const card3 = document.getElementById("card3")
    const card3suit = card3.querySelectorAll(".suit")
    const card3face = card3.querySelectorAll(".face")

    const card4 = document.getElementById("card4")
    const card4suit = card4.querySelectorAll(".suit")
    const card4face = card4.querySelectorAll(".face")

    if(cardSide == 1) {
        card1.classList.add("left");
        setTimeout(() => {
            card1.classList.remove("faceDown")
            card1suit.forEach((suit) => {
                suit.textContent = card.suit
            })
            card1face.forEach((face) => {
                face.textContent = card.face
            })
        }, 150)
        setTimeout(() => {
            card1.classList.remove("front")

            card3.classList.remove("left")
            card3suit.forEach((suit) => {
                suit.textContent = ""
            })
            card3face.forEach((face) => {
                face.textContent = ""
            })

            card3.classList.add("faceDown")

            card2.classList.add("front")
        }, 500)

    } else if (cardSide == 2) {
        card2.classList.add("right");
        setTimeout(() => {
            card2.classList.remove("faceDown")
            card2suit.forEach((suit) => {
                suit.textContent = card.suit
            })
            card2face.forEach((face) => {
                face.textContent = card.face
            })
        }, 150)
        setTimeout(() => {
            card2.classList.remove("front")

            card4.classList.remove("right")
            card4suit.forEach((suit) => {
                suit.textContent = ""
            })
            card4face.forEach((face) => {
                face.textContent = ""
            })

            card4.classList.add("faceDown")

            card3.classList.add("front")
        }, 500)

    } else if (cardSide == 3) {
        card3.classList.add("left");
        setTimeout(() => {
            card3.classList.remove("faceDown")
            card3suit.forEach((suit) => {
                suit.textContent = card.suit
            })
            card3face.forEach((face) => {
                face.textContent = card.face
            })
        }, 150)
        setTimeout(() => {
            if(drawnCards.length < 50) {
                card3.classList.remove("front")
                card1.classList.remove("left")
                card1.classList.add("faceDown")
                card4.classList.add("front")
                card1suit.forEach((suit) => {
                    suit.textContent = ""
                })
                card1face.forEach((face) => {
                    face.textContent = ""
                })
            }
        }, 500)

    } else if (cardSide == 4) {
        card4.classList.add("right");
        setTimeout(() => {
            card4.classList.remove("faceDown")
            card4suit.forEach((suit) => {
                suit.textContent = card.suit
            })
            card4face.forEach((face) => {
                face.textContent = card.face
            })
        }, 150)
        setTimeout(() => {
            if(drawnCards.length < 50) {
                card4.classList.remove("front")
                card2.classList.remove("right")
                card2.classList.add("faceDown")
                card1.classList.add("front")
                card2suit.forEach((suit) => {
                    suit.textContent = ""
                })
                card2face.forEach((face) => {
                    face.textContent = ""
                })
            }
        }, 500)
    }
    if(cardSide == 4) {
        cardSide = 1
    } else {
        cardSide++;
    }
}