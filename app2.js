let maxScore = 0
const rounds = document.querySelectorAll(".round")
const firstPart = document.querySelector(".firstPart")
const secondPart = document.querySelector(".secondPart")
rounds.forEach((round) => {
    round.addEventListener("click", () => {
        let num = round.innerText;
        maxScore = num
        firstPart.classList.add("hidden")
        secondPart.classList.remove("hidden")
    });
});


let userScore = 0
let compScore = 0

const choices = document.querySelectorAll(".choice")
const msg = document.querySelector("#msg")
const userScoreContainer = document.querySelector("#userScore")
const compScoreContainer = document.querySelector("#compScore")

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        let selectedChoice = choice.getAttribute("id")       
        playGame(selectedChoice)
    })
})

const playGame = (userChoice) => {
    let compChoice = genCompChoice()
    console.log(userChoice);
    console.log(compChoice);
    let userWin = true
    if(userChoice == compChoice){
        gameDraw()
        console.log("Game draw!");
        return
        
    }
    else{
        if(userChoice == "rock"){
            userWin = compChoice == "paper"? false:true
        }
        else if(userChoice == "paper"){
            userWin = compChoice == "scissors"? false:true
        }
        else{
            userWin = compChoice == "rock"? false:true
        }
    }
    showWinner(userWin, userChoice, compChoice)
}

const genCompChoice = () => {
    let choiceSet = ["rock", "paper", "scissors"]
    let choiceIndex = Math.floor(Math.random()*3)
    return choiceSet[choiceIndex]
}

const gameDraw = () => {
    msg.innerText = "Game Draw!!"
    msg.style.backgroundColor = "rgb(11, 32, 49)"
}

const showWinner = (userWin, userChoice, compChoice) => {
    let finalUserWin = true
    if(userWin){
        userScore++
        userScoreContainer.innerText = userScore
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`
        msg.style.backgroundColor = "rgb(8, 117, 35)"
        if(userScore == maxScore){
            endGame(finalUserWin)            
        }
    }
    else{
        compScore++
        compScoreContainer.innerText = compScore
        msg.innerText = `You Loose! ${compChoice} beats ${userChoice}`
        msg.style.backgroundColor = "rgb(117, 8, 32)"
        if(compScore == maxScore){
            finalUserWin = false
            endGame(finalUserWin)            
        }

    }
}

const thirdPart = document.createElement("div")
thirdPart.classList.add("thirdPart")

const paraThirdPart = document.createElement("p")
paraThirdPart.classList.add("finalVerdict")
thirdPart.classList.add("hidden")

thirdPart.appendChild(paraThirdPart)

secondPart.insertAdjacentElement("afterend", thirdPart)

const endGame = (finalWin) => {
    secondPart.classList.add("hidden")
    thirdPart.classList.remove("hidden")
    if(finalWin){
        let points = userScore-compScore
        paraThirdPart.innerText = `Winner! User Beats Computer by ${points} points`
    }
    else{
        let points = compScore-userScore
        paraThirdPart.innerText = `Winner! Computer Beats User by ${points} points`
    }
}