export class Finish {
    constructor(score) {
        console.log("Hello from finish", score);
        document.querySelector("#score").innerHTML = score
        document.querySelector("#tryAgainBtn").addEventListener("click", this.tryAgain)
    }

    tryAgain() {
        document.querySelector("#finish").classList.add("d-none")
        document.querySelector("#settings").classList.replace("d-none", "d-block")
        document.querySelector("#numberOfQuestions").value = "";
        document.querySelector("#easy").checked = true;
        document.querySelector("#category option:nth-child(1)").selected = true;
    }
}