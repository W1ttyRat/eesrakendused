console.log("fail ühendatud");

class Typer {
    constructor() {
        this.name = "";
        this.wordsInGame = 5;
        this.startingWordLength = 5;
        this.startTime = 0;
        this.endTime = 0;
        this.word = "suvaline";
        this.words = [];
        this.typeWords = [];
        this.wordsTyped = 0;
        this.score = 0;
        
        this.results = JSON.parse(localStorage.getItem("score")) || [];

        this.loadFromFile();
        this.loadResults();
    }

    loadResults() {
        const resultDiv = document.getElementById("results");
        resultDiv.innerHTML = "";

        for (let i = 0; i < 20; i++) {
            const row = document.createElement("div");
            row.textContent = `${i + 1}. ${this.results[i].name} ${this.results[i].time}`;
            resultDiv.appendChild(row);
        }
    }

    async loadFromFile() {
        console.log("load from file sees");
        const responseFromFile = await fetch("words.txt");
        const allWords = await responseFromFile.text();

        this.getWords(allWords);
    }

    getWords(data) {
        //console.log(data);
        const dataFromFile = data.split("\n");

        this.separateWordsByLength(dataFromFile);
    }

    separateWordsByLength(words) {
        for (let word of words) {
            word = word.trim();
            const wordLength = word.length;
            if (!this.words[wordLength]) {
                this.words[wordLength] = [];
            }
            this.words[wordLength].push(word);
        }
        console.log(this.words);
        this.askName();

    }

    askName() {
        document.getElementById("submitName").addEventListener("click", () => {
            this.name = document.getElementById("username").value
            this.startCountdown();
        });
    }

    startCountdown() {
        document.getElementById("counter").style.display = "flex";
        document.querySelector("#name").style.display = "none";
        let i = 3;

        let countdown = setInterval(() => {
            document.getElementById("time").innerHTML = i;
            i--;
            if (i == 0) {
                document.getElementById("counter").style.display = "none";
                this.startTyper();
                clearInterval(countdown);
            }
        }, 1000);
    }

    startTyper() {
        this.generateWords();
        this.updateInfo();

        document.querySelector("#info").style.display = "flex";
        document.querySelector("#wordContainer").style.display = "flex";
        document.querySelector("#name").style.display = "none";

        this.startTime = performance.now();
        
        this.keyListener = (e) => {
            this.shorteWord(e.key);
            // console.log(e.key);
        };

        window.addEventListener("keypress", this.keyListener);
        
    }

    shorteWord(keypressed) {
        if(this.word[0] === keypressed && this.word.length > 1 && this.typeWords.length > this.wordsTyped) {
            this.word = this.word.slice(1);
            this.drawWord();        
        } else if (this.word[0] === keypressed && this.word.length == 1 && this.wordsTyped <= this.typeWords.length - 2) {
            //console.log( this.typeWords.length -1, this.wordsTyped);
            this.wordsTyped++;
            this.updateInfo();
            this.selectWord();
        } else if (this.word[0] === keypressed && this.word.length == 1 && this.typeWords.length - 1 == this.wordsTyped) {
            this.updateInfo();
            this.wordsTyped = 0;
            this.endGame();
        } else if (this.word[0] != keypressed) {
            document.getElementById("word").style.color = "red";
            setTimeout(() => {
                document.getElementById("word").style.color = "black";
            }, 100);
        }

    }

    endGame() {
        this.endTime = performance.now();
        this.score = ((this.endTime - this.startTime) / 1000).toFixed(2); //
        document.getElementById("word").innerHTML = "Mäng läbi. Sinu aeg on: " + this.score + " sekundit."; //tofixed oli alguse ssiin

        this.saveResult();
    }

    saveResult() {
        let result = {
            name: this.name,
            time: this.score
        }
        this.results.push(result);
        this.results.sort((a,b) => parseFloat(a.time) - parseFloat(b.time));

        localStorage.setItem("score", JSON.stringify(this.results));

        console.log(this.results);
    }

    generateWords() {
        for (let i = 0; i < this.wordsInGame; i++) {
            const len = this.wordsInGame + i;
            const randomIndex = Math.floor(Math.random() * this.words[len].length);
            this.typeWords[i] = this.words[len][randomIndex];
        }

        this.selectWord();
    }

    selectWord() {
        this.word = this.typeWords[this.wordsTyped];
        this.drawWord();
    }

    drawWord() {
        document.getElementById("word").innerHTML = this.word;
    }

    updateInfo() {
        document.getElementById("wordCount").innerHTML = "Sõnu trükitud: " + this.wordsTyped + "/" + this.wordsInGame;
    }
}

let typer = new Typer();