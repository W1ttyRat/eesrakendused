console.log("fail ühendatud");

class Typer {
    constructor() {
        this.name = "";
        this.wordsInGame = 2;
        this.startingWordLength = 2;
        this.startTime = 0;
        this.endTime = 0;
        this.word = "suvaline";
        this.words = [];
        this.typeWords = [];
        this.wordsTyped = 0;

        this.loadFromFile();
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
        this.startTyper();

    }

    startTyper() {
        this.generateWords();
        
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
        } else if (this.word[0] === keypressed && this.word.length == 1 && this.wordsTyped <= this.typeWords.length - 1) {
            console.log( this.typeWords.length -1, this.wordsTyped);
            this.wordsTyped++;
            this.selectWord();
        } else if (this.word[0] === keypressed && this.word.length > 1 && this.typeWords.length - 1 == this.wordsTyped) {
            this.wordsTyped = 0;
            document.getElementById("word").innerHTML = "Mäng läbi!";
        }

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
}

let typer = new Typer();