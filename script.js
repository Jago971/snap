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
const startBtn = document.getElementById("start")
let player = 'computer';

let cards = [];

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
    player == 'computer' ? player = 'player' : player = 'computer';
    return chosenCard
}

function startTheClock() {
    let count = cards.length;
    const timer = setInterval(function() {
      count--;
      console.log(player, drawCard(cards))
      if (count === 0) {
        clearInterval(timer);
        console.log("No more cards!");
      }
    }, 100);
}

startBtn.addEventListener("click", () => {
    startTheClock();
    startBtn.innerText = "SNAP";
})
