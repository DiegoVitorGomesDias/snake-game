const $score = document.querySelector("span#scoreNumber");
const $areaGame = document.querySelector("div#tableGame");
const $aside = document.querySelector("aside");

const moves =
{
    "ArrowUp":      { x: +0, y: -1, direction: 15, invalidDirection: 16 },
    "ArrowDown":    { x: +0, y: +1, direction: 16, invalidDirection: 15 },
    "ArrowRight":   { x: +1, y: +0, direction: 14, invalidDirection: 13 },
    "ArrowLeft":    { x: -1, y: +0, direction: 13, invalidDirection: 14 },
}

const elements =
{
    0: "board.png",
    1: "apple.png",
    2: "border.png",
    3: "tail_left.png",
    4: "tail_right.png",
    5: "tail_up.png",
    6: "tail_down.png",
    7: "body_bottomleft.png",
    8: "body_bottomright.png",
    9: "body_topleft.png",
    10: "body_topright.png",
    11: "body_horizontal.png",
    12: "body_vertical.png",
    13: "head_left.png",
    14: "head_right.png",
    15: "head_up.png",
    16: "head_down.png"
}

let cenarioLength;
let applePosition;
let snakeHeadPosition;
let snake;
let codeDirection;
let velocity;
let moveInterval;
let cenario2D;
let inGame = false;

let score = 0;
const sumScore = () => $score.innerHTML = score++;

const setKey = (code) => 
{
    codeDirection = ( moves[code] && !(moves[code]?.direction === moves[codeDirection]?.invalidDirection) ) 
    ? code : codeDirection;
}

const start = (e) =>
{
    if ( inGame ) return;
    inGame = true;
    $aside.style.display = "none";
    const dificulty = e || (cenarioLength === 30 ? 1 : cenarioLength === 20 ? 2 : cenarioLength === 10 ? 3 : dificulty);
    cenarioLength = dificulty === 1 ? 30 : dificulty === 2 ? 20 : dificulty === 3 ? 10 : cenarioLength;
    applePosition = { x: cenarioLength / 2 + 1, y: cenarioLength / 2 };
    snakeHeadPosition = {x: cenarioLength / 2, y: cenarioLength / 2, body: 14, invalidDirection: 13 }
    snake = [JSON.parse(JSON.stringify(snakeHeadPosition))];
    codeDirection = "ArrowRight";
    velocity = 150;
    score = 0;
    moveInterval = setInterval(() => move(), parseInt(velocity));
    show()
}

const newGame = () =>
{
    inGame = false;
    clearInterval(moveInterval);
    window.removeEventListener("keydown", () => {});
    $aside.style.display = "flex";
    if (confirm("Your Loser! Try Again?")) start();
}

const show = () =>
{
    cenario2D =
        Array.from( { length: cenarioLength }, (x, indexX) => 
        Array.from( { length: cenarioLength }, (y, indexY) => 
        ([0, cenarioLength - 1 ].includes(indexY)) || ([0, cenarioLength - 1 ].includes(indexX)) ? 2 : 0 ) )
    ;
    
    //create apple and show snake
    cenario2D[applePosition.y][applePosition.x] = 1;
    snake.forEach( e => cenario2D[e.y][e.x] = e.body);

    $areaGame.innerHTML = cenario2D.flat().map( (e, indexMap) => 
    {
        return `
        <img src="assets/snake/${elements[e]}" alt="${indexMap}" 
            style="max-width: calc(100% / ${cenarioLength});"
        />`
    }).join("");

    window.addEventListener("keydown", ({ code }) => setKey(code), { once: true });
}

const move = () =>
{
    window.removeEventListener("keydown", () => {});
    snakeHeadPosition.x += moves[codeDirection]?.x || 0;
    snakeHeadPosition.y += moves[codeDirection]?.y || 0;
    snakeHeadPosition.body = moves[codeDirection]?.direction || snakeHeadPosition.body;
    snakeHeadPosition.invalidDirection = moves[codeDirection]?.invalidDirection || snakeHeadPosition.invalidDirection;
    if ( (cenario2D[snakeHeadPosition?.y][snakeHeadPosition?.x]) > 1 ) return newGame();

    //new Position
    snake.unshift(JSON.parse(JSON.stringify(snakeHeadPosition)));

    //body direction
    if ( snake.length > 2 )
    {
        const headY = snake[0].y - snake[1].y
        const headX = snake[0].x - snake[1].x
        const bodyY = snake[0].y - snake[2].y
        const bodyX = snake[0].x - snake[2].x
        
        if ( ( headY === 0 && bodyY > 0 && headX > 0 && bodyX > 0 ) || ( headY < 0 && bodyY < 0 && headX === 0 && bodyX < 0 ) ) 
        snake[1].body = 10; //body_topright

        else if ( ( headY < 0 && bodyY < 0 && headX === 0 && bodyX > 0 ) || ( headY === 0 && bodyY > 0 && headX < 0 && bodyX < 0 ) ) 
        snake[1].body = 9; //body_topleft

        else if ( ( headY === 0 && bodyY < 0 && headX > 0 && bodyX > 0 ) || ( headY > 0 && bodyY > 0 && headX === 0 && bodyX < 0 ) ) 
        snake[1].body = 8; //body_bottomright

        else if ( ( headY === 0 && bodyY < 0 && headX < 0 && bodyX < 0 ) || ( headY > 0 && bodyY > 0 && headX === 0 && bodyX > 0 ) ) 
        snake[1].body = 7; //body_bottomleft

        else if ( headX === bodyX ) snake[1].body = 12; //body_horizontal
        else if ( headY === bodyY ) snake[1].body = 11; //body_vertical
    }

    //apple
    if ( cenario2D[snakeHeadPosition.y][snakeHeadPosition.x] === 1)
    {
        do {
            applePosition.x = parseInt((Math.random() * (cenarioLength - 2)) + 1 );
            applePosition.y = parseInt((Math.random() * (cenarioLength - 2)) + 1 );
        } while (cenario2D[applePosition.y][applePosition.x] !== 0);
        velocity *= 0.99;
        sumScore();
    }
    else snake.pop();

    //tail
    if ( snake.length > 1 )
    {
        const x = snake[snake.length - 1].x - snake[snake.length - 2].x
        const y = snake[snake.length - 1].y - snake[snake.length - 2].y
        if ( x > 0 ) snake[snake.length - 1].body = 4;
        else if ( x < 0 ) snake[snake.length - 1].body = 3;
        if ( y > 0 ) snake[snake.length - 1].body = 6;
        else if ( y < 0 ) snake[snake.length - 1].body = 5;
    }

    show();
}