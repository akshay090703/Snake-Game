const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];
let currentScore = 0;
let currentSnake = [0, 1, 2];
let direction = 1;
let intervalTime = 1000;
const width = 10;
let appleIndex = 0;
const speed = 0.9;
let timerId;

function createGrid() {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add("square");
        grid.appendChild(square);
        squares.push(square);
    }
}
createGrid();
currentSnake.forEach(index => squares[index].classList.add('snake'));

function startGame() {
    currentSnake.forEach(content => squares[content].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentScore = 0;
    score.textContent = currentScore;
    currentSnake = [0, 1, 2];
    direction = 1;
    intervalTime = 1000;
    generateApple();
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, 1000);
    // setInterval(function, time)
    // clearInterval(variable setInterval ka)
    // clearInterval(timerId);
}

// move();

function move() {
    if (
        (currentSnake[currentSnake.length - 1] + width >= width * width && direction === width) ||
        (currentSnake[currentSnake.length - 1] % width == width - 1 && direction === 1) ||
        (currentSnake[currentSnake.length - 1] % width == 0 && direction === -1) ||
        (currentSnake[currentSnake.length - 1] - width < 0 && direction === -width) ||
        squares[currentSnake[currentSnake.length - 1] + direction].classList.contains('snake')
    ) {

        return clearInterval(timerId)
    }

    const tail = currentSnake.shift();

    squares[tail].classList.remove('snake');
    currentSnake.push(currentSnake[currentSnake.length - 1] + direction);

    if (squares[currentSnake[currentSnake.length - 1]].classList.contains('apple')) {
        squares[currentSnake[currentSnake.length - 1]].classList.remove('apple');

        squares[tail].classList.add('snake');
        currentSnake.unshift(tail);

        generateApple();

        currentScore += 1;
        score.textContent = currentScore;

        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }

    squares[currentSnake[currentSnake.length - 1]].classList.add('snake');
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple');
}

function control(event) {
    if (event.key === "ArrowRight") {  //right key
        // console.log("Right")
        direction = 1;
    } else if (event.key === "ArrowUp") {  //up key
        direction = -width;
    } else if (event.key === "ArrowLeft") {  //left key
        direction = -1;
    } else if (event.key === "ArrowDown") {  //down key
        direction = width;
    }
}
document.addEventListener('keyup', control);
startBtn.addEventListener("click", startGame);