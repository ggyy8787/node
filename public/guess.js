const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const result = document.querySelector(".result");
const count = document.querySelector(".count");
const guesses = document.querySelector(".guesses");
const restartBtn = document.querySelector(".restartBtn");


let countNum =0; 
let randomNumber = Math.floor( Math.random()*100 );
console.log("觀察隨機的數字：", randomNumber);  //廣域變數

function checkGuess() { 

    countNum++; 
    count.textContent = "猜測次數：" + countNum;
    const userGuess = Number(guessField.value);  //取得欄位值，並轉為數字
    guesses.textContent += userGuess + " ";    // 顯示猜測歷程

    if  (  userGuess === randomNumber ) {
        result.textContent = "猜測結果：Congratulations!"
        setGameOver() ;
    }
    else if ( userGuess  < randomNumber ) {
        result.textContent = "猜測結果：數字太小!" ;
    }
    else if ( userGuess  > randomNumber ) {
        result.textContent = "猜測結果：數字太大!";
    }

    if ( countNum >= 5 && userGuess !== randomNumber ) {
        result.textContent += "遊戲結束" ;
        result.style.backgroundColor="red" ;
        alert("遊戲結束") ;
        setGameOver() ;
    }

    // 清空輸入欄位
    guessField.value = "";
    guessField.focus();
}
function setGameOver() {
        guessField.disabled = true; //停止輸入功能
        guessSubmit.disabled = true;    //停止按鈕功能
}
function initGame() {
    countNum = 0;
    randomNumber = Math.floor(Math.random() * 100);
    console.log("新的隨機數字：", randomNumber);

    count.textContent = "猜測次數：0";
    result.textContent = "猜測結果：";
    result.style.backgroundColor = "";
    guesses.textContent = "猜測歷程：";  // 清除舊紀錄
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();
}

guessField.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        checkGuess();
    }
});

guessSubmit.addEventListener("click", checkGuess);   //當按鈕被點擊，執行函式
restartBtn.addEventListener("click", initGame);






