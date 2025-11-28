/*
// I am a Comment. I do Nothing

// How to Declare variables:
let x = 5;
const y = 6; 
// y = 10; 會出現錯誤
// How to Compute values:
let z = x + y;

// How to Output values:
console.log(z);

function add(a,b){
    return a+b;
}
l = add(5,8);

function multiply(c,d){
    return c*d;
}
k = multiply(8,4);
console.log(l);
console.log(k);
*/
alert('hello world');
//建立自訂函式

function hello(){      
    alert('hello world');
}
function hello2(name){  
    let n = prompt("請輸入暱稱");
    alert('hello, '+name+'你的暱稱是'+n);
}
function sum(x,y){
    let s = x + y;
    return s;
}
console.log(sum(4,5));

const btn1 = document.getElementById("btn1");  //取得ID
const btn2 = document.getElementById("btn2");  //取得ID
const btn3 = document.getElementById("btn3");  //取得ID
const btn4 = document.getElementById("btn4");  //取得ID
const img = document.getElementById("img");  //取得ID
let x = 20;
let y = "block";

btn1.addEventListener("click",function(){  //監聽事件，點擊，執行函式
    document.getElementById("demo1").innerHTML = "Hello JavaScript";
})
btn2.addEventListener("click",function(){  //監聽事件，點擊，執行函式
x = x + 10;
document.getElementById("demo2").style.fontSize=x + "px";
})
btn3.addEventListener("click",function(){  //監聽事件，點擊，執行函式
    alert("沒事");
    this.innerText = "沒事";
    this.style.color = "red";
})
btn4.addEventListener("click",function(){  //監聽事件，點擊，執行函式
    y = (y=="none")? "block" : "none";
    document.getElementById("demo1").style.display = y;
    document.getElementById("demo2").style.display = y;
})
img.addEventListener("mouseover",function(){  //監聽事件，滑鼠懸浮上面
    this.src = 'https://media.giphy.com/media/PXJhC8MYxFmRRl7kB2/giphy.gif';
})
img.addEventListener("mouseout",function(){  //監聽事件，滑鼠懸浮離開
    this.src = "https://media.giphy.com/media/roWjSjVBTx6iZ9eOgY/giphy.gif";
})
