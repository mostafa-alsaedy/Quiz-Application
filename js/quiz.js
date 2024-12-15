import { Finish } from "./finish.js";
export class Quiz {
    constructor(questions) {
        this.quizQuestions = questions
        this.currentQuestion = 0;
        this.score = 0;
        this.getQuestions()
        document.querySelector("#next").addEventListener("click", this.nextQuestion.bind(this))
    }
    getQuestions() {
        document.querySelector("#currentQuestion").innerHTML = this.currentQuestion + 1
        document.querySelector("#totalNumberOfQuestions").innerHTML = this.quizQuestions.length
        document.querySelector("#question").innerHTML = this.quizQuestions[this.currentQuestion].question
        this.correctAnswer = this.quizQuestions[this.currentQuestion].correct_answer
        let inCorrectAnswers = this.quizQuestions[this.currentQuestion].incorrect_answers
        let answers = [this.correctAnswer, ...inCorrectAnswers]
        console.log(answers);
        answers = [this.correctAnswer, ...inCorrectAnswers].sort()
        let quizBox = ""
        for (let i = 0; i < answers.length; i++) {
            quizBox += `
                    <div class="form-check ms-2">
                        <label class="form-check-label mb-1">
                            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
                            ${answers[i]}
                        </label>
                    </div>
            `
        }
        document.querySelector("#rowAnswer").innerHTML = quizBox;
    }
    nextQuestion() {
        let userAnswer = Array.from(document.getElementsByName("answer")).find((answer) => answer.checked)
        console.log(userAnswer);
        if (userAnswer != undefined) {
            document.querySelector("#alert").classList.replace("d-block", "d-none")
            this.checkAnswer(userAnswer.value, this.correctAnswer)
            this.currentQuestion++
            if (this.currentQuestion < this.quizQuestions.length) {
                this.getQuestions()
            } else {
                const finish = new Finish(this.score)
                document.querySelector("#quiz").classList.add("d-none")
                document.querySelector("#finish").classList.replace("d-none", "d-block")
            }
        } else {
            document.querySelector("#alert").classList.replace("d-none", "d-block")
        }


    }
    checkAnswer(userAnswer, correctAnswer) {
        if (userAnswer == correctAnswer) {
            document.querySelector("#Correct").classList.replace("d-none", "d-block")
            setTimeout(() => {
                document.querySelector("#Correct").classList.replace("d-block", "d-none")
            }, 500);
            this.score++
        } else {
            document.querySelector("#inCorrect").classList.replace("d-none", "d-block")
            setTimeout(() => {
                document.querySelector("#inCorrect").classList.replace("d-block", "d-none")
            }, 500);
        }
    }
}