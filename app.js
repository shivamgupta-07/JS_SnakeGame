//Game Variables
let inputDir = {x:0,y:0};
let speed = 10;
let lastLoadTime = 0;
let snakeArr=[
    {x: 15, y:16}
];
let boardDiv= document.querySelector('#board');
let food = {x:10, y:3};
let score=0;
let scoreEl= document.querySelector('#curr-score');
let highScoreEl = document.querySelector('#high-score');
scoreEl.innerHTML = score;
let highScore = localStorage.getItem('highscore') ? localStorage.getItem('highscore') : 0; 
highScoreEl.innerHTML = highScore;

//Looping the game => not using set interval and using requestAnimationFrame
let main = (ctime) =>{
    window.requestAnimationFrame(main);
    if((ctime-lastLoadTime)/1000 < 1/speed){   //we set the duration at which our game should keep on reloading
        return;
    }
    lastLoadTime=ctime;
    gameEngine();  //Game Function
}


//Game Functions

let isCollide= (snakeAr) =>{
    if(snakeAr[0].x===0 || snakeAr[0].y===0 || snakeAr[0].x===26 || snakeAr[0].y===26){
        return true;
    }
    for (let i = 1; i < snakeAr.length; i++){
        if(snakeAr[i].x === snakeAr[0].x && snakeAr[i].y === snakeAr[0].y){
            return true;
        }
    }
    return false;
}


let gameEngine = () =>{
    //Updating the snake array and food
    if(isCollide(snakeArr)){
        inputDir = {x:0,y:0};
        alert("Game Over! Press any key to play again");
        snakeArr=[{x: 15, y:16}];
        score=0;
        scoreEl.innerHTML=score;
    }

    //Display the snake
    boardDiv.innerHTML = " ";
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index===0){
            snakeElement.classList.add('snake-head');
        }
        else{
            snakeElement.classList.add('snake-body');
        }
        boardDiv.appendChild(snakeElement);
    })
    
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    boardDiv.appendChild(foodElement);

    //If food eaten, score +1 and generate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        // generating random number between a and b
        let a=2;
        let b=23;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random()) };
        score++;
        scoreEl.innerHTML=score; 
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >=0 ; i--){
        snakeArr[i+1] = {...snakeArr[i]}; //destructuring the arrayating a new obj
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y; 

    //For updating the highscore in the local storage
    if(score>=highScore){
        highScore=score;
        localStorage.setItem('highscore',highScore);
        highScoreEl.innerHTML = highScore;
    }
}


//Main Logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', (event) =>{
    inputDir= {x: 0, y: 1}; //Starting the game whenever a key is pressed
    switch(event.key){
        case "ArrowUp":
            inputDir.x= 0;
            inputDir.y= -1;
            break;

        case "ArrowDown":
            inputDir.x= 0;
            inputDir.y= 1;
            break;

        case "ArrowRight":
            inputDir.x= 1;
            inputDir.y= 0;
            break;  

        case "ArrowLeft":
            inputDir.x= -1;
            inputDir.y= 0;
            break; 

        default:

    }
});