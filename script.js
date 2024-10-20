//part1 Access
let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#rest");
let turnO = true; //playerX, playerO
let count = 0;

let newgame = document.querySelector("#newg");
let mssg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");
//part2 winning pattern finding
const winpttn = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
//part8
const resetsound = document.querySelector("#resetsound");
const resetgame = () => {
    resetsound.play();
    turnO = true;
    count = 0;
    enableboxes();
    msgContainer.classList.add("hidden");
    gover.pause();
    gover.currentTime = 0;
    music.pause();
    music.currentTime = 0;

};


const clicksd = document.querySelector("#clicksound");
const music = document.querySelector("#winningsound");
const gover = document.querySelector("#gameover");

//part3 Click karne se kuch hona chahiye so uske liye hum eventlistener add karenge 
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clicksd.play();
      if(turnO){ //playerO
        box.innerText = "O";
        turnO = false;
      }
      else{ //playerX
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true; // next time phirse print na ho X,O same box pe
      count++;

      let iswinner = checkwinner();
      if (count === 9 && !iswinner ){
        gamedraw();
      }
    });
});

//
const gamedraw = () => {
    gover.play();
    mssg.innerText = `Game was a Draw!`;
    msgContainer.classList.remove("hidden");
    disablebox();
};



//part6 After winner gets declared disabled all boxes
const disablebox = () => {
    for( let box of boxes ){
        box.disabled = true;
    }
    };
//part7
const enableboxes = () => {
    for( let box of boxes ){
        box.disabled = false;
        box.innerText = "";
    }
    };

//part5
const showwinner = (winner) => {
    music.play();
    mssg.innerText = `congratulations, Winner is ${winner}`; // winner ki value print hogi
    msgContainer.classList.remove("hidden");
    // msg container v show ho jayega
    disablebox();
};

//part4 check who has win 
const checkwinner = () => {
    for( let pattern of winpttn ) {
        let p1val = boxes[pattern[0]].innerText; // Accessing each boxes
        let p2val = boxes[pattern[1]].innerText;
        let p3val = boxes[pattern[2]].innerText;

        if( p1val !=  "" && p2val !=  "" && p3val != "" ) { //empty nahi hona chahiye 
            if( p1val === p2val && p2val === p3val ) { // winning condition 
                
                showwinner(p1val);
                return true;
            }

        }

    }
};

//part9 
newgame.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);


