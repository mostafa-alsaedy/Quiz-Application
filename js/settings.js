import { Quiz } from "./quiz.js"

export class Settings {
    constructor() {
        this.chooseCategory = document.querySelector("#category")
        this.chooseDifficulty = document.getElementsByName("difficulty") // nodeList
        this.chooseNoOfQuestions = document.querySelector("#numberOfQuestions")
        document.querySelector("#startBtn").addEventListener("click", this.startQuiz.bind(this))
    }

    async startQuiz() {
        let category = this.chooseCategory.value
        let difficulty = Array.from(this.chooseDifficulty).find((ele) => { return ele.checked }).value
        let noOfQuestions = this.chooseNoOfQuestions.value
        let API = `https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${difficulty}`
        let questions = await this.quizAPI(API)
        if (noOfQuestions == "") {
            document.querySelector("#questionsAlert").classList.replace("d-none" , "d-block")
        } else {
            document.querySelector("#questionsAlert").classList.replace("d-block" , "d-none")

            document.querySelector("#settings").classList.add("d-none")
            document.querySelector("#quiz").classList.replace("d-none", "d-block")
            let quiz = new Quiz(questions)
        }
    }

    async quizAPI(API) {
        let response = await fetch(API)
        let finalResponse = await response.json()
        return finalResponse.results
    }
}