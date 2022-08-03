const game = document.getElementById('game');
const scoreDisplay = document.getElementById('score');

const jeopardyCategories = [
    {
        genre: "WHO",
        questions: [
            {
                question: "Who wrote 1984?",
                answers: ["George Orwell", "Ben Shapiro"],
                correct: "George Orwell",
                level: "easy",
            },
            {
                question: "Who sees through the lies of the Jedi?",
                answers: ["Mace Windu", "Anakin Skywalker"],
                correct: "Anakin Skywalker",
                level: "medium",
            },
            {
                question: "Who is the true Sith Lord?",
                answers: ["Sheev Palpatine", "Jar Jar Binks"],
                correct: "JarJar Binks",
                level: "hard",
            },

        ]
    },
    {
        genre: "WHERE",
        questions: [
            {
                question: "Where is Rome?",
                answers: ["Italy", "Japan"],
                correct: "Italy",
                level: "easy",
            },
            {
                question: "Where is the Underground?",
                answers: ["Mt. Itoi", "Mt. Ebott"],
                correct: "Mt. Ebott",
                level: "medium",
            },
            {
                question: "Where are Squidward's hopes and dreams?",
                answers: ["6 feet under", "Nowhere"],
                correct: "6 feet under",
                level: "hard",
            }
        ]
    },
    {
        genre: "WHAT",
        questions: [
            {
                question: "What is a man?",
                answers: ["A miserable pile of secrets", "some flesh creature"],
                correct: "A miserable pile of secrets",
                level: "easy"
            },
            {
                question: "What is love?",
                answers: ["A really strong attatchment to someone", "Baby don't hurt me"],
                correct: "Baby don't hurt me",
                level: "medium"
            },
            {
                question: "What is the airspeed velocity of an unladen swallow?",
                answers: ["African or European?", "20mph"],
                correct: "African or European?",
                level: "hard"
            },
        ]
    },
    {
        genre: "WHEN",
        questions: [
            {
                question: "When will Mother 3 be officially localized?",
                answers: ["Never", "One day trust me"],
                correct: "Never",
                level: "easy"
            },
            {
                question: "When was Kingdom Hearts 1 released in the West?",
                answers: ["March 28, 2002", "September 17, 2002"],
                correct: "September 17, 2002",
                level: "medium"
            },
            {
                question: "When was Jesus born?",
                answers: ["0 AC", "Between 6 and 4 BC"],
                correct: "Between 6 and 4 BC",
                level: "hard"
            }
        ]
    },
    {
        genre: "WHY",
        questions: [
            {
                question: "Why are we still here?",
                answers: ["Just to suffer", "We don't know"],
                correct: "Just to suffer",
                level: "easy"
            },
            {
                question: "Why doesn't Gandalf take the ring himself?",
                answers: ["It would corrupt him", "He hates wearing rings"],
                correct: "It would corrupt him",
                level: "medium"
            },
            {
                question: "Why does this excercise exist?",
                answers: ["For practice", "I am a really big fan of Jeopardy"],
                correct: "For practice",
                level: "hard"
            }
        ]
    },
]

let score = 0;

function addCategory(category){
    const column = document.createElement('div');
    column.classList.add('genre-column');

    const genreTitle = document.createElement('div');
    genreTitle.classList.add('genre-title');
    genreTitle.innerText = category.genre;

    column.appendChild(genreTitle);
    game.append(column);

    category.questions.forEach(question =>{
        const card = document.createElement('div');
        card.classList.add('card');
        column.append(card);

        if(question.level === 'easy'){
            card.innerHTML = 100;
        }
        if(question.level === 'medium'){
            card.innerHTML = 200;
        }
        if(question.level === 'hard'){
            card.innerHTML = 300;
        }

        card.setAttribute('data-question', question.question);
        card.setAttribute('data-answer-1', question.answers[0]);
        card.setAttribute('data-answer-2', question.answers[1]);
        card.setAttribute('data-correct', question.correct);
        card.setAttribute('data-value', card.innerHTML);

        card.addEventListener('click', flipCard);
    })
}

jeopardyCategories.forEach(category=> addCategory(category));

function flipCard() {
    this.innerHTML = "";
    this.style.fontSize = "15px";
    this.style.lineHeight = "30px";
    const textDisplay = document.createElement('div');
    textDisplay.classList.add('card-text');
    textDisplay.innerHTML = this.getAttribute('data-question');
    const firstButton = document.createElement('button');
    const secondButton = document.createElement('button');

    firstButton.classList.add('first-button');
    secondButton.classList.add('second-button');

    firstButton.innerHTML = this.getAttribute('data-answer-1');
    secondButton.innerHTML = this.getAttribute('data-answer-2');

    firstButton.addEventListener('click', getResult);
    secondButton.addEventListener('click', getResult);

    this.append(textDisplay, firstButton, secondButton);

    const allCards= Array.from(document.querySelectorAll('.card'));
    allCards.forEach(card => card.removeEventListener('click', flipCard));
}

function getResult(){

    const allCards = Array.from(document.querySelectorAll('.card'));
    allCards.forEach( card => card.addEventListener('click', flipCard));
    
    const cardOfButton = this.parentElement;
    

    if(cardOfButton.getAttribute('data-correct') === this.innerHTML){
        score += parseInt(cardOfButton.getAttribute('data-value'));
        scoreDisplay.innerHTML = score;
        cardOfButton.classList.add('correct-answer');
        
        
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild);
            }

            cardOfButton.innerHTML = cardOfButton.getAttribute('data-value');
            cardOfButton.style.fontSize = "100px";
        cardOfButton.style.lineHeight = "120px";
        }, 100)
    } else{
        cardOfButton.classList.add('wrong-answer');
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild);
            }

            cardOfButton.innerHTML = 0;
            cardOfButton.style.fontSize = "100px";
        cardOfButton.style.lineHeight = "120px";
        }, 100)
    }

    cardOfButton.removeEventListener('click', flipCard);
}