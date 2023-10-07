// getting all required elements
const start_btn = document.querySelector('.start_btn button')
const info_box = document.querySelector('.info_box')
const exit_btn = document.querySelector('.quit')
const continue_btn = document.querySelector('.restart')
const quiz_box = document.querySelector('.quiz_box')
const timeCount = document.querySelector('.timer_sec')
const timeLine = document.querySelector('.time_line')
const timeOff = document.querySelector('.timer_text')

const option_list = document.querySelector(".option_list")
 
//Si je click le button Start
start_btn.onclick = () => {
    info_box.classList.add("activeInfo") //voir les infos du jeu

}

//Si je click le button Exit
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo") //Cacher les infos du jeu

}

//Si je click le button continue
continue_btn.onclick = () => {
    info_box.classList.add("activeInfo")
    quiz_box.classList.add("activeQuiz")    //voir le quiz_box
    showQuestion(0)
    queCounter(1)
    startTime(15)
    startTimeLine(0)
}

let que_count = 0
let que_numb = 1
let counter
let counterLine
let timeValue = 15
let widthValue = 0
let userScore = 0

const next_btn = document.querySelector(".next_btn")
const result_box = document.querySelector('.result_box')
const restart_quiz = document.querySelector('.restart')
const quit_quiz = document.querySelector('.quit')
const quitter = document.getElementById('quitter')
const replay = document.getElementById('replay')

replay.onclick = () => {
    window.location.reload()
}

quitter.onclick = () => {
    window.location.reload()
}





// SI je clique le button suivant
next_btn.onclick = () => {
    if(que_count < questions.length - 1){
        que_count++
        que_numb++
        showQuestion(que_count)
        queCounter(que_numb)
        clearInterval(counter)
        startTime(timeValue)
        clearInterval(counterLine)
        startTimeLine(widthValue)
        next_btn.style.display = "none"
        timeOff.textContent = "Time Left"
        timeCount.style.color = "white"
    }else{
        clearInterval(counter)
        clearInterval(counterLine)
        showResultBox()
    }
}   


// obtenir les questions et les options du tableau
function showQuestion(index){
    const que_text = document.querySelector(".que_text")
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>'
    let option_tag = '<div class="option">'  + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>'
    que_text.innerHTML = que_tag
    option_list.innerHTML = option_tag

    const option = document.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)") 
    }
}

// Afficher les icons 
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'


//Si vous avez trouver la bonne reponse
function optionSelected(answer){
    clearInterval(counter)
    startTime(timeValue)
    clearInterval(counterLine)
    let userAns = answer.textContent
    let correctAns = questions[que_count].answer
    let allOptions = option_list.children.length
    if(userAns == correctAns){
        userScore += 1
        answer.classList.add("correct")
        answer.insertAdjacentHTML("beforeend", tickIcon)
        

    }else{
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossIcon)
    
        //if answer is incorrect automatically selected the correct answer 
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute('class', "option correct")
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }  
        }

    }

    //once user selected disabled all option
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled")
    }
    next_btn.style.display = "block"
}

function showResultBox(){
    info_box.classList.remove("activeInfo")   //remove le quiz_box
    quiz_box.classList.remove("activeQuiz")    //remove le quiz_box
    result_box.classList.add("activeResult")
    const scoreText = document.querySelector('.score_text')
    if(userScore > 3){
        let scoreTag = '<span>and Congras 🏆, You got <p>' + userScore +'</p> out of <p>' + questions.length +'</p></span>'
        scoreText.innerHTML =  scoreTag
    }else if(userScore > 1){
        let scoreTag = '<span>and nice  😊, You got  <p>' + userScore +'</p> out of <p>' + questions.length +'</p></span>'
        scoreText.innerHTML =  scoreTag
    }else{
        let scoreTag = '<span>and Sorry  😌, You got <p>' + userScore +'</p> out of <p>' + questions.length +'</p></span>'
        scoreText.innerHTML =  scoreTag
    }
}



//le temps du jeu
function startTime(time) {
    counter = setInterval(timer, 1000)
    function timer(){
        timeCount.textContent = time
        time--
        if(time < 9){
            let addZero = timeCount.textContent
            timeCount.textContent = "0" + addZero
            timeCount.style.color = "red"
        }
        if(time < 0){
            clearInterval(counter)
            timeCount.textContent = "00"
            timeOff.textContent = "Time off"

            let correctAns = questions[que_count].answer
            let allOptions = option_list.children.length

            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute('class', "option correct")
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon)
                }  
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled")
            }
            next_btn.style.display = "block"
        }
    }
}

function startTimeLine(time) {
    counterLine = setInterval(timer, 29)
    function timer(){
        time += 1 
        timeLine.style.width = time + "px"
        if(time > 549){
            clearInterval(counterLine)
        }
    }
}




function queCounter(index){
    const buttom_ques_counter = document.querySelector(".total_que")
    let totalQuesCounterTag = "<span><p>" + index + "</p>of<p>" + questions.length + "</p></span>"
    buttom_ques_counter.innerHTML = totalQuesCounterTag
}